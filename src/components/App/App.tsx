import { useState } from 'react'
import '@mantine/core/styles.css'
import { useAtom } from 'jotai';
import MainGame from 'components/MainGame/MainGame';
import ResourceGrid from 'components/ResourceDisplay/ResourceDisplay';
import { createTheme, MantineProvider, Box, rem } from '@mantine/core';
import ColorSchemeContext from 'shared/ColorSchemeContext';

export default function App() {
  const theme = createTheme ({
    fontFamily: "Roboto",
    fontSizes: {
      xs: rem(12),
      sm: rem(14),
      md: rem(16),
      lg: rem(18),
      xl: rem(20),
      },
  })
  const [colorScheme, setColorScheme] = useState('light');

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, onChange: setColorScheme }}>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <Box w={"100vw"} h={"100dvh"}>
          <MainGame />
        </Box>
      </MantineProvider>
    </ColorSchemeContext.Provider>
  )
}