import { ShopCar } from './model/mod'

export default class ShopManage {
  public readonly shopCar = new ShopCar()

  public render(): void {
    this.shopCar.map((p) => console.log(`product: ${JSON.stringify(p)}`))
  }
}
