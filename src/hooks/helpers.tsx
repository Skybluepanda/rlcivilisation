// helpers.ts
import { atom, WritableAtom } from 'jotai';
import { increment, Job } from 'components/Gamedata/FoodJobData';

// Calculate total income from job increments
export const calculateTotalIncome = (increments: increment[], job: Job) => {
    return increments.reduce((total, inc) => total + calculateTotal(inc) * job.current, 0);
};

export const calculateTotal = (increment: increment) =>
    (increment.base * increment.multiplier + increment.bonus) *
    increment.globalMultiplier;
