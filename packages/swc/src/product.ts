import { getRandomId } from './utils'

export enum ProductTypeEnum {
  FOOD,
  BOOK,
}

export class Product {
  public readonly type: ProductTypeEnum
  public readonly id: string

  constructor(
    type: ProductTypeEnum,
    public title: string,
    public price: number,
    public desc: string,
    public poster: ProductPoster[],
  ) {
    this.type = type
    this.id = getRandomId()
  }
}

export class ProductPoster {
  constructor(public src: string, public alt: string, public desc?: string) {}
}

type ProductMap = Map<ProductTypeEnum, Product[]>

export class ShopCar {
  private productMap: ProductMap = new Map()
  private totalCount = 0
  private totalPrice = 0

  public getTotalPrice(): number {
    let res = 0
    this.productMap.forEach((productList) => {
      res += productList.reduce((total, product) => total + product.price, 0)
    })
    return res
  }

  public getTotalCount(): number {
    return this.totalCount
  }

  public addProduct(p: Product): ProductMap {
    const pl = this.productMap.get(p.type)
    this.totalPrice += p.price
    this.totalCount += 1
    if (!pl) {
      return this.productMap.set(p.type, [p])
    }
    return this.productMap.set(p.type, [...pl, p])
  }

  public deleteProduct(p: Product): ProductMap | void {
    const pl = this.productMap.get(p.type)
    if (pl) {
      const index = pl.findIndex((el) => el.id === p.id)
      if (index) {
        this.totalCount -= 1
        this.totalPrice -= p.price
        return this.productMap.set(p.type, pl.splice(index, 1))
      }
    }
  }

  public map(callback: (p: Product) => void): void {
    for (const productList of this.productMap.values()) {
      productList.forEach(callback)
    }
  }
}
