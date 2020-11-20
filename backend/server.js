import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

// Importing the .env file at the root.
dotenv.config()

connectDB()

const app = express()

// It allow us to accept JSON in the body.
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running')
})

// That's why we're not using the entire url in the routes.
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

// Middlewares to handle errors
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
)
