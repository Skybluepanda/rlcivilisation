import { useState } from 'react'
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core';
import { useAtom } from 'jotai';


//BuildingContent
//Top will be building queue.
//Draggable build queue objects.
//How do we scale building cost?
//If everything is in a list.
//Construction probably should also be in a list.



export default function BuildingContent() {
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