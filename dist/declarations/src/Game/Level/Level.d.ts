import type { ILevel, ITileContent, ITile, IEntity, ILevelType, ILevelBreedDictionary, ILevelTileTypeDictionary } from '../../Models';
export default class Level implements ILevel {
    type: ILevelType;
    width: number;
    height: number;
    active: boolean;
    x: number;
    y: number;
    children: ILevel[];
    entities: IEntity[];
    parent: ILevel | undefined;
    tiles: Array<ITile | undefined>;
    monsterCount: number;
    constructor(width: number, height: number, type: ILevelType);
    tileDictionary: ILevelTileTypeDictionary;
    breedDictionary: ILevelBreedDictionary;
    static boundsError: Error;
    boundsGuard(x: number, y: number, offset?: number): boolean;
    generate(): void;
    placeEntity(x: number, y: number, entity: IEntity, deep?: boolean): void;
    removeEntity(entity: IEntity): void;
    translateForChild(x: number, y: number, child: ILevel): {
        x: number;
        y: number;
    };
    translateForParent(x: number, y: number): {
        x: number;
        y: number;
    };
    get activeChild(): ILevel | undefined;
    set activeChild(child: ILevel | undefined);
    deactiveChild(): void;
    getParent(): ILevel | undefined;
    /**
     * Return an array of all active child levels, in order of their appearance in the
     * tree.
     * @returns An array of all the active child levels.
     */
    getActiveChildStack(): ILevel[];
    getDeepestActiveChild(): ILevel | undefined;
    getTile(x: number, y: number, deep?: boolean): ITile | undefined;
    setTile(x: number, y: number, tile: ITile, deep?: boolean): void;
    getChildAt(x: number, y: number): ILevel | undefined;
    addChild(x: number, y: number, level: ILevel): void;
    getTileContent(x: number, y: number): ITileContent | undefined;
}
