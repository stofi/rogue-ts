import type ITile from '../ITile'
import type IEntity from '../IEntity'

export interface ITileContent {
  tile: ITile
  entities: IEntity[]
  x: number
  y: number
}

export default interface ILevel {
  readonly width: number
  readonly height: number
  x: number
  y: number
  active: boolean
  tiles: ITile[]
  entities: IEntity[]
  children: ILevel[]
  activeChild: ILevel | undefined
  parent: ILevel | undefined
  getParent(): ILevel | undefined
  getTile(x: number, y: number): ITile
  getChildAt(x: number, y: number): ILevel | undefined
  addChild(x: number, y: number, level: ILevel): void
  getTileContent(x: number, y: number): ITileContent | undefined
  deactiveChild(): void
  getActiveChildStack(): ILevel[]
  getDeepestActiveChild(): ILevel | undefined
  translateForChild(
    x: number,
    y: number,
    child: ILevel
  ): { x: number; y: number }
  translateForParent(x: number, y: number): { x: number; y: number }
}
