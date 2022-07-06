import type { ITile, ITileType } from '~/Models';
export default class Tile implements ITile {
    type: ITileType;
    constructor(type: ITileType);
}
