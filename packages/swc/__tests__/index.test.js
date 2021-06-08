const ShopManage = require('../build/index').default
const { Product, ShopCar, ProductTypeEnum, ProductPoster } = require('../build/product')

const shopManage = new ShopManage()

shopManage.shopCar.addProduct(new Product(ProductTypeEnum.FOOD, '苹果', 6.5, '', []))

shopManage.shopCar.addProduct(new Product(ProductTypeEnum.FOOD, '板栗', 12.5, '', []))

shopManage.render()
