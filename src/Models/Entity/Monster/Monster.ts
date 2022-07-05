import Entity from '..'
import Actor from '../../Actor'
import Action from '../../Action'
import Breed from './Breed'

export default class Monster implements Entity, Actor {
    health = 0
    constructor(
        public name: string,
        public x: number,
        public y: number,
        public breed: Breed
    ) {}

    takeTurn(): Action {
        throw new Error('Method not implemented.')
    }
}
