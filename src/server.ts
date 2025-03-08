import express from 'express';
import cors from 'cors';
import userController from './users/user.controller';
import { errorHandler } from './_middleware/error-handler'; 
import { Request, Response, NextFunction } from 'express';
import "reflect-metadata";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

app.use('/users', userController);
interface Error {
    message: string;
    status?: number;
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

import { AppDataSource } from './_helpers/db'; 

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });


