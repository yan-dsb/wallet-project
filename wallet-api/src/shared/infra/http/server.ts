// Pacote para usar decorators (annotations) com typescript
import 'reflect-metadata';

// Pacote usado pra tratar erros de funcoes com async/await
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import '@shared/infra/typeorm';

import AppError from '@shared/errors/AppError';

import routes from './routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// Middleware pra tratar os erros ocorridos na aplicacao
app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: 'error', message: error.message });
    }
    console.error(error);
    return response
      .status(500)
      .json({ status: 'error', message: 'Internal server error' });
  },
);

// Tratar paginas nao encontradas
app.get('*', (_: Request, response: Response) => {
  return response.status(404).json({ message: 'PAGE NOT FOUND' });
});

app.post('*', (_: Request, response: Response) => {
  return response.status(404).json({ message: 'PAGE NOT FOUND' });
});

app.listen(`${process.env.PORT}`, () => {
  console.log(`Server started listening on port ${process.env.PORT}`);
});
