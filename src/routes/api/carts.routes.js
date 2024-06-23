// const fs = require(`node:fs`)
const { Router } = require('express')
const CartController = require('../../controller/carts.controller.js')

const router = Router()
const {
  getCarts,
  createCart,
  addProductToCart,
  deleteCart,
  deleteProduct,
  updateProductQuantity
} = new CartController()

router.get('/', getCarts)
router.post('/', createCart)
router.post('/:cid/product/:pid', addProductToCart)
router.delete('/:cid', deleteCart)
router.delete('/:cid/products/:pid', deleteProduct)
router.put('/:cid/products/:pid', updateProductQuantity)

module.exports = router