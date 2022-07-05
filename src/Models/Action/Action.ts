import ActionResult from './ActionResult'

export default interface Action {
    use: () => ActionResult
}
