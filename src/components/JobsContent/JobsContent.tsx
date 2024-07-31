import React from 'react';
import { SimpleGrid, ScrollArea } from '@mantine/core';
import JobBlock from './JobBlock';
import { useAtom } from 'jotai';
import { builder, crafter, villager, hunter,  Job } from 'components/JobsContent/FoodJobData';


const jobs = [villager, hunter, crafter, builder];
//Later add check to see if their max is greater than 0.

const JobContent = () => {
    return (
        <ScrollArea>
            <SimpleGrid cols={4} spacing="5px">
                {jobs.map((jobAtom, index) => (
                    <JobBlock key={index} jobAtom={jobAtom} jobsList={jobs} />
                ))}
            </SimpleGrid>
        </ScrollArea>
    );
};

export default JobContent;
