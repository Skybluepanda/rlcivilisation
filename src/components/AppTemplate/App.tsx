import { useState } from 'react'
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core';
import { population } from 'components/Gamedata/Gamedata';
import { useAtom } from 'jotai';

export default function App() {
  const [count, setCount] = useAtom(population)

  return (
    <MantineProvider>
      <div>
        <p>
          Hello World {count}
        </p>
        <button onClick={() => setCount((count) => count + 1)} > +1 Pop </button>
      </div>
    </MantineProvider>
  )
}


