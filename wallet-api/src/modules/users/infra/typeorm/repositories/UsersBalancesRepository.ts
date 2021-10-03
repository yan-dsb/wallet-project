import { Repository, getRepository } from 'typeorm';
import IUsersBalancesRepository from '@modules/users/repositories/IUsersBalancesRepository';
import IUpdateBalanceDTO from '@modules/users/dtos/IUpdateBalanceDTO';
import Balance from '../entities/Balance';

class UsersBalancesRepository implements IUsersBalancesRepository {
  private ormRepository: Repository<Balance>;

  constructor() {
    this.ormRepository = getRepository(Balance);
  }

  async findByUserID(user_id: string): Promise<Balance | undefined> {
    const balance = await this.ormRepository.findOne({
      user_id,
    });

    return balance;
  }

  async create(user_id: string): Promise<void> {
    const balance = this.ormRepository.create({ user_id });
    await this.ormRepository.save(balance);
  }

  async update({ id, amount }: IUpdateBalanceDTO): Promise<void> {
    await this.ormRepository.save({ id, amount });
  }
}

export default UsersBalancesRepository;
