import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface BalanceData {
  amount: number;
}

interface BalanceContextData {
  balance: BalanceData;
  setBalance(): Promise<void>;
}

export const BalanceContext = createContext<BalanceContextData>(
  {} as BalanceContextData,
);

interface BalanceState {
  balance: BalanceData;
}

export const BalanceProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<BalanceState>(() => {
    const balance = localStorage.getItem('@Wallet:balance');
    if (balance) {
      return { balance: JSON.parse(balance) };
    }
    return {} as BalanceState;
  });

  const setBalance = useCallback(async () => {
    const response = await api.get('/balance');

    const balance = response.data;

    localStorage.setItem('@Wallet:balance', JSON.stringify(balance));
    setData({ balance });
  }, []);

  return (
    <BalanceContext.Provider value={{ balance: data.balance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export function useBalance(): BalanceContextData {
  const context = useContext(BalanceContext);

  if (!context) {
    throw new Error('useBalance must be used within an BalanceProvider');
  }
  return context;
}
