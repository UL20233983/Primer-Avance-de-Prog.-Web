import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    async function iniciarSesion() {

        const ingreso = await login(correo, password);

        if (ingreso) {

            alert("Inicio de sesión exitoso");

            navigate("/");

        }

    }

    return (

        <div className="form-contenedor">

            <h2>Iniciar Sesión</h2>

            <input
                type="text"
                placeholder="Correo ULima o admin"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
            />

            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                className="boton-login"
                onClick={iniciarSesion}
            >
                Ingresar
            </button>

            <p>
                ¿No tienes cuenta?{" "}
                <Link to="/registro">
                    Crear cuenta
                </Link>
            </p>

        </div>

    );

}

export default Login;