import User from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  sender_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender_id', referencedColumnName: 'id' })
  sender: User;

  @Column('uuid')
  recipient_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'recipient_id', referencedColumnName: 'id' })
  recipient: User;

  @Column('float8')
  amount: number;

  @CreateDateColumn()
  created_at: Date;
}

export default Transaction;
