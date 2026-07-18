const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Crear una orden de compra
export async function crearOrden(orden) {

    const response = await fetch(`${API}/api/ordenes`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(orden)

    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Error al procesar la compra");
    }

    return data;
}