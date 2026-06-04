import React, { useState, useContext } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; 
import { libros as librosEstaticos } from '../data/libros';

function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { usuarioActual } = useContext(AuthContext);

  const librosPublicados = JSON.parse(localStorage.getItem("publicaciones")) || [];
  const todosLosLibros = [...librosEstaticos, ...librosPublicados];
  const libro = todosLosLibros.find((item) => item.id === parseInt(id) || item.id === String(id));

  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [tarjeta, setTarjeta] = useState('');
  const [expiracion, setExpiracion] = useState('');
  const [cvv, setCvv] = useState('');

  if (!usuarioActual) {
    return <Navigate to="/login" />;
  }

  if (!libro) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Libro no encontrado</h2>;
  }

  const procesarCompra = (e) => {
    e.preventDefault(); 

    if (!nombre || !direccion || !tarjeta || !expiracion || !cvv) {
      alert("Por favor, completa todos los campos para continuar.");
      return;
    }

    alert(`¡Compra exitosa, ${usuarioActual.nombre}!\n\nTu libro "${libro.titulo}" será enviado a: ${direccion}.`);
    
    navigate('/');
  };

  return (
    <div className="form-contenedor" style={{ marginTop: '40px' }}>
      
      <h2>Finalizar Compra</h2>
      
      <div style={{ backgroundColor: '#f4f4f9', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'left' }}>
        <p style={{ margin: '0 0 10px 0', color: '#555' }}><strong>Estás comprando:</strong></p>
        <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{libro.titulo}</p>
        <p style={{ margin: 0, color: '#0056b3', fontSize: '1.2rem', fontWeight: 'bold' }}>{libro.precio}</p>
      </div>

      <form onSubmit={procesarCompra} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        
        <input 
          type="text" 
          placeholder="Nombre completo del comprador" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
        />
        
        <input 
          type="text" 
          placeholder="Dirección de envío (Ej. Av. Javier Prado Este 4600)" 
          value={direccion} 
          onChange={(e) => setDireccion(e.target.value)} 
        />

        <h4 style={{ textAlign: 'left', margin: '15px 0 5px 0', color: '#333' }}>Datos de la Tarjeta</h4>
        
        <input 
          type="text" 
          placeholder="Número de tarjeta (16 dígitos)" 
          value={tarjeta} 
          onChange={(e) => setTarjeta(e.target.value)} 
          maxLength="16"
        />
        
        <input 
          type="text" 
          placeholder="Fecha de expiración (MM/AA)" 
          value={expiracion} 
          onChange={(e) => setExpiracion(e.target.value)} 
          maxLength="5" 
        />
        
        <input 
          type="text" 
          placeholder="Código CVV (3 o 4 dígitos)" 
          value={cvv} 
          onChange={(e) => setCvv(e.target.value)} 
          maxLength="4" 
        />

        <button type="submit" className="boton-login" style={{ marginTop: '20px', padding: '15px' }}>
          Pagar {libro.precio}
        </button>
      
      </form>
    </div>
  );
}

export default Checkout;