import type { ITileType } from '../../Models';
export default class TileType implements ITileType {
    name: string;
    passable: boolean;
    constructor(name: string, passable: boolean);
}
