import type Tile from '../Tile'

export default class Level {
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
}
