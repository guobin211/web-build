import { Todo } from './todo'

export class SWCComponent {
  constructor() {
    this.name = 'SWCComponent'
    this.todos = [new Todo({ name: '第一个', content: '第一个todo' })]
  }

  getName() {
    return this.name.toLowerCase()
  }
}

export default SWCComponent
