import { resourceMax, jobMax, bonusEffect } from "./BuildingData";

export const modifyBuildingQueue = (buildings, buildingName, change) => {
    return buildings.map((building) => {
        if (building.name === buildingName) {
            return { ...building, construction: {
                ...building.construction,
                queued: building.construction.queued + change
            } };
        }
        return building;
    });
}

export const calculateRM = (target:resourceMax) => {
    return (target.base * (100+target.multiplier)/100 + target.bonus) *
    (100+target.globalMultiplier)/100;
};

export const calculateJM = (target:jobMax) => {
    return (target.base * (100+target.multiplier)/100 + target.bonus) *
    (100+target.globalMultiplier)/100;
};

export const calculateBE = (target:bonusEffect) => {
    return (target.base * (100+target.multiplier)/100 + target.bonus) *
    (100+target.globalMultiplier)/100;
};
export const modifyConstructionWorkers = (buildings, buildingName,jobName, change) => {
    return buildings.map((building) => {
        if (building.name === buildingName) {
            return { ...building, construction: {
                ...building.construction,
                progress: building.construction.progress.map((progress) => {
                    if (progress.job === jobName) {
                        return { ...progress, workers: progress.workers + change };
                    }
                    return progress;
                })
            } };
        }
        return building;
    });
}