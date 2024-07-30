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
import { population } from 'components/Gamedata/Gamedata';
import { useAtom } from 'jotai';
import WorldContent from 'components/WorldContent/WorldContent';
// import classes from './MainGame.module.css';
import Settings from 'components/Settings/Settings';
import JobContent from 'components/JobsContent/JobsContent';
import ProcessIncome from 'shared/ProcessIncome';


const tabs = [
    'World',
    'Diplomacy',
    'Situation',
    'Jobs',
    'Buildings',
    'Economy',
    'Technology',
    'Tradition',
    'Authority',
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
    'Authority': 'grape',
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
                                Buildings WIP
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

                            <Tabs.Panel value="Authority">
                                Authority WIP
                            </Tabs.Panel>
                            <Tabs.Panel value="Settings">
                                <Settings/>
                            </Tabs.Panel>
                        </Tabs>
                    </Container>
                </Container>
            </Paper>
            <Button fullWidth h="10vh" onClick={ProcessIncome}>End Turn</Button>
        </MantineProvider>
    );
}
