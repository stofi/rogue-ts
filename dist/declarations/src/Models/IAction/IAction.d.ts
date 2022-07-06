import type IActionResult from './IActionResult';
import type IEntity from '../IEntity';
export default interface IAction {
    name: string;
    use: (actor?: IEntity) => IActionResult;
}
