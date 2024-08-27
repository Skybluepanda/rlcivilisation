import { useState } from 'react';
import '@mantine/core/styles.css';
import { Button, Container, MantineProvider, Paper, Text } from '@mantine/core';
import { useAtom } from 'jotai';
import { persistentAtom } from 'hooks/persistentAtom';
import {
    availableTechAtom,
    researchSlotsAtom,
    focusedSlotAtom,
} from './TechnologyData';
import {
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
    IconMap,
    IconUsersGroup,
    IconBuildingCommunity,
    IconWorld,
    IconApps,
    IconMasksTheater,
    IconCoins,
    IconGavel,
    IconAdjustments,
    icons,
    IconCircleNumber0,
    IconCircleNumber1,
    IconCircleNumber2,
    IconCircleNumber3,
    IconCircleNumber4,
    IconCircleNumber5,
    IconCircleNumber6,
    IconCircleNumber7,
    IconCircleNumber8,
    IconCircleNumber9,
    IconSquareNumber0,
    IconSquareNumber1,
    IconSquareNumber2,
    IconSquareNumber3,
    IconSquareNumber4,
    IconSquareNumber5,
    IconSquareNumber6,
    IconSquareNumber7,
    IconSquareNumber8,
    IconSquareNumber9,
    IconPentagonNumber0,
    IconPentagonNumber1,
    IconPentagonNumber2,
    IconPentagonNumber3,
    IconPentagonNumber4,
    IconPentagonNumber5,
    IconPentagonNumber6,
    IconPentagonNumber7,
    IconPentagonNumber8,
    IconPentagonNumber9,
    IconHexagonNumber0,
    IconHexagonNumber1,
    IconHexagonNumber2,
    IconHexagonNumber3,
    IconHexagonNumber4,
    IconHexagonNumber5,
    IconHexagonNumber6,
    IconHexagonNumber7,
    IconHexagonNumber8,
    IconHexagonNumber9,
} from '@tabler/icons-react';

const Icons = {
    Inspiration: IconHourglass,
    Population: IconUser,
    Infrastructure: IconHexagon,
    Military: IconSword,
    Knowledge: IconSchool,
    Food: IconCarrot,
    Material: IconPackages,
    Wealth: IconCoin,
    Progress: IconFlask,
    Culture: IconCandle,
    Production: IconHammer,
    Influence: IconStar,
    Innovation: IconBulb,
    Prosperity: IconPeace,
    Efficiency: IconSettings,
    Superiority: IconTrophy,
    Allignment: IconScale,
    Satisfaction: IconThumbUp,
    Stability: IconBuildingCastle,
    Authority: IconCrown,
    World: IconMap,
    Jobs: IconUsersGroup,
    Buildings: IconBuildingCommunity,
    Diplomacy: IconWorld,
    Technology: IconApps,
    Tradition: IconMasksTheater,
    Economy: IconCoins,
    Government: IconGavel,
};

const GemIcon = [
    [
        IconCircleNumber0,
        IconCircleNumber1,
        IconCircleNumber2,
        IconCircleNumber3,
        IconCircleNumber4,
        IconCircleNumber5,
        IconCircleNumber6,
        IconCircleNumber7,
        IconCircleNumber8,
        IconCircleNumber9,
    ],
    [
        IconSquareNumber0,
        IconSquareNumber1,
        IconSquareNumber2,
        IconSquareNumber3,
        IconSquareNumber4,
        IconSquareNumber5,
        IconSquareNumber6,
        IconSquareNumber7,
        IconSquareNumber8,
        IconSquareNumber9,
    ],
    [
        IconPentagonNumber0,
        IconPentagonNumber1,
        IconPentagonNumber2,
        IconPentagonNumber3,
        IconPentagonNumber4,
        IconPentagonNumber5,
        IconPentagonNumber6,
        IconPentagonNumber7,
        IconPentagonNumber8,
        IconPentagonNumber9,
    ],
    [
        IconPentagonNumber0,
        IconPentagonNumber1,
        IconPentagonNumber2,
        IconPentagonNumber3,
        IconPentagonNumber4,
        IconPentagonNumber5,
        IconPentagonNumber6,
        IconPentagonNumber7,
        IconPentagonNumber8,
        IconPentagonNumber9,
    ],
];

const ResearchCard = ({
    ResearchSlots,
    SetResearchSlots,
    slot,
    focusedSlot,
    setFocusedSlot,
}) => {
    const [availableTech, setAvailableTech] = useAtom(availableTechAtom);
    const handleRandom = () => {
        console.log(ResearchSlots);
        const newResearchSlots = [...ResearchSlots];
        console.log(availableTech);
        const TechPool = availableTech.filter(
            tech => !ResearchSlots.includes(tech.name),
        );
        console.log(TechPool);
        const TechPoolSize = TechPool.length;
        if (TechPoolSize) {
            const randomIndex = Math.floor(Math.random() * TechPoolSize);
            newResearchSlots[slot] = TechPool[randomIndex].name;
        }
        SetResearchSlots(newResearchSlots);
    };

    const handleFocus = () => {
        console.log(slot);
        setFocusedSlot(slot);
        console.log(focusedSlot);
        console.log(slot == focusedSlot);
    };

    const handleDiscard = () => {
        const newResearchSlots = [...ResearchSlots];
        newResearchSlots[slot] = '';
        SetResearchSlots(newResearchSlots);
    };
    const SlotTechnology = availableTech.find(
        tech => tech.name == ResearchSlots[slot],
    );
    let CategoryIcon = IconCarrot;
    let RarityIcon = IconCircleNumber0;
    console.log(SlotTechnology);
    if (SlotTechnology) {
        console.log(SlotTechnology.category);
        CategoryIcon = Icons[SlotTechnology.category];
        console.log(SlotTechnology.rarity);
        
        RarityIcon = GemIcon[SlotTechnology.rarity - 1][SlotTechnology.tier - 1];
    }
    

    return (
        <>
            {ResearchSlots[slot] == '' ? (
                <Paper withBorder shadow="md" p={'md'}>
                    <Button variant="default" fullWidth onClick={handleRandom}>
                        Random
                    </Button>
                    <Button variant="default" fullWidth>
                        Exploration
                    </Button>
                    <Button variant="default" fullWidth>
                        Expand
                    </Button>
                    <Button variant="default" fullWidth>
                        Exploit
                    </Button>
                    <Button variant="default" fullWidth>
                        Exterminate
                    </Button>
                </Paper>
            ) : (
                <Paper withBorder shadow="md" p={'md'}>
                    <Paper h="100%">
                        <Container w="100%" fluid>
                            <Container
                                fluid
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Text>{ResearchSlots[slot]}</Text>
                                <><CategoryIcon/><RarityIcon/></>
                            </Container>
                        </Container>
                    </Paper>
                    <Button
                        variant={focusedSlot == slot ? 'outline' : 'default'}
                        onClick={handleFocus}
                    >
                        Focus
                    </Button>
                    <Button variant="default" onClick={handleDiscard}>
                        Discard
                    </Button>
                </Paper>
            )}
        </>
    );
};

export const ResearchTab = () => {
    const [researchSlots, SetResearchSlots] = useAtom(researchSlotsAtom);
    const [focusedSlot, setFocusedSlot] = useAtom(focusedSlotAtom);
    return (
        <Container
            size={'xl'}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}
        >
            <ResearchCard
                ResearchSlots={researchSlots}
                SetResearchSlots={SetResearchSlots}
                slot={0}
                focusedSlot={focusedSlot}
                setFocusedSlot={setFocusedSlot}
            />
            <ResearchCard
                ResearchSlots={researchSlots}
                SetResearchSlots={SetResearchSlots}
                slot={1}
                focusedSlot={focusedSlot}
                setFocusedSlot={setFocusedSlot}
            />
            <ResearchCard
                ResearchSlots={researchSlots}
                SetResearchSlots={SetResearchSlots}
                slot={2}
                focusedSlot={focusedSlot}
                setFocusedSlot={setFocusedSlot}
            />
        </Container>
    );
};
