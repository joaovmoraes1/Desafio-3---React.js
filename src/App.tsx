import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Search from "./pages/Search"; // Importando a página Search

function App() {
  return (
    <Router>
     <Routes>
  <Route path="/" element={<SignIn />} />
  <Route path="/signin" element={<SignIn />} />
  <Route path="/signup" element={<SignUp />} />
  <Route path="/home" element={<Home />} />
  <Route path="/search" element={<Search />} />
  <Route path="*" element={<SignIn />} /> {/* Rota padrão */}
</Routes>

    </Router>
  );
}

export default App;
