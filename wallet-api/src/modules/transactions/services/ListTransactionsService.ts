import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import Transaction from '../infra/typeorm/entities/Transaction';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

class ListTransactionsService {
  private transactionsRepository: ITransactionsRepository;

  private usersRepository: IUsersRepository;

  constructor(
    transactionsRepository: ITransactionsRepository,
    usersRepository: IUsersRepository,
  ) {
    this.transactionsRepository = transactionsRepository;
    this.usersRepository = usersRepository;
  }

  async execute(user_id: string): Promise<Transaction[] | undefined> {
    const user = await this.usersRepository.findByID(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const transactions = await this.transactionsRepository.findAllTransactions(
      user_id,
    );
    if (!transactions) {
      throw new AppError('No transactions found');
    }

    return transactions;
  }
}

export default ListTransactionsService;
