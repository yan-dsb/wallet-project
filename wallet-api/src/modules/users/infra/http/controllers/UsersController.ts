import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import BCryptHashProvider from '@modules/users/providers/implementations/BCryptHashProvider';
import { classToClass } from 'class-transformer';
import AppError from '@shared/errors/AppError';
import ListUsersByEmailService from '@modules/users/services/ListUsersByEmailService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import UsersBalancesRepository from '../../typeorm/repositories/UsersBalancesRepository';

class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const usersRepository = new UsersRepository();
    const bcryptHashProvider = new BCryptHashProvider();
    const usersBalancesRepository = new UsersBalancesRepository();
    const createUser = new CreateUserService(
      usersRepository,
      bcryptHashProvider,
      usersBalancesRepository,
    );
    const user = await createUser.execute({ name, email, password });

    return response.json(classToClass(user));
  }

  async find(request: Request, response: Response): Promise<Response> {
    const { email } = request.query;

    if (!email) {
      throw new AppError('Must provide a e-mail address to search');
    }
    const usersRepository = new UsersRepository();

    const listUsersByEmail = new ListUsersByEmailService(usersRepository);
    const users = await listUsersByEmail.execute({ email: email.toString() });

    return response.json(classToClass(users));
  }
}

export default UsersController;
