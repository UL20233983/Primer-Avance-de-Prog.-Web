import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Navigate } from "react-router-dom";

function VistaUsuarios() {

  const { usuarioActual } = useContext(AuthContext);

  // Solo el administrador puede entrar
  if (!usuarioActual || usuarioActual.correo !== "admin") {
    return <Navigate to="/" />;
  }

  const usuarios =
    JSON.parse(localStorage.getItem("usuarios")) || [];

  return (
    <div className="tabla-usuarios">

      <h2>Usuarios registrados</h2>

      {
        usuarios.length === 0 ? (
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

              {
                usuarios.map((usuario, index) => (

                  <tr key={index}>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.correo}</td>
                  </tr>

                ))
              }

            </tbody>

          </table>
        )
      }

    </div>
  );
}

export default VistaUsuarios;