import { connectToDatabase } from '../Backend/db.js'

export default async function handler(request, response) {
  try {
    const connection = await connectToDatabase()
    const ordersCollection = connection.connection.db.collection('orders')

    if (request.method === 'GET') {
      const orders = await ordersCollection.find({}).sort({ createdAt: -1 }).toArray()
      return response.status(200).json(orders)
    }

    if (request.method === 'POST') {
      const { items, total } = request.body || {}
      if (!Array.isArray(items) || items.length === 0) {
        return response.status(400).json({ message: 'At least one cart item is required' })
      }

      const order = {
        items,
        total: Number(total) || 0,
        status: 'Pending',
        createdAt: new Date(),
      }
      const result = await ordersCollection.insertOne(order)
      return response.status(201).json({ ...order, _id: result.insertedId })
    }

    response.setHeader('Allow', 'GET, POST')
    return response.status(405).json({ message: 'Method not allowed' })
  } catch (error) {
    console.error('Order API error:', error)
    return response.status(500).json({ message: error.message || 'Order API failed' })
  }
}
