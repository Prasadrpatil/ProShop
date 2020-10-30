import Product from '../models/productModel.js'
import asycHandler from 'express-async-handler'

// @des     Fetch All Products
// @route   GET /api/products
// @access  Public
const getProducts = asycHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @des     Fetch Single Products
// @route   GET /api/products/:id
// @access  Public
const getProductById = asycHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

// @des     Delete a Product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asycHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product Removed' })
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

export { getProductById, getProducts, deleteProduct }
