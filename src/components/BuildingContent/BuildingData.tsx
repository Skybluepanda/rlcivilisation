import { persistentAtom } from 'hooks/persistentAtom';

export class increment {
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

export class resourceMax {
    resource: string;
    base: number;
    bonus: number;
    multiplier: number;
    globalMultiplier: number;
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
        bonus: number,
        multiplier: number,
        globalMultiplier: number,
    ) {
        this.job = job;
        this.base = base;
        this.bonus = bonus;
        this.multiplier = multiplier;
        this.globalMultiplier = globalMultiplier;
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
    total: number;

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
        this.total = (this.base*this.multiplier + this.bonus)*this.globalMultiplier
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
        workers: number,
        amount: number,
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
        name: string,
        unlocked: boolean,
        tags: string[],
        tooltip: string,
        infrastructureCost: number,
        wealthCost: number,
        costJobs: costJob[],
        bonuseffect?: bonusEffect[],
        resourcemax?: resourceMax[],
        jobmax?: jobMax[],
    ) {
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
        this.construction = new construction(0, []);
    }
}



export const buildingListAtom = persistentAtom('buildingListAtom', [
    new Building(
        'Workshop', //Name
        true, //Unlocked
        ['infrastructure', 'population'], //Tags
        'Workplace for crafters.', //Tooltip
        1, //Infrastructure cost
        100, //Wealth cost
        [new costJob('Builder', 'Production', 1000)], //CostJob
        [new bonusEffect('infrastructure', 1, 0, 0, 0)], //Bonus effect
        [], //Resource max
        [], //Job max
    ),
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
]);
