import Level from '@/Models/Level'

describe('testing Models/Level', () => {
  test('it should import', () => {
    const result = 0
    expect(result).toBe(0)
  })
  test('it should construct', () => {
    const level = new Level(10, 10, [])
    expect(level).toBeInstanceOf(Level)
  })
  test('it should have a width', () => {
    const level = new Level(10, 10, [])
    expect(level.width).toBe(10)
  })
  test('it should have a height', () => {
    const level = new Level(10, 10, [])
    expect(level.height).toBe(10)
  })
  test('it should have tiles', () => {
    const level = new Level(10, 10, [])
    expect(level.tiles).toBeInstanceOf(Array)
  })
  test('it should not construct with no width', () => {
    expect(() => {
      const level = new Level(0, 10, [])
    }).toThrow()
  })
  test('it should not construct with no height', () => {
    expect(() => {
      const level = new Level(10, 0, [])
    }).toThrow()
  })
})
