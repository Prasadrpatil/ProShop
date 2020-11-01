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

// @des     Create a Product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asycHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @des     Update a Product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asycHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    category,
    brand,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

// @des     Create New Review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asycHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product Already Reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review Added' })
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

export {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
}
