import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  link {
    position: absolute;
    left: 0;
  }
  height: 100vh;
  background: #1e3539;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;

  width: 100%;
  h1 {
    color: #fff;
    margin-bottom: 20px;
  }
  > div {
    color: #000;
    min-height: 90vh;
    overflow: auto;
    border-radius: 2%;
    place-content: unset;
  }
`;

export const TransactionInfo = styled.div`
  padding: 20px;
  position: relative;
  width: 80%;
  box-shadow: 1px 0px gray, 0 0 0.4em gray;
  border-radius: 2%;
  margin: 5px;

  svg {
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  p {
    margin-left: 30px;
  }
`;

export const Item = styled.div`
  color: ${shade(0.2, '#e5e5e5')};
`;
