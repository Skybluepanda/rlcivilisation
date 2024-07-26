import { useState } from 'react'
import '@mantine/core/styles.css'
import { MantineProvider, Button, Box, SimpleGrid, Group } from '@mantine/core';
import { population } from 'components/Gamedata/Gamedata';
import { useAtom } from 'jotai';
import { createTerritoryGrid, printWorldGrid, Territory } from 'shared/worldgen';

const gridSize = 16;
const territoryGrid = createTerritoryGrid(gridSize);



export default function WorldContent() {
  return (
    <MantineProvider>
      <Group justify="left">
        <Box>
          <SimpleGrid cols={gridSize} spacing="2">
            {territoryGrid.flat().map((territory, index) => (
              <Button key={index} variant="light" color={territory.earth > 0 ? 'green' : 'blue'} size="xs" style={{
                aspectRatio: '1 / 1', 
                width: '2rem',  // Adjust to desired size
                height: '2rem', // Same as width to maintain square shape
                fontSize: '0.75rem',  // Adjust font size for smaller buttons
                padding: 0,  // Remove default padding
              }}>
                {territory.fire}
              </Button>
            ))}
          </SimpleGrid>
        </Box>
      </Group>
    </MantineProvider>
  )
}