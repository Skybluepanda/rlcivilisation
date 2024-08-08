import { useState } from 'react';
import '@mantine/core/styles.css';
import {
    MantineProvider,
    Button,
    Tooltip,
    Paper,
    ScrollArea,
    Text,
    Divider,
    Box,
    Menu,
} from '@mantine/core';
import { turn, Resource, resourceListAtom, logSettingsAtom } from 'components/Gamedata/Gamedata';
import { useAtom } from 'jotai';
import { jobListAtom } from 'components/JobsContent/FoodJobData';
import { buildingListAtom } from 'components/BuildingContent/BuildingData';
import {
    resourceUpdate,
    jobListUpdate,
    buildingListUpdate,
    buildingJobMaxUpdate,
    buildingResourceMaxUpdate,
} from 'components/EndTurn/EndTurnHelper';
import {
    IconWorld,
    IconUsersGroup,
    IconBuildingCommunity,
    IconAlertCircle,
    IconApps,
    IconMasksTheater,
    IconCoins,
    IconGavel,
    IconAdjustments,





    IconTrash,
    IconCheck,
    IconX,
} from '@tabler/icons-react';

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
    const [logs, setLogs] = useState([]);
    const [turnVal, setTurn] = useAtom(turn);
    const [logSettings, setLogSettings] = useAtom(logSettingsAtom);

    function endTurn() {
        //Log handeling.
        //First when turn ends, start with Turn x
        //
        const log = {
            turn: turnVal,
            population: 0,
        };

        setResources(resourceUpdate(resources));
        const population = resources.find(j => j.name === 'Population');
        const change =
            Math.floor(population.value + population.income) -
            Math.floor(population.value);

        if (change) {
            setJobList(jobListUpdate(jobList, change));
            log.population = change;
        }

        const buildingsUpdate = buildingListUpdate(
            buildings,
            jobList,
            setJobList,
        );

        setBuildings(buildingsUpdate[0]);
        if (buildingsUpdate[1]['built']) {
            delete buildingsUpdate[1].built;
            const buildingLog = [];
            for (let [buildingName, quantity] of Object.entries(
                buildingsUpdate[1],
            )) {
                buildingLog.push(`${quantity} ${buildingName} was built.`);
            }
            log['Buildings'] = buildingLog;
            console.log('new building');
            setJobList(prevJobs =>
                buildingJobMaxUpdate(prevJobs, buildingsUpdate[1], buildings),
            );
            setResources(
                buildingResourceMaxUpdate(
                    resources,
                    buildingsUpdate[1],
                    buildings,
                ),
            );
        }
        setTurn(turnVal + 1);
        setLogs([...logs, log]);
    }

    return (
        <MantineProvider>
            <Paper shadow="sm" p="md" withBorder h={"100%"}>
                <Menu shadow="md" width={200} closeOnItemClick={false}>
                    <Menu.Target>
                        <Button fullWidth variant="default">Log Options</Button>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Label>Toggle Logs</Menu.Label>
                        <Menu.Item
                            leftSection={
                                <IconWorld size="1.4rem" stroke={1.5} color="gray"/>
                            }
                            rightSection={logSettings.showWorldEvents ? <IconCheck size="1.4rem" stroke={1.5} color="green"/> : <IconX size="1.4rem" stroke={1.5} color="red"/>}
                            onClick={() => setLogSettings(prevSettings => {return {...prevSettings, showWorldEvents : !prevSettings.showWorldEvents}})}
                        >
                            World Events
                        </Menu.Item>
                        <Menu.Item
                            leftSection={
                                <IconUsersGroup size="1.4rem" stroke={1.5} color="gray"/>
                            }
                            rightSection={logSettings.showPopulationEvents ? <IconCheck size="1.4rem" stroke={1.5} color="green"/> : <IconX size="1.4rem" stroke={1.5} color="red"/>}
                            onClick={() => setLogSettings(prevSettings => {return {...prevSettings, showPopulationEvents : !prevSettings.showPopulationEvents}})}
                        >
                            Population
                        </Menu.Item>
                        <Menu.Item
                            leftSection={
                                <IconBuildingCommunity size="1.4rem" stroke={1.5} color="gray"/>
                            }
                            rightSection={logSettings.showBuildingEvents ? <IconCheck size="1.4rem" stroke={1.5} color="green"/> : <IconX size="1.4rem" stroke={1.5} color="red"/>}
                            onClick={() => setLogSettings(prevSettings => {return {...prevSettings, showBuildingEvents : !prevSettings.showBuildingEvents}})}
                        >
                            Building
                        </Menu.Item>
                        <Menu.Item
                            leftSection={
                                <IconAlertCircle size="1.4rem" stroke={1.5} color="gray"/>
                            }
                            rightSection={logSettings.showSituation ? <IconCheck size="1.4rem" stroke={1.5} color="green"/> : <IconX size="1.4rem" stroke={1.5} color="red"/>}
                            onClick={() => setLogSettings(prevSettings => {return {...prevSettings, showSituation : !prevSettings.showSituation}})}
                        >
                            Situation
                        </Menu.Item>
                        <Menu.Item
                            leftSection={
                                <IconApps size="1.4rem" stroke={1.5} color="gray"/>
                            }
                            rightSection={logSettings.showTechEvents ? <IconCheck size="1.4rem" stroke={1.5} color="green"/> : <IconX size="1.4rem" stroke={1.5} color="red"/>}
                            onClick={() => setLogSettings(prevSettings => {return {...prevSettings, showTechEvents : !prevSettings.showTechEvents}})}
                        >
                            Technology
                        </Menu.Item>
                        <Menu.Item
                            leftSection={
                                <IconMasksTheater size="1.4rem" stroke={1.5} color="gray"/>
                            }
                            rightSection={logSettings.showTraditionEvents ? <IconCheck size="1.4rem" stroke={1.5} color="green"/> : <IconX size="1.4rem" stroke={1.5} color="red"/>}
                            onClick={() => setLogSettings(prevSettings => {return {...prevSettings, showTraditionEvents : !prevSettings.showTraditionEvents}})}
                        >
                            Tradition
                        </Menu.Item>
                        <Menu.Item
                            leftSection={
                                <IconGavel size="1.4rem" stroke={1.5} color="gray"/>
                            }
                            rightSection={logSettings.showGovernmentEvents ? <IconCheck size="1.4rem" stroke={1.5} color="green"/> : <IconX size="1.4rem" stroke={1.5} color="red"/>}
                            onClick={() => setLogSettings(prevSettings => {return {...prevSettings, showGovernmentEvents : !prevSettings.showGovernmentEvents}})}
                        >
                            Government
                        </Menu.Item>

                        <Menu.Divider />

                        <Menu.Label>Clear Logs</Menu.Label>
                        
                        <Menu.Item
                            color="red"
                            leftSection={
                                <IconTrash size="1.4rem" stroke={1.5} color="gray"/>
                            }
                            onClick={() => setLogs([])}
                        >
                            Clear Logs
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
                <Divider size={'xl'}/>
                <ScrollArea h="80%">
                    {logs.map(log => {
                        return (
                            <Box>
                                <Divider my="sm" />
                                <Text ta={'left'}>Turn {log.turn}</Text>
                                {log.population != 0 ? (
                                    <Text>
                                        Population Change:{' '}
                                        {log.population > 0 ? '+' : '-'}
                                        {log.population}
                                    </Text>
                                ) : null}
                            </Box>
                        );
                    })}
                </ScrollArea>
                <Button 
                    variant="default"
                    onClick={endTurn}
                    disabled={1 >= 0 ? false : true}
                    fullWidth
                    h="8vh"
                    
                >
                    End Turn {turnVal}
                </Button>
            </Paper>
        </MantineProvider>
    );
}
