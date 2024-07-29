import React from 'react';
import { SimpleGrid } from '@mantine/core';
import { useAtom } from 'jotai';
import { forager, hunter, Job, increment } from 'components/Gamedata/FoodJobData';
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

const [iPopulation, setIncPopulation] = useAtom(incPopulation);
const [iInfrastructure, setIncInfrastructure] = useAtom(incInfrastructure);
const [iMilitary, setIncMilitary] = useAtom(incMilitary);
const [iScience, setIncScience] = useAtom(incScience);
const [iFood, setIncFood] = useAtom(incFood);
const [iMaterial, setIncMaterial] = useAtom(incMaterial);
const [iWealth, setIncWealth] = useAtom(incWealth);
const [iProgress, setIncProgress] = useAtom(incProgress);
const [iTradition, setIncTradition] = useAtom(incTradition);
const [iProduction, setIncProduction] = useAtom(incProduction);
const [iInfluence, setIncInfluence] = useAtom(incInfluence);
const [iInnovation, setIncInnovation] = useAtom(incInnovation);
const [iProsperity, setIncProsperity] = useAtom(incProsperity);
const [iEfficiency, setIncEfficiency] = useAtom(incEfficiency);
const [iSuperiority, setIncSuperiority] = useAtom(incSuperiority);
const [iCorruption, setIncCorruption] = useAtom(incCorruption);
const [iUnrest, setIncUnrest] = useAtom(incUnrest);
const [iDevastation, setIncDevastation] = useAtom(incDevastation);
const [iEmpire, setIncEmpire] = useAtom(incEmpire);
const [vPopulation, setPopulation] = useAtom(population);
const [vInfrastructure, setInfrastructure] = useAtom(infrastructure);
const [vMilitary, setMilitary] = useAtom(military);
const [vScience, setScience] = useAtom(science);
const [vFood, setFood] = useAtom(food);
const [vMaterial, setMaterial] = useAtom(material);
const [vWealth, setWealth] = useAtom(wealth);
const [vProgress, setProgress] = useAtom(progress);
const [vTradition, setTradition] = useAtom(tradition);
const [vProduction, setProduction] = useAtom(production);
const [vInfluence, setInfluence] = useAtom(influence);
const [vInnovation, setInnovation] = useAtom(innovation);
const [vProsperity, setProsperity] = useAtom(prosperity);
const [vEfficiency, setEfficiency] = useAtom(efficiency);
const [vSuperiority, setSuperiority] = useAtom(superiority);
const [vCorruption, setCorruption] = useAtom(corruption);
const [vUnrest, setUnrest] = useAtom(unrest);
const [vDevastation, setDevastation] = useAtom(devastation);
const [vEmpire, setEmpire] = useAtom(empire);

const resourceArray = {
    population: [iPopulation, setIncPopulation, vPopulation, setPopulation],
    infrastructure: [iInfrastructure, setIncInfrastructure, vInfrastructure, setInfrastructure],
    military: [iMilitary, setIncMilitary, vMilitary, setMilitary],
    science: [iScience, setIncScience, vScience, setScience],
    food: [iFood, setIncFood, vFood, setFood],
    material: [iMaterial, setIncMaterial, vMaterial, setMaterial],
    wealth: [iWealth, setIncWealth, vWealth, setWealth],
    progress: [iProgress, setIncProgress, vProgress, setProgress],
    tradition: [iTradition, setIncTradition, vTradition, setTradition],
    production: [iProduction, setIncProduction, vProduction, setProduction],
    influence: [iInfluence, setIncInfluence, vInfluence, setInfluence],
    innovation: [iInnovation, setIncInnovation, vInnovation, setInnovation],
    prosperity: [iProsperity, setIncProsperity, vProsperity, setProsperity],
    efficiency: [iEfficiency, setIncEfficiency, vEfficiency, setEfficiency],
    superiority: [iSuperiority, setIncSuperiority, vSuperiority, setSuperiority],
    corruption: [iCorruption, setIncCorruption, vCorruption, setCorruption],
    unrest: [iUnrest, setIncUnrest, vUnrest, setUnrest],
    devastation: [iDevastation, setIncDevastation, vDevastation, setDevastation],
    empire: [iEmpire, setIncEmpire, vEmpire, setEmpire],
};
const [foragerJob] = useAtom(forager);
const [hunterJob] = useAtom(hunter);

const jobs:Job[] = [foragerJob, hunterJob];

export default function ProcessIncome() {
    //For each resource in gamedata, create const [incResource, setIncResource] = useAtom(incResourceAtom) and const [resource, setResource] = useAtom(resourceAtom)
    //Then make multidimentional a array of resourceName, resourcename, incResource, setIncResource, resource, setResource
    //For each in job, calculate income for each resource by calculating total of each increment total * worker.
    //Update incResource foe each resource in gamedata.
    //Make another function to increase the resource by incResource.
    const resourceJobTotal = [
        [population, 0],
        [infrastructure, 0],
        [military, 0],
        [science, 0],
        [food, 0],
        [material, 0],
        [wealth, 0],
        [progress, 0],
        [tradition, 0],
        [production, 0],
        [influence, 0],
        [innovation, 0],
        [prosperity, 0],
        [efficiency, 0],
        [superiority, 0],
        [corruption, 0],
        [unrest, 0],
        [devastation, 0],
        [empire, 0],
    ];

    jobs.forEach((job) => {
        const jobInputOutput = [...job.input, ...job.output];

        jobInputOutput.forEach(inc => {
            const total = (inc.base * inc.multiplier + inc.bonus) * inc.globalMultiplier;

            resourceJobTotal[inc.resource] += total;
            //Set incResource to total for each resource in gamedata
            
            
        });
    });
    resourceJobTotal.forEach((total, index) => {
        const [incResource, setIncResource] = resourceArray[index];
        setIncResource(total[1]);
    });
};