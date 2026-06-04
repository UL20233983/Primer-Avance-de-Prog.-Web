// src/components/LibroCard.jsx
import React from 'react';
// Importamos Link de react-router-dom para crear enlaces sin recargar la página
import { Link } from 'react-router-dom';

// Componente que dibuja el resumen de un libro en la cuadrícula
function LibroCard(props) {
  return (
    /* Usamos Link en lugar de un div para que toda la tarjeta sea "clickeable".
       La ruta dinámica se arma con el ID del libro (ej. /libro/1) */
    <Link to={`/libro/${props.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <article className="libro-card">
        <div className="libro-imagen-contenedor">
          <img src={props.imagen} alt={props.titulo} className="libro-imagen" />
        </div>
        <h3 className="libro-titulo">{props.titulo}</h3>
        <p className="libro-autor">{props.autor}</p>
        <p className="libro-precio">{props.precio}</p>
      </article>
    </Link>
  );
}

export default LibroCard;