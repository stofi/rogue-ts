import Entity from '..'
import Actor from '../../Actor'
import Action from '../../Action'

export default class Player implements Entity, Actor {
    constructor(public name: string, public x: number, public y: number) {}

    takeTurn(): Action {
        throw new Error('Method not implemented.')
    }
}
