import type { ILevel, IPlayer } from '~/Models';
export default interface ISession {
    readonly activeLevel: ILevel;
    root: ILevel;
    player: IPlayer;
    start(): void;
    end(): void;
    takeTurn(): Promise<void>;
}
