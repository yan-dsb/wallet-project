import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import TransactionsController from '../controllers/TransactionsController';

const transactionsRouter = Router();

const transactionsController = new TransactionsController();

transactionsRouter.use(ensureAuthenticated);

transactionsRouter.post('/', transactionsController.create);
transactionsRouter.get('/', transactionsController.show);

export default transactionsRouter;
