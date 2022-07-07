import type { ILevel, IPlayer, ISession } from '../../Models';
export default class Session implements ISession {
    root: ILevel;
    player: IPlayer;
    logging: boolean;
    constructor(root: ILevel, player: IPlayer, logging?: boolean);
    private log;
    get activeLevel(): ILevel;
    /**
     * Make a turn in the game.
     */
    takeTurn(): Promise<void>;
    start(): void;
    end(): void;
}
