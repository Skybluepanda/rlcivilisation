import React from 'react';
import { SimpleGrid } from '@mantine/core';
import JobBlock from './JobBlock';
import { useAtom } from 'jotai';
import { forager, hunter, Job } from 'components/Gamedata/FoodJobData';
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

const jobs = [forager, hunter];

const JobContent = () => {
    return (
        <SimpleGrid cols={4} spacing="5px">
            {jobs.map((jobAtom, index) => (
                <JobBlock key={index} jobAtom={jobAtom} jobsList={jobs} />
            ))}
        </SimpleGrid>
    );
};

export default JobContent;
