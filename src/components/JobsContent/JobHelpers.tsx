// jobUtils.ts
import { useAtom } from 'jotai';
import { jobListAtom } from 'components/JobsContent/FoodJobData';
import { increment, Job } from 'components/JobsContent/FoodJobData';


export const calculateTotal = (increment: increment) => {
    return (increment.base * increment.multiplier + increment.bonus) *
    increment.globalMultiplier;
};

export const updateResourceIncome = (jobsList: Job[]) => {
    const resourceTotals = {
        Inspiration: -1,
        Population: 0,
        Infrastructure: 0,
        Military: 0,
        Knowledge: 0,
        Food: 0,
        Material: 0,
        Wealth: 0,
        Progress: 0,
        Culture: 0,
        Production: 0,
        Influence: 0,
        Innovation: 0,
        Prosperity: 0,
        Efficiency: 0,
        Superiority: 0,
        Allignment: 0,
        Satisfaction: 0,
        Stability: 0,
        Authority: 0,
    };
    jobsList.forEach(job => {
        const jobInputOutput = [...job.input, ...job.output];

        jobInputOutput.forEach(inc => {
            const total =
                (inc.base * inc.multiplier + inc.bonus) *
                inc.globalMultiplier *
                job.current;
            resourceTotals[inc.resource] += total;

            //Set incResource to total for each resource in gamedata
        });
    });
    return resourceTotals;
}

export const modifyJobWorkers = (jobs, jobType, change) => {
    return jobs.map((job) => {
        if (job.name === jobType) {
            return { ...job, current: job.current + change };
        } else if (job.name === 'forager') {
            return { ...job, current: job.current - change };
        }
        return job;
    });
};