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

const createProduct = async (request, response, next) => {
  try {
    const { category, title, price, description, colors, sizes, imageUrl } = request.body
    const image = request.file
      ? `data:${request.file.mimetype};base64,${request.file.buffer.toString('base64')}`
      : String(imageUrl || '').trim()

    if (!category || !title || !price || !description || !image) {
      return response.status(400).json({ message: 'Category, title, price, description, and image link are required' })
    }

    const parseList = (value) => {
      if (Array.isArray(value)) return value

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
      image,
    })

    response.status(201).json(product)
  } catch (error) {
    next(error)
  }
}

router.post('/', (request, response, next) => {
  if (request.is('multipart/form-data')) {
    return upload.single('image')(request, response, (error) => {
      if (error) return next(error)
      createProduct(request, response, next)
    })
  }

  createProduct(request, response, next)
})

router.put('/:id', async (request, response, next) => {
  try {
    const { id } = request.params
    const updates = { ...request.body }
    if (typeof updates.price !== 'undefined') updates.price = Number(updates.price)
    if (typeof updates.colors === 'string') updates.colors = updates.colors.split(',').map((item) => item.trim()).filter(Boolean)
    if (typeof updates.sizes === 'string') updates.sizes = updates.sizes.split(',').map((item) => item.trim()).filter(Boolean)

    const product = mongoose.Types.ObjectId.isValid(id)
      ? await Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).lean()
      : await Product.findOneAndUpdate({ id }, updates, { new: true, runValidators: true }).lean()

    if (!product) return response.status(404).json({ message: 'Product not found' })
    response.json(product)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (request, response, next) => {
  try {
    const { id } = request.params
    const result = mongoose.Types.ObjectId.isValid(id)
      ? await Product.findByIdAndDelete(id)
      : await Product.findOneAndDelete({ id })

    if (!result) return response.status(404).json({ message: 'Product not found' })
    response.json({ message: 'Product deleted' })
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
