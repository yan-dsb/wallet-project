import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  email: string;
}

class ListUsersByEmailService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ email }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.find(email);

    if (users.length <= 0) {
      throw new AppError('No user found with this e-mail', 404);
    }

    return users;
  }
}

export default ListUsersByEmailService;
