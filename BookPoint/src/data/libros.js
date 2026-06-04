// src/data/libros.js

// Exportamos esta lista (array) para que cualquier componente de la app pueda leerla.
// Cada objeto representa un libro y ahora incluye todos los detalles necesarios.
export const libros = [
  { 
    id: 1, 
    titulo: "Batman: Three Jokers", 
    autor: "Geoff Johns", 
    vendedor: "Sebastián Rodriguez",
    precio: "S/ 45.00", 
    imagen: "/imagenes/threejokers.webp",
    descripcion: "Batman: Three Jokers es una miniserie de cómics (secuela espiritual de La broma asesina y Una muerte en la familia) escrita por Geoff Johns e ilustrada por Jason Fabok. En ella, Batman, Batgirl y Red Hood descubren que el archienemigo de Gotham no es un solo individuo, sino tres personas distintas actuando de manera simultánea"
  },
  { 
    id: 2, 
    titulo: "La Divina Comedia", 
    autor: "Dante Alighieri", 
    vendedor: "Gabriela Torres",
    precio: "S/ 18.00", 
    imagen: "/imagenes/ladivinacomedia.webp",
    descripcion: "La Divina Comedia es un poema épico y alegórico donde Dante Alighieri relata su viaje a través del Infierno, el Purgatorio y el Paraíso. A través de esta travesía, guiado por la razón y la fe, el autor alcanza la redención, explora el orden moral y critica la sociedad de su época."
  },
  { 
    id: 3, 
    titulo: "Curso de programación Java", 
    autor: "Mariona Nadal", 
    vendedor: "Luis Ramirez",
    precio: "S/ 30.00", 
    imagen: "/imagenes/cursojava.webp",
    descripcion: "Con este libro aprenderás a programar en Java, abarca desde conceptos básicos como la programación orientada a objetos hasta la creación de aplicaciones. Ideal para los alumnos de ingenieria de sistemas."
  },
  { 
    id: 4, 
    titulo: "Batman: A Death in the Family", 
    autor: "Jim Starlin", 
    vendedor: "Diego Zevallos",
    precio: "S/ 60.00", 
    imagen: "/imagenes/batmandeath.jpg",
    descripcion: "En Batman: A Death in the Family, el segundo Robin (Jason Todd) viaja a Oriente Medio para buscar a su madre biológica. Allí cae en una trampa del Joker, quien lo secuestra y tortura. El evento es famoso porque el destino de Robin se decidió mediante una votación telefónica del público en 1988, resultando en su trágica muerte."
  },
  { 
    id: 5, 
    titulo: "Harry Potter y la Cámara Secreta", 
    autor: "J. K. Rowling", 
    vendedor: "Sofía Vargas",
    precio: "S/ 60.00", 
    imagen: "/imagenes/harrypotter.webp",
    descripcion: "En Harry Potter y la Cámara de los Secretos, el joven mago enfrenta su segundo año en Hogwarts. Ignorando las advertencias de un elfo doméstico, Harry regresa al colegio donde una fuerza misteriosa abre una cámara oculta de Salazar Slytherin, liberando un monstruo que petrifica a los estudiantes."
  }
];