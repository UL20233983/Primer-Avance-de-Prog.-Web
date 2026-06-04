import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

function AuthProvider(props) {

  const [usuarioActual, setUsuarioActual] = useState(
    JSON.parse(localStorage.getItem('usuarioActual')) || null
  );

  function registrar(nombre, correo, password, confirmar) {

    const patron = /^[0-9]{8}@aloe\.ulima\.edu\.pe$/;

    if (!patron.test(correo)) {
      return "Solo se permiten correos ULima";
    }

    if (password !== confirmar) {
      return "Las contraseñas no coinciden";
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const existe = usuarios.find(
      (u) => u.correo === correo
    );

    if (existe) {
      return "El usuario ya existe";
    }

    usuarios.push({
      nombre: nombre,
      correo: correo,
      password: password
    });

    localStorage.setItem(
      'usuarios',
      JSON.stringify(usuarios)
    );

    return "Usuario registrado";
  }

  function login(correo, password) {

    if (
      correo === "admin" &&
      password === "admin123"
    ) {

      const admin = {
        nombre: "Administrador",
        correo: "admin"
      };

      setUsuarioActual(admin);

      localStorage.setItem(
        'usuarioActual',
        JSON.stringify(admin)
      );

      return true;
    }

    let usuarios = JSON.parse(
      localStorage.getItem('usuarios')
    ) || [];

    const usuario = usuarios.find(
      (u) =>
        u.correo === correo &&
        u.password === password
    );

    if (usuario) {

      setUsuarioActual(usuario);

      localStorage.setItem(
        'usuarioActual',
        JSON.stringify(usuario)
      );

      return true;
    }

    return false;
  }

  function logout() {

    setUsuarioActual(null);

    localStorage.removeItem(
      'usuarioActual'
    );
  }

  return (
    <AuthContext.Provider
      value={{
        usuarioActual,
        registrar,
        login,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;