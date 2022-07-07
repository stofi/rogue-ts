import { ILevelType, ILevel, ILevelBreedDictionary, ILevelTileTypeDictionary, IMonster } from '../../Models';
export default class LevelType implements ILevelType {
    name: string;
    tileTypes: ILevelTileTypeDictionary;
    breeds: ILevelBreedDictionary;
    constructor(name: string, tileTypes: ILevelTileTypeDictionary, breeds: ILevelBreedDictionary);
    generate(level: ILevel): void;
    placeTiles(level: ILevel): void;
    placeMonsters(level: ILevel): void;
    getMonster(x: number, y: number): IMonster | undefined;
}
