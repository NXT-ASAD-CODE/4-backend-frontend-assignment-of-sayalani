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
    response.json({ status: 'ok', database: 'connected' })
  } catch (error) {
    response.status(500).json({ status: 'error', database: 'disconnected' })
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
