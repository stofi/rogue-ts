import type IItem from '../../IItem';
export default interface IBreed {
    name: string;
    maxHealth: number;
    items: IItem[];
    loot: IItem[];
}
