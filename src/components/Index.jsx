import { Link } from "react-router-dom";
import './index.css'

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero">
        <h1>Bienvenido a My Notes App</h1>
        <p>Guarda y organiza tus notas de manera fácil y rápida.</p>
        <Link to="/register" className="btn">Comenzar</Link>
      </header>

      <section className="features">
        <div className="feature">
          <h2>📌 Organiza tus ideas</h2>
          <p>Guarda notas importantes y accede a ellas cuando las necesites.</p>
        </div>
        <div className="feature">
          <h2>🔒 Seguro y rápido</h2>
          <p>Regístrate y mantén tus notas protegidas con Firebase Authentication.</p>
        </div>
        <div className="feature">
          <h2>🌍 Accede desde cualquier lugar</h2>
          <p>Tu información siempre estará disponible en la nube.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
