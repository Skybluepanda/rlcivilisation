import { persistentAtom } from 'hooks/persistentAtom';
import { population } from './Gamedata';
import { useAtom} from 'jotai';

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
    total: number;

    constructor(resource: string, base: number, bonus: number, multiplier: number, globalMultiplier: number, total: number) {
        this.resource = resource;
        this.base = base;
        this.bonus = bonus;
        this.multiplier = multiplier;
        this.globalMultiplier = globalMultiplier;
        this.total = total;
    }
}

export class effect {
    type: number;//0, resource, 1, job, 2, tag, 3 building etc.
    name: string;
    base: number;
    bonus: number;
    multiplier: number;
    globalMultiplier: number;

    constructor(type: number, name: string, base: number, bonus: number, multiplier: number, globalMultiplier: number) {
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
    tags: string[]
    current: number;
    max: number;
    input: increment[];
    output: increment[];
    bonusEffect: effect[];
    constructor(name: string, tags: string[], current: number, max: number, input: increment[], output: increment[], bonusEffect: effect[]) {
        this.name = name;
        this.tags = tags;
        this.current = current;
        this.max = max;
        this.input = input;
        this.output = output;
        this.bonusEffect = bonusEffect;
    }
}

export const forager = persistentAtom("forager", new Job("forager", ["food", "material"], 16, 16, [new increment("food", 10, 0, 1, -1, 0)], [new increment("food", 11, 0, 1, 1, 0), new increment("material", 2, 0, 1, 1, 0), new increment("prosperity", 1, 0, 1, 1, 0)], []));

export const hunter = persistentAtom("hunter", new Job("hunter", ["food", "material"], 0, 0, [new increment("food", 25, 0, 1, -1, 0), new increment("prosperity", -1, 0, 1, 1, 0)], [new increment("food", 50, 0, 1, 1, 0), new increment("material", 2, 0, 1, 1, 0)], [new effect(0, "military", 1, 0, 1, 1)]));
