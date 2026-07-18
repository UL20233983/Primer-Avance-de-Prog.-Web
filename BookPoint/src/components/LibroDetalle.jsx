import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { obtenerLibro } from '../services/libroService';

function LibroDetalle() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [libro, setLibro] = useState(null);

  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarLibro() {
      try {
        const data = await obtenerLibro(id);
        setLibro(data);
      } catch (error) {
        console.error(error);
        setLibro(null);
      } finally {
        setCargando(false);
      }
    }

    cargarLibro();
  }, [id]);

  if (cargando) {
    return (
      <h2
        style={{
          textAlign: 'center',
          marginTop: '50px'
        }}
      >
        Cargando...
      </h2>
    );
  }

  if (!libro) {
    return (
      <h2
        style={{
          textAlign: 'center',
          marginTop: '50px'
        }}
      >
        Libro no encontrado
      </h2>
    );
  }

  const imagen =
    libro.imagen && libro.imagen.trim() !== ""
      ? libro.imagen
      : "URL_DE_TU_IMAGEN_EN_CLOUDINARY";

  return (
    <div className="detalle-contenedor">

      <Link
        to="/"
        className="boton-volver"
      >
        ← Volver al inicio
      </Link>

      <div className="detalle-contenido">

        <div className="detalle-col-izq">
          <img
            src={imagen}
            alt={libro.titulo}
          />
        </div>

        <div className="detalle-col-der">

          <h1 className="detalle-titulo">
            {libro.titulo}
          </h1>

          <p className="detalle-info-item">
            <strong>Autor:</strong> {libro.autor}
          </p>

          <p className="detalle-info-item">
            <strong>Vendedor:</strong>{' '}
            {libro.vendedor || 'No especificado'}
          </p>

          <p className="detalle-precio">
            {libro.precio}
          </p>

          <div className="detalle-descripcion-caja">

            <h3>Descripción:</h3>

            <p className="detalle-descripcion">
              {libro.descripcion || 'Sin descripción'}
            </p>

          </div>

          <button
            className="boton-contactar"
            onClick={() => navigate(`/comprar/${libro.id}`)}
          >
            Comprar libro
          </button>

        </div>

      </div>

    </div>
  );
}

export default LibroDetalle;