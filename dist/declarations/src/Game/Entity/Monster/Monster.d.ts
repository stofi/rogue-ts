import type { IAction, IBreed, IMonster, ILevel } from '~/Models';
export default class Monster implements IMonster {
    name: string;
    x: number;
    y: number;
    breed: IBreed;
    isPlayer: boolean;
    health: number;
    constructor(name: string, x: number, y: number, breed: IBreed);
    takeTurn(level: ILevel): Promise<IAction>;
}
