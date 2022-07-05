import Action from '../Action'

export default class Item {
    constructor(
        public name: string,
        public drawAction?: Action,
        public playAction?: Action,
        public discardAction?: Action
    ) {}
}
