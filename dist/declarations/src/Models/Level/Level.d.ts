import type Tile from '../Tile';
export default class Level {
    width: number;
    height: number;
    tiles: Tile[];
    constructor(width: number, height: number, tiles: Tile[]);
}
