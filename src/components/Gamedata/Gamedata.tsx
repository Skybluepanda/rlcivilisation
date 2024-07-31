
import '@mantine/core/styles.css';
import { persistentAtom } from 'hooks/persistentAtom';

export const turn = persistentAtom("turn", 0);

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
        new Resource("Infrastructure", 8, 0,  "Amount of space in your empire for new buildings. Increased by housing and outposts."),
        new Resource("Military", 0, 0,  "Military prowess of your empire. Increased by defensive buildings and military jobs."),
        new Resource("Knowledge", 0, 0,  "Collective resource for providing technology or advanced materials.", 100),
        new Resource("Food", 0, 0,  "Neccesary resource to sustain your empire's population.", 100),
        new Resource("Material", 0, 0,  "Collective resource for everything physical.", 100),
        new Resource("Wealth", 0, 0,  "Collective resource for valuables which can be used to purchase any physical resource.", 100),
        new Resource("Progress", 0, 0,  "Abstract resource, used for advancement in technology"),
        new Resource("Culture", 0, 0,  "Abstract resource, used for developement of your empire's traditions."),
        new Resource("Production", 0, 0,  "Collective resource, used for building and producing anything that requires refinement. Resets to 0 at the end of each turn."),
        new Resource("Influence", 0, 0,  "Abstract resource, used for government actions"),
        new Resource("Innovation", 0, 0,  "Measure of your empire's ability to explore and learn."),
        new Resource("Prosperity", 0, 0,  "Measure of your empire's ability to expand and grow."),
        new Resource("Efficiency", 0, 0,  "Measure of your empire's ability to exploit and operate."),
        new Resource("Superiority", 0, 0,  "Measure of your empire's ability to dominate and control."),
        new Resource("Allignment", 0, 0,  "World's judgement of your empire's actions."),
        new Resource("Satisfaction", 0, 0,  "Your population's opinion of your actions and the empire."),
        new Resource("Stability", 0, 0,  "Your empire's balance and maintainability."),
        new Resource("Authority", 0, 0,  "Your control over your own empire."),

    ],
);