import type IActionResult from './IActionResult'

export default interface IAction {
  use: () => IActionResult
}
