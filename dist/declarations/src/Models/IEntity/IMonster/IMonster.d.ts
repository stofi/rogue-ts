import type IEntity from '..';
import type IBreed from './IBreed';
export default interface IMonster extends IEntity {
    health: number;
    breed: IBreed;
}
