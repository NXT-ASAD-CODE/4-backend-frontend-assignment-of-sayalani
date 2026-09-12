import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { connectToDatabase } from './db.js'
import productsRouter from './routes/products.js'

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/api/health', async (request, response) => {
  try {
    await connectToDatabase()
    response.json({
      status: 'ok',
      database: 'connected',
      source: 'mongodb',
    })
  } catch (error) {
    console.error('MongoDB health check failed:', error.message)
    response.status(500).json({
      status: 'error',
      database: 'disconnected',
      source: 'mongodb',
      message: error.message,
    })
  }
})

app.get('/api/dashboard/stats', async (request, response, next) => {
  try {
    const connection = await connectToDatabase()
    const database = connection.connection.db
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - 5, 1)
    startDate.setHours(0, 0, 0, 0)
    const [products, users, orders] = await Promise.all([
      database.collection('products').countDocuments(),
      database.collection('users').countDocuments(),
      database.collection('orders').countDocuments(),
    ])
    const salesByMonth = await database.collection('orders').aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          total: {
            $sum: {
              $convert: {
                input: { $ifNull: ['$total', '$amount'] },
                to: 'double',
                onError: 0,
                onNull: 0,
              },
            },
          },
        },
      },
    ]).toArray()
    const salesByMonthMap = new Map(salesByMonth.map((item) => [item._id, item.total]))
    const salesOverview = Array.from({ length: 6 }, (_, index) => {
      const month = new Date(startDate)
      month.setMonth(startDate.getMonth() + index)
      return {
        label: month.toLocaleString('en-US', { month: 'short' }),
        value: salesByMonthMap.get(`${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}`) || 0,
      }
    })

    response.json({ products, users, orders, salesOverview })
  } catch (error) {
    next(error)
  }
})

app.use('/api/products', async (request, response, next) => {
  try {
    await connectToDatabase()
    next()
  } catch (error) {
    next(error)
  }
}, productsRouter)

app.use((error, request, response, next) => {
  console.error(error)
  response.status(500).json({ message: 'Internal server error' })
})

if (!process.env.VERCEL) {
  connectToDatabase()
    .then(() => {
      app.listen(port, () => {
        console.log(`API server running on http://localhost:${port}`)
      })
    })
    .catch((error) => {
      console.error('MongoDB connection failed:', error.message)
      process.exitCode = 1
    })
}

export default app
