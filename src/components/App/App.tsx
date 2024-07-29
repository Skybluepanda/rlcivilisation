import { useState } from 'react'
import '@mantine/core/styles.css'
import { population } from 'components/Gamedata/Gamedata';
import { useAtom } from 'jotai';
import MainGame from 'components/MainGame/MainGame';
import ResourceGrid from 'components/ResourceDisplay/ResourceDisplay';
import { createTheme, MantineProvider, Box } from '@mantine/core';
import ColorSchemeContext from 'shared/ColorSchemeContext';

export default function App() {
  const [colorScheme, setColorScheme] = useState('light');

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, onChange: setColorScheme }}>
      <MantineProvider defaultColorScheme="dark">
          <Box p={"md"}>
          <ResourceGrid />
          <MainGame />
          </Box>
      </MantineProvider>
    </ColorSchemeContext.Provider>
  )
}