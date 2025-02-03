import { createGlobalStyle } from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GlobalStyles = createGlobalStyle`
  /* Reset global */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Estilização do Body */
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    background-color: #f5f5f5;
    color: #333;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Estilização de Títulos e Textos */
  h1 {
    font-size: 2rem;
    color: #ffffff;
    text-align: center;
  }

  p {
    font-size: 1rem;
    color: #ffffff;
    text-align: center;
    margin-bottom: 20px;
  }

  /* Inputs */
  input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
  }

  /* Botões */
  button {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    background-color: #28a745;
    color: #fff;
    font-weight: bold;
  }

  button:hover {
    background-color: #218838;
  }

  /* Containers de Login e Cadastro */
  .signup-container, .login-container {
    width: 90%;
    max-width: 400px;
    background-color: #2a2a2a;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  /* Imagens responsivas */
  @media (max-width: 375px) {
    img {
      max-width: 100%;
      height: auto;
    }

    button {
      width: auto;
      height: auto;
    }
  }
`;

export default GlobalStyles;
