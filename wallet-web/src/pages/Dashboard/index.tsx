import React from 'react';
import { Link } from 'react-router-dom';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import { Container, Content, AccountBalance, Transfer } from './styles';
import Button from '../../components/Button';

import Card from '../../components/Card';

import { formatter } from '../../utils/Currency';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Button onClick={signOut}>Sair</Button>

      <Content>
        <Card>
          <AccountBalance>
            <h1>Bem vindo, {user.name.split(' ')[0]}</h1>

            {user.balance.amount && (
              <Link to="/transactions">
                <h1>Conta</h1>
                <p>{formatter.format(user.balance.amount)}</p>
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
