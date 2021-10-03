import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import Balance from '../infra/typeorm/entities/Balance';
import IUsersBalancesRepository from '../repositories/IUsersBalancesRepository';

class ShowUserBalanceService {
  private usersRepository: IUsersRepository;

  private usersBalancesRepository: IUsersBalancesRepository;

  constructor(
    usersRepository: IUsersRepository,
    usersBalancesRepository: IUsersBalancesRepository,
  ) {
    this.usersRepository = usersRepository;
    this.usersBalancesRepository = usersBalancesRepository;
  }

  async execute(user_id: string): Promise<Balance> {
    const user = await this.usersRepository.findByID(user_id);

    if (!user) {
      throw new AppError('Current user not found');
    }

    const balance = await this.usersBalancesRepository.findByUserID(user.id);

    if (!balance) {
      throw new AppError('Current user balance not found');
    }

    return balance;
  }
}

export default ShowUserBalanceService;
