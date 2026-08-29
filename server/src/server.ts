import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Mount API router
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`🌾 Smart Krishi Assistant Backend listening on port ${PORT}`);
});
