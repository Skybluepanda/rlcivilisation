import { useState } from 'react'
import '@mantine/core/styles.css'
import { MantineProvider, Button, Tooltip } from '@mantine/core';
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
import { useAtom } from 'jotai';
import {
  jobListAtom,
} from 'components/JobsContent/FoodJobData';


//Endturn should change every resource by adding the income.
//Buildings that are queued should be built.
//Insufficient resources will take wealth and damage various scores.
//Choose a random event based on current condition?
//Tech unlocks are also event based.
//Culture unlocks are also event based.
//Creates situations!
//Will do many more calculations here!
//World exploration, events, enemy attacks, missions, timed events
//New population are added to foragers, lost populations are deducted from foragers. Insufficient foragers prevent end turn effect.




export default function EndTurn() {
  // const [villagerAtom, setVillager] = useAtom(villager);
  const [populationAtom, setPopulation] = useAtom(population);
  const [infrastructureAtom, setInfrastructure] = useAtom(infrastructure);
  const [militaryAtom, setMilitary] = useAtom(military);
  const [knowledgeAtom, setKnowledge] = useAtom(knowledge);
  const [foodAtom, setFood] = useAtom(food);
  const [materialAtom, setMaterial] = useAtom(material);
  const [wealthAtom, setWealth] = useAtom(wealth);
  const [progressAtom, setProgress] = useAtom(progress);
  const [cultureAtom, setCulture] = useAtom(culture);
  const [productionAtom, setProduction] = useAtom(production);
  const [influenceAtom, setInfluence] = useAtom(influence);
  const [innovationAtom, setInnovation] = useAtom(innovation);
  const [prosperityAtom, setProsperity] = useAtom(prosperity);
  const [efficiencyAtom, setEfficiency] = useAtom(efficiency);
  const [superiorityAtom, setSuperiority] = useAtom(superiority);
  const [allignmentAtom, setAllignment] = useAtom(allignment);
  const [satisfactionAtom, setSatisfaction] = useAtom(satisfaction);
  const [stabilityAtom, setStability] = useAtom(stability);
  const [authorityAtom, setAuthority] = useAtom(authority);
  const [foodMaxArom, setFoodMaxAtom] = useAtom(maxFood);
  const [materialMaxAtom, setMaterialMaxAtom] = useAtom(maxMaterial);
  const [wealthMaxAtom, setWealthMaxAtom] = useAtom(maxWealth);
  const [knowledgeMaxAtom, setKnowledgeMaxAtom] = useAtom(maxKnowledge);
  const [iPopulation, setIPopulation] = useAtom(incPopulation);
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


  function endTurn() {
    setPopulation(populationAtom + iPopulation);
    setInfrastructure(infrastructureAtom + iInfrastructure);
    setMilitary(militaryAtom + iMilitary);
    setKnowledge(Math.min(knowledgeAtom + iKnowledge, knowledgeMaxAtom));
    setFood(Math.min(foodAtom + iFood, foodMaxArom));
    setMaterial(Math.min(materialAtom + iMaterial, materialMaxAtom));
    setWealth(Math.min(wealthAtom + iWealth, wealthMaxAtom));
    setProgress(progressAtom + iProgress);
    setCulture(cultureAtom + iCulture);
    setProduction(productionAtom + iProduction);
    setInfluence(influenceAtom + iInfluence);
    setInnovation(innovationAtom + iInnovation);
    setProsperity(prosperityAtom + iProsperity);
    setEfficiency(efficiencyAtom + iEfficiency);
    setSuperiority(superiorityAtom + iSuperiority);
    setAllignment(allignmentAtom + iAllignment);
    setSatisfaction(satisfactionAtom + iSatisfaction);
    setStability(stabilityAtom + iStability);
    setAuthority(authorityAtom + iAuthority);
  }



  

  return (
    <MantineProvider>
      <Button onClick={endTurn} disabled={1 >= 0 ? false:true}fullWidth h="10vh">End Turn</Button>
    </MantineProvider>
  )
}


