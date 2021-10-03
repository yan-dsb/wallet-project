import { Request, Response } from 'express';
import ShowUserBalanceService from '@modules/users/services/ShowUserBalanceService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import UsersBalancesRepository from '../../typeorm/repositories/UsersBalancesRepository';

class BalanceController {
  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const usersRepository = new UsersRepository();
    const usersBalancesRepository = new UsersBalancesRepository();
    const showUserBalance = new ShowUserBalanceService(
      usersRepository,
      usersBalancesRepository,
    );
    const balance = await showUserBalance.execute(id);

    return response.json(balance);
  }
}

export default BalanceController;
