import { atom } from "jotai";

const persistentAtom = (key, initialValue) => {
    const getInitialValue = () => {
        const item = localStorage.getItem(key);
        if (item !== null) {
            return JSON.parse(item);
        }
        return initialValue;
    };
    const baseAtom = atom(getInitialValue());
    const derivedAtom = atom(
        get => get(baseAtom),
        (get, set, update) => {
            const nextValue =
                typeof update === 'function' ? update(get(baseAtom)) : update;
            set(baseAtom, nextValue);
            localStorage.setItem(key, JSON.stringify(nextValue));
        },
    );
    return derivedAtom;
};


export { persistentAtom }