import { useState } from 'react'
import '@mantine/core/styles.css'
import { MantineProvider , Box, Paper} from '@mantine/core';
import { useAtom } from 'jotai';

export default function QueueBox() {

  return (
    <MantineProvider>
      <Paper shadow="sm" p="md" withBorder h = "100%">
      <Box>
        Queue Box will be here
      </Box>
      </Paper>

    </MantineProvider>
  )
}


