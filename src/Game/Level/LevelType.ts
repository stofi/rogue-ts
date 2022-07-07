import {
  ILevelType,
  ILevel,
  ILevelBreedDictionary,
  ILevelTileTypeDictionary,
  IMonster,
} from '../../Models'
import { Tile, Monster } from '..'

const randomInt = (max = 100) => Math.floor(Math.random() * max)
export default class LevelType implements ILevelType {
  constructor(
    readonly name: string,
    readonly tileTypes: ILevelTileTypeDictionary,
    readonly breeds: ILevelBreedDictionary,
    readonly maxMonsters: number
  ) {}
  generate(level: ILevel): void {
    level.tileDictionary = this.tileTypes.map((tileType) => ({
      type: tileType.type,
    }))
    level.breedDictionary = this.breeds.map((breed) => ({
      breed: breed.breed,
      maxSpawns: breed.maxSpawns,
      spawnChance: breed.spawnChance,
    }))
    this.placeTiles(level)
    this.placeMonsters(level)
  }
  placeTiles(level: ILevel): void {
    // border level with walls
    for (let x = 0; x < level.width; x++) {
      const tile = this.getObstacleTile(level)
      level.setTile(x, 0, tile)
      level.setTile(x, level.height - 1, tile)
    }
    for (let y = 0; y < level.height; y++) {
      const tile = this.getObstacleTile(level)
      level.setTile(0, y, tile)
      level.setTile(level.width - 1, y, tile)
    }
    // fill level with floor
    for (let x = 1; x < level.width - 1; x++) {
      for (let y = 1; y < level.height - 1; y++) {
        const tile = this.getPassableTile(level)
        level.setTile(x, y, tile)
      }
    }
  }
  getObstacleTile(level: ILevel): Tile {
    // get unpassble tiles from level tile dictionary
    const unpassableTiles = level.tileDictionary.filter(
      (tileType) => tileType.type.passable === false
    )
    // get random tile from unpassable tiles
    const randomTile = unpassableTiles[randomInt(unpassableTiles.length)]
    return new Tile(randomTile.type)
  }
  getPassableTile(level: ILevel): Tile {
    // get passable tiles from level tile dictionary
    const passableTiles = level.tileDictionary.filter(
      (tileType) => tileType.type.passable === true
    )
    // get random tile from passable tiles
    const randomTile = passableTiles[randomInt(passableTiles.length)]
    return new Tile(randomTile.type)
  }

  placeMonsters(level: ILevel): void {
    while (level.monsterCount < this.maxMonsters) {
      let x = randomInt(level.width - 2) + 1
      let y = randomInt(level.height - 2) + 1
      let maxIters = 100
      // while no entity at this position
      let entities = level.getTileContent(x, y)?.entities
      while (entities && entities.length > 0 && maxIters) {
        x = randomInt(level.width)
        y = randomInt(level.height)
        entities = level.getTileContent(x, y)?.entities
        maxIters--
      }
      const monster = this.getMonster(x, y, level)
      // should not happen
      level.monsterCount++
      if (!monster) continue
      level.placeEntity(x, y, monster)
      monster.spawn()
    }
  }
  getMonster(x: number, y: number, level: ILevel): IMonster | undefined {
    // get all breeds from dictionary that have maxSpawns > 0
    const breeds = level.breedDictionary.filter((breed) => breed.maxSpawns > 0)
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
