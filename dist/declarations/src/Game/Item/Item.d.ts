import type { IAction, IItem } from '~/Models';
export default class Item implements IItem {
    name: string;
    drawAction?: IAction | undefined;
    playAction?: IAction | undefined;
    discardAction?: IAction | undefined;
    constructor(name: string, drawAction?: IAction, playAction?: IAction, discardAction?: IAction);
}
