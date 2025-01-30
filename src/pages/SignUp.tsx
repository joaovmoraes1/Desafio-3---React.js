import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Importação de imagens utilizadas no design
import bgImage from "../assets/background.jpg";
import googleButtonImage from "../assets/Sing up with Google.png";
import signInHereImage from "../assets/Sign In here Google.png";
import statusBarImage from "../assets/Status Bar.png";

// Importação das funções de autenticação do Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, signInWithGoogle } from "../firebase";

const SignUp = () => {
  const [email, setEmail] = useState(""); // Estado para armazenar o email
  const [password, setPassword] = useState(""); // Estado para armazenar a senha
  const [confirmPassword, setConfirmPassword] = useState(""); // Estado para confirmar senha
  const navigate = useNavigate(); // Hook para navegação entre páginas

  // Função para realizar o cadastro de usuário
  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Cadastro bem-sucedido!");
      navigate("/signin");
    } catch (error) {
      if (error instanceof Error) {
        alert("Erro ao cadastrar: " + error.message);
      } else {
        alert("Erro desconhecido no cadastro.");
      }
    }
  };

  // Função para realizar o cadastro com Google
  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle();
      alert("Cadastro com Google bem-sucedido!");
      navigate("/home");
    } catch (error) {
      if (error instanceof Error) {
        alert("Erro ao cadastrar com Google: " + error.message);
      } else {
        alert("Erro desconhecido ao cadastrar com Google.");
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

      {/* Formulário de Cadastro */}
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{
            width: "80%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        
        {/* Botão de cadastro */}
        <button
          onClick={handleSignUp}
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
          Sign Up
        </button>
        
        {/* Cadastro com Google */}
        <img
          src={googleButtonImage}
          alt="Sign up with Google"
          style={{ width: "80%", cursor: "pointer" }}
          onClick={handleGoogleSignUp}
        />
      </div>
      
      {/* Link para login */}
      <div style={{ textAlign: "center" }}>
        <img
          src={signInHereImage}
          alt="Sign In here"
          style={{ cursor: "pointer", width: "50%" }}
          onClick={() => navigate("/signin")}
        />
      </div>
    </div>
  );
};

export default SignUp;
