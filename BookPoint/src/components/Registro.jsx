import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Registro() {

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const { registrar } = useContext(AuthContext);

  const navigate = useNavigate();

  function crearCuenta() {

    const mensaje = registrar(
      nombre,
      correo,
      password,
      confirmar
    );

    alert(mensaje);

    if (mensaje === "Usuario registrado") {
      navigate('/login');
    }
  }

  return (
    <div className="form-contenedor">

      <h2>Crear Cuenta</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="text"
        placeholder="Correo ULima"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={confirmar}
        onChange={(e) => setConfirmar(e.target.value)}
      />

      <button
        className="boton-login"
        onClick={crearCuenta}
      >
        Registrarse
      </button>

      <p>
        ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
      </p>

    </div>
  );
}

export default Registro;