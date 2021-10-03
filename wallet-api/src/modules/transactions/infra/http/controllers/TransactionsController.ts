import CreateTransactionService from '@modules/transactions/services/CreateTransactionService';
import ListTransactionsService from '@modules/transactions/services/ListTransactionsService';
import UsersBalancesRepository from '@modules/users/infra/typeorm/repositories/UsersBalancesRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import TransactionsRepository from '../../typeorm/repositories/TransactionsRepository';

class TransactionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { recipient_id, amount } = request.body;

    const transactionsRepository = new TransactionsRepository();
    const usersRepository = new UsersRepository();
    const usersBalancesRepository = new UsersBalancesRepository();

    const createTransaction = new CreateTransactionService(
      transactionsRepository,
      usersRepository,
      usersBalancesRepository,
    );
    if (Number.isNaN(parseFloat(amount))) {
      throw new AppError('Amount is not a valid number');
    }
    const transaction = await createTransaction.execute({
      sender_id: id,
      recipient_id,
      amount,
    });

    return response.json(transaction);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const transactionsRepository = new TransactionsRepository();
    const usersRepository = new UsersRepository();

    const listTransactions = new ListTransactionsService(
      transactionsRepository,
      usersRepository,
    );

    const transactions = await listTransactions.execute(id);
    return response.json(transactions);
  }
}

export default TransactionsController;
