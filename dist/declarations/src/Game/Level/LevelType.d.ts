import { ILevelType, ILevel, ILevelBreedDictionary, ILevelTileTypeDictionary, IMonster } from '../../Models';
import { Tile } from '..';
export default class LevelType implements ILevelType {
    readonly name: string;
    readonly tileTypes: ILevelTileTypeDictionary;
    readonly breeds: ILevelBreedDictionary;
    readonly maxMonsters: number;
    constructor(name: string, tileTypes: ILevelTileTypeDictionary, breeds: ILevelBreedDictionary, maxMonsters: number);
    generate(level: ILevel): void;
    placeTiles(level: ILevel): void;
    getObstacleTile(level: ILevel): Tile;
    getPassableTile(level: ILevel): Tile;
    placeMonsters(level: ILevel): void;
    getMonster(x: number, y: number, level: ILevel): IMonster | undefined;
}
