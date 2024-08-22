import { useState } from 'react';
import '@mantine/core/styles.css';
import { Container, MantineProvider, Tabs, TabsList } from '@mantine/core';
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
// import {ResearchTab} from './ResearchTab';
// import TechHistoryTab from './HistoryTab';
// import { availableTechAtom, researchedTechAtom, undiscoveredTechAtom } from './TechnologyData';

//Three major slots.
// //List of researched tech
// <Tabs
//                     defaultValue="Research"
//                     variant="default"
//                     visibleFrom="sm"
//                 >
//                     <Tabs.List grow justify="space-between">
//                         <Tabs.Tab value="Research">Research</Tabs.Tab>
//                         <Tabs.Tab value="Archive">Archive </Tabs.Tab>
//                     </Tabs.List>
//                     <Tabs.Panel value="Research">
//                         {/* <ResearchTab/> */}Problems
//                     </Tabs.Panel>
//                     <Tabs.Panel value="Archive">
//                         {/* <TechHistoryTab/> */}Also problem?
//                     </Tabs.Panel>
//                 </Tabs>

export const TechnologyContent = () => {
    return (
        <MantineProvider>
            <Container size={'xl'}>
                
            </Container>
        </MantineProvider>
    );
}
