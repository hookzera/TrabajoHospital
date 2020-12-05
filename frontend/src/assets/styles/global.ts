import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    border: none;
    box-sizing: border-box;
  }

  body {
    font: 16px Roboto, sans-serif;
    background: #f6f6f6;
    width: 100vw;
    min-height: 100vh;
  }

  #app {
    width: 70vw;
    min-height: 100vh;
    background: #f6f6f6;
    border-radius: 1rem;

    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

`;
