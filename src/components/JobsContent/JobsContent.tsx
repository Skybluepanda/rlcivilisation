import React from 'react';
import { SimpleGrid } from '@mantine/core';
import JobBlock from './JobBlock';
import { useAtom } from 'jotai';
import { forager, hunter, Job } from 'components/JobsContent/FoodJobData';


const jobs = [forager, hunter];

const JobContent = () => {
    return (
        <SimpleGrid cols={4} spacing="5px">
            {jobs.map((jobAtom, index) => (
                <JobBlock key={index} jobAtom={jobAtom} jobsList={jobs} />
            ))}
        </SimpleGrid>
    );
};

export default JobContent;
