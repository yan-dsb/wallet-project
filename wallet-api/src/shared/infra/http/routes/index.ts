import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
// import balancesRouter from '@modules/users/infra/http/routes/balances.routes';
import transactionsRouter from '@modules/transactions/infra/http/routes/transactions.routes';

const routes = Router();

routes.use('/users', usersRouter);

routes.use('/sessions', sessionsRouter);

// Comentado pois está na relação com a tabela users, não precisando fazer mais uma requisição na API para obter o saldo.
// routes.use('/balances', balancesRouter);

routes.use('/transactions', transactionsRouter);

export default routes;
