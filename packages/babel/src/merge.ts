export class Merge {
  public copy<T, E>(source: T, target: E): T & E {
    return Object.assign(target, source)
  }

  public merge<T, E>(source1: T, source2: E): T & E {
    return Object.assign({}, source1, source2)
  }
}
