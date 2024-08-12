import { persistentAtom } from 'hooks/persistentAtom';


export class costResource {
    resource: string;
    amount: number;
    constructor(resource: string, amount: number) {
        this.resource = resource;
        this.amount = amount;
    }
}

export class costJob {
    job: string;
    resource: string;
    amount: number;
    constructor(job: string, resource: string, amount: number) {
        this.job = job;
        this.resource = resource;
        this.amount = amount;
    }
}

export class discoveryMethod {
    //Resource req, job req, building req, other tech req, 
    //Sometimes also unlocked by exploration or other situations or cultures?
    //Discoverable criteria is usually minimum core technology/level.
    //Once discoverable, it is then able to get discovery point by achieving various criteria. This is to prevent all the relevant technology from instantly being available thus overwhelming the player with choices.
    //And once sufficient discovery points are gained
    //THe tech is researchable and unlocked.
}

//Discoverable criteria will be 80% technology tree.
//the other 20% will be from exploration.

//Function to check if a tech is discoverable when exploration or technology is unlocked.

//Then once discoverable, they will be added to a list of technology that will be iterated through to increase discovery points.








export class technology {
    name: string;
    stage: number; //0 Undiscovered, 1 discoverable, 2 discovered, 3 unlocked.
    description: string;
    costResources: costResource[];
    costJobs: costJob[];
    discoveryMethods: discoveryMethod[];
}