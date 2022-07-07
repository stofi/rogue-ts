import type { IAction, IPlayer, ILevel } from '../../../Models';
export default class Player implements IPlayer {
    name: string;
    x: number;
    y: number;
    isPlayer: boolean;
    isAlive: boolean;
    constructor(name: string, x: number, y: number);
    takeTurn(level: ILevel): Promise<IAction>;
}
