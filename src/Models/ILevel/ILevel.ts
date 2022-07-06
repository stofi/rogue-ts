import type ITile from '../ITile'
import type IEntity from '../IEntity'

export interface IChildLevel {
  x: number
  y: number
  w: number
  h: number
  level: ILevel
  active: boolean
}

export interface ITileContent {
  tile: ITile
  entities: IEntity[]
  x: number
  y: number
}

export default interface ILevel {
  readonly width: number
  readonly height: number
  tiles: ITile[]
  entities: IEntity[]
  children: IChildLevel[]
  activeChild: IChildLevel | undefined
  getTile(x: number, y: number): ITile
  getChildAt(x: number, y: number): IChildLevel | undefined
  addChild(x: number, y: number, level: ILevel): void
  getTileContent(x: number, y: number): ITileContent | undefined
  deactiveChild(): void
  getActiveChildStack(): ILevel[]
}
