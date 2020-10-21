import express from 'express'
import Product from '../models/productModel.js'
import asycHandler from 'express-async-handler'

const router = express.Router()

// @des     Fetch All Products
// @route   GET /api/products
// @access  Public
router.get(
  '/',
  asycHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
  })
)

// @des     Fetch Single Products
// @route   GET /api/products/:id
// @access  Public
router.get(
  '/:id',
  asycHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product Not Found')
    }
  })
)

export default router
