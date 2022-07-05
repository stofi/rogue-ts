import Item from '../../Item';
export default interface Breed {
    name: string;
    maxHealth: number;
    items: Item[];
    loot: Item[];
}
