import { persistentAtom } from 'hooks/persistentAtom';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

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

    ) {
        this.resource = resource;
        this.base = base;
        this.bonus = 0;
        this.multiplier = 0;
        this.globalMultiplier = 0;
    }
    total() {
        return (this.base*(100+this.multiplier)/100 + this.bonus)*(100+this.globalMultiplier)/100
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
    ) {
        this.resource = resource;
        this.base = base;
        this.bonus = 0;
        this.multiplier = 0;
        this.globalMultiplier = 0;
    }
    total() {
        return (this.base*(100+this.multiplier)/100 + this.bonus)*(100+this.globalMultiplier)/100
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

    constructor(name: string, amount: number) {
        this.name = name;
        this.amount = amount;
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


export class Job {
    UID: number;
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
        UID:number,
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
        this.UID = UID;
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



// Function to load JSON data
async function loadJobsFromJSON(jsonPath: string): Promise<Job[]> {
    const response = await fetch(jsonPath);
    const jobsData = await response.json();
    let UID = 1
    return jobsData.map((jobData: any) => new Job(
        UID++,
        jobData.name,
        jobData.tags,
        jobData.tooltip,
        jobData.current,
        jobData.max,
        jobData.suppliers.map((s: any) => new supplier(s.name, s.resource, s.amount)),
        jobData.dependents.map((d: any) => new dependent(d.name, d.amount)),
        jobData.input.map((i: any) => new increment(i.resource, i.base)),
        jobData.output.map((o: any) => new increment(o.resource, o.base)),
        jobData.resourceEffect.map((re: any) => new resourceEffect(re.resource, re.base))
    ));
}


// Atom that holds the job list
export const jobListAtom = persistentAtom('jobListAtom', []);
export const jobDictionaryAtom = persistentAtom('jobDictionary', []);
export const jobListAdminAtom = persistentAtom('jobListAdminAtom', []);


export const jobUnlocker = (jobList, jobDict, job: String) => {
    const newJob = jobDict.find(j => j.name === job);
    return [...jobList, newJob];
};

export const useJobDictionaryLoader = (jsonPath: string) => {
    const [, setJobList] = useAtom(jobDictionaryAtom);

    useEffect(() => {
        async function loadJobs() {
            const jobs = await loadJobsFromJSON(jsonPath);
            setJobList(jobs);
        }

        loadJobs();
    }, [jsonPath, setJobList]);
};

export const useJobListLoaderAdmin = (jsonPath: string) => {
    const [, setJobList] = useAtom(jobListAdminAtom);

    useEffect(() => {
        async function loadJobs() {
            const jobs = await loadJobsFromJSON(jsonPath);
            setJobList(jobs);
        }

        loadJobs();
    }, [jsonPath, setJobList]);
};




// export const jobListAtom = persistentAtom(
//     'jobListAtom',[
//         new Job(
//             'Forager',
//             ['Food', 'Material'],
//             "Forages the wilderness for food and materials.",
//             16,
//             16,
//             [],
//             [],
//             [new increment('Food', -10)],
//             [    
//                 new increment('Food', 11),
//                 new increment('Material', 2),
//             ],
//             [],
//         ),
//         new Job(
//             'Villager',
//             ['Food', 'Material'],
//             "Unspecialised civilians living in a home.",
//             0,
//             5,
//             [],
//             [],
//             [new increment('Food', -10)],
//             [    
//                 new increment('Food', 5),
//                 new increment('Material', 1),
//                 new increment('Knowledge', 1),
//                 new increment('Wealth', 1),
//                 new increment('Population', 0.1),
//             ],
//             [],
//         ),
//         new Job(
//             'Hunter',
//             ['Food', 'Material'],
//             "Hunts animals for food and materials.",
//             0,
//             5,
//             [],
//             [],
//             [
//                 new increment('Food', -25),

//                 new increment('Material', -5),

//                 new increment('Production', -5),
                
//             ],
//             [
//                 new increment('Food', 50),
//             ],
//             [new resourceEffect('Military', 1)],
//         ),
//         new Job(
//             'Crafter',
//             ['Material', 'Production'],
//             "Crafts tools and items for other workers.",
//             0,
//             10,
//             [],
//             [],
//             [
//                 new increment('Food', -10),

//                 new increment('Material', -10),            
//             ],
//             [
//                 new increment('Knowledge', 1),
//                 new increment('Production', 3),
//             ],
//             []
//         ),
//         new Job(
//             'Builder',
//             ['Material', 'Production'],
//             "Consumes large amount of material to build structures.",
//             0,
//             5,
//             [new supplier("Crafter", "Production", 1)],
//             [],
//             [
//                 new increment('Food', -20),

//                 new increment('Material', -25),            
//             ],
//             [
//                 new increment('Production', 10),
//             ],
//             []
//         ),
//     ],
// );