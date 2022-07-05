import type Tile from '../Tile'

export default class Level {
    constructor(
        public width: number,
        public height: number,
        public tiles: Tile[]
    ) {}
}
