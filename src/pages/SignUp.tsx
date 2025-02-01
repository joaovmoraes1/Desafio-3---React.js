import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook para navegação entre páginas
import styles from "../styles/SignUp.module.css"; 

// Importação de imagens utilizadas no design
import bgImage from "../assets/background.jpg"; 
import googleButtonImage from "../assets/Sing up with Google.png"; 
import signInHereImage from "../assets/Sign In here Google.png";
import statusBarImage from "../assets/Status Bar.png";

// Importação das funções de autenticação do Firebase
import { createUserWithEmailAndPassword } from "firebase/auth"; // Função para criar conta com email e senha
import { auth, signInWithGoogle } from "../firebase"; // Importação das funções de autenticação


const SignUp: React.FC = () => {
  // Estados para armazenar email, senha e confirmação de senha
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate(); // Hook para navegação

  /**
   * Função para realizar cadastro com email e senha
   */
  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Cadastro bem-sucedido!");
      navigate("/signin"); // Redireciona para a tela de login após o cadastro
    } catch (error) {
      if (error instanceof Error) {
        alert("Erro ao cadastrar: " + error.message);
      } else {
        alert("Erro desconhecido no cadastro.");
      }
    }
  };

  /**
   * Função para realizar cadastro com Google
   */
  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle();
      alert("Cadastro com Google bem-sucedido!");
      navigate("/home"); // Redireciona para a home após o cadastro
    } catch (error) {
      if (error instanceof Error) {
        alert("Erro ao cadastrar com Google: " + error.message);
      } else {
        alert("Erro desconhecido ao cadastrar com Google.");
      }
    }
  };

  return (
    <div className={styles.container} style={{ backgroundImage: `url(${bgImage})` }}>
      {/* Barra de Status */}
      <img src={statusBarImage} alt="Status Bar" className={styles.statusBar} />

      {/* Título da Página */}
      <div>
        <h1 className={styles.title}>Audio</h1>
        <p className={styles.subtitle}>It's modular and designed to last</p>
      </div>

      {/* Formulário de Cadastro */}
      <div className={styles.formContainer}>
        {/* Campo de Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputField}
        />

        {/* Campo de Senha */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputField}
        />

        {/* Campo de Confirmação de Senha */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.inputField}
        />

        {/* Botão de Cadastro */}
        <button onClick={handleSignUp} className={styles.signUpButton}>
          Sign Up
        </button>

        {/* Cadastro com Google */}
        <img
          src={googleButtonImage}
          alt="Sign up with Google"
          className={styles.googleButton}
          onClick={handleGoogleSignUp}
        />
      </div>

      {/* Link para login */}
      <div className={styles.signInContainer}>
        <img
          src={signInHereImage}
          alt="Sign In here"
          className={styles.signInImage}
          onClick={() => navigate("/signin")}
        />
      </div>
    </div>
  );
};


export default SignUp;
