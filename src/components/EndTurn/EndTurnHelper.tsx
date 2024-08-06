import { Resource } from 'components/Gamedata/Gamedata';
import { Building, progress } from 'components/BuildingContent/BuildingData';
import { jobListAtom } from 'components/JobsContent/FoodJobData';
import { useAtom, useAtomValue } from 'jotai';
import { modifyJobUsed } from 'components/JobsContent/JobHelpers';

export const resourceUpdate = resources => {
    return resources.map((resource: Resource) => {
        return { ...resource, value: resource.value + resource.income };
    });
};
export const jobListUpdate = (jobList, populationChange) => {
    return jobList.map(job => {
        if (job.name === 'Forager') {
            return { ...job, current: job.current + populationChange };
        }
        return job;
    });
};

export const buildingListUpdate = (buildingList, jobList, setJobList) => {
    return buildingList.map(building => {
        if (building.construction.queued > 0) {
            let buildingProgresses = constructionProgress(building, jobList)
            while (true) {
                if (building.construction.queued == 0) {
                    building.construction.progress.forEach(progress =>
                        setJobList(modifyJobUsed(jobList, progress.job, building.name + " (Construction)", -progress.workers))
                    )
                    //Release all workers! Leftover materials added to storage.
                    building.construction.progress.map(progress => {
                        progress.workers = 0;
                    });
                    return building;
                }
                let complete = true;
                buildingProgresses.forEach(progress => {
                    const progressCost = building.costJobs.find(
                        costJob => costJob.job === progress.job,
                    );
                    if (progress.amount < progressCost.amount) {
                        complete = false;
                    }
                });
                if (complete) {
                    //Increase built by 1, reduce progress by cost. Reduce queue by 1.
                    buildingProgresses = buildingComplete(buildingProgresses, building)
                    building = {
                        ...building, built: building.built + 1,
                        construction: {
                            ...building.construction,
                            progress: buildingProgresses,
                            queued: building.construction.queued - 1,
                        },
                    }

                } else {
                    return building;
                }
            }
                
        } else {
            return building;
        }
    });
};

export const constructionProgress = (building: Building, jobList) => {
    return building.construction.progress.map(progress => {
        if (progress.workers > 0) {
            const constructor = jobList.find(job => job.name === progress.job);
            const constructorOutput = constructor.output.find(
                inc => inc.resource === progress.resource
            );
            const progressCost = building.costJobs.find(
                costJob => costJob.job === progress.job,
            );
            if (building.construction.queued == 1) {
                
            }
            return {
                ...progress,
                amount:
                    progress.amount +
                    progress.workers * constructorOutput.total,
            };
        } else {
            return progress;
        }
    });
};

export const buildingComplete = (progresses: progress[], building:Building) => {
    return progresses.map(progress => {
        //Increase amount by workers*output.
        //If at max of the resource and queue is 1, return workers at the end.
        //Else keep the workers
        //If all progress is max, reduce queue by 1, increase building by 1. Process building events.
        const progressCost = building.costJobs.find(
            costJob => costJob.job === progress.job,
        );
        return {
            ...progress,
            amount:
                progress.amount - progressCost.amount
        };
    });

}