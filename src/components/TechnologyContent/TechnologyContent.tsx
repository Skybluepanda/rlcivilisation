import { useState } from 'react';
import '@mantine/core/styles.css';
import { MantineProvider, Tabs, TabsList } from '@mantine/core';
import { useAtom } from 'jotai';
import {
    IconWorld,
    IconUsersGroup,
    IconBuildingCommunity,
    IconAlertCircle,
    IconApps,
    IconMasksTheater,
    IconCoins,
    IconGavel,
    IconHourglass,
    IconUser,
    IconHexagon,
    IconSword,
    IconCarrot,
    IconSchool,
    IconPackages,
    IconCoin,
    IconFlask,
    IconCandle,
    IconHammer,
    IconStar,
    IconBulb,
    IconPeace,
    IconSettings,
    IconTrophy,
    IconScale,
    IconThumbUp,
    IconBuildingCastle,
    IconCrown,
    IconArrowUpRight,
    IconArrowDownRight,
} from '@tabler/icons-react';

//Three major slots.
//List of researched tech

export default function TechnologyContent() {
    const [tabChosen, setTabChosen] = useState('Research');
    return (
        <MantineProvider>
            <Tabs
                defaultValue="Research"
                variant="default"
                visibleFrom="sm"
            >
                <Tabs.List grow justify="space-between">
                    <Tabs.Tab value="Research">Research</Tabs.Tab>
                    <Tabs.Tab value="Archive">Archive </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="Research" >
                    Research
                </Tabs.Panel>
                <Tabs.Panel value="Archive" >
                    Archives
                </Tabs.Panel>
            </Tabs>
        </MantineProvider>
    );
}
