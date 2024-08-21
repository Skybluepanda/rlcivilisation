import { useState } from 'react'
import '@mantine/core/styles.css'
import { Button, Container, MantineProvider, Paper } from '@mantine/core';
import { useAtom } from 'jotai';
import { persistentAtom } from 'hooks/persistentAtom';
import {ResearchCard} from './ResearchCard';
import { availableTechAtom, researchedTechAtom } from './TechnologyData';

//Three major slots.
//List of researched tech
//What to add as a card... :think:
export const researchCardsAtom = persistentAtom('researchCards', [
  {slot: 1, name: '', focus: false}, {slot: 2, name: '', focus: false}, {slot: 3, name: '', focus: false}
]);

export const ResearchTab = () => {
  const [researchCards, setResearchCards] = useAtom(researchCardsAtom);
  const [availableResearch, setAvailableResearch] = useAtom(availableTechAtom);
  
  const [researchedTech, setResearchedTech] = useAtom(researchedTechAtom);
  return (
    <MantineProvider>
      <Container size={'xl'} style={{display: 'grid', gridTemplateColumns:'1fr 1fr 1fr'}}>
        {researchCards.map((value, index) => (
          <ResearchCard key={index} slot={value.slot} name={value.name} focus={value.focus} researchCards={researchCards} setRC={setResearchCards}/>
        ))}
      </Container>
    </MantineProvider>
  )
}