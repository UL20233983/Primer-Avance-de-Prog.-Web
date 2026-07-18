import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { Navigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function VistaUsuarios() {
  const { usuarioActual } = useContext(AuthContext);

  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const respuesta = await fetch(`${API}/api/auth/usuarios`);
        const datos = await respuesta.json();

        if (!respuesta.ok) {
          throw new Error(datos.error || "Error al obtener usuarios");
        }

        setUsuarios(datos);
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    };

    if (usuarioActual && usuarioActual.correo === "admin") {
      obtenerUsuarios();
    } else {
      setCargando(false);
    }
  }, [usuarioActual]);

  // Solo el administrador puede entrar
  if (!usuarioActual || usuarioActual.correo !== "admin") {
    return <Navigate to="/" />;
  }

  if (cargando) {
    return <p>Cargando usuarios...</p>;
  }

  return (
    <div className="tabla-usuarios">
      <h2>Usuarios registrados</h2>

      {usuarios.length === 0 ? (
        <p>No existen usuarios registrados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.correo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default VistaUsuarios;