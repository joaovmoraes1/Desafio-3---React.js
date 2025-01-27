import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: #f5f5f5;
    color: #333;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

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

  input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
  }

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

  .signup-container, .login-container {
    width: 90%;
    max-width: 400px;
    background-color: #2a2a2a;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  /* Global Styles */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

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
