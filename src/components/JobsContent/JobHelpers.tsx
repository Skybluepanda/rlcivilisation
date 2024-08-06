// jobUtils.ts
import { useAtom } from 'jotai';
import { dependent, jobListAtom } from 'components/JobsContent/FoodJobData';
import { increment, Job } from 'components/JobsContent/FoodJobData';


export const calculateTotal = (increment: increment) => {
    return (increment.base * (100+increment.multiplier)/100 + increment.bonus) *
    (100+increment.globalMultiplier)/100;
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
        job.input.forEach(inc => {
            const total =
                (inc.base * (100+inc.multiplier)/100 + inc.bonus) *
                (100+inc.globalMultiplier)/100 *
                (job.current);
            resourceTotals[inc.resource] += total;
        });
        job.output.forEach(inc => {
            const total =
                (inc.base * (100+inc.multiplier)/100 + inc.bonus) *
                (100+inc.globalMultiplier)/100 *
                (job.current - job.used);
            resourceTotals[inc.resource] += total;
        });
    });
    return resourceTotals;
}

export const modifyJobWorkers = (jobs, jobType, change) => {
    return jobs.map((job) => {
        if (job.name === jobType) {
            return { ...job, current: job.current + change };
        } else if (job.name === 'Forager') {
            return { ...job, current: job.current - change };
        }
        return job;
    });
};

export const modifyJobUsed = (jobs, jobType, dependentName, change) => {
    return jobs.map((job) => {
        if (job.name === jobType) {
            const dep = job.dependents.find(dep => dep.name === dependentName);
            if (dep) {
                //If dependent exist change amount.
                //Else make new dependent.
                //If amount reaches 0, remove dependent
                if (dep.amount + change == 0) {
                    return { ...job, used: job.used + change, dependents: job.dependents.filter(dep => dep.name !== dependentName)};
                } else {
                    return { ...job, used: job.used + change, dependents: job.dependents.map(dep => {
                        if (dep.name === dependentName) {
                            return { ...dep, amount: dep.amount + change };
                        }
                        return dep;
                    })};
                }
            } else {
                return {
                    ...job,
                    used: job.used + change,
                    dependents: [...job.dependents, new dependent(dependentName, change)],
                }
            }
            
                
        }
        return job;
    });
}