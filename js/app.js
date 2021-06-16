//variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciaCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarritos = [];

cargarEventoListeners();
function cargarEventoListeners() {
  //cuando agregas un curso presionando "Agregando al Carrito"
  listaCursos.addEventListener("click", agregarCursos);

  ///elimina carrito
  carrito.addEventListener("click", eliminarCurso);

  //vaciar el carrito
  vaciaCarritoBtn.addEventListener("click", () => {
    articulosCarritos = []; //reinicia el arreglo
    limpiarHTML(); //elimina todo el html
  });
}

function agregarCursos(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;

    leerDatosCursos(cursoSeleccionado);
  }
}

function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    //console.log(e.target.getAttribute("data-id"));
    const cursoId = e.target.getAttribute("data-id");
    //console.log(cursoId);
    articulosCarritos = articulosCarritos.filter(
      (curso) => curso.id !== cursoId
    );
    //console.log(articulosCarritos);
    carritoHTML();
  }
}

function leerDatosCursos(curso) {
  //console.log(curso);
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //revisa si el elemento exixte en el carrito
  const existe = articulosCarritos.some((curso) => curso.id === infoCurso.id);

  if (existe) {
    const cursos = articulosCarritos.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; /// retorna el objecto actualizado
      } else {
        return curso; //retorna los objectos que no son duplicados
      }
    });
    articulosCarritos = [...cursos];
  } else {
    articulosCarritos = [...articulosCarritos, infoCurso];
  }

  // console.log(articulosCarritos);
  carritoHTML();
}

function carritoHTML() {
  //PRIMERO LIMPIA EL HTML
  limpiarHTML();

  //recorre el carrito en el array
  articulosCarritos.forEach((curso) => {
    const row = document.createElement("tr");

    const { imagen, titulo, precio, cantidad } = curso;
    row.innerHTML = `
      <td><img src="${imagen}" width="100"></td>
      <td>${titulo}</tr>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}" > x </a>
      </td>
    `;

    //se imprime en el navegador
    contenedorCarrito.appendChild(row);
  });
}

//funcion para limpiar
function limpiarHTML() {
  //forma lenta
  //contenedorCarrito.innerHTML = "";

  //forma optima de hacer
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
