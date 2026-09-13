import { connectToDatabase } from '../Backend/db.js'

export default async function handler(request, response) {
  try {
    const connection = await connectToDatabase()
    const ordersCollection = connection.connection.db.collection('orders')

    if (request.method === 'GET') {
      const filter = request.query.customerId ? { customerId: request.query.customerId } : {}
      const orders = await ordersCollection.find(filter).sort({ createdAt: -1 }).toArray()
      return response.status(200).json(orders)
    }

    if (request.method === 'POST') {
      const { items, total, customerId } = request.body || {}
      if (!Array.isArray(items) || items.length === 0) {
        return response.status(400).json({ message: 'At least one cart item is required' })
      }

      const order = {
        items,
        total: Number(total) || 0,
        customerId: customerId || null,
        status: 'Pending',
        createdAt: new Date(),
      }
      const result = await ordersCollection.insertOne(order)
      return response.status(201).json({ ...order, _id: result.insertedId })
    }

    if (request.method === 'PUT') {
      const { orderId, status } = request.body || {}
      if (!orderId || !['Pending', 'Approved', 'Rejected'].includes(status)) {
        return response.status(400).json({ message: 'Valid orderId and status are required' })
      }
      const { ObjectId } = await import('mongodb')
      const result = await ordersCollection.findOneAndUpdate({ _id: new ObjectId(orderId) }, { $set: { status, updatedAt: new Date() } }, { returnDocument: 'after' })
      if (!result) return response.status(404).json({ message: 'Order not found' })
      return response.status(200).json(result)
    }

    response.setHeader('Allow', 'GET, POST, PUT')
    return response.status(405).json({ message: 'Method not allowed' })
  } catch (error) {
    console.error('Order API error:', error)
    return response.status(500).json({ message: error.message || 'Order API failed' })
  }
}
