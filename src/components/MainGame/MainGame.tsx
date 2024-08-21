import { useState } from 'react';
import '@mantine/core/styles.css';
import {
    MantineProvider,
    Tabs,
    useMantineTheme,
    Container,
    Grid,
    Text,
    rem,
    Group,
    createTheme,
    Paper,
    Button,
    Flex,
    Stack,
    AppShell,
} from '@mantine/core';
import { useDisclosure, useViewportSize } from '@mantine/hooks';
import { useAtom } from 'jotai';
import WorldContent from 'components/WorldContent/WorldContent';
// import classes from './MainGame.module.css';
import Settings from 'components/Settings/Settings';
import EndTurn from 'components/EndTurn/EndTurn';
import JobList from 'components/JobsContent/JobList';
import QueueBox from 'components/QueueBox/QueueBox';
import ResourceGrid from 'components/ResourceDisplay/ResourceDisplay';
import BuildingList from 'components/BuildingContent/BuildingContent';
import {
    IconMap,
    IconUsersGroup,
    IconBuildingCommunity,
    IconWorld,
    IconApps,
    IconMasksTheater,
    IconCoins,
    IconGavel,
    IconAdjustments,
} from '@tabler/icons-react';
const tabs = [
    'World',
    'Jobs',
    'Buildings',
    'Diplomacy',
    'Technology',
    'Tradition',
    'Economy',
    'Government',
    'Settings',
];
import { gameStartedAtom } from 'components/WorldContent/WorldContent';
import { useJobDictionaryLoader } from 'components/JobsContent/FoodJobData';
import { useBuildingDictionarLoader } from 'components/BuildingContent/BuildingData';
import TechnologyContent from 'components/TechnologyContent/TechnologyContent';

export default function MainGame() {
    useJobDictionaryLoader(
        '/rlcivilisation/src/components/JobsContent/JobDataJson.json');
    useBuildingDictionarLoader(
        '/rlcivilisation/src/components/BuildingContent/BuildingDataJson.json');
    const { height, width } = useViewportSize();
    const [gameStarted, setGameStarted] = useAtom(gameStartedAtom);
    const [tabChosen, setTabChosen] = useState('World');
    return (
        <MantineProvider>
            <AppShell header={{height:180}} padding="sm" >
                <AppShell.Header p="sm"><ResourceGrid /></AppShell.Header>
                <AppShell.Main display={'flex'} h={'100%'}>
                        <Paper shadow="sm" withBorder flex={1}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 2fr 1fr',
                            alignItems: 'center',

                            textAlign: 'center',
                        }}>
                                <QueueBox/>
                                <Paper  shadow="sm" withBorder h={'100%'}>
                                    {gameStarted ? <Container size="xl">
                                        <Tabs
                                            defaultValue="World"
                                            variant="default"
                                            visibleFrom="sm"
                                            onChange={value => {
                                                setTabChosen(value);
                                            }}
                                        >
                                            <Tabs.List grow justify="space-between">
                                                <Tabs.Tab
                                                    value="World"
                                                    leftSection={
                                                        <IconMap
                                                            size="1.4rem"
                                                            stroke={1.5}
                                                            color="gray"
                                                        />
                                                    }
                                                >
                                                    {tabChosen == 'World' ||
                                                    width >= 2000
                                                        ? 'World'
                                                        : null}
                                                </Tabs.Tab>
                                                <Tabs.Tab
                                                    value="Jobs"
                                                    leftSection={
                                                        <IconUsersGroup
                                                            size="1.4rem"
                                                            stroke={1.5}
                                                            color="gray"
                                                        />
                                                    }
                                                >
                                                    {tabChosen == 'Jobs' ||
                                                    width >= 2000
                                                        ? 'Jobs'
                                                        : null}
                                                </Tabs.Tab>
                                                <Tabs.Tab
                                                    value="Buildings"
                                                    leftSection={
                                                        <IconBuildingCommunity
                                                            size="1.4rem"
                                                            stroke={1.5}
                                                            color="gray"
                                                        />
                                                    }
                                                >
                                                    {tabChosen == 'Buildings' ||
                                                    width >= 2000
                                                        ? 'Buildings'
                                                        : null}
                                                </Tabs.Tab>
                                                <Tabs.Tab
                                                    value="Diplomacy"
                                                    leftSection={
                                                        <IconWorld
                                                            size="1.4rem"
                                                            stroke={1.5}
                                                            color="gray"
                                                        />
                                                    }
                                                >
                                                    {tabChosen == 'Diplomacy' ||
                                                    width >= 2000
                                                        ? 'Diplomacy'
                                                        : null}
                                                </Tabs.Tab>
                                                <Tabs.Tab
                                                    value="Technology"
                                                    leftSection={
                                                        <IconApps
                                                            size="1.4rem"
                                                            stroke={1.5}
                                                            color="gray"
                                                        />
                                                    }
                                                >
                                                    {tabChosen == 'Technology' ||
                                                    width >= 2000
                                                        ? 'Technology'
                                                        : null}
                                                </Tabs.Tab>
                                                <Tabs.Tab
                                                    value="Tradition"
                                                    leftSection={
                                                        <IconMasksTheater
                                                            size="1.4rem"
                                                            stroke={1.5}
                                                            color="gray"
                                                        />
                                                    }
                                                >
                                                    {tabChosen == 'Tradition' ||
                                                    width >= 2000
                                                        ? 'Tradition'
                                                        : null}
                                                </Tabs.Tab>
                                                <Tabs.Tab
                                                    value="Economy"
                                                    leftSection={
                                                        <IconCoins
                                                            size="1.4rem"
                                                            stroke={1.5}
                                                            color="gray"
                                                        />
                                                    }
                                                >
                                                    {tabChosen == 'Economy' ||
                                                    width >= 2000
                                                        ? 'Economy'
                                                        : null}
                                                </Tabs.Tab>
                                                <Tabs.Tab
                                                    value="Government"
                                                    leftSection={
                                                        <IconGavel
                                                            size="1.4rem"
                                                            stroke={1.5}
                                                            color="gray"
                                                        />
                                                    }
                                                >
                                                    {tabChosen == 'Government' ||
                                                    width >= 2000
                                                        ? 'Government'
                                                        : null}
                                                </Tabs.Tab>
                                                <Tabs.Tab
                                                    value="Settings"
                                                    leftSection={
                                                        <IconAdjustments
                                                            size="1.4rem"
                                                            stroke={1.5}
                                                            color="gray"
                                                        />
                                                    }
                                                >
                                                    {tabChosen == 'Settings' ||
                                                    width >= 2000
                                                        ? 'Settings'
                                                        : null}
                                                </Tabs.Tab>
                                            </Tabs.List>
                                            <Tabs.Panel value="World">
                                                <Paper shadow="sm" p="md" withBorder>
                                                    <WorldContent />
                                                </Paper>
                                            </Tabs.Panel>

                                            <Tabs.Panel value="Diplomacy">
                                                Diplomacy WIP
                                            </Tabs.Panel>

                                            <Tabs.Panel value="Situation">
                                                Situation WIP
                                            </Tabs.Panel>

                                            <Tabs.Panel value="Jobs">
                                                <JobList />
                                            </Tabs.Panel>

                                            <Tabs.Panel value="Buildings">
                                                <BuildingList />
                                            </Tabs.Panel>

                                            <Tabs.Panel value="Economy">
                                                Economy WIP
                                            </Tabs.Panel>

                                            <Tabs.Panel value="Technology">
                                                <TechnologyContent/>
                                            </Tabs.Panel>

                                            <Tabs.Panel value="Tradition">
                                                Tradition WIP
                                            </Tabs.Panel>

                                            <Tabs.Panel value="Government">
                                                Authority WIP
                                            </Tabs.Panel>
                                            <Tabs.Panel value="Settings">
                                                <Settings />
                                            </Tabs.Panel>
                                        </Tabs>
                                    </Container>: <Container size="xl">
                                        <Tabs
                                            defaultValue="World"
                                            variant="default"
                                            visibleFrom="sm"
                                            onChange={value => {
                                                setTabChosen(value);
                                            }}
                                        >
                                            <Tabs.List grow justify="space-between">
                                                <Tabs.Tab
                                                    value="World"
                                                    leftSection={
                                                        <IconWorld
                                                            size="1.4rem"
                                                            stroke={1.5}
                                                            color="gray"
                                                        />
                                                    }
                                                >
                                                    {tabChosen == 'World' ||
                                                    width >= 2000
                                                        ? 'World'
                                                        : null}
                                                </Tabs.Tab>
                                                
                                                <Tabs.Tab
                                                    value="Settings"
                                                    leftSection={
                                                        <IconAdjustments
                                                            size="1.4rem"
                                                            stroke={1.5}
                                                            color="gray"
                                                        />
                                                    }
                                                >
                                                    {tabChosen == 'Settings' ||
                                                    width >= 2000
                                                        ? 'Settings'
                                                        : null}
                                                </Tabs.Tab>
                                            </Tabs.List>
                                            <Tabs.Panel value="World">
                                                <Paper shadow="sm" p="md" withBorder>
                                                    <WorldContent />
                                                </Paper>
                                            </Tabs.Panel>

                                            <Tabs.Panel value="Settings">
                                                <Settings />
                                            </Tabs.Panel>
                                        </Tabs>
                                    </Container>}
                                </Paper>
                                <EndTurn />
                        </Paper>
                </AppShell.Main>
            </AppShell>
        </MantineProvider>
    );
}
