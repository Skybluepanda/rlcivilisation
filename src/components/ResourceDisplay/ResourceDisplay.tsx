import React from 'react';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { Box, Text, SimpleGrid, MantineProvider } from '@mantine/core';
import {
  turn, inspiration, population, infrastructure, military,
  incPopulation, incInfrastructure, incMilitary, science, food, material, wealth,
  maxScience, maxFood, maxMaterial, maxWealth, incScience, incFood, incMaterial, incWealth,
  progress, tradition, production, influence, incProgress, incTradition, incProduction, incInfluence,
  innovation, prosperity, efficiency, superiority, incInnovation, incProsperity, incEfficiency, incSuperiority,
  corruption, incCorruption, unrest, incUnrest, devastation, incDevastation, empire, incEmpire
} from 'components/Gamedata/Gamedata';

const ResourceDisplay = ({ name, value, maxValue, income }) => {
  let color = 'black';
  if (maxValue && value >= maxValue) {
    color = 'green';
  } else if (value <= 0 || (income && value + income < 0)) {
    color = 'red';
  } else if (maxValue && value + income >= maxValue) {
    color = 'yellow';
  }

  return (
    <Box style={{ display: 'flex', alignItems: 'center' }}>
      <Text style={{ flex: 1 }}>{name}</Text>
      <Text style={{ flex: 1 }} c={color}>
        {value}{maxValue !== undefined ? `/${maxValue}` : ''}
        {income !== undefined && (
          <Text span c={income > 0 ? 'green' : 'red'}>{` (${income > 0 ? '+' : ''}${income})`}</Text>
        )}
      </Text>
    </Box>
  );
};
const ResourceGrid = () => {
  const resourceAtoms = [
    { name: 'Inspiration', value: useAtom(inspiration)[0], income: useAtom(incInfrastructure)[0] },
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
  const columns = [[], [], [], [], []];
  resourceAtoms.forEach((resource, index) => {
    const columnIndex = index % 4;
    columns[columnIndex].push(resource);
  });

  return (
    <SimpleGrid cols={5} spacing="sm">
      {columns.map((column, colIndex) => (
        <Box key={colIndex}>
          {column.map((resource, rowIndex) => (
            <ResourceDisplay
              key={rowIndex}
              name={resource.name}
              value={resource.value}
              maxValue={resource.maxValue}
              income={resource.income}
            />
          ))}
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default ResourceGrid;
