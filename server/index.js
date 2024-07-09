import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './db.js';
import { AdminRouter } from './routes/auth.js';
import { studentRouter } from './routes/student.js';
import { bookRouter } from './routes/book.js';
import { Book } from './models/Book.js';
import { Student } from './models/Student.js';
import { Admin } from './models/Admin.js';
const RegisterModel = require('./models/Register');

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: ['http://localhost:5173'],
        credentials: true,
    })
);
app.use((req, res, next) => {
    res.setHeader(
        'Access-Control-Allow-Origin',
        'https://lms-frontend-xi-six.vercel.app'
    );
    next();
});
app.use(cookieParser());
dotenv.config();
app.use('/auth', AdminRouter);
app.use('/student', studentRouter);
app.use('/book', bookRouter);

app.get('/dashboard', async (req, res) => {
    try {
        const student = await Student.countDocuments();
        const admin = await Admin.countDocuments();
        const book = await Book.countDocuments();
        return res.json({ ok: true, student, book, admin });
    } catch (err) {
        return res.json(err);
    }
});

app.listen(process.env.PORT, () => {
    console.log('server is running');
});
