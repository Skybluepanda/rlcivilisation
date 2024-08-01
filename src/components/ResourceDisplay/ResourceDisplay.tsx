import React from 'react';
import { useAtom, useAtomValue } from 'jotai';
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
    resourceListAtom
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
};

// export const selectedResourcesAtom = persistentAtom('selectedResources', []);
const ResourceDisplay = ({ name, value, maxValue, income, tooltip }) => {
    const Icon = icons[name];
    const DiffIcon = income > 0 ? IconArrowUpRight : IconArrowDownRight;
    // const [selectedResources, setSelectedResources] = useAtom(
    //     selectedResourcesAtom,
    // );

    // const toggleSelection = (name: string) => {
    //     if (selectedResources.includes(name)) {
    //         setSelectedResources(
    //             selectedResources.filter(resource => resource !== name),
    //         );
    //     } else {
    //         setSelectedResources([...selectedResources, name]);
    //     }
    // };
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
                                    0
                                        ? 'default'
                                        : 'dimmed'
                                }
                            >
                                {name}
                            </Text>
                        </Box>
                        <Text>
                            {Math.round(value*10)/10}
                            {maxValue != undefined ? `/${Math.round(maxValue)}` : ''}
                        </Text>
                        <Text c={income > 0 ? 'teal' : income == 0 ? 'gray' : 'red'} fz="sm" fw={500}>
                            <span>
                                {income != undefined ? `${Math.round(income*10)/10}` : ''}
                            </span>
                            <DiffIcon size="1rem" stroke={1.5} />
                        </Text>
                    </Group>
                }
                rightSection={<Icon size="1.4rem" stroke={1.5} color="gray" />}
            ></Button>
        </Tooltip>
    );
};
const ResourceGrid = () => {
    const [resourceAtoms, setResourceAtoms] = useAtom(resourceListAtom);
    console.log(resourceAtoms);
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
                    maxValue={resource.max}
                    income={resource.income}
                    tooltip={resource.tooltip}
                />
            ))}
        </SimpleGrid>
    );
};

export default ResourceGrid;
