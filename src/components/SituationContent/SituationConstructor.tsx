import { persistentAtom } from "hooks/persistentAtom";
import { increment } from "components/JobsContent/FoodJobData";

//Situations are stored in persistentAtom
//They are events that are created when conditions are met.
//They have a name, description, on going effect, requirement, progress/goal, duration/deadline, positive outcome and negative outcome.
//Example
//Starvation
//"Your people are starving, ensure food is above 0 for 5 turns."

export class option {
    //Requirement
    name: string;
    description: string;
    cost?: increment[];
    effect?: increment[];
    unlock?: string;
    constructor(
        name: string,
        description: string,
        cost?: increment[],
        effect?: increment[],
        unlock?: string
    ) {
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.effect = effect;
        this.unlock = unlock;
    }
}

export class Situation {
    name: string;
    tags: string[];
    description: string;
    options: option[];
    ongoing?: increment[];
    duration?: number;
    endEffect?: increment[];
    constructor(
        name: string,
        tags: string[],
        description: string,
        options: option[],
        ongoing?: increment[],
        duration?: number,
        endEffect?: increment[]
    ) {
        this.name = name;
        this.tags = tags;
        this.description = description;
        this.options = options;
        this.ongoing = ongoing;
        this.duration = duration;
        this.endEffect = endEffect;
    }
}

export const situationListAtom = persistentAtom("situationListAtom", [
    new Situation("Starvation", ["Food"], "Your people are starving, ensure food is above 0 for 5 turns.", [], [], 5),
]);