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
    name: string;
    tileTypes: ILevelTileTypeDictionary;
    breeds: ILevelBreedDictionary;
    generate(level: ILevel): void;
}