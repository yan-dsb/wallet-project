import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/models/IHashProvider';
import IUsersBalancesRepository from '../repositories/IUsersBalancesRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  private usersRepository: IUsersRepository;

  private hashProvider: IHashProvider;

  private usersBalancesRepository: IUsersBalancesRepository;

  constructor(
    usersRepository: IUsersRepository,
    hashProvider: IHashProvider,
    usersBalancesRepository: IUsersBalancesRepository,
  ) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
    this.usersBalancesRepository = usersBalancesRepository;
  }

  async execute({ name, email, password }: IRequest): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('A user already exists with this e-mail');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.usersBalancesRepository.create(user.id);

    return user;
  }
}

export default CreateUserService;
