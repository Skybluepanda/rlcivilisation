import { useState } from 'react'
import '@mantine/core/styles.css'
import { MantineProvider, Button, Tooltip } from '@mantine/core';
import {
  turn,
  Resource,
  resourceListAtom
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
  const [resources, setResources] = useAtom(resourceListAtom);
  const [jobList, setJobList] = useAtom(jobListAtom);


  function endTurn() {
    const population = resources.find(j => j.name === 'Population');
    const change = Math.floor(population.value+population.income) - Math.floor(population.value)
    const updatedResources = resources.map((resource: Resource) => ({
      ...resource,
      value: resource.value + resource.income
    }));
    const jobListUpdate = jobList.map((job) => {
      if (job.name === 'forager') {
        return { ...job, current: job.current + change };
      }
      return job;
    });
    setJobList(jobListUpdate);
    //Resource specific processing?
    //Find population increase and increase or decrease foragers by that amount.








    setResources(updatedResources);
  }



  

  return (
    <MantineProvider>
      <Button onClick={endTurn} disabled={1 >= 0 ? false:true}fullWidth h="10vh">End Turn</Button>
    </MantineProvider>
  )
}


