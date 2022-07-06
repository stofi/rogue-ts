import type Tile from '../Tile';
import type Entity from '../Entity';
interface ChildLevel {
    x: number;
    y: number;
    w: number;
    h: number;
    level: Level;
}
interface TileContent {
    tile: Tile;
    entities: Entity[];
    x: number;
    y: number;
}
export default class Level {
    width: number;
    height: number;
    tiles: Tile[];
    entities: Entity[];
    children: ChildLevel[];
    constructor(width: number, height: number, tiles: Tile[]);
    getTile(x: number, y: number): Tile;
    getChildAt(x: number, y: number): ChildLevel | undefined;
    addChild(x: number, y: number, level: Level): void;
    getTileContent(x: number, y: number): TileContent | undefined;
}
export {};
