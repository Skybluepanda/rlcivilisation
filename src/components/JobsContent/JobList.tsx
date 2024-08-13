import { useMemo, useEffect, useState } from 'react';
import {
    MantineReactTable,
    useMantineReactTable,
    type MRT_ColumnDef, //if using TypeScript (optional, but recommended)
    type MRT_Updater,
} from 'mantine-react-table';
import {
    IconHourglass,
    IconUser,
    IconHexagon,
    IconSword,
    IconSchool,
    IconCarrot,
    IconPackages,
    IconCoin,
    IconFlask,
    IconCandle,
    IconHammer,
    IconStar,
    IconBulb,
    IconPeace,
    IconSettings,
    IconTrophy,
    IconScale,
    IconThumbUp,
    IconBuildingCastle,
    IconCrown,
    IconArrowUpRight,
    IconArrowDownRight,
} from '@tabler/icons-react';
import {
    jobListAtom,
    Job,
    supplier,
    dependent,
    increment,
    costResource,
    resourceEffect,
} from './FoodJobData';
import { useAtom, useAtomValue } from 'jotai';
import { persistentAtom } from 'hooks/persistentAtom';
import {
    Box,
    Button,
    Container,
    Divider,
    Paper,
    Table,
    Text,
    Tooltip,
} from '@mantine/core';
import { turn, Resource, resourceListAtom } from 'components/Gamedata/Gamedata';
import {
    calculateTotal,
    updateResourceIncome,
    modifyJobWorkers,
    modifyJobUsed,
} from 'components/JobsContent/JobHelpers';

const icons = {
    Inspiration: IconHourglass,
    Population: IconUser,
    Infrastructure: IconHexagon,
    Military: IconSword,
    Knowledge: IconSchool,
    Food: IconCarrot,
    Material: IconPackages,
    Wealth: IconCoin,
    Progress: IconFlask,
    Culture: IconCandle,
    Production: IconHammer,
    Influence: IconStar,
    Innovation: IconBulb,
    Prosperity: IconPeace,
    Efficiency: IconSettings,
    Superiority: IconTrophy,
    Allignment: IconScale,
    Satisfaction: IconThumbUp,
    Stability: IconBuildingCastle,
    Authority: IconCrown,
};

export default function JobList() {
    const [jobs, setJobs] = useAtom(jobListAtom);
    const [resources, setResources] = useAtom(resourceListAtom);
    const population = resources.find(r => r.name === 'Population');
    const [fullScreen, setFullScreen] = useState(false);
    const handleToggleFullScreen = () => {
        setFullScreen(prev => !prev);
    };
    

    const infrastructure = resources.find(r => r.name === 'Infrastructure');

    const foragerJob = jobs.find(j => j.name === 'Forager');
    const decreaseWorkers = row => {
        setJobs(prevJobs => {
            const job = prevJobs.find(j => j.name === row.original.name);
            if (job && job.current > 0) {
                if (job.current - job.used < 1) {
                    return prevJobs;
                } else {
                    if (job.suppliers.length > 0) {
                        job.suppliers.forEach(supplier => {
                            const sup = prevJobs.find(
                                s => s.name === supplier.name,
                            );
                            const res = sup.output.find(
                                i => i.resource === supplier.resource,
                            );
                            const usedAmount =
                                Math.round(
                                    (supplier.amount / res.total()) * 100,
                                ) / 100;
                            prevJobs = modifyJobUsed(
                                prevJobs,
                                sup.name,
                                row.original.name,
                                -usedAmount,
                            );
                        });
                    }
                }
                return modifyJobWorkers(prevJobs, row.original.name, -1);
            }
            return prevJobs;
        });
    };

    const increaseWorkers = row => {
        setJobs(prevJobs => {
            const job = prevJobs.find(j => j.name === row.original.name);
            //Check if there are spare suppliers.
            //Number of required supplier is calculated by jobcost/supplier output.

            if (
                (foragerJob.current > 0 && job && job.current < job.max) ||
                (job.name === 'Villager' && job.current < infrastructure.value)
            ) {
                if (job.suppliers.length > 0) {
                    let supAvailable = true;
                    job.suppliers.forEach(supplier => {
                        const sup = prevJobs.find(
                            s => s.name === supplier.name,
                        );
                        const res = sup.output.find(
                            i => i.resource === supplier.resource,
                        );
                        if (
                            (sup.current - sup.used) * res.total() <
                            supplier.amount
                        ) {
                            supAvailable = false;
                        }
                    });
                    if (supAvailable) {
                        job.suppliers.forEach(supplier => {
                            const sup = prevJobs.find(
                                s => s.name === supplier.name,
                            );
                            const res = sup.output.find(
                                i => i.resource === supplier.resource,
                            );
                            const usedAmount =
                                Math.round(
                                    (supplier.amount / res.total()) * 100,
                                ) / 100;

                            prevJobs = modifyJobUsed(
                                prevJobs,
                                supplier.name,
                                row.original.name,
                                usedAmount,
                            );
                        });
                        return modifyJobWorkers(prevJobs, row.original.name, 1);
                    }
                } else {
                    return modifyJobWorkers(prevJobs, row.original.name, 1);
                }
            }
            return prevJobs;
        });
    };

    useEffect(() => {
        const resourceTotals = updateResourceIncome(jobs);
        const updatedResources = resources.map((resource: Resource) => ({
            ...resource,
            income: resourceTotals[resource.name],
        }));
        setResources(updatedResources);
    }, [jobs, setResources]);

    //column definitions - strongly typed if you are using TypeScript (optional, but recommended)
    const columns = useMemo<MRT_ColumnDef<Job>[]>(
        () => [
            {
                accessorFn: row => row.name,
                id: 'name',
                header: 'Name',
                filterVariant: 'autocomplete',
                enableHiding: false, //disable a feature for this column
            },
            {
                accessorFn: row => row.current, //alternate way
                id: 'current', //id required if you use accessorFn instead of accessorKey
                header: 'Employment Cur/Max(Used)',
                filterVariant: 'autocomplete',
                Cell: ({ row }) => {
                    return (
                        <Box
                            style={{
                                display: 'grid',
                                gridTemplateColumns:
                                    row.original.name === 'Forager'
                                        ? '1fr'
                                        : '1fr 2fr 1fr',
                                alignItems: 'center',

                                textAlign: 'center',
                            }}
                        >
                            {row.original.name !== 'Forager' ? (
                                <Tooltip
                                    label="Current - used must be greater than 1.
                                "
                                >
                                    <Button
                                        variant="default"
                                        onClick={() => decreaseWorkers(row)}
                                        size="compact-xl"
                                        disabled={
                                            row.original.current -
                                                row.original.used <=
                                            0
                                        }
                                    >
                                        -
                                    </Button>
                                </Tooltip>
                            ) : null}
                            {row.original.current}
                            {row.original.name === 'Forager'
                                ? null
                                : row.original.name === 'Villager'
                                ? ' / ' + Math.floor(infrastructure.value)
                                : ' / ' + row.original.max}
                            {row.original.used > 0
                                ? ` (${
                                      Math.round(row.original.used * 10) / 10
                                  })`
                                : ''}
                            {row.original.name !== 'Forager' ? (
                                <Button
                                    variant="default"
                                    onClick={() => increaseWorkers(row)}
                                    size="compact-lg"
                                    disabled={
                                        row.original.name === 'Villager'
                                            ? row.original.current >=
                                              Math.floor(infrastructure.value)
                                            : row.original.current >=
                                                  row.original.max ||
                                              foragerJob.current == 0
                                    }
                                >
                                    +
                                </Button>
                            ) : null}
                        </Box>
                    );
                },
            },
            {
                accessorFn: row => {
                    let suplist = [];
                    row.suppliers.forEach(sup => {
                        suplist.push(sup.name);
                    });
                    return suplist;
                },
                id: 'suppliers',
                header: 'Suppliers',
                filterVariant: 'autocomplete',
                enableHiding: false, //disable a feature for this column
                Cell: ({ row }) => {
                    let suplist = '';
                    row.original.suppliers.forEach(sup => {
                        suplist = suplist + sup.name + ', ';
                    });
                    return <Text>{suplist.slice(0, -2)}</Text>;
                },
            },
            {
                accessorFn: row => {
                    let suplist = [];
                    row.dependents.forEach(sup => {
                        suplist.push(sup.name);
                    });
                    return suplist;
                },
                id: 'dependents',
                header: 'Dependents',
                filterVariant: 'autocomplete',
                enableHiding: false, //disable a feature for this column
                Cell: ({ row }) => {
                    let deplist = '';
                    row.original.dependents.forEach(dep => {
                        deplist = deplist + dep.name + ', ';
                    });
                    return <Text>{deplist.slice(0, -2)}</Text>;
                },
            },
        ],
        [],
    );

    //pass table options to useMantineReactTable

    //note: you can also pass table options as props directly to <MantineReactTable /> instead of using useMantineReactTable
    //but the useMantineReactTable hook will be the most recommended way to define table options
    return (
        <Box h="65vh">
        <MantineReactTable
            columns={columns}
            data={jobs}
            enableColumnFilterModes={true}
            enableColumnOrdering={true}
            enableRowOrdering={true}
            enableSorting={false}
            enablePagination={false}
            enableRowVirtualization={true}
            enableStickyHeader={false}
            mantineTableContainerProps={{
                style: {
                    maxHeight: fullScreen ? "100vh" : "65vh",
                    overflow: 'auto',
                },
            }}
            onIsFullScreenChange={handleToggleFullScreen}
            
            rowVirtualizerOptions={{ overscan: 10 }}
            initialState={{
                showColumnFilters: false,
                showGlobalFilter: false,
            }}
            state={{isFullScreen: fullScreen}}
            renderDetailPanel={({ row }) => {
                const input = row.original.input.map(inc => (
                    <Table.Tr
                        key={inc.resource}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '2fr 1fr 1fr',
                            gap: '10px',
                        }}
                    >
                        <Table.Td>{inc.resource}</Table.Td>
                        <Table.Td>
                            {Math.floor(calculateTotal(inc) * 10) / 10}
                        </Table.Td>
                        <Table.Td>
                            {Math.floor(
                                calculateTotal(inc) * row.original.current * 10,
                            ) / 10}
                        </Table.Td>
                    </Table.Tr>
                ));

                const output = row.original.output.map(inc => (
                    <Table.Tr
                        key={inc.resource}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '2fr 1fr 1fr',
                            gap: '10px',
                        }}
                    >
                        <Table.Td>{inc.resource}</Table.Td>
                        <Table.Td>
                            {Math.round(calculateTotal(inc) * 10) / 10}
                        </Table.Td>
                        <Table.Td>
                            {Math.round(
                                calculateTotal(inc) *
                                    (row.original.current - row.original.used) *
                                    100,
                            ) / 100}
                        </Table.Td>
                    </Table.Tr>
                ));

                const supplier = row.original.suppliers.map(supplier => {
                    const sup = jobs.find(s => s.name === supplier.name);
                    const res = sup.output.find(
                        i => i.resource === supplier.resource,
                    );
                    const usedAmount =
                        Math.round((supplier.amount / res.total()) * 100) / 100;

                    return (
                        <Table.Tr
                            key={supplier.name}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '2fr 1fr 1fr',
                                gap: '10px',
                            }}
                        >
                            <Table.Td>
                                {supplier.name} ({supplier.resource})
                            </Table.Td>
                            <Table.Td>
                                {usedAmount} (
                                {Math.floor(supplier.amount * 10) / 10})
                            </Table.Td>
                            <Table.Td>
                                {Math.round(
                                    usedAmount * row.original.current * 10,
                                ) / 10}{' '}
                                (
                                {Math.floor(
                                    supplier.amount * row.original.current * 10,
                                ) / 10}
                                )
                            </Table.Td>
                        </Table.Tr>
                    );
                });
                const dependents = row.original.dependents.map(dependent => {
                    return (
                        <Table.Tr
                            key={dependent.name}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '2fr 1fr 1fr',
                                gap: '10px',
                            }}
                        >
                            <Table.Td>{dependent.name}</Table.Td>
                            <Table.Td>
                                {Math.round(dependent.amount * 10) / 10}
                            </Table.Td>
                        </Table.Tr>
                    );
                });
                return (
                    <Box>
                        {row.original.tooltip}
                        <Divider
                            my="md"
                            label="Upkeep"
                            labelPosition="center"
                            size="lg"
                        />
                        <Table withColumnBorders withRowBorders>
                            <Table.Thead>
                                <Table.Tr
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '2fr 1fr 1fr',
                                        gap: '10px',
                                    }}
                                >
                                    <Table.Th>Resources</Table.Th>
                                    <Table.Th>Per</Table.Th>
                                    <Table.Th>Total</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Divider size="md" />
                            <Table.Tbody>{input}</Table.Tbody>
                        </Table>
                        {row.original.suppliers.length > 0 ? (
                            <Table withColumnBorders withRowBorders>
                                <Table.Thead>
                                    <Table.Tr
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: '2fr 1fr 1fr',
                                            gap: '10px',
                                        }}
                                    >
                                        <Table.Th>Supplier</Table.Th>
                                        <Table.Th>Per</Table.Th>
                                        <Table.Th>Total</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Divider size="md" />
                                <Table.Tbody>{supplier}</Table.Tbody>
                            </Table>
                        ) : null}
                        <Divider
                            my="md"
                            label="Output"
                            labelPosition="center"
                            size="lg"
                        />
                        <Table withColumnBorders withRowBorders>
                            <Table.Thead>
                                <Table.Tr
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '2fr 1fr 1fr',
                                        gap: '10px',
                                    }}
                                >
                                    <Table.Th>Output</Table.Th>
                                    <Table.Th>Per</Table.Th>
                                    <Table.Th>Total</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Divider size="md" />
                            <Table.Tbody>{output}</Table.Tbody>
                        </Table>
                        {row.original.resourceEffect.length > 0 ? (
                            <Divider
                                my="md"
                                label="Constant Effect"
                                labelPosition="center"
                                size="lg"
                            />
                        ) : null}
                        {row.original.dependents.length > 0 ? (
                            <>
                                <Divider
                                    my="md"
                                    label="Dependents"
                                    labelPosition="center"
                                    size="lg"
                                />
                                <Table withColumnBorders withRowBorders>
                                    <Table.Thead>
                                        <Table.Tr
                                            style={{
                                                display: 'grid',
                                                gridTemplateColumns:
                                                    '2fr 1fr 1fr',
                                                gap: '10px',
                                            }}
                                        >
                                            <Table.Th>Dependent</Table.Th>
                                            <Table.Th>Used</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Divider size="md" />
                                    <Table.Tbody>{dependents}</Table.Tbody>
                                </Table>
                            </>
                        ) : null}
                    </Box>
                );
            }}
            mantineRowDragHandleProps={({ table }) => ({
                onDragEnd: () => {
                    const { draggingRow, hoveredRow } = table.getState();
                    if (hoveredRow && draggingRow) {
                        jobs.splice(
                            hoveredRow.index,
                            0,
                            jobs.splice(draggingRow.index, 1)[0],
                        );
                        setJobs([...jobs]);
                    }
                },
            })}
        />
        </Box>
    );
}
