import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    await Product.updateMany(
      {},
      {
        $set: {
          reviews: [
            {
              name: 'Aniket Rane',
              rating: 4,
              comment: 'Good product...',
              user: '61189e2222cf11234c9f1111',
              createdAt: '2021-08-15T04:58:25.162+00:00',
              updatedAt: '2021-08-15T04:58:25.162+00:00',
            },
            {
              name: 'Harshal Sutar',
              rating: 4.5,
              comment: 'Nice product!!!',
              user: '61189e2222cf11234c9f1111',
              createdAt: '2021-08-15T04:58:25.162+00:00',
              updatedAt: '2021-08-15T04:58:25.162+00:00',
            },
          ],
        },
      }
    )

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
