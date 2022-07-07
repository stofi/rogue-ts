import type { ITileType } from '../../Models';
export default class TileType implements ITileType {
    readonly name: string;
    readonly passable: boolean;
    constructor(name: string, passable: boolean);
}
