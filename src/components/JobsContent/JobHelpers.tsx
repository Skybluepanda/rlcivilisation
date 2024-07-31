// jobUtils.ts
import { useAtom } from 'jotai';
import { jobListAtom } from 'components/JobsContent/FoodJobData';
import { increment, Job } from 'components/JobsContent/FoodJobData';


export const calculateTotal = (increment: increment) => {
    (increment.base * increment.multiplier + increment.bonus) *
    increment.globalMultiplier;
};

export const updateResourceIncome = (jobsList: Job[]) => {
    console.log(jobsList);
    const resourceTotals = {
        population: 0,
        infrastructure: 0,
        military: 0,
        knowledge: 0,
        food: 0,
        material: 0,
        wealth: 0,
        progress: 0,
        culture: 0,
        production: 0,
        influence: 0,
        innovation: 0,
        prosperity: 0,
        efficiency: 0,
        superiority: 0,
        allignment: 0,
        satisfaction: 0,
        stability: 0,
        authority: 0,
    };
    jobsList.forEach(job => {
        console.log(job);
        const jobInputOutput = [...job.input, ...job.output];

        jobInputOutput.forEach(inc => {
            const total =
                (inc.base * inc.multiplier + inc.bonus) *
                inc.globalMultiplier *
                job.current;

            console.log(total);
            resourceTotals[inc.resource] += total;

            //Set incResource to total for each resource in gamedata
        });
        console.log(resourceTotals);
    });
    return resourceTotals;
}

export const modifyJobWorkers = (jobs, jobType, change) => {
    return jobs.map((job) => {
        if (job.name === jobType) {
            return { ...job, current: job.current + change };
        } else if (job.name === 'villager') {
            return { ...job, current: job.current - change };
        }
        return job;
    });
};