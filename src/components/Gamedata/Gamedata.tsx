
import '@mantine/core/styles.css';
import { persistentAtom } from 'hooks/persistentAtom';

export const turn = persistentAtom("turn", 0);

export const logSettingsAtom = persistentAtom("logSettings",{
    showWorldEvents: true,
    showPopulationEvents: true,
    showBuildingEvents:true,
    showSituation: true,
    showTechEvents:true,
    showTraditionEvents:true,
    showGovernmentEvents:true,
});


export class Resource {
    name: string;
    value: number;
    income: number;
    max?: number;
    tooltip: string;
    constructor(name: string, value: number, income: number, tooltip: string, max?: number) {
        this.name = name;
        this.value = value;
        this.income = income;
        this.tooltip = tooltip;
        this.max = max;
    }
}

export const resourceListAtom = persistentAtom(
    "resourceList",
    [
        new Resource("Inspiration", 100, 0,  "Number of turns you can play."),
        new Resource("Population", 16, 0,  "Number of people in your empire. Population growth is increased by prosperity."),
        new Resource("Infrastructure", 8, 0,  "Amount of area available for construction. Unused infrastructure are used as home for villagers."),
        new Resource("Military", 0, 0,  "Military prowess of your empire. Increased by defensive buildings and military jobs."),
        new Resource("Knowledge", 0, 0,  "Collective physical resource for providing technology or advanced materials.", 100),
        new Resource("Food", 0, 0,  "Collective physical resource neccesary to sustain your empire's population.", 100),
        new Resource("Material", 0, 0,  "Collective physical resource for everything physical.", 100),
        new Resource("Wealth", 0, 0,  "Collective physical resource for valuables which can be used to purchase any physical resource.", 100),
        new Resource("Progress", 0, 0,  "Empirical resource for advancement in your empire's technology."),
        new Resource("Culture", 0, 0,  "Empirical resource for advancement in developement of your empire's traditions"),
        new Resource("Production", 0, 0,  "Empirical resource for construction and exploitation of rare resources"),
        new Resource("Influence", 0, 0,  "Empirical resource for government policies and edicts."),
        new Resource("Innovation", 0, 0,  "Empirical metric of your empire's ability to discover new technology and progress."),
        new Resource("Prosperity", 0, 0,  "Empirical metric of your empire's rate of growth and expansion."),
        new Resource("Efficiency", 0, 0,  "Empirical metric of your empire's physical resource and production income rate."),
        new Resource("Superiority", 0, 0,  "Empirical metric of your empire's ability to gain influence and reduce impact of situations."),
        new Resource("Allignment", 0, 0,  "Player metric of your empire's actions righteousness. Affects situation probabilities."),
        new Resource("Satisfaction", 0, 0,  "Player metric of your population's opinion. Affects empirical metric income."),
        new Resource("Stability", 0, 0,  "Player metric of your empire's maintainability and stability. Affects empirical metric decay."),
        new Resource("Authority", 0, 0,  "Player metric of your control over your empire. Required for certain actions."),
    ],
);