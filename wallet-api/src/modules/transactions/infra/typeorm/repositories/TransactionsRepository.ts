import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import { getRepository, Repository, getManager } from 'typeorm';
import Transaction from '../entities/Transaction';

class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  async create({
    sender_id,
    recipient_id,
    amount,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const balance = this.ormRepository.create({
      sender_id,
      recipient_id,
      amount,
    });
    await this.ormRepository.save(balance);
    return balance;
  }

  async findAllTransactions(
    user_id: string,
  ): Promise<Transaction[] | undefined> {
    // const transactions = this.ormRepository.find({
    //   where: [
    //     {
    //       sender_id: user_id,
    //     },
    //     {
    //       recipient_id: user_id,
    //     },
    //   ],
    // });
    const entityManager = getManager();
    const transactions = await entityManager.query(
      `
    select
      t.id,
      t.amount,
      t.created_at,
      t.recipient_id,
      t.sender_id,
      sender.name as sender,
      recipient.name as recipient
    from
      transactions t
    inner join users sender on
      sender.id = t.sender_id
    inner join users recipient on
      recipient.id = t.recipient_id
    where sender.id = $1 or recipient.id  = $1
    order by t.created_at DESC
    `,
      [user_id],
    );

    return transactions;
  }
}

export default TransactionsRepository;
