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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { population } from 'components/Gamedata/Gamedata';
import { useAtom } from 'jotai';
import WorldContent from 'components/WorldContent/WorldContent';
// import classes from './MainGame.module.css';

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
            <div >
                <Container size="md">
                    <Tabs
                        defaultValue="World"
                        variant="default"
                        visibleFrom="sm"
                    >
                        <Tabs.List>{items}</Tabs.List>
                        <Tabs.Panel value="World">
                            <WorldContent />
                        </Tabs.Panel>

                        <Tabs.Panel value="Diplomacy">
                            Messages tab content
                        </Tabs.Panel>

                        <Tabs.Panel value="Situation">
                            Settings tab content
                        </Tabs.Panel>
                    </Tabs>
                </Container>
            </div>
        </MantineProvider>
    );
}
