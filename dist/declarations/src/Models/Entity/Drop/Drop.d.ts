import Entity from '..';
import Item from '../../Item';
export default class Drop implements Entity {
    name: string;
    x: number;
    y: number;
    item: Item;
    constructor(name: string, x: number, y: number, item: Item);
}
