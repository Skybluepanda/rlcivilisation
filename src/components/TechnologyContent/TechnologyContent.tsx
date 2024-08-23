import { useState } from 'react';
import '@mantine/core/styles.css';
import {
    Container,
    MantineProvider,
    Tabs,
    TabsList,
    Text,
} from '@mantine/core';
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
import {ResearchTab} from './ResearchTab';
// import TechHistoryTab from './HistoryTab';
// import { availableTechAtom, researchedTechAtom, undiscoveredTechAtom } from './TechnologyData';

//Three major slots.
// //List of researched tech
//

export const TechnologyContent = () => {
    return (
        <Container size={'xl'}>
            <Tabs defaultValue="Research" variant="default" visibleFrom="sm">
                <Tabs.List grow justify="space-between">
                    <Tabs.Tab value="Research">Research</Tabs.Tab>
                    <Tabs.Tab value="Archive">Archive </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="Research">
                    <ResearchTab/>
                </Tabs.Panel>
                <Tabs.Panel value="Archive">
                    ASD
                </Tabs.Panel>
            </Tabs>
        </Container>
    );
};
