import { Level } from '@/Game'
import type { ITile, ITileType, ITileContent, ILevelType } from '@/Models'

const dummyLevelType: ILevelType = {
  name: 'dummy level type',
  breeds: [],
  tileTypes: [],
  maxMonsters: 0,
  generate: () => {
    //
  },
}
const dummyTileType: ITileType = {
  name: 'dummy',
  passable: true,
}
const dummyTile: ITile = {
  type: dummyTileType,
}
const dummyTileContent: ITileContent = {
  entities: [],
  tile: dummyTile,
  x: 0,
  y: 0,
}

const getLevel = (): Level => new Level(10, 10, dummyLevelType)
const getChildLevel = (): Level => new Level(4, 5, dummyLevelType)

describe('testing Level', () => {
  test('it should import', () => {
    const result = 0
    expect(result).toBe(0)
  })
  test('it should construct', () => {
    const level = getLevel()
    expect(level).toBeInstanceOf(Level)
  })
  test('it should have a width', () => {
    const level = getLevel()
    expect(level.width).toBe(10)
  })
  test('it should have a height', () => {
    const level = getLevel()
    expect(level.height).toBe(10)
  })
  test('it should have tiles', () => {
    const level = getLevel()
    expect(level.tiles).toBeInstanceOf(Array)
  })
  test('it should not construct with no width', () => {
    expect(() => {
      const level = new Level(0, 10, dummyLevelType)
    }).toThrow()
  })
  test('it should not construct with no height', () => {
    expect(() => {
      const level = new Level(10, 0, dummyLevelType)
    }).toThrow()
  })
  test('it should not add child out of bounds', () => {
    const level = getLevel()
    expect(() => {
      level.addChild(-1, -1, getLevel())
    }).toThrow()
    expect(() => {
      level.addChild(10, 10, getLevel())
    }).toThrow()
  })
  test('it should not add child in the border', () => {
    const level = getLevel()
    expect(() => {
      level.addChild(0, 0, getLevel())
    }).toThrow()
    expect(() => {
      level.addChild(9, 9, new Level(1, 1, dummyLevelType))
    }).toThrow()
  })
  //    0 2  5    9
  //   ┌──────────┐
  //  0│Parent    │
  //   │  0  3    │
  //   │ ┌─────┐  │
  //  3│0│Child│  │
  //   │ │     │  │
  //   │ │     │  │
  //   │ │     │  │
  //  7│4│   X │  │
  //   │ └─────┘  │
  //  9│          │
  //   └──────────┘

  // translateForChild
  test('it should translateForChild', () => {
    const childX = 2
    const childY = 3
    const x = 5
    const y = 7
    const level = getLevel()
    const childLevel = getChildLevel()
    level.addChild(childX, childY, childLevel)
    const result = level.translateForChild(x, y, childLevel)
    expect(result).toEqual({ x: 3, y: 4 })
  })

  // translateForParent
  test('it should translateForParent', () => {
    const childX = 2
    const childY = 3
    const x = 3
    const y = 4
    const level = getLevel()
    const childLevel = getChildLevel()
    level.addChild(childX, childY, childLevel)
    const result = childLevel.translateForParent(x, y)
    expect(result).toEqual({ x: 5, y: 7 })
  })

  // get activeChild
  test('it should get activeChild', () => {
    const level = getLevel()
    const childLevel = getChildLevel()
    level.addChild(1, 1, childLevel)
    level.activeChild = childLevel
    expect(level.activeChild).toBe(childLevel)
  })
  // set activeChild
  test('it should set activeChild', () => {
    const level = getLevel()
    const childLevel = getChildLevel()
    level.addChild(1, 1, childLevel)
    level.activeChild = childLevel
    expect(level.activeChild).toBe(childLevel)
  })

  // deactiveChild
  test('it should deactiveChild', () => {
    const level = getLevel()
    const childLevel = getChildLevel()
    level.addChild(1, 1, childLevel)
    level.activeChild = childLevel
    level.deactiveChild()
    expect(level.activeChild).toBe(undefined)
  })
  // getParent
  test('it should getParent', () => {
    const level = getLevel()
    const childLevel = getChildLevel()
    level.addChild(1, 1, childLevel)
    expect(childLevel.getParent()).toBe(level)
  })
  // getActiveChildStack
  test('it should getActiveChildStack', () => {
    const level = getLevel()
    const childLevel = getChildLevel()
    level.addChild(1, 1, childLevel)
    level.activeChild = childLevel
    expect(level.getActiveChildStack()).toEqual([childLevel])
  })
  // getDeepestActiveChild
  test('it should getDeepestActiveChild', () => {
    const level = getLevel()
    const childLevel = getChildLevel()
    level.addChild(1, 1, childLevel)
    level.activeChild = childLevel
    expect(level.getDeepestActiveChild()).toBe(childLevel)
  })
  // getTile
  test('it should set and get tiles', () => {
    const level = getLevel()
    const childLevel = getChildLevel()

    level.addChild(1, 1, childLevel)
    expect(level.getTile(1, 1)).toBe(undefined)
    expect(childLevel.getTile(1, 1)).toBe(undefined)

    childLevel.setTile(0, 0, dummyTile)
    expect(childLevel.getTile(0, 0)).toBe(dummyTile)

    expect(level.getTile(1, 1, true)).toBe(dummyTile)
  })

  // getChildAt
  test('it should add and get Child At', () => {
    const level = getLevel()
    const childLevel = getChildLevel()
    level.addChild(1, 1, childLevel)
    expect(level.getChildAt(1, 1)).toBe(childLevel)
  })
  // getTileContent
  test('it should getTileContent', () => {
    const level = getLevel()
    const childLevel = getChildLevel()
    level.addChild(1, 1, childLevel)
    childLevel.setTile(0, 0, dummyTile)
    expect(level.getTileContent(1, 1)).toStrictEqual(dummyTileContent)
  })
})
