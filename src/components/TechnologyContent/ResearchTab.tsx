import { useState } from 'react';
import '@mantine/core/styles.css';
import {
    Button,
    Container,
    Grid,
    MantineProvider,
    Paper,
    RingProgress,
    SimpleGrid,
    Text,
    useMantineTheme,
} from '@mantine/core';
import { useAtom } from 'jotai';
import { persistentAtom } from 'hooks/persistentAtom';
import { sprawlAtom, resourceListAtom } from 'components/Gamedata/Gamedata';
import {
    availableTechAtom,
    researchSlotsAtom,
    focusedSlotAtom,
    researchedTechAtom,
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
    Knowledge: IconSchool,
    Progress: IconFlask,
    Innovation: IconBulb,
    Allignment: IconScale,
    World: IconMap,
    Technology: IconApps,
    Population: IconUser,
    Food: IconCarrot,
    Culture: IconCandle,
    Prosperity: IconPeace,
    Satisfaction: IconThumbUp,
    Jobs: IconUsersGroup,
    Tradition: IconMasksTheater,
    Infrastructure: IconHexagon,
    Material: IconPackages,
    Production: IconHammer,
    Efficiency: IconSettings,
    Stability: IconBuildingCastle,
    Buildings: IconBuildingCommunity,
    Economy: IconCoins,
    Military: IconSword,
    Wealth: IconCoin,
    Influence: IconStar,
    Superiority: IconTrophy,
    Authority: IconCrown,
    Diplomacy: IconWorld,
    Government: IconGavel,
};

const Tags = [
    'Inspiration',
    'Knowledge',
    'Progress',
    'Innovation',
    'Allignment',
    'World',
    'Technology',
    'Population',
    'Food',
    'Culture',
    'Prosperity',
    'Satisfaction',
    'Jobs',
    'Tradition',
    'Infrastructure',
    'Material',
    'Production',
    'Efficiency',
    'Stability',
    'Buildings',
    'Economy',
    'Military',
    'Wealth',
    'Influence',
    'Superiority',
    'Authority',
    'Diplomacy',
    'Government',
];

const blue7 = '#1C7ED6';
const blue5 = '#339AF0';
const blue3 = '#74C0FC';
const blue1 = '#D0EBFF';

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
    ],
];

const TierCost = [
    0, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800
]

const RarityCost = [
    0, 10, 15, 25, 40
]

const ResearchCard = ({
    ResearchSlots,
    SetResearchSlots,
    slot,
    focusedSlot,
    setFocusedSlot,
}) => {
    const theme = useMantineTheme();
    const [availableTech, setAvailableTech] = useAtom(availableTechAtom);
    const [researchedTech, setResearchedTech] = useAtom(researchedTechAtom);
    const [sprawl, setSprawl] = useAtom(sprawlAtom);
    const [resource, setResource] = useAtom(resourceListAtom);
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
        if (slot == focusedSlot) {
            setFocusedSlot(-1);
        }
    };
    const SlotTechnology = availableTech.find(
        tech => tech.name == ResearchSlots[slot],
    );
    let CategoryIcon = IconCarrot;
    let RarityIcon = IconCircleNumber0;
    console.log(SlotTechnology);
    if (SlotTechnology) {
        console.log(SlotTechnology.tags);
        console.log(SlotTechnology.category);
        CategoryIcon = Icons[SlotTechnology.category];
        console.log(SlotTechnology.rarity);
        console.log(SlotTechnology.tier);
        RarityIcon =
            GemIcon[SlotTechnology.rarity - 1][SlotTechnology.tier - 1];
    }

    const handleCategoryColor = () => {
        if (focusedSlot == slot) {
            return blue7;
        } else {
            if (focusedSlot != -1) {
                const focusedTech = availableTech.find(
                    tech => tech.name == ResearchSlots[focusedSlot],
                );
                if (focusedSlot == slot) {
                    return blue7;
                } else {
                    if (SlotTechnology.category == focusedTech.category) {
                        return blue7;
                    } else if (focusedTech.tags.includes(SlotTechnology.category)) {
                        return blue5;
                    }
                }
            }
        }
        return;
    };
    const handleTagColor = tag => {
        if (SlotTechnology.tags.includes(tag)) {
            if (focusedSlot != -1) {
                const focusedTech = availableTech.find(
                    tech => tech.name == ResearchSlots[focusedSlot],
                );
                if (focusedSlot == slot) {
                    if (focusedTech.tags.includes(tag)) {
                        return blue7;
                    }
                } else {
                    if (tag == focusedTech.category) {
                        return blue5;
                    } else if (focusedTech.tags.includes(tag)) {
                        return blue3;
                    }
                }
            }
            return;
        }
        return 'gray';
    };

    const handleIncome = () => {
        const income = resource.find(res => res.name == "Progress").income;
        if (focusedSlot == slot) {
            return income
        } else {
            let matchPoint = 0;
            if (focusedSlot != -1) {
                const focusedTech = availableTech.find(
                    tech => tech.name == ResearchSlots[focusedSlot],
                );
                if (SlotTechnology.category == focusedTech.category) {
                    matchPoint += 20;
                } else if (focusedTech.tags.includes(SlotTechnology.category)) {
                    matchPoint += 10;
                }
                SlotTechnology.tags.forEach(tag => {
                    if (focusedTech.tags.includes(tag)) {
                        matchPoint += 5;
                    }
                });
                return income*matchPoint/100
            }
        }
        return 0;
            
    }

    const calculateMaxProgress = () => {
        let discountPoint = 0;
        if (SlotTechnology) {
            researchedTech.forEach(tech => {
                let matchPoint = 1;
                SlotTechnology.category == tech.category ? matchPoint++ : null;
                SlotTechnology.type == tech.type ? matchPoint+=2 : null;
                discountPoint += tech.tier*(RarityCost[tech.rarity]/10)*matchPoint/SlotTechnology.tier;
            });
        }
        const maxProgress = Math.round(Number((Number(TierCost[SlotTechnology.tier])*Number(RarityCost[SlotTechnology.rarity])*100/(100+discountPoint)).toPrecision(3)));
        console.log(maxProgress);
        return maxProgress;
    };Math.ceil((calculateMaxProgress()-SlotTechnology.progress) / handleIncome())

    const handleTurnsLeft = () => {
        if (handleIncome() > 0) {
            const turnsLeft = Math.ceil((calculateMaxProgress()-SlotTechnology.progress) / handleIncome())
            if (turnsLeft <= 1) {
                return "Next Turn"
            } else if ( turnsLeft > 10) {
                return "10+ Turns"
            } else {
                return turnsLeft + " Turns"
            }
        }

    }




    return (
        <>
            {ResearchSlots[slot] == '' ? (
                <Paper withBorder shadow="md">
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
                <Paper withBorder shadow="md" p={'sm'}>
                    <Container w="100%" fluid>
                        <Container
                            fluid
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '6fr 1fr 1fr',

                                paddingBottom: '10px',
                            }}
                            p={0}
                        >
                            <Text
                                size="lg"
                                fw={700}
                                style={{ textAlign: 'left' }}
                                c={focusedSlot == slot ? 'blue.5' : 'white'}
                            >
                                {ResearchSlots[slot]}
                            </Text>
                            <CategoryIcon
                                color={handleCategoryColor()}
                                
                            />
                            <RarityIcon/>
                        </Container>
                        <Container fluid p={'sm'}>
                            <SimpleGrid cols={7}>
                                {Tags.map((tag, index) => {
                                    const TagIcon = Icons[tag];
                                    return (
                                        <TagIcon color={handleTagColor(tag)} />
                                    );
                                })}
                            </SimpleGrid>
                        </Container>
                    </Container>
                    <Container style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <RingProgress
                            roundCaps
                            label={
                                Math.round(SlotTechnology.progress/calculateMaxProgress()*100) + '%'
                            }
                            sections={[
                                {
                                    value: SlotTechnology.progress/calculateMaxProgress(),
                                    color: 'blue',
                                    tooltip: `Current: ${SlotTechnology.progress}`
                                },
                                {
                                    value: handleIncome()/calculateMaxProgress()*100,
                                    color: 'blue.3',
                                    tooltip: `Income: ${handleIncome()}`,
                                },
                                {
                                    value: 100 - SlotTechnology.progress/calculateMaxProgress() - handleIncome()/calculateMaxProgress()*100,
                                    color: 'gray',
                                    tooltip: `Required: ${calculateMaxProgress()}`,
                                }
                            ]}
                        />
                        <Text
                            style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                            
                            >
                            {handleTurnsLeft()}
                        </Text>
                    </Container>
                    

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
