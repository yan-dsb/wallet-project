import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { AxiosError } from 'axios';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { Container, Content, AccountBalance, Transfer } from './styles';
import Button from '../../components/Button';

import Card from '../../components/Card';

import { formatter } from '../../utils/Currency';
import { useBalance } from '../../hooks/balance';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const { addToast } = useToast();
  const { setBalance, balance } = useBalance();

  useEffect(() => {
    const getBalance = async () => {
      try {
        await setBalance();
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
    getBalance();
  }, [setBalance, signOut, addToast]);
  return (
    <Container>
      <Button onClick={signOut}>Sair</Button>

      <Content>
        <Card>
          <AccountBalance>
            <h1>Bem vindo, {user.name.split(' ')[0]}</h1>

            {balance && (
              <Link to="/transactions">
                <h1>Conta</h1>
                <p>{formatter.format(balance.amount)}</p>
                <FiArrowRight color="#E5E5E5" size={40} />
              </Link>
            )}
          </AccountBalance>
          <Transfer>
            <Link to="/transfer">
              <FaMoneyBillAlt color="#ffff" size={40} />
            </Link>
            <p>Transferir</p>
          </Transfer>
        </Card>
      </Content>
    </Container>
  );
};

export default Dashboard;
