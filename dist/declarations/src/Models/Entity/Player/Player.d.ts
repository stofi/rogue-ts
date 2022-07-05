import Entity from '..';
import Actor from '../../Actor';
import Action from '../../Action';
export default class Player implements Entity, Actor {
    name: string;
    x: number;
    y: number;
    constructor(name: string, x: number, y: number);
    takeTurn(): Action;
}
