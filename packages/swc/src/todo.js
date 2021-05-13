let id = 0
export class Todo {
  constructor({ name, content }) {
    this.id = id++
    this.name = name
    this.content = content
    this.done = false
  }

  preview() {
    return `id: ${this.id}, the ${this.name} and ${this.content} has ${this.done ? '已完成' : '未完成'}`
  }
}
