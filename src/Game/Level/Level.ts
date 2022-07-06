import type {
  ILevel,
  IChildLevel,
  ITileContent,
  ITile,
  IEntity,
} from '~/Models'

export default class Level implements ILevel {
  width: number
  height: number
  children: IChildLevel[] = []
  entities: IEntity[] = []
  constructor(width: number, height: number, public tiles: ITile[]) {
    if (width < 1) {
      throw new Error('width must be greater than 0')
    }
    if (height < 1) {
      throw new Error('height must be greater than 0')
    }
    this.width = width
    this.height = height
  }

  public get activeChild(): IChildLevel | undefined {
    for (const child of this.children) {
      if (child.active) {
        return child
      }
    }
    return undefined
  }
  public set activeChild(child: IChildLevel | undefined) {
    for (const c of this.children) {
      c.active = c === child
    }
  }

  public deactiveChild(): void {
    for (const child of this.children) {
      if (child.active) {
        child.active = false
      }
    }
  }

  /**
   * Return an array of all active child levels, in order of their appearance in the
   * tree.
   * @returns An array of all the active child levels.
   */
  public getActiveChildStack(): ILevel[] {
    const stack: ILevel[] = []
    for (const child of this.children) {
      if (child.active) {
        stack.push(child.level)
        stack.push(...child.level.getActiveChildStack())
      }
    }
    return stack
  }

  public getTile(x: number, y: number): ITile {
    if (x < 0 || x >= this.width) {
      throw new Error('x must be between 0 and width')
    }
    if (y < 0 || y >= this.height) {
      throw new Error('y must be between 0 and height')
    }
    return this.tiles[y * this.width + x]
  }

  public getChildAt(x: number, y: number): IChildLevel | undefined {
    for (const child of this.children) {
      if (
        x >= child.x &&
        x < child.x + child.w &&
        y >= child.y &&
        y < child.y + child.h
      ) {
        return child
      }
    }
    return undefined
  }

  public addChild(x: number, y: number, level: ILevel): void {
    const width = level.width
    const height = level.height
    // x must be >= 0 and x + width must be <= this.width
    if (x < 0 || x + width > this.width) {
      throw new Error('x must be between 0 and width')
    }
    // y must be >= 0 and y + height must be <= this.height
    if (y < 0 || y + height > this.height) {
      throw new Error('y must be between 0 and height')
    }
    const otherChildLevelAtTile = this.getChildAt(x, y)
    if (otherChildLevelAtTile) {
      throw new Error('cannot add child at tile that already has a child')
    }

    this.children.push({
      x,
      y,
      w: width,
      h: height,
      level,
      active: false,
    })
  }

  public getTileContent(x: number, y: number): ITileContent | undefined {
    const child = this.getChildAt(x, y)
    if (child) {
      return child.level.getTileContent(x - child.x, y - child.y)
    }
    // entities
    const tile = this.getTile(x, y)

    const entities: IEntity[] = this.entities.filter(
      (entity) => entity.x === x && entity.y === y
    )
    return {
      tile,
      entities,
      x,
      y,
    }
  }
}
