import { Session } from '@/Game'

describe('testing Session', () => {
  test('it should import', () => {
    const result = 0
    expect(result).toBe(0)
  })
  test('it should be a class', () => {
    const result = typeof Session
    expect(result).toBe('function')
  })
})
