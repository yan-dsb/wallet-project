import React from 'react';
import { AnimationContainer } from './styles';

const Card: React.FC = ({ children, ...rest }) => (
  <AnimationContainer {...rest}>{children}</AnimationContainer>
);

export default Card;
