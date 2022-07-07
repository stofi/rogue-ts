import type { ITileType } from '../../Models'

export default class TileType implements ITileType {
  constructor(readonly name: string, readonly passable: boolean) {}
}
