import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import UsersController from '@modules/users/infra/http/controllers/UsersController';

const usersController = new UsersController();
const usersRouter = Router();

usersRouter.post('/', usersController.create);
usersRouter.get('/', ensureAuthenticated, usersController.find);

export default usersRouter;
