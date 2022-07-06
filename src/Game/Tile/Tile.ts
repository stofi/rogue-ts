import type { ITile, ITileType } from '~/Models'

export default class Tile implements ITile {
  constructor(public type: ITileType) {}
}
