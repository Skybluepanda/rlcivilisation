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