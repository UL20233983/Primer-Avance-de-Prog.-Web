const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

console.log("API =", API);
console.log("VITE_API_URL =", import.meta.env.VITE_API_URL);

// Obtener todos los libros
export async function obtenerLibros() {

    const response = await fetch(`${API}/api/libros`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Error al obtener los libros");
    }

    return data;
}

// Obtener un libro por ID
export async function obtenerLibro(id) {

    const response = await fetch(`${API}/api/libros/${id}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Libro no encontrado");
    }

    return data;
}

// Publicar un nuevo libro
export async function publicarLibro(libro) {

    const response = await fetch(`${API}/api/libros`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(libro)

    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Error al publicar el libro");
    }

    return data;
}