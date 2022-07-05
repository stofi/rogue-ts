import Entity from '..';
import Actor from '../../Actor';
import Action from '../../Action';
import Breed from './Breed';
export default class Monster implements Entity, Actor {
    name: string;
    x: number;
    y: number;
    breed: Breed;
    health: number;
    constructor(name: string, x: number, y: number, breed: Breed);
    takeTurn(): Action;
}
