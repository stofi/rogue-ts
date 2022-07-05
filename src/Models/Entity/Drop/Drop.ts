import Entity from '..'
import Item from '../../Item'

export default class Drop implements Entity {
    constructor(
        public name: string,
        public x: number,
        public y: number,
        public item: Item
    ) {}
}
