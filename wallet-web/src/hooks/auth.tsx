import React, { createContext, useCallback, useState, useContext } from 'react';
import { AxiosResponse } from 'axios';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}
interface BalanceData {
  amount: number;
}
interface UserData {
  id: string;
  name: string;
  email: string;
  balance: BalanceData;
}

interface AuthContextData {
  user: UserData;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

interface AuthState {
  token: string;
  user: UserData;
}

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Wallet:token');
    const user = localStorage.getItem('@Wallet:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response: AxiosResponse<AuthState> = await api.post('/sessions', {
      email,
      password,
    });
    const { token, user } = response.data;

    localStorage.setItem('@Wallet:token', token);
    localStorage.setItem('@Wallet:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Wallet:token');
    localStorage.removeItem('@Wallet:user');

    setData({} as AuthState);
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
