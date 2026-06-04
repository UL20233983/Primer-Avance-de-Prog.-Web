import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { libros as librosEstaticos } from '../data/libros'; 

function Header() {
  const { usuarioActual, logout } = useContext(AuthContext);
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);

  const obtenerTodosLosLibros = () => {
    const librosPublicados = JSON.parse(localStorage.getItem("publicaciones")) || [];
    return [...librosEstaticos, ...librosPublicados];
  };

  const manejarBusqueda = (e) => {
    const texto = e.target.value;
    setBusqueda(texto);

    if (texto.trim() === "") {
      setResultados([]);
      return;
    }

    const todosLosLibros = obtenerTodosLosLibros();

    const librosFiltrados = todosLosLibros.filter((libro) => 
      libro.titulo.toLowerCase().includes(texto.toLowerCase()) ||
      libro.autor.toLowerCase().includes(texto.toLowerCase())
    );

    setResultados(librosFiltrados);
  };

  const limpiarBusqueda = () => {
    setBusqueda("");
    setResultados([]);
  };

  return (
    <header className="barra">

      <div className="barra-logo">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          BookPoint
        </Link>
      </div>

      <div className="barra-buscar">
        
        <div className="buscador-contenedor">
          <input
            type="text"
            placeholder="Buscar libros, autores, materias..."
            value={busqueda}
            onChange={manejarBusqueda}
          />

          {resultados.length > 0 && busqueda !== "" && (
            <div className="resultados-busqueda">
              {resultados.map((libro) => (
                <Link 
                  key={libro.id} 
                  to={`/libro/${libro.id}`} 
                  className="resultado-item"
                  onClick={limpiarBusqueda}
                >
                  <span className="resultado-titulo">{libro.titulo}</span>
                  <span className="resultado-autor">{libro.autor}</span>
                </Link>
              ))}
            </div>
          )}

          {resultados.length === 0 && busqueda.trim() !== "" && (
            <div className="resultados-busqueda">
              <div className="resultado-item" style={{ color: '#888' }}>
                No se encontraron resultados
              </div>
            </div>
          )}
        </div>

      </div>

      <nav className="barra-menu">
        <Link to="/" className="nav-link">
          Inicio
        </Link>

        {usuarioActual ? (
          <Link to="/publicar" className="nav-link">
            Publicar libro
          </Link>
        ) : (
          <Link to="/login" className="nav-link">
            Publicar libro
          </Link>
        )}

        {usuarioActual ? (
          <>
            <span className="nav-link">
              Hola, {usuarioActual.nombre}
            </span>
            <button className="boton-login" onClick={logout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="boton-login">
              Iniciar sesión
            </button>
          </Link>
        )}
      </nav>

    </header>
  );
}

export default Header;