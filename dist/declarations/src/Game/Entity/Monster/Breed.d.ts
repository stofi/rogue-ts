import type { IBreed, IItem } from '~/Models';
export default class Breed implements IBreed {
    name: string;
    maxHealth: number;
    items: IItem[];
    loot: IItem[];
    constructor(name: string, maxHealth: number, items: IItem[], loot: IItem[]);
}
