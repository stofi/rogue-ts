import Action from '../Action';
export default class Item {
    name: string;
    drawAction?: Action | undefined;
    playAction?: Action | undefined;
    discardAction?: Action | undefined;
    constructor(name: string, drawAction?: Action | undefined, playAction?: Action | undefined, discardAction?: Action | undefined);
}
