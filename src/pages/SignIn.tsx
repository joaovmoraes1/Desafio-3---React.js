import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook para navegação entre páginas
import styles from "../styles/SignIn.module.css"; 

// Importação de imagens utilizadas no design
import bgImage from "../assets/background.jpg"; 
import forgotPasswordImage from "../assets/Forgot Password.png"; 
import googleButtonImage from "../assets/Sign in Google.png"; 
import signUpHereImage from "../assets/Sign Up here.png";
import statusBarImage from "../assets/Status Bar.png"; 

// Importação das funções de autenticação do Firebase
import { signInWithEmailAndPassword } from "firebase/auth"; // Login com email e senha
import { auth, signInWithGoogle } from "../firebase"; // Importação das funções de autenticação do Firebase


const SignIn: React.FC = () => {
  // Estados para armazenar email e senha digitados pelo usuário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Hook para navegação

  /**
   * Função para realizar login com email e senha
   */
  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login bem-sucedido!");
      navigate("/home"); // Redireciona para a home após login bem-sucedido
    } catch (error) {
      if (error instanceof Error) {
        alert("Erro no login: " + error.message);
      } else {
        alert("Erro desconhecido no login.");
      }
    }
  };

  /**
   * Função para realizar login com conta do Google
   */
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert("Login com Google bem-sucedido!");
      navigate("/home"); // Redireciona para a home após login bem-sucedido
    } catch (error) {
      if (error instanceof Error) {
        alert("Erro ao fazer login com Google: " + error.message);
      } else {
        alert("Erro desconhecido ao fazer login com Google.");
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

      {/* Formulário de Login */}
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

        {/* Botão "Esqueci minha senha" */}
        <img
          src={forgotPasswordImage}
          alt="Forgot Password"
          className={styles.forgotPassword}
          onClick={() => alert("Forgot Password functionality")}
        />

        {/* Botão de Login */}
        <button onClick={handleSignIn} className={styles.signInButton}>
          Sign In
        </button>

        {/* Botão de Login com Google */}
        <img
          src={googleButtonImage}
          alt="Sign in with Google"
          className={styles.googleButton}
          onClick={handleGoogleSignIn}
        />
      </div>

      {/* Link para a página de cadastro */}
      <div className={styles.signUpContainer}>
        <img
          src={signUpHereImage}
          alt="Sign Up here"
          className={styles.signUpImage}
          onClick={() => navigate("/signup")}
        />
      </div>
    </div>
  );
};


export default SignIn;
