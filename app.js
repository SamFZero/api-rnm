import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import qrRoutes from './routes/qr.js';
import 'dotenv/config';
const app = express()

await connectDB();

app.use(cors());
app.use(express.json());
app.disable('x-powered-by')

app.use('/api/qr-codes', qrRoutes);

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log(`Server listening to  ${PORT}`)
})