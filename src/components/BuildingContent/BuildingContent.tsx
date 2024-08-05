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
} from 'components/JobsContent/FoodJobData';
import {
    Building,
    buildingListAtom,
} from 'components/BuildingContent/BuildingData';
import { useAtom, useAtomValue } from 'jotai';
import { persistentAtom } from 'hooks/persistentAtom';
import {
    Box,
    Button,
    Divider,
    ScrollArea,
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

//Constructing and deconstructing buildings.
//Only returns infrastructure costs.
//Infrastructure is the only immediate costs.
//Otherwise buildins take at least a turn to complete.
//Added to building queue atom.
//Progress is calculated by taking job output.
//Initial cost and job cost.
//Job cost 100 production example.
//Builder
//Engineer
//Architect etc!.
//Used workers have output reduced to 0.
//Instead job costs could be calculated potentially.
//job cost = job upkeep/supplier output (Specific resource?)
//Job output

export default function BuildingList() {
    const [jobs, setJobs] = useAtom(jobListAtom);
    const [buildings, setBuildings] = useAtom(buildingListAtom);
    const [resources, setResources] = useAtom(resourceListAtom);
    const population = resources.find(r => r.name === 'Population');

    const infrastructure = resources.find(r => r.name === 'Infrastructure');

    const foragerJob = jobs.find(j => j.name === 'Forager');

    const increaseQueue = row => {
        setBuildings(prevBuildings => {
            const building = prevBuildings.find(b => b.name === row.original.name);
            if (building.construction.queued == 0) {
                return prevBuildings;
            } else {
                return [...prevBuildings, building.construction.queued-1];
            }
        });
    }
    // useEffect(() => {
    //     const resourceTotals = updateResourceIncome(jobs);
    //     const updatedResources = resources.map((resource: Resource) => ({
    //         ...resource,
    //         income: resourceTotals[resource.name],
    //     }));
    //     setResources(updatedResources);
    // }, [jobs, setResources]);

    //column definitions - strongly typed if you are using TypeScript (optional, but recommended)
    const columns = useMemo<MRT_ColumnDef<Building>[]>(
        () => [
            {
                accessorFn: row => row.name,
                id: 'name',
                header: 'Name',
                filterVariant: 'autocomplete',
                enableHiding: false, //disable a feature for this column
            },
            {
                accessorFn: row => row.built, //alternate way
                id: 'built', //id required if you use accessorFn instead of accessorKey
                header: 'Built',
                filterVariant: 'autocomplete',
                Cell: ({ row }) => {
                    return (
                        <Box
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 2fr 1fr',
                                alignItems: 'center',

                                textAlign: 'center',
                            }}
                        >
                            <Tooltip
                                label="Current - used must be greater than 1.
                                "
                            >
                                <Button
                                    variant="default"
                                    // onClick={}
                                    size="sm"
                                >
                                    -
                                </Button>
                            </Tooltip>
                            <Text>{row.original.built}{row.original.construction.queued > 0 ? ' (+'+row.original.construction.queued+')':''}</Text>
                            <Button
                                variant="default"
                                // onClick={() => increaseWorkers(row)}
                                size="sm"
                            >
                                +
                            </Button>
                        </Box>
                    );
                },
            },
            {
                accessorFn: row => {
                    row.infrastructureCost;
                },
                id: 'construction',
                header: 'Construction',
                filterVariant: 'autocomplete',
                enableHiding: false, //disable a feature for this column
                // Cell: ({ row }) => {
                //     let suplist = '';
                //     row.original.suppliers.forEach(sup => {
                //         suplist = suplist + sup.name + ', ';
                //     });
                //     return <Text>{suplist.slice(0, -2)}</Text>;
                // },
            },
        ],
        [],
    );

    //pass table options to useMantineReactTable

    //note: you can also pass table options as props directly to <MantineReactTable /> instead of using useMantineReactTable
    //but the useMantineReactTable hook will be the most recommended way to define table options
    return (
        <ScrollArea.Autosize mah={'75vh'} mx="auto">
            <MantineReactTable
                columns={columns}
                data={buildings}
                enableColumnFilterModes={true}
                enableColumnOrdering={true}
                enableRowOrdering={true}
                enableSorting={false}
                initialState={{
                    showColumnFilters: true,
                    showGlobalFilter: true,
                }}
                renderDetailPanel={({ row }) => {
                    const costJob = row.original.costJobs?.map(job => {
                        const worker = row.original.construction?.progress?.find(
                            p => p.job === job.job,
                        );
                        return (
                            <Table.Tr
                                key={job.job}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr 1fr',
                                    gap: '10px',
                                }}
                            >
                                <Table.Td>{job.job} ({job.resource})</Table.Td>
                                <Table.Td>{job.amount}</Table.Td>
                                <Table.Td>{worker ? worker.workers : "N/A"}</Table.Td>
                            </Table.Tr>
                        );
                    });

                    return (
                        <Box>
                            {row.original.tooltip}
                            <Divider
                                my="md"
                                label="Construction Cost"
                                labelPosition="center"
                                size="lg"
                            />
                            <Text>Infastrcture: {row.original.infrastructureCost}
                            </Text>
                            <Text>
                            Wealth: {row.original.infrastructureCost}
                            </Text>
                            <Table withColumnBorders withRowBorders>
                                <Table.Thead>
                                    <Table.Tr
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr 1fr',
                                            gap: '10px',
                                        }}
                                    >
                                        <Table.Th>Building Jobs (Resources)</Table.Th>
                                        <Table.Th>Construction</Table.Th>
                                        <Table.Th>WorkerCount</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Divider size="md" />
                                <Table.Tbody>{costJob}</Table.Tbody>
                            </Table>
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
