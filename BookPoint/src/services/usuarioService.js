const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Iniciar sesión
export async function login(correo, password) {

    const response = await fetch(`${API}/api/auth/login`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            correo,
            password
        })

    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Error al iniciar sesión");
    }

    return data;
}

// Registrar un usuario
export async function registrar(nombre, correo, password) {

    const response = await fetch(`${API}/api/auth/register`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            nombre,
            correo,
            password
        })

    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Error al registrar usuario");
    }

    return data;
}