import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ExploreProducts from "./pages/ExploreProducts";
import FilterScreen from "./pages/FilterScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/explore"
          element={
            <ExploreProducts
              onFilterPress={() => (window.location.href = "/filter")}
              onBackPress={() => window.history.back()}
            />
          }
        />
        <Route path="/filter" element={<FilterScreen />} />
        <Route path="*" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;