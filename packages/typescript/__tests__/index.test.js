const ShopManage = require('../build').default
const { Product } = require('../build/product')

console.log(ShopManage)

const shopManage = new ShopManage()

shopManage.shopCar.addProduct(new Product(0, '豆腐', 2.6, '', []))

shopManage.shopCar.addProduct(new Product(0, '鲤鱼', 5.5, '', []))

shopManage.shopCar.addProduct(new Product(0, '嫩豆腐', 4.2, '', []))

console.log(shopManage.shopCar.getTotalPrice())

shopManage.render()
