import React, { useEffect, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { format } from 'date-fns';
import { AxiosError } from 'axios';
import api from '../../services/api';
import { Container, Content, TransactionInfo, Item } from './styles';
import Card from '../../components/Card';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import { formatter } from '../../utils/Currency';
import { useBalance } from '../../hooks/balance';

interface IUserTransactions {
  id: string;
  created_at: string;
  sender_id: string;
  recipient_id: string;
  amount: number;
  sender: string;
  recipient: string;
}

const Transactions: React.FC = () => {
  const { signOut, user } = useAuth();
  const { addToast } = useToast();
  const { balance } = useBalance();
  const [userTransactions, setUserTransactions] =
    useState<IUserTransactions[]>();

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await api.get<IUserTransactions[]>('/transactions');

        setUserTransactions(response.data);
      } catch (error) {
        signOut();
        const err = error as AxiosError;
        if (err.response?.status === 401) {
          addToast({
            type: 'error',
            title: 'Sessão expirada',
            description: 'Faça logon novamente pra continuar',
          });
        }
      }
    };
    getTransactions();
  }, [signOut, addToast]);
  return (
    <Container>
      <Link to="/">
        <FiArrowLeft color="#fff" size={40} />
      </Link>

      <Content>
        <h1>Saldo Atual: {formatter.format(balance.amount)}</h1>

        <Card>
          <h3>Histórico</h3>
          {userTransactions &&
            userTransactions.map(transaction => {
              const created_at = new Date(transaction.created_at);
              return (
                <TransactionInfo key={transaction.id}>
                  {user.id === transaction.sender_id ? (
                    <Item>
                      <p>Transferência Enviada</p>
                      <FaAngleUp color="#c53030" size={40} />
                      <p>{transaction.recipient} </p>
                    </Item>
                  ) : (
                    <Item>
                      <p>Transferência Recebida</p>
                      <FaAngleDown color="#2e656a" size={40} />
                      <p>{transaction.sender} </p>
                    </Item>
                  )}

                  <p>{formatter.format(transaction.amount)}</p>
                  <p>{format(created_at, "dd/MM/yyyy 'às' HH:mm'h'")}</p>
                </TransactionInfo>
              );
            })}
        </Card>
      </Content>
    </Container>
  );
};

export default Transactions;
