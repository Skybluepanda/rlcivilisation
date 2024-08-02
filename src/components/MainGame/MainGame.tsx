import { useState } from 'react';
import '@mantine/core/styles.css';
import {
    MantineProvider,
    Tabs,
    useMantineTheme,
    Container,
    Text,
    rem,
    Group,
    createTheme,
    Paper,
    Button
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAtom } from 'jotai';
import WorldContent from 'components/WorldContent/WorldContent';
// import classes from './MainGame.module.css';
import Settings from 'components/Settings/Settings';
import JobContent from 'components/JobsContent/JobsContent';
import EndTurn from 'components/EndTurn/EndTurn';
import JobList from 'components/JobsContent/JobList';

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
        <MantineProvider >
            <Paper shadow="sm" p="md" withBorder h="70vh">
                <Container fluid={true}>
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
                                <JobContent/>
                            </Tabs.Panel>

                            <Tabs.Panel value="Buildings">
                                <JobList/>
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
                </Container>
            </Paper>
            <EndTurn/>
        </MantineProvider>
    );
}
