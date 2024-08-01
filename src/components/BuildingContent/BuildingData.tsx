import { Tooltip } from '@mantine/core';
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

export class bonusEffect {
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

export class jobEffect {
    job: string;
    resource: string;
    inoutnew: string;
    bonus: number;
    multiplier: number;
    globalMultiplier: number;
}

export class Building {
    name: string;
    unlocked: boolean;
    tags: string[];
    tooltip: string;
    current: number;
    costResource: costResource[];
    costJob: costJob[];
    bonuseffect?: bonusEffect[];
    input?: increment[];
    output?: increment[];
    resourcemax?: resourceMax[];
    jobmax?: jobMax[];
    jobeffect?: jobEffect[];

    constructor(
        name: string,
        unlocked: boolean,
        tags: string[],
        tooltip: string,
        costResource: costResource[],
        costJob: costJob[],
        bonuseffect?: bonusEffect[],
        input?: increment[],
        output?: increment[],
        resourcemax?: resourceMax[],
        jobmax?: jobMax[],
        jobeffect?: jobEffect[],
    ) {
        this.name = name;
        this.unlocked = unlocked;
        this.tags = tags;
        this.tooltip = tooltip;
        this.current = 0;
        this.costResource = costResource;
        this.costJob = costJob;
        this.bonuseffect = bonuseffect;
        this.input = input;
        this.output = output;
        this.resourcemax = resourcemax;
        this.jobmax = jobmax;
        this.jobeffect = jobeffect;
    }
}

export const buildingListAtom = persistentAtom('buildingListAtom', [
    new Building(
        'House',
        true,
        ['infrastructure', 'population'],
        'Provides home to your people.',
        [
            new costResource('material', 100, 0, 0, 0),
            new costResource('production', 100, 0, 0, 0),
        ],
        [],
        [new bonusEffect('infrastructure', 1, 0, 0, 0)],
        [],
        [],
        [],
        [],
        [],
    ),
    new Building(
        'Template', //Name
        false, //Unlocked
        ['infrastructure', 'population'], //Tags
        'Provides home to your people.', //Tooltip
        [
            new costResource('material', 100, 0, 0, 0),
            new costResource('production', 100, 0, 0, 0),
        ], //Cost
        [], //CostJob
        [new bonusEffect('infrastructure', 1, 0, 0, 0)], //Bonus effect
        [], //Input
        [], //Output
        [], //Resource max
        [], //Job max
        [], //Job effect
    ),
]);
