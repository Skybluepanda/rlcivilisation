import { useState } from 'react'
import '@mantine/core/styles.css'
import { MantineProvider, Button, Box, SimpleGrid, Group, Text } from '@mantine/core';
import { createTerritoryGrid } from 'shared/worldgen';
import { persistentAtom } from 'hooks/persistentAtom';
import { useAtom } from 'jotai';


export const territoryGridAtom = persistentAtom('territoryGrid', createTerritoryGrid(16));
export const selectedTerritoryAtom = persistentAtom('selectedTerritory', null);
export const gameStartedAtom = persistentAtom("gameStarted", false);

function findPlayer(territoryGrid, gridSize) {
  let x = 0;
  let y = 0;
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      if (territoryGrid[x][y].expand == 100) {
        return [x, y]
      }
    }
  }
}


export default function WorldContent() {
  const gridSize = 16;
  const [gameStarted, setGameStarted] = useAtom(gameStartedAtom);
  const [territoryGrid, setTerritoryGrid] = useAtom(territoryGridAtom);
  const [player, setPlayer] = useState(findPlayer(territoryGrid, gridSize));
  const [selectedTerritory, setSelectedTerritory] = useState(territoryGrid[player[0]][player[1]]);

  const handleReroll = () => {
    const newTerritoryGrid = createTerritoryGrid(gridSize);
    const newPlayer = findPlayer(newTerritoryGrid, gridSize);
    setTerritoryGrid(newTerritoryGrid);
    setPlayer(newPlayer);
    setSelectedTerritory(newTerritoryGrid[newPlayer[0]][newPlayer[1]]);
  }

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <MantineProvider>
      <Group justify="flex-start">
        <Box>
          <SimpleGrid cols={gridSize} spacing="2">
            {territoryGrid.flat().map((territory, index) => (
              <Button key={index} variant="light" color={territory.explore == 0 ? 'gray' : territory.earth > 0 ? 'green' : 'blue'} size="xs" style={{
                aspectRatio: '1 / 1',
                width: '2rem',  // Adjust to desired size
                height: '2rem', // Same as width to maintain square shape
                fontSize: '0.75rem',  // Adjust font size for smaller buttons
                padding: 0,  // Remove default padding
              }}
                onClick={() => setSelectedTerritory(territory)}>
                {territory.expand == 100 ? "X" : ""}
              </Button>
            ))}
          </SimpleGrid>
        </Box>
        <Box>
          {!gameStarted ? (
            <Box>

              <Button onClick={handleReroll}>Reroll</Button>
              <Button onClick={handleStartGame}>Start Game</Button>
            </Box>) : null
          }

          <Text>
            Coordinates: {selectedTerritory.coordinates[0]}, {selectedTerritory.coordinates[1]}
            <br></br>
            Earth: {selectedTerritory.explore == 0 ? "Unexplored" : selectedTerritory.earth}
            <br></br>
            Fire: {selectedTerritory.explore == 0 ? "Unexplored" : selectedTerritory.fire}
            <br></br>
            Water: {selectedTerritory.explore == 0 ? "Unexplored" : selectedTerritory.water}
            <br></br>
            Nature: {selectedTerritory.explore == 0 ? "Unexplored" : selectedTerritory.nature}
            <br></br>
          </Text>
        </Box>
      </Group>

    </MantineProvider>
  )
}