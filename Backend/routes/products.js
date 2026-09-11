import { Router } from 'express'
import mongoose from 'mongoose'
import { Product } from '../models/Product.js'

const router = Router()

router.get('/', async (request, response, next) => {
  try {
    const filter = request.query.category ? { category: request.query.category } : {}
    const products = await Product.find(filter).lean()
    response.json(products)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (request, response, next) => {
  try {
    const { id } = request.params
    const product = mongoose.Types.ObjectId.isValid(id)
      ? await Product.findById(id).lean()
      : await Product.findOne({ id }).lean()

    if (!product) {
      return response.status(404).json({ message: 'Product not found' })
    }

    response.json(product)
  } catch (error) {
    next(error)
  }
})

export default router
