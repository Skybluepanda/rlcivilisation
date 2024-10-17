import { Resource } from 'components/Gamedata/Gamedata';
import { Building, progress } from 'components/BuildingContent/BuildingData';
import { jobListAtom } from 'components/JobsContent/FoodJobData';
import { useAtom, useAtomValue } from 'jotai';
import { modifyJobUsed } from 'components/JobsContent/JobHelpers';

export const researchUpdate = (resource, setResource, researchSlot, setResearchSlot, focusSlot, setFocusSlot, researchedTech, setResearchedTech, availableTech, setAvailableTech, undiscoveredTech, setUndiscoveredTech, updateTech) => {
    console.log(resource)
    var progress = resource.find(res => res.name == "Progress").value;
    console.log(progress)
    if (progress > 0 ) {
        //Find maxProgress of each slot.
        //Find Focused slot and distribution to each slot.
        //Fine existing progress on the slot.
        //Increase progress up to maximum, store remaining progress for
        //next turn.
        //Check if any slots are at their max.
        //Add the research to researchedSlot
        //UpdateTech
        //Discard the card from the slot.
        const focusMaxProgress = calculateMaxProgress(focusSlot, researchedTech);
        //Need to keep track of max and income of each research slot.
        var slotMaxProgress = [0, 0, 0];
        var slotIncome = [0, 0, 0];
        var slotCurrent = [0, 0, 0];
        
        if (focusSlot != -1) {
            const SlotTechnology = availableTech.find(
                tech => tech.name == researchSlot[focusSlot]
            )
            if (SlotTechnology) {
                slotMaxProgress[focusSlot] = calculateMaxProgress(SlotTechnology, researchedTech);
                slotIncome[focusSlot] = handleIncome(progress, focusSlot, focusSlot, availableTech, researchSlot, SlotTechnology);
                slotCurrent[focusSlot] = SlotTechnology.progress;
            }  
            const remainder = (slotCurrent[focusSlot] + slotIncome[focusSlot]) - slotMaxProgress[focusSlot];
            if (remainder > 0) {setResource(prev => {return prev.map(res => {
                console.log(res)
                if (res.name === "Progress") {
                    return {
                        ...res,
                        value: remainder
                    };
                }
                return res;
                })});
                progress -= remainder;
            } else {
                setResource(prev => {return prev.map(res => {
                    console.log(res)
                    if (res.name === "Progress") {
                        return {
                            ...res,
                            value: 0
                        };
                    }
                    return res;
                    })});
            }
        }
        console.log(progress)
        for (let slotIndex = 0; slotIndex < 3; slotIndex++) {
            const SlotTechnology = availableTech.find(
                tech => tech.name == researchSlot[slotIndex]
            )
            if (SlotTechnology) {
                slotMaxProgress[slotIndex] = calculateMaxProgress(SlotTechnology, researchedTech);
                slotIncome[slotIndex] = handleIncome(progress, slotIndex, focusSlot, availableTech, researchSlot, SlotTechnology);
                slotCurrent[slotIndex] = SlotTechnology.progress;
            }
        }
        console.log(slotMaxProgress)
        console.log(slotCurrent)
        console.log(slotIncome)
        for (let slotIndex = 0; slotIndex < 3; slotIndex++) {
            const SlotTechnology = availableTech.find(
                tech => tech.name == researchSlot[slotIndex]
            )
            console.log(SlotTechnology)
            if (SlotTechnology) {
                if (slotMaxProgress[slotIndex] - (slotCurrent[slotIndex] + slotIncome[slotIndex]) <= 0) {
                    //Tech Researched!! Apply effects.
                    setResearchedTech(prev => 
                        [...prev, SlotTechnology],
                    )
                    setAvailableTech(prev => 
                        prev.filter(tech => tech.name !== SlotTechnology.name))
                    updateTech(researchedTech, availableTech, setAvailableTech, undiscoveredTech, setUndiscoveredTech);
                    researchSlot[slotIndex] = "";
                    if (slotIndex == focusSlot) {
                        setFocusSlot(-1);
                    }
                } else {
                    setAvailableTech(prev => prev.map(tech => tech.name == researchSlot[slotIndex] ? { ...tech, progress: tech.progress + slotIncome[slotIndex] } : tech))
                }
            }
        }
    }
}

const RarityCost = [
    0, 10, 15, 25, 40
]

const TierCost = [
    0, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800
]

const calculateMaxProgress = (SlotTechnology, researchedTech) => {
    let discountPoint = 0;
    if (SlotTechnology) {
        researchedTech.forEach(tech => {
            let matchPoint = 1;
            SlotTechnology.category == tech.category ? matchPoint++ : null;
            SlotTechnology.type == tech.type ? matchPoint+=2 : null;
            discountPoint += tech.tier*(RarityCost[tech.rarity]/10)*matchPoint/SlotTechnology.tier;
        });
        const maxProgress = Math.round(Number((Number(TierCost[SlotTechnology.tier])*Number(RarityCost[SlotTechnology.rarity])*100/(100+discountPoint)).toPrecision(3)));
        console.log(maxProgress);
        return maxProgress;
    }
    return;
    
};

const handleIncome = (income, slot, focusedSlot, availableTech, ResearchSlots, SlotTechnology ) => {
    if (focusedSlot == slot) {
        return income
    } else {
        let matchPoint = 0;
        if (focusedSlot != -1) {
            const focusedTech = availableTech.find(
                tech => tech.name == ResearchSlots[focusedSlot],
            );
            if (SlotTechnology.category == focusedTech.category) {
                matchPoint += 20;
            } else if (focusedTech.tags.includes(SlotTechnology.category)) {
                matchPoint += 10;
            }
            SlotTechnology.tags.forEach(tag => {
                if (focusedTech.tags.includes(tag)) {
                    matchPoint += 5;
                }
            });
            return Math.round(income*matchPoint/10)/10
        }
    }
    return 0;
}

export const resourceUpdate = resources => {
    return resources.map((resource: Resource) => {
        let newValue = resource.value + resource.income;
        if (resource.name == "Infrastructure") {
            return { ...resource, value: resource.value + resource.income, max: resource.max + resource.income };
        } else if (resource.max == undefined) {
            return { ...resource, value: resource.value + resource.income };
        } else {
            return { ...resource, value: Math.min(newValue, resource.max) };
        }
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

export const buildingListUpdate = (
    buildingList,
    jobList,
    setJobList
) => {
    const totalBuilt = {"built":false};
    return [buildingList.map(building => {
        if (building.construction.queued > 0) {
            let buildingProgresses = constructionProgress(building, jobList);
            while (true) {
                if (building.construction.queued == 0) {
                    building.construction.progress.forEach(progress =>
                        setJobList(prevJobs =>
                            modifyJobUsed(
                                prevJobs,
                                progress.job,
                                building.name + ' (Construction)',
                                -progress.workers,
                            ),
                        ),
                    );
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
                    totalBuilt["built"] = true;
                    if (totalBuilt[building.name]) {
                        totalBuilt[building.name] += 1;
                    } else {
                        totalBuilt[building.name] = 1;
                    }
                    buildingProgresses = buildingComplete(
                        buildingProgresses,
                        building,
                    );
                    building = {
                        ...building,
                        built: building.built + 1,
                        construction: {
                            ...building.construction,
                            progress: buildingProgresses,
                            queued: building.construction.queued - 1,
                        },
                    };
                    //Just do bonusEffects.
                } else {
                    return building;
                }
            }
        } else {
            return building;
        }
    }), totalBuilt];
};

export const constructionProgress = (building: Building, jobList) => {
    return building.construction.progress.map(progress => {
        if (progress.workers > 0) {
            const constructor = jobList.find(job => job.name === progress.job);
            const constructorOutput = constructor.output.find(
                inc => inc.resource === progress.resource,
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
                    progress.workers * constructorOutput.total(),
            };
        } else {
            return progress;
        }
    });
};

export const buildingComplete = (
    progresses: progress[],
    building: Building,
) => {
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
            amount: progress.amount - progressCost.amount,
        };
    });
};

export const buildingJobMaxUpdate = (jobList, builtList, buildings) => {
    return jobList.map(job => {
        let total = 0;
        for (let [buildingName, quantity] of Object.entries(builtList)) {
            const building = buildings.find(building => building.name === buildingName);
            building.jobmax.forEach(jobMax => {
                if (jobMax.job === job.name) {
                    total += jobMax.total()*Number(quantity);
                }
            })
        }
        return {...job, max: job.max+total};
    });
    
    

};
export const buildingResourceMaxUpdate = (resources, builtList, buildings) => {
    return resources.map(resource => {
        let maxIncrease = 0;
        let valueIncrease = 0;
        for (let [buildingName, quantity] of Object.entries(builtList)) {
            const building = buildings.find(building => building.name === buildingName);
            if (resource.max != undefined) {
                building.resourcemax.forEach(rmax => {
                    if (rmax.resource === resource.name) {
                        maxIncrease += rmax.total()*Number(quantity);
                    }
                })
            }
            building.bonuseffect.forEach(bfx => {
                if (bfx.resource === resource.name) {
                    valueIncrease += bfx.total()*Number(quantity);
                }
            })
        }
        if (resource.max != undefined) {
            resource = {...resource, max: resource.max+maxIncrease};
        }
        return {...resource, value: resource.value+valueIncrease};            
    });
    
};