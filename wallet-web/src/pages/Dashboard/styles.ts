import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  button {
    margin-right: 50px;
    position: absolute;
    right: 0;
    background-color: #c53030;
    color: #fff;
    width: 10%;

    &:hover {
      background-color: ${shade(0.2, '#c53030')};
    }
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

  div {
    height: 50%;
  }
`;

export const AccountBalance = styled.div`
  position: relative;
  width: 100%;
  height: 30%;
  color: #000000;
  > h1 {
    text-align: center;
    margin-top: 20px;
    font-size: 25px;
  }

  a {
    color: #000000;
    font-size: 16px;

    text-decoration: none;
    h1 {
      margin: 30px 0 0 30px;
      font-weight: bold;
      font-size: 16px;
    }

    p {
      margin: 10px 0 0 30px;
      font-weight: bold;
    }

    svg {
      display: block;
      position: absolute;
      top: 50%;
      right: 50px;
      transform: translateY(-50%);
    }
  }
`;

export const Transfer = styled.div`
  display: flex;
  height: 50%;
  flex-direction: column;
  align-items: center;
  place-content: center;
  a {
    display: flex;
    align-items: center;
    place-content: center;
    width: 86px;
    height: 86px;
    background-color: #e5e5e5;
    border-radius: 50%;

    &:hover {
      background-color: ${shade(0.2, '#E5E5E5')};
    }

    img {
      position: absolute;
    }
  }

  p {
    margin-top: 10px;

    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;

    color: #000000;
  }
`;
