import React from 'react';
import { useEffect } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Box, Button, Group, Text, Tooltip, Table } from '@mantine/core';
import {
    jobListAtom,
    Job,
    increment,
} from 'components/JobsContent/FoodJobData';
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
    turn,
    Resource,
    resourceListAtom,
} from 'components/Gamedata/Gamedata';
import { calculateTotal, updateResourceIncome, modifyJobWorkers } from 'components/JobsContent/JobHelpers';


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


const JobBlock = ({ jobName }) => {
    const [jobs, setJobs] = useAtom(jobListAtom);
    const [resources, setResources] = useAtom(resourceListAtom);
    const job = jobs.find((j) => j.name === jobName);

    const foragerJob = jobs.find((j) => j.name === 'Forager');

    const decreaseWorkers = () => {
        if (job.current > 0) {
            setJobs(modifyJobWorkers(jobs, jobName, -1));
        }
    };

    const increaseWorkers = () => {
        if (foragerJob.current > 0 && job.current < job.max) {
            setJobs(modifyJobWorkers(jobs, jobName, 1));
        }
    };

    useEffect(() => {
        const resourceTotals = updateResourceIncome(jobs);
        const updatedResources = resources.map((resource: Resource) => ({
            ...resource,
            income: resourceTotals[resource.name],
        }));
        setResources(updatedResources);
    }, [jobs, setResources]);


    const input = job.input.map(inc => 
        (
            <Table.Tr key={inc.resource} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '10px' }}>
                <Table.Td>{inc.resource}</Table.Td>
                <Table.Td>{Math.floor(calculateTotal(inc)*10)/10}</Table.Td>
                <Table.Td>{Math.floor(calculateTotal(inc)*job.current*10)/10}</Table.Td>
            </Table.Tr>
        )
    )

    const output = job.output.map(inc => 
        (
            <Table.Tr key={inc.resource} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '10px' }}>
                <Table.Td>{inc.resource}</Table.Td>
                <Table.Td>{Math.floor(calculateTotal(inc)*10)/10}</Table.Td>
                <Table.Td>{Math.floor(calculateTotal(inc)*job.current*10)/10}</Table.Td>
            </Table.Tr>
        )
    )

    if (job.max == 0) {
        null;
    } else {
        return (
            <Tooltip
                position="bottom"
                transitionProps={{ transition: 'pop', duration: 300 }}
                label={
                    <Box>
                        <Text>{job.tooltip}</Text>
                        <Table>
                            <Table.Thead >
                                <Table.Tr style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '10px' }}>
                                    <Table.Th>
                                        Input
                                    </Table.Th>
                                    <Table.Th>
                                        Per
                                    </Table.Th>
                                    <Table.Th>
                                        Total
                                    </Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{input}</Table.Tbody>
                        
                        </Table>
                        <Table>
                            <Table.Thead>
                                <Table.Tr style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '10px' }}>
                                    <Table.Th>
                                        Output
                                    </Table.Th>
                                    <Table.Th>
                                        Per
                                    </Table.Th>
                                    <Table.Th>
                                        Total
                                    </Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{output}</Table.Tbody>
                        </Table>
                    </Box>
                }
            >
                <Box
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            job.name === 'Forager' ? '1fr' : '1fr 2fr 1fr',
                        alignItems: 'center',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        marginBottom: '5px',

                        textAlign: 'center',
                    }}
                >
                    {job.name !== 'Forager' ? (
                        <Button
                            variant="default"
                            onClick={decreaseWorkers}
                            size="md"
                        >
                            -
                        </Button>
                    ) : null}
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Text ta="center">{job.name}</Text>
                        <Text ta="center" size="sm">
                            {job.name === 'Forager'
                                ? job.current
                                : `${job.current}/${job.max}`}
                        </Text>
                    </Box>
                    {job.name !== 'Forager' ? (
                        <Button
                            variant="default"
                            onClick={increaseWorkers}
                            size="md"
                        >
                            +
                        </Button>
                    ) : null}
                </Box>
            </Tooltip>
        );
    }
};

export default JobBlock;
