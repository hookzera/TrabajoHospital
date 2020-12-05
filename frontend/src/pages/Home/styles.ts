import styled from 'styled-components';

export const Menu = styled.main`
  width: 100%;
  min-height: 80vh;
`;

export const Proxima = styled.div`
  a {
    width: 200px;
    height: 200px;

    font-size: 25px;
    color: black;

    margin-top: 100px;
  }
`;

export const Pacientes = styled.div`
  margin-top: 15px;

  align-items: center;
  justify-content: center;

  display: flex;
  flex-direction: column;


  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin: 0 auto;

  & + div {
    margin-top: 25px;
  }

  article {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;


    background: rgba(0, 0, 0, 0.6);
    border-radius: 8px;
    width: 450px;
    height: 50px;
    border-radius: 2px;

    span, button {
      color: white;
      font-weight: bold;
    }

    span {
      display: flex;
      flex-direction: center;
      align-items: center;
    }

    div {
      display: flex;
      flex-direction: center;
      align-items: center;

      button {
        padding: 4px;
        border-radius: 2px;
      }

      button + button {
        margin-left: 4px;
      }
    }
  }

  p {

  }

`;
