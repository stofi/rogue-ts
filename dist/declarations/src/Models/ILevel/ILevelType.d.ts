import type ILevel from './ILevel';
import type ITileType from '../ITile/ITileType';
import type IBreed from '../IEntity/IMonster/IBreed';
export declare type ILevelTileTypeDictionary = Array<{
    type: ITileType;
}>;
export declare type ILevelBreedDictionary = Array<{
    breed: IBreed;
    spawnChance: number;
    maxSpawns: number;
}>;
export default interface ILevelType {
    readonly name: string;
    readonly tileTypes: ILevelTileTypeDictionary;
    readonly breeds: ILevelBreedDictionary;
    readonly maxMonsters: number;
    generate(level: ILevel): void;
}
