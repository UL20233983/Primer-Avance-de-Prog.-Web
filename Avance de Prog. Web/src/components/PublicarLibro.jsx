import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate, Navigate } from "react-router-dom";

function PublicarLibro() {

    const { usuarioActual } = useContext(AuthContext);

    const navigate = useNavigate();

    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImagen] = useState("");

    function publicarLibro() {

        if (
            !titulo ||
            !autor ||
            !precio ||
            !descripcion
        ) {
            alert("Completa todos los campos");
            return;
        }

        const publicaciones =
            JSON.parse(localStorage.getItem("publicaciones")) || [];

        const nuevoLibro = {
            id: Date.now(),
            titulo,
            autor,
            precio: `S/ ${precio}`,
            descripcion,
            vendedor: usuarioActual.nombre,
            publicacion: new Date().toLocaleDateString(),
            imagen: imagen || "https://via.placeholder.com/300x450"
        };

        publicaciones.push(nuevoLibro);

        localStorage.setItem(
            "publicaciones",
            JSON.stringify(publicaciones)
        );

        alert("Libro publicado correctamente");

        navigate("/");
    }

    if (!usuarioActual) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="form-contenedor">

            <h2>Publicar Libro</h2>

            <input
                type="text"
                placeholder="Título del libro"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
            />

            <input
                type="text"
                placeholder="Autor"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
            />

            <input
                type="number"
                placeholder="Precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
            />

            <input
                type="file"
                accept="image/*"
                onChange={(e) => {

                    const archivo = e.target.files[0];

                    if (!archivo) return;

                    const lector = new FileReader();

                    lector.onloadend = () => {
                        setImagen(lector.result);
                    };

                    lector.readAsDataURL(archivo);
                }}
            />

            <textarea
                className="descripcion-libro"
                placeholder="Descripción del libro"
                value={descripcion}
                onChange={(e) => {
                    if (e.target.value.length <= 500) {
                        setDescripcion(e.target.value);
                    }
                }}
            />

            <p className="contador-descripcion">
                {descripcion.length}/500 caracteres
            </p>

            {
                imagen && (
                    <img
                        src={imagen}
                        alt="Vista previa"
                        className="preview-imagen"
                    />
                )
            }

            <button
                className="boton-login"
                onClick={publicarLibro}
            >
                Publicar libro
            </button>

        </div>
    );
}

export default PublicarLibro;