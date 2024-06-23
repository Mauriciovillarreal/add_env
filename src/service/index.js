const ProductsManagerMongo = require('../dao/productsManagerMongo.js')
const CartsManagerMongo = require('../dao/cartManagerMongo.js')
const { usersModel } = require('../models/users.model.js')

const productService = new ProductsManagerMongo()
const cartService = new CartsManagerMongo()

module.exports = {
    productService,
    cartService,
    usersModel
}
