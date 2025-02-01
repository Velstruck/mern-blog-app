import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import AuthRoute from './routes/Auth.route.js';
import UserRoute from './routes/User.route.js';

dotenv.config();


const PORT = process.env.PORT || 3000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

// Routes setup
app.use('/api/auth',AuthRoute)
app.use('/api/user',UserRoute)



mongoose.connect(process.env.MONGODB_CONN, {dbName:"mern-blog"})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log("Failed to connect to MongoDB",err))


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const  message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
})