import { persistentAtom } from 'hooks/persistentAtom';
import { useAtom } from 'jotai';

//Forager, Farmer, rancher, Hunter,
//Max Forager, Farmer, Ranger, Hunter
//Job input
//Job output
//Per job input calculation
//Base, base multiplier, bonus, total multiplier, global multiplier(Usually efficiency or prosperity).

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


export class resourceEffect {//Gets increased and decreased by job count
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


export class costResource {
    name: string;
    base: number;
    bonus: number;
    multiplier: number;
    globalMultiplier: number;

    constructor(
        name: string,
        base: number,
        bonus: number,
        multiplier: number,
        globalMultiplier: number,
    ) {
        this.name = name;
        this.base = base;
        this.bonus = bonus;
        this.multiplier = multiplier;
        this.globalMultiplier = globalMultiplier;
    }
}

export class dependent {
    name: string;
    amount: number;
}

export class supplier {
    name: string;
    amount: number;
}


export class Job {
    name: string;
    tags: string[];
    tooltip: string;
    current: number;
    max: number;
    used: number;
    suppliers: supplier[];
    dependents: dependent[];
    input: increment[];
    output: increment[];
    resourceEffect: resourceEffect[];
    constructor(
        name: string,
        tags: string[],
        tooltip: string,
        current: number,
        max: number,
        suppliers: supplier[],
        dependents: dependent[],
        input: increment[],
        output: increment[],
        resourceEffect: resourceEffect[],
    ) {
        this.name = name;
        this.tags = tags;
        this.tooltip = tooltip;
        this.current = current;
        this.max = max;
        this.used = 0;
        this.suppliers = suppliers;
        this.dependents = dependents;
        this.input = input;
        this.output = output;
        this.resourceEffect = resourceEffect;
    }
}

export const jobListAtom = persistentAtom(
    'jobListAtom',[
        new Job(
            'forager',
            ['Food', 'Material'],
            "Forages the wilderness for food and materials.",
            16,
            16,
            [],
            [],
            [new increment('Food', 10, 0, 1, -1)],
            [    
                new increment('Food', 11, 0, 1, 1),
                new increment('Material', 2, 0, 1, 1),
            ],
            [],
        ),
        new Job(
            'villager',
            ['Food', 'Material'],
            "Unspecialised civilians living in a home.",
            0,
            5,
            [],
            [],
            [new increment('Food', 10, 0, 1, -1)],
            [    
                new increment('Food', 5, 0, 1, 1),
                new increment('Material', 1, 0, 1, 1),
                new increment('Knowledge', 1, 0, 1, 1),
                new increment('Wealth', 1, 0, 1, 1),
                new increment('Population', 0.1, 0, 1, 1),
            ],
            [],
        ),
        new Job(
            'hunter',
            ['Food', 'Material'],
            "Hunts animals for food and materials.",
            0,
            5,
            [],
            [],
            [
                new increment('Food', 25, 0, 1, -1),

                new increment('Material', 5, 0, 1, -1),

                new increment('Production', 5, 0, 1, -1),
                
            ],
            [
                new increment('Food', 50, 0, 1, 1),
            ],
            [new resourceEffect('Military', 1, 0, 1, 1)],
        ),
        new Job(
            'crafter',
            ['Material', 'Production'],
            "Crafts tools and items for other workers.",
            0,
            10,
            [],
            [],
            [
                new increment('Food', 10, 0, 1, -1),

                new increment('Material', 10, 0, 1, -1),            
            ],
            [
                new increment('Knowledge', 1, 0, 1, 1),
                new increment('Production', 3, 0, 1, 1),
            ],
            []
        ),
        new Job(
            'builder',
            ['Material', 'Production'],
            "Consumes large amount of material to build structures.",
            0,
            5,
            [],
            [],
            [
                new increment('Food', 20, 0, 1, -1),

                new increment('Material', 25, 0, 1, -1),            
            ],
            [
                new increment('Production', 10, 0, 1, 1),
            ],
            []
        ),
    ],
);