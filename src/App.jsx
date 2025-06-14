import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./features/auth/Register";
import Login from "./features/auth/Login";
import Index from "./components/Home";

import './App.css'

const App = () => {
  return (

    <Router>
      <nav>
        <Link to="/">Inicio</Link> |
        <Link to="/register">Registro</Link> |
        <Link to="/login">Login</Link>
      </nav>

      <Routes>

        <Route path="/" element={<Index />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />

      </Routes>

    </Router>
  );
};

export default App;
