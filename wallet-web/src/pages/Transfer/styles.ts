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
  flex-direction: row;
  align-items: center;
  place-content: center;
  width: 100%;
  > svg {
    margin: 10px;
  }
  p strong {
    font-weight: 800;
  }
  > div {
    height: 50%;
  }
  div {
    form {
      margin-top: 10px;
      width: 80%;
      height: 50%;
      div {
        margin: unset;
      }
      button {
        align-items: center;
        place-content: center;
      }
    }
  }

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
