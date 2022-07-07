import {
  ILevelType,
  ILevel,
  ILevelBreedDictionary,
  ILevelTileTypeDictionary,
  IMonster,
} from '../../Models'
import { Tile, Monster } from '..'

export default class LevelType implements ILevelType {
  constructor(
    public name: string,
    public tileTypes: ILevelTileTypeDictionary,
    public breeds: ILevelBreedDictionary
  ) {}
  generate(level: ILevel): void {
    this.placeTiles(level)
    this.placeMonsters(level)
  }
  placeTiles(level: ILevel): void {
    // place random tiles
    for (let x = 0; x < level.width; x++) {
      for (let y = 0; y < level.height; y++) {
        const content = level.getTileContent(x, y)
        if (!content) throw new Error('Tile not found')
        if (content.tile) continue
        const tileType =
          this.tileTypes[Math.floor(Math.random() * this.tileTypes.length)]
        const tile = new Tile(tileType.type)
        level.setTile(x, y, tile)
      }
    }
  }
  placeMonsters(level: ILevel): void {
    // place random monsters
    for (let x = 0; x < level.width; x++) {
      for (let y = 0; y < level.height; y++) {
        // is there a tile at this position?
        const content = level.getTileContent(x, y)
        // There is no tile; should not be possible
        if (!content || !content.tile) throw new Error('Tile not found')
        // Tile is not passable
        if (!content.tile.type.passable) continue
        // Tile is occupied
        if (content.entities.length) continue

        const monster = this.getMonster(x, y)
        if (!monster) continue
        level.placeEntity(x, y, monster)
        monster.spawn()
      }
    }
  }
  getMonster(x: number, y: number): IMonster | undefined {
    // get all breeds from dictionary that have maxSpawns > 0
    const breeds = this.breeds.filter((breed) => breed.maxSpawns > 0)
    // get sum of all spanshChances
    const totalSpawnChance = breeds.reduce(
      (total, breed) => total + breed.spawnChance,
      0
    )
    // if there are no breeds or totalSpawnChance is 0, return undefined
    if (totalSpawnChance === 0) return undefined
    // get random number between 0 and totalSpawnChance
    const random = Math.random() * totalSpawnChance
    // loop through breeds, accumulating spawnChance until random is reached
    let currentSpawnChance = 0
    for (const breed of breeds) {
      currentSpawnChance += breed.spawnChance
      if (random < currentSpawnChance) {
        breed.maxSpawns--
        return new Monster('monster', x, y, breed.breed)
      }
    }
  }
}
