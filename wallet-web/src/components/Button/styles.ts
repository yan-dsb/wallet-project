import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ButtonProps {
  isCancel?: boolean;
}

export const Container = styled.button<ButtonProps>`
  background: #266d82;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #fff;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;

  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#266d82')};
  }

  ${props =>
    props.isCancel &&
    css`
      background: #c53030;
      &:hover {
        background: ${shade(0.2, '#c53030')};
      }
    `}
`;
