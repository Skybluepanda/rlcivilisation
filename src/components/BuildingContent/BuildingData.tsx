import { Tooltip } from '@mantine/core';
import { stability } from 'components/Gamedata/Gamedata';
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
        globalMultiplier: number
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

export class cost {
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
        globalMultiplier: number
    ) { 
        this.resource = resource;
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
        globalMultiplier: number
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
    tags: string[];
    tooltip: string;
    current: number;
    cost: [];
    input: increment[];
    output: increment[];
    resourcemax: resourceMax[];
    jobmax: jobMax[];
    jobeffect: jobEffect[];
    constructor(
        name: string,
        tags: string[],
        tooltip: string,
        current: number,
        cost: ,
        input: increment[],
        output: increment[],
        resourcemax: resourceMax[],
        jobmax: jobMax[],
        jobeffect: jobEffect[],
    ) {
        this.name = name;
        this.tags = tags;
        this.tooltip = tooltip;
        this.current = current;
        this.cost = cost;
        this.input = input;
        this.output = output;
        this.resourcemax = resourcemax;
        this.jobmax = jobmax;
        this.jobeffect = jobeffect;
    }
}


export const house = persistentAtom('house', 
    new Building(
        'House',
        ['infrastructure', 'population'],
        "Provides home to your people.",
        0,
        [["material", 100],["production", 100]],
        [],
        [],
        [],
        [],
        [],


))