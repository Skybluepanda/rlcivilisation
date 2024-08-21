import { persistentAtom } from 'hooks/persistentAtom';
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

//Completed tech list,
//Tech list for each quad.
//Hidden tech list
//Main source of innovation is researching a new technology.
//More innovation is gained from discovering rarer technology which cost more.
//
//Research has name,
//Pre requisites.
//Category
//Rarity
//Draw from all pile, or draw from specific catergory after researching a technology.
//Costs innovation to draw from a specific category.
//Costs innovation to discard a single card.

//Exploring new areas will retrieve artifacts to the civilisation. Researching these artifacts could unlock new discoveries and technologies.
//Split to core tech and optional tech. Core technology will always be discoverable, just matter of time.
//Rest requires both core and artifacts to discover.
//Technology is split to 4 categories.
//Exploration, Expansion, Exploitation and Extermination.
//Players will be able to choose from these 4 categories, drawing 3 cards from the chosen category. Completing the reseach will allow the player to repeat the selection
//Player may also sacrifice innovation to draw more cards. Optional discoveries are from exploring the world.
//Tradition are born from how the player is managing the tier 3 resource or jobs that outnumber other jobs.
//Economy is a section where player can spend physical resources to gain higher tier resources. Production gets often spent on upkeep, and efficiency is consumed
//when certain goods are stopped from being produced.
//Authority refer to endless space 2 senate system cause it's cool as fuck.
// https://www.google.com/search?q=endless+space+2+senate&oq=endless+space+2+senate&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg80gEIMjc3NGowajeoAgCwAgA&sourceid=chrome&ie=UTF-8
//Unlock buildings
//Change building jobmax
//Change job input/output
//

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

export class increment {
    resource: string;
    base: number;
    bonus: number;
    multiplier: number;
    globalMultiplier: number;

    constructor(resource: string, base: number) {
        this.resource = resource;
        this.base = base;
        this.bonus = 0;
        this.multiplier = 0;
        this.globalMultiplier = 0;
    }
    total() {
        return (
            (((this.base * (100 + this.multiplier)) / 100 + this.bonus) *
                (100 + this.globalMultiplier)) /
            100
        );
    }
}

export class supplier {
    name: string;
    resource: string;
    amount: number;

    constructor(name: string, resource: string, amount: number) {
        this.name = name;
        this.resource = resource;
        this.amount = amount;
    }
}

export class jobChange {
    jobName: string;
    suppliers: supplier[];
    input: increment[];
    output: increment[];

    constructor(
        jobName: string,
        suppliers: supplier[],
        input: increment[],
        output: increment[],
    ) {
        this.jobName = jobName;
        this.suppliers = suppliers;
        this.input = input;
        this.output = output;
    }
}

export class resourceMax {
    resource: string;
    base: number;
    bonus: number;
    multiplier: number;
    globalMultiplier: number;
    constructor(resource: string, base: number) {
        this.resource = resource;
        this.base = base;
        this.bonus = 0;
        this.multiplier = 0;
        this.globalMultiplier = 0;
    }
    total() {
        return (
            (((this.base * (100 + this.multiplier)) / 100 + this.bonus) *
                (100 + this.globalMultiplier)) /
            100
        );
    }
}

export class jobMax {
    job: string;
    base: number;
    bonus: number;
    multiplier: number;
    globalMultiplier: number;

    constructor(job: string, base: number) {
        this.job = job;
        this.base = base;
        this.bonus = 0;
        this.multiplier = 0;
        this.globalMultiplier = 0;
    }
    total() {
        return (
            (((this.base * (100 + this.multiplier)) / 100 + this.bonus) *
                (100 + this.globalMultiplier)) /
            100
        );
    }
}

export class bonusEffect {
    resource: string;
    base: number;
    bonus: number;
    multiplier: number;
    globalMultiplier: number;

    constructor(resource: string, base: number) {
        this.resource = resource;
        this.base = base;
        this.bonus = 0;
        this.multiplier = 0;
        this.globalMultiplier = 0;
    }
    total() {
        return (
            (((this.base * (100 + this.multiplier)) / 100 + this.bonus) *
                (100 + this.globalMultiplier)) /
            100
        );
    }
}

export class buildingChange {
    buildingName: string;
    jobmax: jobMax[];
    bonuseffect: bonusEffect[];
    resourcemax: resourceMax[];
    wealthCost: number;
    costJobs: costJob[];

    constructor(
        buildingName: string,
        jobmax: jobMax[],
        bonuseffect: bonusEffect[],
        resourcemax: resourceMax[],
        wealthCost: number,
        costJobs: costJob[],
    ) {
        this.buildingName = buildingName;
        this.jobmax = jobmax;
        this.bonuseffect = bonuseffect;
        this.resourcemax = resourcemax;
        this.wealthCost = wealthCost;
        this.costJobs = costJobs;
    }
}

export class technology {
    UID: number;
    name: string;
    tags: string[];
    rarity: number;
    tier: number;
    type: number;
    category: string;
    description: string;
    techrequired: string[];
    progress: number;
    unlockBuilding: string[];
    buildingchange: buildingChange[];
    jobchange: jobChange[];
    bonuseffect: bonusEffect[];
    constructor(
        UID: number,
        name: string,
        tags: string[],
        rarity: number,
        tier: number,
        type: number,
        category: string,
        description: string,
        techrequired: string[],
        unlockBuilding: string[],
        buildingchange: buildingChange[],
        jobchange: jobChange[],
        bonuseffect: bonusEffect[],
    ) {
        this.UID = UID;
        this.name = name;
        this.tags = tags;
        this.rarity = rarity;
        this.tier = tier;
        this.type = type;
        this.category = category;
        this.description = description;
        this.techrequired = techrequired;
        this.unlockBuilding = unlockBuilding;
        this.buildingchange = buildingchange;
        this.jobchange = jobchange;
        this.bonuseffect = bonuseffect;
    }
}

//Researched Tech atom (Moved from available when research is finished.)
//Available Tech atom (Pulls from undiscovered when techrequired matches up)
//Undiscovered Tech atom (Current player version of techlist at start of the game and pulled from dictionary)
//Dictionary Tech atom (Main version of techlist updated on refresh)
//Admin Tech atom
//Research cost depends on calculations of rarity, tier, and any research cost creep.
//Researching techs of same tier reduces cost of same and lower tier.
//High innovation drastically reduces next tier research.
//Same category or tag also reduces cost.

async function loadTechnologiesFromJson(
    jsonPath: string,
): Promise<technology[]> {
    const response = await fetch(jsonPath);
    const technologyDataList = await response.json();
    let UID = 1;
    return technologyDataList.map(
        (techData: any) =>
            new technology(
                UID++,
                techData.name,
                techData.tags,
                techData.rarity,
                techData.type,
                techData.tier,
                techData.category,
                techData.description,
                techData.techrequired,
                techData.unlockBuilding,
                techData.buildingchange.map(
                    (bc: any) =>
                        new buildingChange(
                            bc.buildingName,
                            bc.jobmax.map(
                                (jm: any) => new jobMax(jm.job, jm.base),
                            ),
                            bc.bonuseffect.map(
                                (be: any) =>
                                    new bonusEffect(be.resource, be.base),
                            ),
                            bc.resourcemax.map(
                                (rm: any) =>
                                    new resourceMax(rm.resource, rm.base),
                            ),
                            bc.wealthCost,
                            bc.costJobs.map(
                                (cj: any) =>
                                    new costJob(cj.job, cj.resource, cj.amount),
                            ),
                        ),
                ),
                techData.jobchange.map(
                    (jc: any) =>
                        new jobChange(
                            jc.jobName,
                            jc.suppliers.map(
                                (s: any) =>
                                    new supplier(s.name, s.resource, s.amount),
                            ),
                            jc.input.map(
                                (i: any) => new increment(i.resource, i.base),
                            ),
                            jc.output.map(
                                (o: any) => new increment(o.resource, o.base),
                            ),
                        ),
                ),
                techData.bonuseffect.map(
                    (be: any) => new bonusEffect(be.resource, be.base),
                ),
            ),
    );
}

// Persistent Atoms for Technology Data
export const researchedTechAtom = persistentAtom('researchedTechAtom', []);
export const availableTechAtom = persistentAtom('availableTechAtom', []);
export const undiscoveredTechAtom = persistentAtom('undiscoveredTechAtom', []);
export const techDictionaryAtom = persistentAtom('techDictionaryAtom', []);
export const adminTechAtom = persistentAtom('adminTechAtom', []);

// Hooks for Loading Technology Data
export const useTechDictionaryLoader = (jsonPath: string) => {
    const [, setTechList] = useAtom(undiscoveredTechAtom);

    useEffect(() => {
        async function loadTechnologies() {
            const techs = await loadTechnologiesFromJson(jsonPath);
            setTechList(techs);
        }

        loadTechnologies();
    }, [jsonPath, setTechList]);
};

export const useTechListLoaderAdmin = (jsonPath: string) => {
    const [, setTechList] = useAtom(adminTechAtom);

    useEffect(() => {
        async function loadTechnologies() {
            const techs = await loadTechnologiesFromJson(jsonPath);
            setTechList(techs);
        }

        loadTechnologies();
    }, [jsonPath, setTechList]);
};

// This function checks if all required technologies have been researched
const allTechsResearched = (
    techrequired: string[],
    researched: technology[],
) => {
    return techrequired.every(req =>
        researched.some(tech => tech.name === req),
    );
};

// Listener atom that triggers when researchedTechAtom is updated
const checkAndUpdateAvailableTech = atom(null, (get, set) => {
    const researched = get(researchedTechAtom);
    const undiscovered = get(undiscoveredTechAtom);
    const available = get(availableTechAtom);

    const newAvailable = undiscovered.filter(tech =>
        allTechsResearched(tech.techrequired, researched),
    );

    // Update the available tech list
    set(availableTechAtom, [...available, ...newAvailable]);

    // Remove the newly available techs from undiscoveredTechAtom
    const updatedUndiscovered = undiscovered.filter(
        tech => !newAvailable.includes(tech),
    );
    set(undiscoveredTechAtom, updatedUndiscovered);
});

// To automatically trigger the check when researchedTechAtom changes
researchedTechAtom.onMount = setAtom => {
    setAtom(checkAndUpdateAvailableTech);
};
