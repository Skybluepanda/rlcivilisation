import React from 'react';
import { SimpleGrid, ScrollArea } from '@mantine/core';
import JobBlock from './JobBlock';
import { useAtom, useAtomValue } from 'jotai';
import { jobListAtom, Job } from 'components/JobsContent/FoodJobData';
//Later add check to see if their max is greater than 0.

const JobContent = () => {
    const jobList = useAtomValue(jobListAtom);
    return (
        <ScrollArea>
            <SimpleGrid cols={4} spacing="5px">
                {jobList.map((job, index) => (
                    <JobBlock key={index} jobName={job.name} />
                ))}
            </SimpleGrid>
        </ScrollArea>
    );
};

export default JobContent;
