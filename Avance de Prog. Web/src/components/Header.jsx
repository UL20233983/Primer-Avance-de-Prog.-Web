import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
// Importamos los libros estáticos para la búsqueda
import { libros as librosEstaticos } from '../data/libros'; 

function Header() {
  // 1. Extraemos los datos del usuario logeado
  const { usuarioActual, logout } = useContext(AuthContext);

  // 2. Estados para manejar el texto de la barra y los resultados
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);

  // 3. Función que une los libros estáticos con los recién publicados en localStorage
  const obtenerTodosLosLibros = () => {
    const librosPublicados = JSON.parse(localStorage.getItem("publicaciones")) || [];
    return [...librosEstaticos, ...librosPublicados];
  };

  // 4. Lógica que se ejecuta al teclear en la barra
  const manejarBusqueda = (e) => {
    const texto = e.target.value;
    setBusqueda(texto);

    // Si el usuario borra todo, escondemos el menú
    if (texto.trim() === "") {
      setResultados([]);
      return;
    }

    const todosLosLibros = obtenerTodosLosLibros();

    // Filtramos buscando coincidencias en título o autor
    const librosFiltrados = todosLosLibros.filter((libro) => 
      libro.titulo.toLowerCase().includes(texto.toLowerCase()) ||
      libro.autor.toLowerCase().includes(texto.toLowerCase())
    );

    setResultados(librosFiltrados);
  };

  // 5. Limpia la barra de búsqueda al hacer clic en una sugerencia
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

      {/* Contenedor principal de la barra de búsqueda */}
      <div className="barra-buscar">
        
        {/* NUEVO: Envoltorio para controlar la posición de los resultados */}
        <div className="buscador-contenedor">
          <input
            type="text"
            placeholder="Buscar libros, autores, materias..."
            value={busqueda}
            onChange={manejarBusqueda}
          />

          {/* Menú de resultados */}
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

          {/* Mensaje visual si no hay coincidencias */}
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

        {/* Validación de sesión para publicar */}
        {usuarioActual ? (
          <Link to="/publicar" className="nav-link">
            Publicar libro
          </Link>
        ) : (
          <Link to="/login" className="nav-link">
            Publicar libro
          </Link>
        )}

        {/* Validación para botones de sesión */}
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