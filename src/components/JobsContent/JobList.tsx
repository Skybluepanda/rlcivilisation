import { useMemo, useEffect } from 'react';
import {
    MantineReactTable,
    useMantineReactTable,
    type MRT_ColumnDef, //if using TypeScript (optional, but recommended)
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
import { Box, Button, Divider, ScrollArea, Table } from '@mantine/core';
import { turn, Resource, resourceListAtom } from 'components/Gamedata/Gamedata';
import {
    calculateTotal,
    updateResourceIncome,
    modifyJobWorkers,
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

    const foragerJob = jobs.find(j => j.name === 'forager');
    const decreaseWorkers = row => {
        setJobs(prevJobs => {
            const job = prevJobs.find(j => j.name === row.original.name);
            if (job && job.current > 0) {
                return modifyJobWorkers(prevJobs, row.original.name, -1);
            }
            return prevJobs;
        });
    };

    const increaseWorkers = row => {
        setJobs(prevJobs => {
            const job = prevJobs.find(j => j.name === row.original.name);
            if (foragerJob && job && job.current < job.max) {
                return modifyJobWorkers(prevJobs, row.original.name, 1);
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
                header: 'Employment',
                filterVariant: 'range',
                Cell: ({ row }) => {
                    return (
                        <Box
                            style={{
                                display: 'grid',
                                gridTemplateColumns:
                                    row.original.name === 'forager'
                                        ? '1fr'
                                        : '1fr 2fr 1fr',
                                alignItems: 'center',

                                textAlign: 'center',
                            }}
                        >
                            {row.original.name !== 'forager' ? (
                                <Button
                                    variant="default"
                                    onClick={() => decreaseWorkers(row)}
                                    size="sm"
                                >
                                    -
                                </Button>
                            ) : null}
                            {row.original.current}/{row.original.max}{row.original.used > 0 ? ` (${row.original.used})` : ''}
                            {row.original.name !== 'forager' ? (
                                <Button
                                    variant="default"
                                    onClick={() => increaseWorkers(row)}
                                    size="sm"
                                >
                                    +
                                </Button>
                            ) : null}
                        </Box>
                    );
                },
            },
            {
                accessorFn: row => row.suppliers,
                id: 'suppliers',
                header: 'Suppliers',
                filterVariant: 'multi-select',
                enableHiding: false, //disable a feature for this column
            },
            {
                accessorFn: row => row.dependents,
                id: 'dependents',
                header: 'dependents',
                enableHiding: false, //disable a feature for this column
            }
        ],
        [],
    );

    //pass table options to useMantineReactTable

    //note: you can also pass table options as props directly to <MantineReactTable /> instead of using useMantineReactTable
    //but the useMantineReactTable hook will be the most recommended way to define table options
    return (
        <ScrollArea.Autosize mah={'65vh'} mx="auto">
            <MantineReactTable
                columns={columns}
                data={jobs}
                enableColumnFilterModes={true}
                enableColumnOrdering={true}
                enableRowOrdering={true}
                enableSorting={false}
                initialState={{
                    showColumnFilters: true,
                    showGlobalFilter: true,
                }}
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
                                    calculateTotal(inc) *
                                        row.original.current *
                                        10,
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
                                {Math.floor(calculateTotal(inc) * 10) / 10}
                            </Table.Td>
                            <Table.Td>
                                {Math.floor(
                                    calculateTotal(inc) *
                                        row.original.current *
                                        10,
                                ) / 10}
                            </Table.Td>
                        </Table.Tr>
                    ));

                    const supplier = row.original.suppliers.map(supplier => (
                        <Table.Tr
                            key={supplier.name}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '2fr 1fr 1fr',
                                gap: '10px',
                            }}
                        >
                            <Table.Td>{supplier.name}</Table.Td>
                            <Table.Td>
                                {Math.floor(supplier.amount*10)/10}
                            </Table.Td>
                            <Table.Td>
                                {Math.floor(supplier.amount*row.original.current*10)/10}
                            </Table.Td>
                        </Table.Tr>
                    ));
                    return (
                        <Box>
                            {row.original.tooltip}
                            <Divider my="md" label="Upkeep" labelPosition="center" size="lg"/>
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
                                <Divider size="md"/>
                                <Table.Tbody>{input}</Table.Tbody>
                            </Table>
                            {row.original.suppliers.length>0 ? <Table withColumnBorders withRowBorders>
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
                                <Divider size="md"/>
                                <Table.Tbody>{supplier}</Table.Tbody>
                            </Table> : null}
                            <Divider my="md" label="Output" labelPosition="center" size="lg"/>
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
                                <Divider size="md"/>
                                <Table.Tbody>{output}</Table.Tbody>
                            </Table>
                            {row.original.resourceEffect.length>0 ? <Divider my="md" label="Constant Effect" labelPosition="center" size="lg"/> : null}
                            {row.original.dependents.length>0 ? <Divider my="md" label="Dependents" labelPosition="center" size="lg"/> : null}

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
        </ScrollArea.Autosize>
    );
}
