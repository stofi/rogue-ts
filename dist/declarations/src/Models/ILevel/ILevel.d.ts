import type ITile from '../ITile';
import type IEntity from '../IEntity';
import type ILevelType from './ILevelType';
import type { ILevelTileTypeDictionary, ILevelBreedDictionary } from './ILevelType';
export interface ITileContent {
    tile?: ITile;
    entities: IEntity[];
    x: number;
    y: number;
}
export default interface ILevel {
    readonly width: number;
    readonly height: number;
    x: number;
    y: number;
    type: ILevelType;
    active: boolean;
    tiles: Array<ITile | undefined>;
    entities: IEntity[];
    children: ILevel[];
    activeChild: ILevel | undefined;
    parent: ILevel | undefined;
    monsterCount: number;
    tileDictionary: ILevelTileTypeDictionary;
    breedDictionary: ILevelBreedDictionary;
    getParent(): ILevel | undefined;
    getTile(x: number, y: number, deep?: boolean): ITile | undefined;
    setTile(x: number, y: number, tile: ITile, deep?: boolean): void;
    getChildAt(x: number, y: number): ILevel | undefined;
    addChild(x: number, y: number, level: ILevel): void;
    getTileContent(x: number, y: number): ITileContent | undefined;
    deactiveChild(): void;
    getActiveChildStack(): ILevel[];
    getDeepestActiveChild(): ILevel | undefined;
    translateForChild(x: number, y: number, child: ILevel): {
        x: number;
        y: number;
    };
    translateForParent(x: number, y: number): {
        x: number;
        y: number;
    };
    generate(): void;
    placeEntity(x: number, y: number, entity: IEntity, deep?: boolean): void;
    removeEntity(entity: IEntity): void;
    boundsGuard(x: number, y: number, offset: number): boolean;
}
