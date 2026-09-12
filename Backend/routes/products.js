import { Router } from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import { Product } from '../models/Product.js'

const router = Router()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (request, file, callback) => {
    callback(null, file.mimetype.startsWith('image/'))
  },
})

router.get('/', async (request, response, next) => {
  try {
    const filter = request.query.category ? { category: request.query.category } : {}
    const products = await Product.find(filter).lean()
    response.json(products)
  } catch (error) {
    next(error)
  }
})

router.post('/', upload.single('image'), async (request, response, next) => {
  try {
    const { category, title, price, description, colors, sizes } = request.body
    if (!category || !title || !price || !description || !request.file) {
      return response.status(400).json({ message: 'Category, title, price, description, and image are required' })
    }

    const parseList = (value) => {
      try {
        const parsed = JSON.parse(value)
        return Array.isArray(parsed) ? parsed : []
      } catch (error) {
        return String(value || '').split(',').map((item) => item.trim()).filter(Boolean)
      }
    }

    const product = await Product.create({
      id: `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`,
      name: title,
      title,
      category,
      price: Number(price),
      description,
      colors: parseList(colors),
      sizes: parseList(sizes),
      inStock: true,
      image: `data:${request.file.mimetype};base64,${request.file.buffer.toString('base64')}`,
    })

    response.status(201).json(product)
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
