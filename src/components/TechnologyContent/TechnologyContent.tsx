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
import {ResearchTab} from './ResearchTab';
import TechHistoryTab from './HistoryTab';
import { availableTechAtom, researchedTechAtom, undiscoveredTechAtom } from './TechnologyData';

//Three major slots.
//List of researched tech

export default function TechnologyContent() {
    const [researchedTech, setResearchedTech] = useAtom(researchedTechAtom);
    const [availableTech, setAvailableResearch] = useAtom(availableTechAtom);
    const [undiscoveredTech, setUndiscoveredTech] = useAtom(undiscoveredTechAtom);
    console.log("Researched")
    console.log(researchedTech)
    console.log("Available")
    console.log(availableTech)
    console.log(undiscoveredTech)
    return (
        <MantineProvider>
            <Container size={'xl'}>
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
                    <ResearchTab/>
                </Tabs.Panel>
                <Tabs.Panel value="Archive" >
                    <TechHistoryTab/>
                </Tabs.Panel>
            </Tabs>
            </Container>
        </MantineProvider>
    );
}
