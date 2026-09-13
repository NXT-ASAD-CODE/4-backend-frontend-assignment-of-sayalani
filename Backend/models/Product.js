import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  id: { type: String, index: true },
}, {
  strict: false,
  timestamps: true,
})

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema)
