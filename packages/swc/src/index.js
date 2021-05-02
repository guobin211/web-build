export class SWCComponent {
  constructor() {
    this.name = 'SWCComponent'
  }

  getName() {
    return this.name.toLowerCase()
  }
}

console.log(new SWCComponent().getName())
