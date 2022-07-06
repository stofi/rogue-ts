import type Item from '../../IItem';
export default interface Breed {
    name: string;
    maxHealth: number;
    items: Item[];
    loot: Item[];
}
