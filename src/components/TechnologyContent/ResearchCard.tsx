import { useState } from 'react'
import '@mantine/core/styles.css'
import { Button, Container, MantineProvider, Paper, Text } from '@mantine/core';
import { useAtom } from 'jotai';
// import { researchCardsAtom } from './ResearchTab';

//Three major slots.
//List of researched tech

export const ResearchCard = ({slot, name, focus, researchCards, setRC}) => {
  const handleRandom = () => {
    setRC(researchCards.map((value) => (slot === value.slot ? {...value, name: 'Random'} : value)))
  }

  const handleDiscard = () => {
    setRC(researchCards.map((value) => (slot === value.slot ? {...value, name: ''} : value)))
  }
  return (
    <MantineProvider>
      {name == '' ? 
        //Draw buttons
        <Paper withBorder
        shadow="md" p={"md"}>
          <Button variant='default' fullWidth onClick={handleRandom}>
            Random
          </Button>
          <Button variant='default' fullWidth>
            Exploration
          </Button>
          <Button variant='default' fullWidth>
            Expand
          </Button>
          <Button variant='default' fullWidth>
            Exploit
          </Button>
          <Button variant='default' fullWidth>
            Exterminate
          </Button>
        </Paper>
        :
        //Actual research card
        <Paper withBorder
        shadow="md" p={"md"}>
          <Button variant='default' fullWidth>
            {name}
          </Button>
          <Button variant='default'>
            Focus
          </Button>
          <Button variant='default' onClick={handleDiscard} >
            Discard
          </Button>
        </Paper>
        }
    </MantineProvider>
  )
}