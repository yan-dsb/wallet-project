import { Request, Response } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import BCryptHashProvider from '@modules/users/providers/implementations/BCryptHashProvider';
import { classToClass } from 'class-transformer';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import UsersBalancesRepository from '../../typeorm/repositories/UsersBalancesRepository';

class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const usersRepository = new UsersRepository();
    const bcryptHashProvider = new BCryptHashProvider();
    const usersBalancesRepository = new UsersBalancesRepository();
    const createUser = new AuthenticateUserService(
      usersRepository,
      bcryptHashProvider,
      usersBalancesRepository,
    );
    const user = await createUser.execute({ email, password });

    return response.json(classToClass(user));
  }
}

export default SessionsController;
