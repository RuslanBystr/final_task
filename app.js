import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();

import userRoutes from './routes/userRoutes.js';
import adRoutes from './routes/adRoutes.js';

app.set(dotenv.config('./'));

app.use(express.json());

app.use(userRoutes);
app.use(adRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(3000, () => {
        console.log('http://localhost:3000');
    })
  })
  .catch((err) => {
    console.error('DB connection error:', err)
  });