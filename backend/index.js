import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with { type: 'json' };


dotenv.config()

connectDB();


const app = express();

const corsOptions = {
  origin: 'https://fimoneyfrontend.vercel.app', 
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/auth', authRoutes);
app.use('/api/products',productRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server running on ${PORT}`));
