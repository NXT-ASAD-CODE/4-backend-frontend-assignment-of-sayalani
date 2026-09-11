import mongoose from 'mongoose'

let cachedConnection = null

export const connectToDatabase = async () => {
  if (cachedConnection) {
    return cachedConnection
  }

  const mongoUri = process.env.MONGO_URI
  if (!mongoUri) {
    throw new Error('MONGO_URI is not configured')
  }

  cachedConnection = mongoose.connect(mongoUri).then((connection) => {
    console.log(`MongoDB connected to database: ${connection.connection.name}`)
    return connection
  }).catch((error) => {
    cachedConnection = null
    throw error
  })
  return cachedConnection
}
