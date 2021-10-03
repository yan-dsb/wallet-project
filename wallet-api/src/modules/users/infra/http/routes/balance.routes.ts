import { Router } from 'express';
import BalanceController from '@modules/users/infra/http/controllers/BalanceController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const balanceController = new BalanceController();
const balanceRouter = Router();

balanceRouter.get('/', ensureAuthenticated, balanceController.show);

export default balanceRouter;
