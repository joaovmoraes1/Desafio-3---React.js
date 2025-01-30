import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Importação de imagens utilizadas no design
import bgImage from "../assets/background.jpg";
import forgotPasswordImage from "../assets/Forgot Password.png";
import googleButtonImage from "../assets/Sing up with Google.png";
import signUpHereImage from "../assets/Sign Up here.png";
import statusBarImage from "../assets/Status Bar.png";

// Importação das funções de autenticação do Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, signInWithGoogle } from "../firebase";

const SignIn = () => {
  const [email, setEmail] = useState(""); // Estado para armazenar o email
  const [password, setPassword] = useState(""); // Estado para armazenar a senha
  const navigate = useNavigate(); // Hook para navegação entre páginas

  // Função para realizar login com email e senha
  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login bem-sucedido!");
      navigate("/home");
    } catch (error) {
      if (error instanceof Error) {
        alert("Erro no login: " + error.message);
      } else {
        alert("Erro desconhecido no login.");
      }
    }
  };

  // Função para realizar login com Google
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert("Login com Google bem-sucedido!");
      navigate("/home");
    } catch (error) {
      if (error instanceof Error) {
        alert("Erro ao fazer login com Google: " + error.message);
      } else {
        alert("Erro desconhecido ao fazer login com Google.");
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "#fff",
        justifyContent: "space-between",
        padding: "20px",
      }}
    >
      {/* Barra de Status */}
      <img src={statusBarImage} alt="Status Bar" style={{ width: "100%", marginBottom: "20px" }} />
      
      {/* Título da Página */}
      <div>
        <h1 style={{ textAlign: "center", margin: "20px 0" }}>Audio</h1>
        <p style={{ textAlign: "center", marginBottom: "30px" }}>
          It's modular and designed to last
        </p>
      </div>

      {/* Formulário de Login */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "80%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "80%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        {/* Esqueci minha senha */}
        <img
          src={forgotPasswordImage}
          alt="Forgot Password"
          style={{
            marginBottom: "20px",
            cursor: "pointer",
            width: "30%",
          }}
          onClick={() => alert("Forgot Password functionality")}
        />
        
        {/* Botão de login */}
        <button
          onClick={handleSignIn}
          style={{
            width: "80%",
            padding: "10px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          Sign In
        </button>
        
        {/* Login com Google */}
        <img
          src={googleButtonImage}
          alt="Sign in with Google"
          style={{ width: "80%", cursor: "pointer" }}
          onClick={handleGoogleSignIn}
        />
      </div>
      
      {/* Link para cadastro */}
      <div style={{ textAlign: "center" }}>
        <img
          src={signUpHereImage}
          alt="Sign Up here"
          style={{ cursor: "pointer", width: "50%" }}
          onClick={() => navigate("/signup")}
        />
      </div>
    </div>
  );
};

export default SignIn;