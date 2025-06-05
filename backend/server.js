import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import cloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

const app = express()

// Remove second cors middleware and place it before routes
app.use(cors({
    origin: ['https://forever-frontend-bice-omega.vercel.app', 'https://forever-admin-inky.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'token']
}))

// Middleware
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.json({ message: "API Working" })
})

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ success: false, message: err.message })
})

// Connect to MongoDB
connectDB()

// For local development
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 4000
    app.listen(port, () => console.log('Server started on PORT:' + port))
}

// For Vercel
export default app