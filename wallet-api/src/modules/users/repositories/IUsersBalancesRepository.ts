import IUpdateBalanceDTO from '../dtos/IUpdateBalanceDTO';
import Balance from '../infra/typeorm/entities/Balance';

export default interface IUsersBalancesRepository {
  findByUserID(user_id: string): Promise<Balance | undefined>;
  create(user_id: string): Promise<void>;
  update(data: IUpdateBalanceDTO): Promise<void>;
}
