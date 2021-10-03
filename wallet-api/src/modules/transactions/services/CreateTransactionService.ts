import IUsersBalancesRepository from '@modules/users/repositories/IUsersBalancesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { validate } from 'uuid';
import Transaction from '../infra/typeorm/entities/Transaction';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

interface IRequest {
  sender_id: string;
  recipient_id: string;
  amount: number;
}

class CreateTransactionService {
  private transactionsRepository: ITransactionsRepository;

  private usersRepository: IUsersRepository;

  private usersBalancesRepository: IUsersBalancesRepository;

  constructor(
    transactionsRepository: ITransactionsRepository,
    usersRepository: IUsersRepository,
    usersBalancesRepository: IUsersBalancesRepository,
  ) {
    this.transactionsRepository = transactionsRepository;
    this.usersRepository = usersRepository;
    this.usersBalancesRepository = usersBalancesRepository;
  }

  async execute({
    sender_id,
    recipient_id,
    amount,
  }: IRequest): Promise<Transaction> {
    if (!validate(recipient_id)) {
      throw new AppError('Recipient not found');
    }

    if (sender_id === recipient_id) {
      throw new AppError('You cannot send money to yourself');
    }

    const sender = await this.usersRepository.findByID(sender_id);

    if (!sender) {
      throw new AppError('Sender not found');
    }

    const recipient = await this.usersRepository.findByID(recipient_id);

    if (!recipient) {
      throw new AppError('Recipient not found');
    }

    const senderBalance = await this.usersBalancesRepository.findByUserID(
      sender_id,
    );

    if (senderBalance) {
      if (senderBalance.amount < amount) {
        throw new AppError('Insufficient sender balance amount');
      }
      const newSenderBalanceAmount = senderBalance.amount - amount;
      await this.usersBalancesRepository.update({
        id: senderBalance.id,
        amount: newSenderBalanceAmount,
      });
    }

    const recipientBalance = await this.usersBalancesRepository.findByUserID(
      recipient_id,
    );

    if (recipientBalance) {
      const newRecipientBalanceAmount = recipientBalance.amount + amount;
      await this.usersBalancesRepository.update({
        id: recipientBalance.id,
        amount: newRecipientBalanceAmount,
      });
    }

    const transaction = await this.transactionsRepository.create({
      sender_id,
      recipient_id,
      amount,
    });

    return transaction;
  }
}

export default CreateTransactionService;
