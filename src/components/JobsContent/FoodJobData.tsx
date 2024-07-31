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

export class effect {
    type: number; //0, resource, 1, job, 2, tag, 3 building etc.
    name: string;
    base: number;
    bonus: number;
    multiplier: number;
    globalMultiplier: number;

    constructor(
        type: number,
        name: string,
        base: number,
        bonus: number,
        multiplier: number,
        globalMultiplier: number,
    ) {
        this.type = type;
        this.name = name;
        this.base = base;
        this.bonus = bonus;
        this.multiplier = multiplier;
        this.globalMultiplier = globalMultiplier;
    }
}

export class Job {
    name: string;
    tags: string[];
    tooltip: string;
    current: number;
    max: number;
    input: increment[];
    output: increment[];
    bonusEffect: effect[];
    constructor(
        name: string,
        tags: string[],
        tooltip: string,
        current: number,
        max: number,
        input: increment[],
        output: increment[],
        bonusEffect: effect[],
    ) {
        this.name = name;
        this.tags = tags;
        this.tooltip = tooltip;
        this.current = current;
        this.max = max;
        this.input = input;
        this.output = output;
        this.bonusEffect = bonusEffect;
    }
}

export const jobListAtom = persistentAtom(
    'jobListAtom',[
        new Job(
            'villager',
            ['Food', 'Material'],
            "Forages the wilderness for food and materials.",
            16,
            16,
            [new increment('Food', 10, 0, 1, -1)],
            [    
                new increment('Food', 11, 0, 1, 1),
                new increment('Material', 2, 0, 1, 1),
            ],
            [],
        ),
        new Job(
            'hunter',
            ['Food', 'Material'],
            "Hunts animals for food and materials.",
            0,
            5,
            [
                new increment('Food', 25, 0, 1, -1),

                new increment('Material', 5, 0, 1, -1),

                new increment('Production', 5, 0, 1, -1),
                
            ],
            [
                new increment('Food', 50, 0, 1, 1),
            ],
            [new effect(0, 'Military', 1, 0, 1, 1)],
        ),
        new Job(
            'crafter',
            ['Material', 'Production'],
            "Crafts tools and items for other workers.",
            0,
            10,
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