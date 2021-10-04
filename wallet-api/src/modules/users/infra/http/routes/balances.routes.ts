import { Router } from 'express';
import BalancesController from '@modules/users/infra/http/controllers/BalancesController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const balanceController = new BalancesController();
const balancesRouter = Router();

balancesRouter.get('/', ensureAuthenticated, balanceController.show);

export default balancesRouter;
