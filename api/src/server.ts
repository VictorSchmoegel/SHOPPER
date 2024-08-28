import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './services/db';
import imgRoutes from './routes/imageRoutes';
import router from './routes/route';

dotenv.config();

const app = express();

connectDb();

app.use(express.json());
app.use('/api', imgRoutes);
app.use('/', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});