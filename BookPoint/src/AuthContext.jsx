import React, { createContext, useState } from "react";

import {
    login as loginService,
    registrar as registrarService
} from "./services/usuarioService";

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const [usuarioActual, setUsuarioActual] = useState(

        JSON.parse(localStorage.getItem("usuarioActual")) || null

    );

    async function registrar(nombre, correo, password, confirmar) {

        if (password !== confirmar) {
            return "Las contraseñas no coinciden";
        }

        try {

            const respuesta = await registrarService(

                nombre,
                correo,
                password

            );

            return respuesta.mensaje;

        } catch (error) {

            return error.message;

        }

    }

    async function login(correo, password) {

        // Mantengo el administrador local para no depender de la BD
        if (correo === "admin" && password === "admin123") {

            const admin = {

                id: 0,
                nombre: "Administrador",
                correo: "admin"

            };

            setUsuarioActual(admin);

            localStorage.setItem(

                "usuarioActual",

                JSON.stringify(admin)

            );

            return true;

        }

        try {

            const respuesta = await loginService(

                correo,
                password

            );

            setUsuarioActual(respuesta.usuario);

            localStorage.setItem(

                "usuarioActual",

                JSON.stringify(respuesta.usuario)

            );

            return true;

        } catch (error) {

            alert(error.message);

            return false;

        }

    }

    function logout() {

        setUsuarioActual(null);

        localStorage.removeItem("usuarioActual");

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

            {children}

        </AuthContext.Provider>

    );

}

export default AuthProvider;