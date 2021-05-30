import { Merge } from './merge';

export default class BabelArrayPolyfill {

  public mergeUtil: Merge;

  constructor() {
    this.mergeUtil = new Merge()
  }

  public forEach<T>(list: T[], callback: (el: T) => void): void {
    for (const t of list) {
      callback(t)
    }
  }

  public isArray(list: unknown): boolean {
    return Array.isArray(list)
  }
}
