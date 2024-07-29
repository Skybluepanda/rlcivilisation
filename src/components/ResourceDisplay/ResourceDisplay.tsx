import React from 'react';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { Box, Text, SimpleGrid, MantineProvider, Paper, Group, Button, } from '@mantine/core';
import { persistentAtom } from 'hooks/persistentAtom';
import {
  turn, inspiration, population, infrastructure, military,
  incPopulation, incInfrastructure, incMilitary, science, food, material, wealth,
  maxScience, maxFood, maxMaterial, maxWealth, incScience, incFood, incMaterial, incWealth,
  progress, tradition, production, influence, incProgress, incTradition, incProduction, incInfluence,
  innovation, prosperity, efficiency, superiority, incInnovation, incProsperity, incEfficiency, incSuperiority,
  corruption, incCorruption, unrest, incUnrest, devastation, incDevastation, empire, incEmpire
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
  IconCrown,
  IconVirus,
  IconFlame,
  IconSkull,
  IconBuildingCastle,
  IconArrowUpRight,
  IconArrowDownRight
} from '@tabler/icons-react';



const icons = {
  "Inspiration": IconHourglass,
  "Population": IconUser,
  "Infrastructure": IconHexagon,
  "Military": IconSword,
  "Science": IconSchool,
  "Food": IconCarrot,
  "Material": IconPackages,
  "Wealth": IconCoin,
  "Progress": IconFlask,
  "Tradition": IconCandle,
  "Production": IconHammer,
  "Influence": IconStar,
  "Innovation": IconBulb,
  "Prosperity": IconPeace,
  "Efficiency": IconSettings,
  "Superiority": IconCrown,
  "Corruption": IconVirus,
  "Unrest": IconFlame,
  "Devastation": IconSkull,
  "Empire": IconBuildingCastle,
};

export const selectedResourcesAtom = persistentAtom("selectedResources", []);
const ResourceDisplay = ({ name, value, maxValue, income }) => {
  const Icon = icons[name];
  const DiffIcon = income > 0 ? IconArrowUpRight : IconArrowDownRight;
  const [selectedResources, setSelectedResources] = useAtom(selectedResourcesAtom);

  const toggleSelection = (name: string) => {
    if (selectedResources.includes(name)) {
      setSelectedResources(selectedResources.filter(resource => resource !== name));
    } else {
      setSelectedResources([...selectedResources, name]);
    }
  };

  

  return (
    <Button variant="default" justify='space-between' leftSection={<Group justify='space-between'>
      <Box w={100}>
        <Text size="md" c={selectedResources.includes(name) ? 'default' : 'dimmed'}>
          {name}
        </Text>
      </Box>
      
      <Text >
        {value}
        {maxValue != undefined ? `/${maxValue}` : ''}
      </Text>
      <Text c={income > 0 ? 'teal' : 'red'} fz="sm" fw={500}>
        <span>{income != undefined ? `${income}` : ''}</span>
        <DiffIcon size="1rem" stroke={1.5} />
      </Text>
    </Group>} 
    rightSection={<Icon size="1.4rem" stroke={1.5} color="gray"/>} onClick={() => toggleSelection(name)}>
    </Button>
  );
};
const ResourceGrid = () => {
  const resourceAtoms = [
    { name: 'Inspiration', value: useAtom(inspiration)[0]},
    { name: 'Population', value: useAtom(population)[0], income: useAtom(incPopulation)[0] },
    { name: 'Infrastructure', value: useAtom(infrastructure)[0], income: useAtom(incInfrastructure)[0] },
    { name: 'Military', value: useAtom(military)[0], income: useAtom(incMilitary)[0] },
    { name: 'Science', value: useAtom(science)[0], maxValue: useAtom(maxScience)[0], income: useAtom(incScience)[0] },
    { name: 'Food', value: useAtom(food)[0], maxValue: useAtom(maxFood)[0], income: useAtom(incFood)[0] },
    { name: 'Material', value: useAtom(material)[0], maxValue: useAtom(maxMaterial)[0], income: useAtom(incMaterial)[0] },
    { name: 'Wealth', value: useAtom(wealth)[0], maxValue: useAtom(maxWealth)[0], income: useAtom(incWealth)[0] },
    { name: 'Progress', value: useAtom(progress)[0], income: useAtom(incProgress)[0] },
    { name: 'Tradition', value: useAtom(tradition)[0], income: useAtom(incTradition)[0] },
    { name: 'Production', value: useAtom(production)[0], income: useAtom(incProduction)[0] },
    { name: 'Influence', value: useAtom(influence)[0], income: useAtom(incInfluence)[0] },
    { name: 'Innovation', value: useAtom(innovation)[0], income: useAtom(incInnovation)[0] },
    { name: 'Prosperity', value: useAtom(prosperity)[0], income: useAtom(incProsperity)[0] },
    { name: 'Efficiency', value: useAtom(efficiency)[0], income: useAtom(incEfficiency)[0] },
    { name: 'Superiority', value: useAtom(superiority)[0], income: useAtom(incSuperiority)[0] },
    { name: 'Corruption', value: useAtom(corruption)[0], income: useAtom(incCorruption)[0] },
    { name: 'Unrest', value: useAtom(unrest)[0], income: useAtom(incUnrest)[0] },
    { name: 'Devastation', value: useAtom(devastation)[0], income: useAtom(incDevastation)[0] },
    { name: 'Empire', value: useAtom(empire)[0], income: useAtom(incEmpire)[0] }
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
        />
      ))}
    </SimpleGrid>
  );
};

export default ResourceGrid;
