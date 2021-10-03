import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isCancel?: boolean;
}

const Input: React.FC<ButtonProps> = ({ isCancel, children, ...rest }) => (
  <Container isCancel={isCancel} type="button" {...rest}>
    {children}
  </Container>
);

export default Input;
