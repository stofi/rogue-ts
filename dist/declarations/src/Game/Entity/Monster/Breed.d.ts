import type { IAction, IBreed, IItem, ILevel, IMonster } from '../../../Models';
export default class Breed implements IBreed {
    readonly name: string;
    readonly maxHealth: number;
    readonly items: IItem[];
    readonly loot: IItem[];
    constructor(name: string, maxHealth: number, items: IItem[], loot: IItem[]);
    takeTurn(monster: IMonster, level: ILevel): Promise<IAction>;
    spawn(monster: IMonster): void;
}
