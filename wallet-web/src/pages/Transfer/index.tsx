import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiArrowRight } from 'react-icons/fi';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { AxiosError } from 'axios';
import Button from '../../components/Button';
import { Container, Content } from './styles';

import Card from '../../components/Card';
import Input from '../../components/Input';
import { formatter, toFloat } from '../../utils/Currency';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';

interface TransferData {
  amount: string;
  recipient_id: string;
}

interface UserSelectedData {
  id: string;
  email: string;
}

const Transfer: React.FC = () => {
  const { addToast } = useToast();
  const { signOut, user } = useAuth();

  const formRefSearch = useRef<FormHandles>(null);
  const formRefTransfer = useRef<FormHandles>(null);

  const [userSelected, setUserSelected] = useState<UserSelectedData | null>(
    null,
  );

  const handleSearchSubmit = useCallback(
    async (data: UserSelectedData) => {
      try {
        formRefSearch.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });
        await schema.validate(data, { abortEarly: false });
        const response = await api.get<UserSelectedData[]>('/users', {
          params: { email: data.email },
        });
        setUserSelected(response.data[0]);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRefSearch.current?.setErrors(errors);
          return;
        }
        setUserSelected(null);

        const err = error as AxiosError;
        if (err.response?.status === 401) {
          addToast({
            type: 'error',
            title: 'Sessão expirada',
            description: 'Faça logon novamente pra continuar',
          });
          signOut();
          return;
        }

        addToast({
          type: 'error',
          title: 'Usuário não encontrado',
          description: 'Tente novamente',
        });
      }
    },
    [signOut, addToast],
  );

  const handleTransferSubmit = useCallback(
    async (data: TransferData) => {
      try {
        await api.post('/transactions', {
          recipient_id: userSelected?.id,
          amount: toFloat(data.amount),
        });
        user.balance.amount -= toFloat(data.amount);
        addToast({
          type: 'success',
          title: 'Transferência realizada com sucesso',
        });
        formRefSearch.current?.reset();
        formRefTransfer.current?.reset();
        setUserSelected(null);
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 401) {
          addToast({
            type: 'error',
            title: 'Sessão expirada',
            description: 'Faça logon novamente pra continuar',
          });
          signOut();

          return;
        }
        addToast({
          type: 'error',
          title: 'Algo de errado aconteceu ao transferir',
          description: 'Tente novamente',
        });
      }
    },
    [signOut, addToast, userSelected, user],
  );
  return (
    <Container>
      <Link to="/">
        <FiArrowLeft color="#fff" size={40} />
      </Link>
      <Content>
        <Card>
          <h3>Pra quem você quer transferir?</h3>
          <p>Digite o e-mail logo abaixo e busque</p>
          <Form ref={formRefSearch} onSubmit={handleSearchSubmit}>
            <Input type="email" icon={FiMail} name="email" />
            <Button type="submit">Buscar</Button>
          </Form>
        </Card>

        {userSelected && (
          <>
            <FiArrowRight color="#fff" size={40} />
            <Card>
              <h3>Transferindo para: {userSelected.email}</h3>
              <p>
                Saldo disponível:{' '}
                <strong>{formatter.format(user.balance.amount)}</strong>
              </p>
              <p>Qual é o valor da transferência?</p>
              <Form ref={formRefTransfer} onSubmit={handleTransferSubmit}>
                <Input
                  mask="currency"
                  type="text"
                  icon={FaMoneyBillAlt}
                  name="amount"
                />
                <Button type="submit">Confirmar</Button>
                <Button
                  isCancel
                  onClick={() => {
                    formRefSearch.current?.reset();
                    formRefTransfer.current?.reset();
                    setUserSelected(null);
                  }}
                >
                  Cancelar
                </Button>
              </Form>
            </Card>
          </>
        )}
      </Content>
    </Container>
  );
};

export default Transfer;
