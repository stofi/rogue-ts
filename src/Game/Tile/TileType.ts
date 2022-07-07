import type { ITileType } from '@/Models'

export default class TileType implements ITileType {
  constructor(public name: string, public passable: boolean) {}
}
