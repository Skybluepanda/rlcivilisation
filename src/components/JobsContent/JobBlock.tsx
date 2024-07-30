import React from 'react';
import { useEffect } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
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
import {
    turn,
    inspiration,
    population,
    infrastructure,
    military,
    incPopulation,
    incInfrastructure,
    incMilitary,
    science,
    food,
    material,
    wealth,
    maxScience,
    maxFood,
    maxMaterial,
    maxWealth,
    incScience,
    incFood,
    incMaterial,
    incWealth,
    progress,
    tradition,
    production,
    influence,
    incProgress,
    incTradition,
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
    corruption,
    incCorruption,
    unrest,
    incUnrest,
    devastation,
    incDevastation,
    empire,
    incEmpire,
} from 'components/Gamedata/Gamedata';


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

function updateResourceIncome(jobsList: any[]) {
    console.log(jobsList);
    const resourceTotals = {
        population: 0,
        infrastructure: 0,
        military: 0,
        science: 0,
        food: 0,
        material: 0,
        wealth: 0,
        progress: 0,
        tradition: 0,
        production: 0,
        influence: 0,
        innovation: 0,
        prosperity: 0,
        efficiency: 0,
        superiority: 0,
        corruption: 0,
        unrest: 0,
        devastation: 0,
        empire: 0,
    };
    jobsList.forEach((jobAtom) => {
        console.log(jobAtom);
        const jobInputOutput = [...jobAtom.input, ...jobAtom.output];
    
        jobInputOutput.forEach(inc => {
            const total = (inc.base * inc.multiplier + inc.bonus) * inc.globalMultiplier * jobAtom.current;

            console.log(total)
            resourceTotals[inc.resource] += total;
            
            //Set incResource to total for each resource in gamedata
            
            
        });
        console.log(resourceTotals)

    });
    return resourceTotals;
}

const JobBlock = ({ jobAtom, jobsList }) => {
    const [job, setJob] = useAtom<Job>(jobAtom);
    const [foragerJob, setForagerJob] = useAtom(forager);
    const [iPopulation, setIPopulation] = useAtom(incPopulation);
    const [iInfrastructure, setIInfrastructure] = useAtom(incInfrastructure);
    const [iMilitary, setIMilitary] = useAtom(incMilitary);
    const [iScience, setIScience] = useAtom(incScience);
    const [iFood, setIFood] = useAtom(incFood);
    const [iMaterial, setIMaterial] = useAtom(incMaterial);
    const [iWealth, setIWealth] = useAtom(incWealth);
    const [iProgress, setIProgress] = useAtom(incProgress);
    const [iTradition, setITradition] = useAtom(incTradition);
    const [iProduction, setIProduction] = useAtom(incProduction);
    const [iInfluence, setIInfluence] = useAtom(incInfluence);
    const [iInnovation, setIInnovation] = useAtom(incInnovation);
    const [iProsperity, setIProsperity] = useAtom(incProsperity);
    const [iEfficiency, setIEfficiency] = useAtom(incEfficiency);
    const [iSuperiority, setISuperiority] = useAtom(incSuperiority);
    const [iCorruption, setICorruption] = useAtom(incCorruption);
    const [iUnrest, setIUnrest] = useAtom(incUnrest);
    const [iDevastation, setIDevastation] = useAtom(incDevastation);
    const [iEmpire, setIEmpire] = useAtom(incEmpire);
    

    const jobsAtomList = jobsList.map((jobAtom) =>
        useAtom<Job>(jobAtom)[0]
    );
    
    const decreaseWorkers = () => {
        // console.log(job)
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

    useEffect(() => {
        const resourceTotals = updateResourceIncome(jobsAtomList);

        setIPopulation(resourceTotals.population);
        setIInfrastructure(resourceTotals.infrastructure);
        setIMilitary(resourceTotals.military);
        setIScience(resourceTotals.science);
        setIFood(resourceTotals.food);
        setIMaterial(resourceTotals.material);
        setIWealth(resourceTotals.wealth);
        setIProgress(resourceTotals.progress);
        setITradition(resourceTotals.tradition);
        setIProduction(resourceTotals.production);
        setIInfluence(resourceTotals.influence);
        setIInnovation(resourceTotals.innovation);
        setIProsperity(resourceTotals.prosperity);
        setIEfficiency(resourceTotals.efficiency);
        setISuperiority(resourceTotals.superiority);
        setICorruption(resourceTotals.corruption);
        setIUnrest(resourceTotals.unrest);
        setIDevastation(resourceTotals.devastation);
        setIEmpire(resourceTotals.empire);

    }, [jobsAtomList]);

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
