import { persistentAtom } from 'hooks/persistentAtom';

export class increment {
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
        total: number,
    ) {
        this.resource = resource;
        this.base = base;
        this.bonus = bonus;
        this.multiplier = multiplier;
        this.globalMultiplier = globalMultiplier;
        this.total = total;
    }
}

export class resourceMax {
    resource: string;
    base: number;
    bonus: number;
    multiplier: number;
    globalMultiplier: number;
    total: number;
}

export class jobMax {
    job: string;
    base: number;
    bonus: number;
    multiplier: number;
    globalMultiplier: number;
    total: number;

    constructor(
        job: string,
        base: number,
        bonus: number,
        multiplier: number,
        globalMultiplier: number,
        total: number,
    ) {
        this.job = job;
        this.base = base;
        this.bonus = bonus;
        this.multiplier = multiplier;
        this.globalMultiplier = globalMultiplier;
        this.total = total;
    }
}

export class jobEffect {
    job: string;
}