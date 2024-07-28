import { useState } from 'react'
import '@mantine/core/styles.css'
import { MantineProvider, Button, Box, SimpleGrid, Group, Text } from '@mantine/core';
// import { population } from 'components/Gamedata/Gamedata';
// import { useAtom } from 'jotai';
import { createTerritoryGrid, Territory } from 'shared/worldgen';

const gridSize = 16;
const territoryGrid = createTerritoryGrid(gridSize);

export default function WorldContent() {
  const [selectedTerritory, setSelectedTerritory] = useState(territoryGrid[0][0]);


  return (
    

    <MantineProvider>
      <Group justify="flex-start">
        <Box>
          <SimpleGrid cols={gridSize} spacing="2">
            {territoryGrid.flat().map((territory, index) => (
              <Button key={index} variant="light" color={territory.earth > 0 ? 'green' : 'blue'} size="xs" style={{
                aspectRatio: '1 / 1', 
                width: '2rem',  // Adjust to desired size
                height: '2rem', // Same as width to maintain square shape
                fontSize: '0.75rem',  // Adjust font size for smaller buttons
                padding: 0,  // Remove default padding
              }}
              onClick={() => setSelectedTerritory(territory)}>
                {territory.nature}
              </Button>
            ))}
          </SimpleGrid>
        </Box>
        <Box>
          <Text>
            Coordinates: {selectedTerritory.coordinates[0]}, {selectedTerritory.coordinates[1]}
            <br></br>
            Earth: {selectedTerritory.earth}
            <br></br>
            Fire: {selectedTerritory.fire}
            <br></br>
            Water: {selectedTerritory.water}
            <br></br>
            Nature: {selectedTerritory.nature}
            <br></br>
          </Text>
        </Box>
      </Group>
      
    </MantineProvider>
  )
}