import { useState } from 'react'
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core';
import { useAtom } from 'jotai';

//Three major slots.
//List of researched tech

export default function ResearchTab() {
  return (
    <MantineProvider>
      <div>
        <p>
          Hello World
        </p>
      </div>
    </MantineProvider>
  )
}