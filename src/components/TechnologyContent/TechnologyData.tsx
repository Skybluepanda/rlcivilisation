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
//Artifact based discoveries??
//Exploring new areas will retrieve artifacts to the civilisation. Researching these artifacts could unlock new discoveries and technologies.
//Split to core tech and optional tech. Core technology will always be discoverable, just matter of time.
//Rest requires both core and artifacts to discover.
//Technology is split to 4 categories.
//Exploration, Expansion, Exploitation and Extermination.
//Players will be able to choose from these 4 categories, drawing 3 cards from the chosen category. Completing the reseach will allow the player to repeat the selection
//Player may also sacrifice innovation to draw more cards. Optional discoveries are from exploring the world.
//Tradition are born from how the player is managing the tier 3 resource. 
//
//Authority refer to endless space 2 senate system cause it's cool as fuck.


export class technology {
    name: string;
    stage: number; //0 Undiscovered, 1 discoverable, 2 discovered, 3 unlocked.
    description: string;
    costResources: costResource[];
    costJobs: costJob[];
    discoveryMethods: discoveryMethod[];
}