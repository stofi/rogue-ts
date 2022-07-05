import Action from '../Action';
export default interface Actor {
    takeTurn(): Action;
}
