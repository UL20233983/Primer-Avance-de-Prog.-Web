import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { publicarLibro as publicarLibroService } from "../services/libroService";

function PublicarLibro() {

    const { usuarioActual } = useContext(AuthContext);

    const navigate = useNavigate();

    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const [imagen, setImagen] = useState("");
    const [archivoImagen, setArchivoImagen] = useState(null);

    async function subirImagenCloudinary() {

        if (!archivoImagen) return "";

        const formData = new FormData();

        formData.append("file", archivoImagen);
        formData.append("upload_preset", "bookpoint");

        const respuesta = await fetch(
            "https://api.cloudinary.com/v1_1/heok783c/image/upload",
            {
                method: "POST",
                body: formData,
            }
        );

        const datos = await respuesta.json();

        if (!respuesta.ok) {
        console.error(datos);
        throw new Error(datos.error?.message || "Error al subir la imagen a Cloudinary.");
        }

        return datos.secure_url;
    }

    async function publicarLibro() {

        if (
            !titulo ||
            !autor ||
            !precio ||
            !descripcion ||
            !archivoImagen
        ) {
            alert("Completa todos los campos");
            return;
        }

        try {

            const urlImagen = await subirImagenCloudinary();

            await publicarLibroService({

                titulo,
                autor,
                precio: `S/ ${precio}`,
                descripcion,
                imagen: urlImagen,
                usuario_id: usuarioActual.id

            });

            alert("Libro publicado correctamente");

            navigate("/");

        } catch (error) {

            console.error(error);

            alert(error.message);

        }

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

                    setArchivoImagen(archivo);

                    setImagen(URL.createObjectURL(archivo));

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