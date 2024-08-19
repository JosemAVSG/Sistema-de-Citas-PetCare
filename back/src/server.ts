import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes';
import useRouter from './routes/userRoute';
import turnsRouter from './routes/turnRoute';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true

}
));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

app.use('/', router);
app.use('/', useRouter);
app.use('/', turnsRouter);
export default app;