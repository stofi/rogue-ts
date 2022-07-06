import type IAction from '../IAction';
import type ILevel from '../ILevel';
export default interface IEntity {
    readonly isPlayer: boolean;
    takeTurn(level: ILevel): Promise<IAction>;
    name: string;
    x: number;
    y: number;
}
