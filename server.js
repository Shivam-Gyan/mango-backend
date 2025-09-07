import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from './config/mongoose.config.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', authRoutes);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});