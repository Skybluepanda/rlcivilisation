
import '@mantine/core/styles.css';
import { persistentAtom } from 'hooks/persistentAtom';

export const turn = persistentAtom("turn", 0);


export const inspiration = persistentAtom("inspiration", 100);
export const population = persistentAtom("population", 16);
export const infrastructure = persistentAtom("infrastructure", 24);
export const military = persistentAtom("military", 0);


export const incPopulation = persistentAtom("incPopulation", 0);
export const incInfrastructure = persistentAtom("incInfrastructure", 0);
export const incMilitary = persistentAtom("incMilitary", 0);

export const knowledge = persistentAtom("knowledge", 0);
export const food = persistentAtom("food", 0);
export const material = persistentAtom("material", 0);
export const wealth = persistentAtom("wealth", 0);


export const maxKnowledge = persistentAtom("maxKnowledge", 100);
export const maxFood = persistentAtom("maxFood", 100);
export const maxMaterial = persistentAtom("maxMaterial", 100);
export const maxWealth = persistentAtom("maxWealth", 100);

export const incKnowledge = persistentAtom("incKnowledge", 0);
export const incFood = persistentAtom("incFood", 0);
export const incMaterial = persistentAtom("incMaterial", 0);
export const incWealth = persistentAtom("incWealth", 0);

export const progress = persistentAtom("progress", 0);
export const tradition = persistentAtom("tradition", 0);
export const production = persistentAtom("production", 0);
export const influence = persistentAtom("influence", 0);

export const incProgress = persistentAtom("incProgress", 0);
export const incTradition = persistentAtom("incTradition", 0);
export const incProduction = persistentAtom("incProduction", 0);
export const incInfluence = persistentAtom("incInfluence", 0);

export const innovation = persistentAtom("innovation", 0);
export const prosperity = persistentAtom("prosperity", 0);
export const efficiency = persistentAtom("efficiency", 0);
export const superiority = persistentAtom("superiority", 0);

export const incInnovation = persistentAtom("incInnovation", 0);
export const incProsperity = persistentAtom("incProsperity", 0);
export const incEfficiency = persistentAtom("incEfficiency", 0);
export const incSuperiority = persistentAtom("incSuperiority", 0);

export const allignment = persistentAtom("allignment", 0);
export const incAllignment = persistentAtom("incAllignment", 0);
export const satisfaction = persistentAtom("satisfaction", 0);
export const incSatisfaction = persistentAtom("incSatisfaction", 0);
export const stability = persistentAtom("stability", 0);
export const incStability = persistentAtom("incStability", 0);
export const authority = persistentAtom("authority", 0);
export const incAuthority = persistentAtom("incAuthority", 0);