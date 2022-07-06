import type { ILevel, ITileContent, ITile, IEntity } from '~/Models';
export default class Level implements ILevel {
    tiles: ITile[];
    width: number;
    height: number;
    active: boolean;
    x: number;
    y: number;
    children: ILevel[];
    entities: IEntity[];
    parent: ILevel | undefined;
    constructor(width: number, height: number, tiles: ITile[]);
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
