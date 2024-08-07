import { useState } from 'react';
import '@mantine/core/styles.css';
import { MantineProvider, Button, Tooltip, Paper } from '@mantine/core';
import { turn, Resource, resourceListAtom } from 'components/Gamedata/Gamedata';
import { useAtom } from 'jotai';
import { jobListAtom } from 'components/JobsContent/FoodJobData';
import { buildingListAtom } from 'components/BuildingContent/BuildingData';
import {
    resourceUpdate,
    jobListUpdate,
    buildingListUpdate,
    buildingJobMaxUpdate,
    buildingResourceMaxUpdate
} from 'components/EndTurn/EndTurnHelper';

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
    const [buildings, setBuildings] = useAtom(buildingListAtom);

    function endTurn() {
        const population = resources.find(j => j.name === 'Population');
        const change =
            Math.floor(population.value + population.income) -
            Math.floor(population.value);

        if (change) {
            setJobList(jobListUpdate(jobList, change));
        }
        //Resource specific processing?
        //Find population increase and increase or decrease foragers by that amount.

        setResources(resourceUpdate(resources));
        const buildingsUpdate = buildingListUpdate(
            buildings,
            jobList,
            setJobList
        );
        setBuildings(buildingsUpdate[0]);
        
        if (buildingsUpdate[1]) {
            //New building!
            setJobList(prevJobs => buildingJobMaxUpdate(prevJobs, buildingsUpdate[1], buildings));
            setResources(buildingResourceMaxUpdate(resources, buildingsUpdate[1], buildings));

        }

        //Update other tables when buildings are done.
        //Update jobmax and resourcemax
        //Bonus effect should happen witin building list update.
    }

    return (
        <MantineProvider>
            <Paper shadow="sm" p="md" withBorder h="70vh" w="20vw">
                <Button
                    onClick={endTurn}
                    disabled={1 >= 0 ? false : true}
                    fullWidth
                    h="10vh"
                >
                    End Turn
                </Button>
            </Paper>
        </MantineProvider>
    );
}
