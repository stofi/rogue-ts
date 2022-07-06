import type Tile from '../Tile'
import type Entity from '../Entity'

interface ChildLevel {
  x: number
  y: number
  w: number
  h: number
  level: Level
  active: boolean
}

interface TileContent {
  tile: Tile
  entities: Entity[]
  x: number
  y: number
}

export default class Level {
  entities: Entity[] = []
  children: ChildLevel[] = []
  constructor(
    public width: number,
    public height: number,
    public tiles: Tile[]
  ) {
    if (width < 1) {
      throw new Error('width must be greater than 0')
    }
    if (height < 1) {
      throw new Error('height must be greater than 0')
    }
  }

  public get activeChild(): ChildLevel | undefined {
    for (const child of this.children) {
      if (child.active) {
        return child
      }
    }
    return undefined
  }
  public set activeChild(child: ChildLevel | undefined) {
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
  public getActiveChildStack(): Level[] {
    const stack: Level[] = []
    for (const child of this.children) {
      if (child.active) {
        stack.push(child.level)
        stack.push(...child.level.getActiveChildStack())
      }
    }
    return stack
  }

  public getTile(x: number, y: number): Tile {
    if (x < 0 || x >= this.width) {
      throw new Error('x must be between 0 and width')
    }
    if (y < 0 || y >= this.height) {
      throw new Error('y must be between 0 and height')
    }
    return this.tiles[y * this.width + x]
  }

  public getChildAt(x: number, y: number): ChildLevel | undefined {
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

  public addChild(x: number, y: number, level: Level): void {
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

  public getTileContent(x: number, y: number): TileContent | undefined {
    const child = this.getChildAt(x, y)
    if (child) {
      return child.level.getTileContent(x - child.x, y - child.y)
    }
    // entities
    const tile = this.getTile(x, y)

    const entities: Entity[] = this.entities.filter(
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
