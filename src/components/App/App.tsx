import { useState } from 'react'
import '@mantine/core/styles.css'
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
        <Box w={"100vw"} h={"100dvh"}>
          <MainGame />
        </Box>
      </MantineProvider>
    </ColorSchemeContext.Provider>
  )
}