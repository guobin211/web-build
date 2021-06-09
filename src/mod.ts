import { ShopCar } from './product'

export default class ShopManage {
  public readonly shopCar = new ShopCar()

  public render(): void {
    this.shopCar.map((p) => console.log(`product: ${JSON.stringify(p)}`))
  }
}
