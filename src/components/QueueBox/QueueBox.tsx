import { useState } from 'react'
import '@mantine/core/styles.css'
import { MantineProvider , Box, Paper} from '@mantine/core';
import { useAtom } from 'jotai';

export default function QueueBox() {

  return (
    <MantineProvider>
      <Paper shadow="sm" p="md" withBorder w={"20vw"}>
      <Box>
        Queue Box will be here
      </Box>
      </Paper>

    </MantineProvider>
  )
}


