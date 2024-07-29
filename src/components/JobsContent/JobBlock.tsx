import React from 'react';
import { useAtom } from 'jotai';
import { Box, Button, Group, Text, Tooltip } from '@mantine/core';
import { forager, hunter, Job, increment, effect } from 'components/Gamedata/FoodJobData';
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
    IconCrown,
    IconVirus,
    IconFlame,
    IconSkull,
    IconBuildingCastle,
    IconArrowUpRight,
    IconArrowDownRight,
} from '@tabler/icons-react';

const icons = {
    Inspiration: IconHourglass,
    Population: IconUser,
    Infrastructure: IconHexagon,
    Military: IconSword,
    Science: IconSchool,
    Food: IconCarrot,
    Material: IconPackages,
    Wealth: IconCoin,
    Progress: IconFlask,
    Tradition: IconCandle,
    Production: IconHammer,
    Influence: IconStar,
    Innovation: IconBulb,
    Prosperity: IconPeace,
    Efficiency: IconSettings,
    Superiority: IconCrown,
    Corruption: IconVirus,
    Unrest: IconFlame,
    Devastation: IconSkull,
    Empire: IconBuildingCastle,
};

const calculateTotal = (increment: increment) =>
    (increment.base * increment.multiplier + increment.bonus) *
    increment.globalMultiplier;

const JobBlock = ({ jobAtom }) => {
    const [job, setJob] = useAtom<Job>(jobAtom);
    const [foragerJob, setForagerJob] = useAtom(forager);

    const decreaseWorkers = () => {
        if (job.current > 0) {
            setJob({ ...job, current: job.current - 1 });
            setForagerJob({ ...foragerJob, current: foragerJob.current + 1 });
        }
    };
    

    const increaseWorkers = () => {
        if (job.name === 'forager' || job.current < job.max) {
            setJob({ ...job, current: job.current + 1 });
            setForagerJob({ ...foragerJob, current: foragerJob.current - 1 });
        }
    };
    if (job.max == 0) {
        null
    } else {
    return (
        
        <Tooltip
                label={
                    <Box>
                        <Text>Input:</Text>
                        {job.input.map((inc, index) => (
                            <Text key={index}>{`${
                                inc.resource
                            }: ${calculateTotal(inc)}`}</Text>
                        ))}
                        <Text>Output:</Text>
                        {job.output.map((inc, index) => (
                            <Text key={index}>{`${
                                inc.resource
                            }: ${calculateTotal(inc)}`}</Text>
                        ))}
                    </Box>
                }
            >
        <Box

            style={{
                display: 'grid',
                gridTemplateColumns: job.name === 'forager' ? '1fr' : '1fr 2fr 1fr',
                alignItems: 'center',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                marginBottom: '5px',

                textAlign: 'center',
            }}
        >
            {job.name !== 'forager'
                        ? <Button variant="default" onClick={decreaseWorkers} size="md">
                -
            </Button> : null}
            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Text ta="center">{job.name}</Text>
                <Text ta="center" size="sm">
                    {job.name === 'forager'
                        ? job.current
                        : `${job.current}/${job.max}`}
                </Text>
            </Box>
            {job.name !== 'forager'
                        ? <Button variant="default" onClick={increaseWorkers} size="md">
                +
            </Button>: null}
        </Box>
        </Tooltip>
    );
    };
};

export default JobBlock;
