import React from 'react';
import { useEffect } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Box, Button, Group, Text, Tooltip } from '@mantine/core';
import {
    jobListAtom,
    Job,
    increment,
    effect,
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
    inspiration,
    population,
    infrastructure,
    military,
    incPopulation,
    incInfrastructure,
    incMilitary,
    knowledge,
    food,
    material,
    wealth,
    maxKnowledge,
    maxFood,
    maxMaterial,
    maxWealth,
    incKnowledge,
    incFood,
    incMaterial,
    incWealth,
    progress,
    culture,
    production,
    influence,
    incProgress,
    incCulture,
    incProduction,
    incInfluence,
    innovation,
    prosperity,
    efficiency,
    superiority,
    incInnovation,
    incProsperity,
    incEfficiency,
    incSuperiority,
    allignment,
    incAllignment,
    satisfaction,
    incSatisfaction,
    stability,
    incStability,
    authority,
    incAuthority,
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
    const [iPopulation, setIPopulation] = useAtom(incPopulation);
    const job = jobs.find((j) => j.name === jobName);

    const villagerJob = jobs.find((j) => j.name === 'villager');
    const [iInfrastructure, setIInfrastructure] = useAtom(incInfrastructure);
    const [iMilitary, setIMilitary] = useAtom(incMilitary);
    const [iKnowledge, setIKnowledge] = useAtom(incKnowledge);
    const [iFood, setIFood] = useAtom(incFood);
    const [iMaterial, setIMaterial] = useAtom(incMaterial);
    const [iWealth, setIWealth] = useAtom(incWealth);
    const [iProgress, setIProgress] = useAtom(incProgress);
    const [iCulture, setICulture] = useAtom(incCulture);
    const [iProduction, setIProduction] = useAtom(incProduction);
    const [iInfluence, setIInfluence] = useAtom(incInfluence);
    const [iInnovation, setIInnovation] = useAtom(incInnovation);
    const [iProsperity, setIProsperity] = useAtom(incProsperity);
    const [iEfficiency, setIEfficiency] = useAtom(incEfficiency);
    const [iSuperiority, setISuperiority] = useAtom(incSuperiority);
    const [iAllignment, setIAlignment] = useAtom(incAllignment);
    const [iSatisfaction, setISatisfaction] = useAtom(incSatisfaction);
    const [iStability, setIStability] = useAtom(incStability);
    const [iAuthority, setIAuthority] = useAtom(incAuthority);

    const decreaseWorkers = () => {
        if (job.current > 0) {
            setJobs(modifyJobWorkers(jobs, jobName, -1));
        }
    };

    const increaseWorkers = () => {
        if (villagerJob.current > 0 && job.current < job.max) {
            setJobs(modifyJobWorkers(jobs, jobName, 1));
        }
    };

    useEffect(() => {
        const resourceTotals = updateResourceIncome(jobs);

        setIPopulation(resourceTotals.population);
        setIInfrastructure(resourceTotals.infrastructure);
        setIMilitary(resourceTotals.military);
        setIKnowledge(resourceTotals.knowledge);
        setIFood(resourceTotals.food);
        setIMaterial(resourceTotals.material);
        setIWealth(resourceTotals.wealth);
        setIProgress(resourceTotals.progress);
        setICulture(resourceTotals.culture);
        setIProduction(resourceTotals.production);
        setIInfluence(resourceTotals.influence);
        setIInnovation(resourceTotals.innovation);
        setIProsperity(resourceTotals.prosperity);
        setIEfficiency(resourceTotals.efficiency);
        setISuperiority(resourceTotals.superiority);
        setIAlignment(resourceTotals.allignment);
        setISatisfaction(resourceTotals.satisfaction);
        setIStability(resourceTotals.stability);
        setIAuthority(resourceTotals.authority);
    }, [jobs]);

    if (job.max == 0) {
        null;
    } else {
        return (
            <Tooltip
                position="bottom"
                transitionProps={{ transition: 'pop', duration: 300 }}
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
                        gridTemplateColumns:
                            job.name === 'villager' ? '1fr' : '1fr 2fr 1fr',
                        alignItems: 'center',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        marginBottom: '5px',

                        textAlign: 'center',
                    }}
                >
                    {job.name !== 'villager' ? (
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
                            {job.name === 'villager'
                                ? job.current
                                : `${job.current}/${job.max}`}
                        </Text>
                    </Box>
                    {job.name !== 'villager' ? (
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
