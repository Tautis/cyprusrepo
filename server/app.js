import express from 'express'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import blogRoutes from './routes/blogs.js'
import authRoutes from './routes/auth.js'
import cookieParser from 'cookie-parser'
import cron from 'node-cron';
import updateExchangeRates from './cron/echange.js'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors());
app.use("/api/auth",authRoutes)
app.use("/api/posts",postRoutes)
app.use("/api/blogs",blogRoutes)
app.listen(8800,()=>{
    console.log("Connected!")
    cron.schedule('0 0 * * *', updateExchangeRates).start();
})