import { useState } from 'react'
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core';
import { useAtom } from 'jotai';

export default function SituationContent() {

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