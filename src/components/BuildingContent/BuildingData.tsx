import { persistentAtom } from 'hooks/persistentAtom';
import { useAtom } from 'jotai';
import { useEffect } from 'react';



export class resourceMax {
    resource: string;
    base: number;
    bonus: number;
    multiplier: number;
    globalMultiplier: number;
    constructor(
        resource: string,
        base: number,
    ) {
        this.resource = resource;
        this.base = base;
        this.bonus = 0;
        this.multiplier = 0;
        this.globalMultiplier = 0;
    }
    total() {
        return (this.base*(100+this.multiplier)/100 + this.bonus)*(100+this.globalMultiplier)/100;
    }
}
export class jobMax {
    job: string;
    base: number;
    bonus: number;
    multiplier: number;
    globalMultiplier: number;

    constructor(
        job: string,
        base: number,
    ) {
        this.job = job;
        this.base = base;
        this.bonus = 0;
        this.multiplier = 0;
        this.globalMultiplier = 0;
    }
    total() {
        return (this.base*(100+this.multiplier)/100 + this.bonus)*(100+this.globalMultiplier)/100;
    }
}

export class costResource {
    resource: string;
    base: number;
    bonus: number;
    multiplier: number;
    globalMultiplier: number;

    constructor(
        resource: string,
        base: number,
        bonus: number,
        multiplier: number,
        globalMultiplier: number,
    ) {
        this.resource = resource;
        this.base = base;
        this.bonus = bonus;
        this.multiplier = multiplier;
        this.globalMultiplier = globalMultiplier;
    }
}

export class costJob {
    job: string;
    resource: string;
    amount: number;

    constructor(
        job: string,
        resource: string,
        amount: number,
    ) {
        this.job = job;
        this.resource = resource;
        this.amount = amount;
    }
}

export class bonusEffect {
    resource: string;
    base: number;
    bonus: number;
    multiplier: number;
    globalMultiplier: number;

    constructor(
        resource: string,
        base: number,
    ) {
        this.resource = resource;
        this.base = base;
        this.bonus = 0;
        this.multiplier = 0;
        this.globalMultiplier = 0;
    }
    total() {
        return (this.base*(100+this.multiplier)/100 + this.bonus)*(100+this.globalMultiplier)/100
    }
}

export class progress {
    job: string;
    resource: string;
    workers: number;
    amount: number;
    constructor(
        job: string,
        resource: string,
    ) {
        this.job = job;
        this.resource = resource;
        this.workers = 0
        this.amount = 0;
    }
}


export class construction {
    queued: number;
    progress: progress[];

    constructor(
        queued: number,
        progress: progress[],
    ) {
        this.queued = queued;
        this.progress = progress;
    }
}


export class Building {
    UID: number;
    name: string;
    unlocked: boolean;
    tags: string[];
    tooltip: string;
    built: number;
    infrastructureCost: number;
    wealthCost: number;
    costJobs: costJob[];
    bonuseffect: bonusEffect[];
    resourcemax: resourceMax[];
    jobmax: jobMax[];
    construction: construction;
    constructor(
        UID: number,
        name: string,
        unlocked: boolean,
        tags: string[],
        tooltip: string,
        infrastructureCost: number,
        wealthCost: number,
        costJobs: costJob[],
        construction: construction,
        bonuseffect?: bonusEffect[],
        resourcemax?: resourceMax[],
        jobmax?: jobMax[],
    ) {
        this.UID = UID;
        this.name = name;
        this.unlocked = unlocked;
        this.tags = tags;
        this.tooltip = tooltip;
        this.built = 0;
        this.infrastructureCost = infrastructureCost;
        this.wealthCost = wealthCost;
        this.costJobs = costJobs;
        this.bonuseffect = bonuseffect;
        this.resourcemax = resourcemax;
        this.jobmax = jobmax;
        this.construction = construction;
    }
}

async function loadBuildingsFromJson(jsonPath: string): Promise<Building[]> {
    const response = await fetch(jsonPath);
    const buildingDataList = await response.json();
    let UID = 1
    return buildingDataList.map((buildingData: any) => new Building(
        UID++,
        buildingData.name,
        buildingData.unlocked,
        buildingData.tags,
        buildingData.tooltip,
        buildingData.infrastructureCost,
        buildingData.wealthCost,
        buildingData.costJobs.map((cj: any) => new costJob(cj.job, cj.resource, cj.amount)),
        new construction(
            buildingData.construction.queued,
            buildingData.construction.progress.map((p: any) => new progress(p.job, p.resource))
        ),
        buildingData.bonuseffect?.map((be: any) => new bonusEffect(be.resource, be.base)) || [],
        buildingData.resourcemax?.map((rm: any) => new resourceMax(rm.resource, rm.base)) || [],
        buildingData.jobmax?.map((jm: any) => new jobMax(jm.job, jm.base)) || []
    ));
}

export const buildingListAtom = persistentAtom('buildingListAtom', []);
export const buildingDictionaryAtom = persistentAtom('buildingDictionaryAtom', []);
export const buildingListAdminAtom = persistentAtom('buildingListAdminAtom', []);

export const buildingUnlocker = (buildingList, buildingDict, building:String) => {
    const newBuilding = buildingDict.find(b => b.name === building);
    return [...buildingList, newBuilding];
}

export const useBuildingDictionarLoader = (jsonPath: string) => {
    const [, setBuildingList] = useAtom(buildingDictionaryAtom);

    useEffect(() => {
        async function loadBuildings() {
            const jobs = await loadBuildingsFromJson(jsonPath);
            setBuildingList(jobs);
        }

        loadBuildings();
    }, [jsonPath, setBuildingList]);
};

export const useBuildingListLoaderAdmin = (jsonPath: string) => {
    const [, setBuildingList] = useAtom(buildingListAdminAtom);

    useEffect(() => {
        async function loadBuildings() {
            const jobs = await loadBuildingsFromJson(jsonPath);
            setBuildingList(jobs);
        }

        loadBuildings();
    }, [jsonPath, setBuildingList]);
};

// export const buildingListAtom = persistentAtom('buildingListAtom', [
//     new Building(
//         'Workshop', //Name
//         true, //Unlocked
//         ['infrastructure', 'population'], //Tags
//         'Workplace for crafters.', //Tooltip
//         1, //Infrastructure cost
//         1, //Wealth cost
//         [new costJob('Builder', 'Production', 10)], //CostJob
//         new construction(0, [
//             new progress('Builder', 'Production', 0, 0),
//         ]),
//         [new bonusEffect('Efficiency', 1, 0, 0, 0)], //Bonus effect
//         [], //Resource max
//         [new jobMax("Crafter", 5)], //Job max
//     ), 
    // new Building(
    //     'Template', //Name
    //     false, //Unlocked
    //     ['infrastructure', 'population'], //Tags
    //     'Provides home to your people.', //Tooltip
    //     [
    //         new costResource('material', 100, 0, 0, 0),
    //         new costResource('production', 100, 0, 0, 0),
    //     ], //Cost
    //     [], //CostJob
    //     [new bonusEffect('infrastructure', 1, 0, 0, 0)], //Bonus effect
    //     [], //Resource max
    //     [], //Job max
    // ),
// ]);
