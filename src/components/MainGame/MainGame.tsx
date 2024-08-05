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
    Flex
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAtom } from 'jotai';
import WorldContent from 'components/WorldContent/WorldContent';
// import classes from './MainGame.module.css';
import Settings from 'components/Settings/Settings';
import EndTurn from 'components/EndTurn/EndTurn';
import JobList from 'components/JobsContent/JobList';
import QueueBox from 'components/QueueBox/QueueBox';
import ResourceGrid from 'components/ResourceDisplay/ResourceDisplay';
import BuildingList from 'components/BuildingContent/BuildingContent';

const tabs = [
    'World',
    'Jobs',
    'Buildings',
    'Situation',
    'Technology',
    'Tradition',
    'Economy',
    'Government',
    'Settings'
];

const colors = {
    'World': "indigo",
    'Diplomacy' : 'blue',
    'Situation' : 'cyan',
    'Jobs' : 'teal',
    'Buildings': 'green',
    'Economy' : 'lime',
    'Technology': 'red',
    'Tradition': 'pink',
    'Government': 'grape',
    'Settings': 'black',
};

export default function MainGame() {
    const theme = useMantineTheme();
    const [opened, { toggle }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);

    const items = tabs.map(tab => (
        <Tabs.Tab value={tab} key={tab} color={colors[tab]}>
            {tab}
        </Tabs.Tab>
    ));

    return (
        <MantineProvider>
            <Flex direction={'column'} >
            <ResourceGrid/>
            
            <Paper shadow="sm" p="md" withBorder h={"80vh"}>
            <Flex>
                <QueueBox/>
                <Paper  w={"60vw"} h={"76vh"} shadow="sm" p="md" withBorder>
                    <Container size="xl">
                        <Tabs
                            defaultValue="World"
                            variant="default"
                            visibleFrom="sm"
                        >
                            <Tabs.List>{items}</Tabs.List>
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
                                <JobList/>
                            </Tabs.Panel>

                            <Tabs.Panel value="Buildings">
                                <BuildingList/>
                            </Tabs.Panel>

                            <Tabs.Panel value="Economy">
                                Economy WIP
                            </Tabs.Panel>

                            <Tabs.Panel value="Technology">
                                Technology WIP
                            </Tabs.Panel>

                            <Tabs.Panel value="Tradition">
                                Tradition WIP
                            </Tabs.Panel>

                            <Tabs.Panel value="Government">
                                Authority WIP
                            </Tabs.Panel>
                            <Tabs.Panel value="Settings">
                                <Settings/>
                            </Tabs.Panel>
                        </Tabs>
                    </Container>
                    
                </Paper>
                <EndTurn/>
                </Flex>
            </Paper>
            </Flex>
            
        </MantineProvider>
    );
}
