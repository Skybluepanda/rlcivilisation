import React from 'react';
import { useAtom } from 'jotai';
import { useState } from 'react';
import {
    Box,
    Text,
    SimpleGrid,
    MantineProvider,
    Paper,
    Group,
    Button,
    Tooltip,
} from '@mantine/core';
import { persistentAtom } from 'hooks/persistentAtom';
import {
    turn,
    inspiration,
    population,
    infrastructure,
    military,
    incPopulation,
    incInfrastructure,
    incMilitary,
    knowledge,
    food,
    material,
    wealth,
    maxKnowledge,
    maxFood,
    maxMaterial,
    maxWealth,
    incKnowledge,
    incFood,
    incMaterial,
    incWealth,
    progress,
    tradition,
    production,
    influence,
    incProgress,
    incTradition,
    incProduction,
    incInfluence,
    innovation,
    prosperity,
    efficiency,
    superiority,
    incInnovation,
    incProsperity,
    incEfficiency,
    incSuperiority,
    allignment,
    incAllignment,
    satisfaction,
    incSatisfaction,
    stability,
    incStability,
    authority,
    incAuthority,
} from 'components/Gamedata/Gamedata';
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
} from '@tabler/icons-react';

const icons = {
    Inspiration: IconHourglass,
    Population: IconUser,
    Infrastructure: IconHexagon,
    Military: IconSword,
    Knowledge: IconSchool,
    Food: IconCarrot,
    Material: IconPackages,
    Wealth: IconCoin,
    Progress: IconFlask,
    Tradition: IconCandle,
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
};

export const selectedResourcesAtom = persistentAtom('selectedResources', []);
const ResourceDisplay = ({ name, value, maxValue, income, tooltip }) => {
    const Icon = icons[name];
    const DiffIcon = income > 0 ? IconArrowUpRight : IconArrowDownRight;
    const [selectedResources, setSelectedResources] = useAtom(
        selectedResourcesAtom,
    );

    const toggleSelection = (name: string) => {
        if (selectedResources.includes(name)) {
            setSelectedResources(
                selectedResources.filter(resource => resource !== name),
            );
        } else {
            setSelectedResources([...selectedResources, name]);
        }
    };
    return (
        <Tooltip
            position="bottom"
            multiline
            w={300}
            transitionProps={{ transition: 'pop', duration: 300 }}
            label={<Text>{tooltip}</Text>}
        >
            <Button
                variant="default"
                justify="space-between"
                leftSection={
                    <Group justify="space-between">
                        <Box w={100}>
                            <Text
                                size="md"
                                c={
                                    selectedResources.includes(name)
                                        ? 'default'
                                        : 'dimmed'
                                }
                            >
                                {name}
                            </Text>
                        </Box>
                        <Text>
                            {value}
                            {maxValue != undefined ? `/${maxValue}` : ''}
                        </Text>
                        <Text c={income > 0 ? 'teal' : income == 0 ? 'gray' : 'red'} fz="sm" fw={500}>
                            <span>
                                {income != undefined ? `${income}` : ''}
                            </span>
                            <DiffIcon size="1rem" stroke={1.5} />
                        </Text>
                    </Group>
                }
                rightSection={<Icon size="1.4rem" stroke={1.5} color="gray" />}
                onClick={() => toggleSelection(name)}
            ></Button>
        </Tooltip>
    );
};
const ResourceGrid = () => {
    const resourceAtoms = [
        {
            name: 'Inspiration',
            value: useAtom(inspiration)[0],
            tooltip:
                'Number of turns you can play. Gain inspiration every 8 minutes.',
        },
        {
            name: 'Population',
            value: useAtom(population)[0],
            income: useAtom(incPopulation)[0],
            tooltip:
                'Number of people you have. Population grows by 2.5% of current population. Prosperity affects population growth rate.',
        },
        {
            name: 'Infrastructure',
            value: useAtom(infrastructure)[0],
            income: useAtom(incInfrastructure)[0],
            tooltip:
                'Number of infrastructure you have. Infrastructure can be increased by annexing land or constructing housing.',
        },
        {
            name: 'Military',
            value: useAtom(military)[0],
            income: useAtom(incMilitary)[0],
            tooltip:
                "Number demonstrating your empire's defensive military power. Certain jobs and buildings increase Military",
        },
        {
            name: 'Knowledge',
            value: useAtom(knowledge)[0],
            maxValue: useAtom(maxKnowledge)[0],
            income: useAtom(incKnowledge)[0],
            tooltip:
                'Knowledge is a collective resource for providing technology or advanced materials.',
        },
        {
            name: 'Food',
            value: useAtom(food)[0],
            maxValue: useAtom(maxFood)[0],
            income: useAtom(incFood)[0],
            tooltip: 'Food is a neccesary resource to sustain your population.',
        },
        {
            name: 'Material',
            value: useAtom(material)[0],
            maxValue: useAtom(maxMaterial)[0],
            income: useAtom(incMaterial)[0],
            tooltip:
                'Material is a collective resource that is used for everything physical.',
        },
        {
            name: 'Wealth',
            value: useAtom(wealth)[0],
            maxValue: useAtom(maxWealth)[0],
            income: useAtom(incWealth)[0],
            tooltip:
                'Wealth is a monetary resource that is used for everything financial.',
        },
        {
            name: 'Progress',
            value: useAtom(progress)[0],
            income: useAtom(incProgress)[0],
            tooltip:
                'Progress is an abstract resource, used for advancement in understanding of the universe.',
        },
        {
            name: 'Tradition',
            value: useAtom(tradition)[0],
            income: useAtom(incTradition)[0],
            tooltip:
                "Tradition is an abstract resource, used for developement of your empire's identity.",
        },
        {
            name: 'Production',
            value: useAtom(production)[0],
            income: useAtom(incProduction)[0],
            tooltip:
                'Production is a collective resource that is used for building and producing anything.',
        },
        {
            name: 'Influence',
            value: useAtom(influence)[0],
            income: useAtom(incInfluence)[0],
            tooltip:
                'Influence is an abstract resource, used for governmnet actions.',
        },
        {
            name: 'Innovation',
            value: useAtom(innovation)[0],
            income: useAtom(incInnovation)[0],
            tooltip:
                "Innovation is a measure of your empire's ability to explore and learn.",
        },
        {
            name: 'Prosperity',
            value: useAtom(prosperity)[0],
            income: useAtom(incProsperity)[0],
            tooltip:
                "Prosperity is a measure of your empire's ability to expand and grow.",
        },
        {
            name: 'Efficiency',
            value: useAtom(efficiency)[0],
            income: useAtom(incEfficiency)[0],
            tooltip:
                "Efficiency is a measure of your empire's ability to exploit and operate.",
        },
        {
            name: 'Superiority',
            value: useAtom(superiority)[0],
            income: useAtom(incSuperiority)[0],
            tooltip:
                "Superiority is a measure of your empire's ability to dominate and control.",
        },
        {
            name: 'Allignment',
            value: useAtom(allignment)[0],
            income: useAtom(incAllignment)[0],
            tooltip:
                "Allignment is the world's judgement of your empire's actions.",
        },
        {
            name: 'Satisfaction',
            value: useAtom(satisfaction)[0],
            income: useAtom(incSatisfaction)[0],
            tooltip:
                "Satisfaction is your population's opinion of your actions and the empire.",
        },
        {
            name: 'Stability',
            value: useAtom(stability)[0],
            income: useAtom(incStability)[0],
            tooltip:
                "Stability is measure of your empire's balance and maintainability. ",
        },
        {
            name: 'Authority',
            value: useAtom(authority)[0],
            income: useAtom(incAuthority)[0],
            tooltip:
                'Authority is measure of your control over your own empire.',
        },
    ];
    const rows = 4;
    const cols = 5;
    const grid = Array.from({ length: rows }, () => []);

    resourceAtoms.forEach((resource, index) => {
        const rowIndex = index % rows;
        grid[rowIndex].push(resource);
    });

    return (
        <SimpleGrid cols={cols} spacing={5}>
            {grid.flat().map((resource, index) => (
                <ResourceDisplay
                    key={index}
                    name={resource.name}
                    value={resource.value}
                    maxValue={resource.maxValue}
                    income={resource.income}
                    tooltip={resource.tooltip}
                />
            ))}
        </SimpleGrid>
    );
};

export default ResourceGrid;
