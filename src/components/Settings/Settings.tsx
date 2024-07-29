import React from 'react';
import { useMantineColorScheme, ActionIcon, Button, Group } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import ColorSchemeContext from 'shared/ColorSchemeContext';
import {useContext} from 'react';

export default function Settings() {
  const { setColorScheme, clearColorScheme } = useMantineColorScheme();

  return (
    <Group>
      <Button onClick={() => setColorScheme('light')}>Light</Button>
      <Button onClick={() => setColorScheme('dark')}>Dark</Button>
      <Button onClick={() => setColorScheme('auto')}>Auto</Button>
      <Button onClick={clearColorScheme}>Clear</Button>
    </Group>
  );
}