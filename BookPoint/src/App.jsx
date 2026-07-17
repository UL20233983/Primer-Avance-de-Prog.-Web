import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicarLibro from './components/PublicarLibro';
import Header from './components/Header';
import LibroCard from './components/LibroCard';
import LibroDetalle from './components/LibroDetalle';
import Login from './components/Login';
import Registro from './components/Registro';
import VistaUsuarios from './components/VistaUsuarios';

import { libros } from './data/libros';

import Checkout from './components/Checkout';

import './App.css';

function Inicio() {

  const publicaciones =
    JSON.parse(localStorage.getItem('publicaciones')) || [];

  const todosLosLibros = [
    ...publicaciones,
    ...libros
  ];

  return (
    <>
      <section className="bienvenida">
        <h1>Bienvenido a BookPoint</h1>

        <p>
          BookPoint es una página web para la compra y venta de libros de
          2da mano entre los alumnos de la Universidad de Lima.
        </p>

        <p>
          En la parte de abajo encontrarás las publicaciones más recientes.
          También puedes usar la barra de búsqueda en la parte superior si
          tienes algún libro en mente.
        </p>

        <p>
          No olvides Iniciar sesión o crear tu cuenta para poder usar todas las
          funcionalidades de la tienda.
        </p>
      </section>

      <section className="seccion-recientes">
        <h2 className="titulo-seccion">
          Publicaciones más recientes
        </h2>

        <div className="grid-libros">
          {todosLosLibros.map((libro) => (
            <LibroCard
              key={libro.id}
              id={libro.id}
              titulo={libro.titulo}
              autor={libro.autor}
              precio={libro.precio}
              imagen={libro.imagen}
            />
          ))}
        </div>
      </section>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Header />

      <main style={{ padding: '20px' }}>
        <Routes>

        <Route path="/" element={<Inicio />} />

        <Route path="/libro/:id" element={<LibroDetalle />} />

        <Route path="/comprar/:id" element={<Checkout />} />

        <Route path="/login" element={<Login />} />

        <Route path="/registro" element={<Registro />} />

        <Route path="/admin" element={<VistaUsuarios />} />

        <Route path="/publicar" element={<PublicarLibro />} />

      </Routes>
      </main>

    </BrowserRouter>
  );
}

export default App;