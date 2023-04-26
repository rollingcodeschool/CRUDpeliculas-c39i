import Pelicula from "./classPelicula.js";
import { sumarioValidaciones } from "./helpers.js";

const btnEditar = document.querySelector("#btnEditar");
const btnAgregar = document.querySelector("#btnAgregar");
const titulo = document.getElementById("titulo");
const codigo = document.getElementById("codigo");
const descripcion = document.getElementById("descripcion");
const duracion = document.getElementById("duracion");
const anio = document.getElementById("anio");
const genero = document.getElementById("genero");
const pais = document.getElementById("pais");
const reparto = document.getElementById("reparto");
const imagen = document.getElementById("imagen");
const msjFormulario = document.getElementById("msjFormulario");
const modalPelicula = new bootstrap.Modal(
  document.querySelector("#modalAgregar")
);
const formularioPelicula = document.getElementById("formAdministrarPelicula");
let estadoPelicula = true; //true = crear una peli, false = editar una pelicula

//manejadores de eventos
// btnEditar.addEventListener('click', crearPeli);
btnAgregar.addEventListener("click", mostrarModalPeli);
formularioPelicula.addEventListener("submit", cargarPelicula);

//trabajar las peliculas para que vuelvan a ser un objeto Pelicula.
// let listaPeliculas = JSON.parse(localStorage.getItem('listaPeliculas')) || []; esto me devuelve un objeto de tipo Object
let listaPeliculas = localStorage.getItem("listaPeliculas");

if (!listaPeliculas) {
  //si lista peliculas no existe en Localstorage
  listaPeliculas = [];
} else {
  //si lista Peliculas tiene datos, quiero transformarlo en un array de objetos Pelicula
  listaPeliculas = JSON.parse(listaPeliculas).map(
    (pelicula) =>
      new Pelicula(
        pelicula.codigo,
        pelicula.titulo,
        pelicula.descripcion,
        pelicula.imagen,
        pelicula.genero,
        pelicula.anio,
        pelicula.duracion,
        pelicula.pais,
        pelicula.reparto
      )
  );
}

console.log(listaPeliculas);

cargaInicial();

function cargaInicial() {
  // verificar si listaPeliculas tiene datos
  if (listaPeliculas.length > 0) {
    //dibujes los datos en la tabla
    listaPeliculas.map((pelicula, indice) => crearFila(pelicula, indice));
  }
  //el else seria mostrar un mensaje q no hay datos para cargar o dejo la tabla vacia
}

function crearFila(pelicula, indice) {
  //aqui dibujo el TR
  let datosTablaPelicula = document.querySelector("tbody");
  datosTablaPelicula.innerHTML += `<tr>
    <th>${indice + 1}</th>
    <td>${pelicula.titulo}</td>
    <td class="text-truncate">${pelicula.descripcion}</td>
    <td class="text-truncate">${pelicula.imagen}</td>
    <td>${pelicula.genero}</td>
    <td>
        <button class="bi bi-pencil-square btn btn-warning" id="btnEditar" onclick="editarPelicula('${
          pelicula.codigo
        }')"></button>
        <button class="bi bi-x-square btn btn-danger" onclick="borrarPelicula('${
          pelicula.codigo
        }')"></button>
    </td>
  </tr>`;
}

function mostrarModalPeli() {
  estadoPelicula = true;
  //abrir la ventana modal
  modalPelicula.show();
  console.log("aqui vamos a crear una peli");
}

function cargarPelicula(e) {
  e.preventDefault();

  if (estadoPelicula) {
    //aqui creo la peli
    crearPelicula();
  } else {
    //editar peli
    actualizarPelicula();
  }
}

function crearPelicula() {
  //validar los datos
  let sumario = sumarioValidaciones(
    titulo.value,
    descripcion.value,
    imagen.value,
    duracion.value,
    genero.value,
    anio.value,
    pais.value,
    reparto.value
  );
  if (sumario.length === 0) {
    console.log("creando la pelicula...");
    //crear la pelicula
    let nuevaPeli = new Pelicula(
      undefined,
      titulo.value,
      descripcion.value,
      imagen.value,
      genero.value,
      anio.value,
      duracion.value,
      pais.value,
      reparto.value
    );
    listaPeliculas.push(nuevaPeli);
    console.log(nuevaPeli);
    //almacenar la peli en Localstorage
    guardarEnLocalStorage();
    //limpiar el formulario
    limpiarFormularioPeliculas();
    //crear modal
    modalPelicula.hide();
    //dibujar la fila
    let indicePeli = listaPeliculas.length - 1;
    crearFila(nuevaPeli, indicePeli);
    //mostrar un cartel al usuario

    Swal.fire(
      "Pelicula creada",
      "La pelicula ingresada fue creada correctamente",
      "success"
    );
    // Tarea verificar cantidad de caracteres en el campo de la descripcion
    // ocultar pasado x tiempo o una vez enviado la pelicula el alert con los errores.
  } else {
    msjFormulario.className = "alert alert-danger mt-3";
    msjFormulario.innerHTML = sumario;
  }
}

function guardarEnLocalStorage() {
  localStorage.setItem("listaPeliculas", JSON.stringify(listaPeliculas)); //para objetos Publicos funciona
}

function limpiarFormularioPeliculas() {
  formularioPelicula.reset();
}

// tarea agregar validaciones HTML
// function borrarPelicula(){
//    }

window.borrarPelicula = (codigo) => {
  Swal.fire({
    title: "¿Esta seguro de borrar la pelicula?",
    text: "No se puede revertir este proceso posteriomente",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Borrar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    console.log(result);
    if (result.isConfirmed) {
      //aqui hago todo lo necesario para borrar
      console.log(codigo);
      console.log("aqui borro la peli");
      //busco en al array de peliculas la peli que quiero borrar
      let posicionPeli = listaPeliculas.findIndex(
        (pelicula) => pelicula.codigo === codigo
      );
      console.log(posicionPeli);
      //borrar del array el objeto pelicula
      listaPeliculas.splice(posicionPeli, 1);
      //igual los datos del localstorage
      guardarEnLocalStorage();
      //quitar la fila de la tabla
      let datosTablaPelicula = document.querySelector("tbody");
      // console.log(datosTablaPelicula.children[posicionPeli])
      datosTablaPelicula.removeChild(datosTablaPelicula.children[posicionPeli]);

      //todo: actualizar la fila en la tabla como el update

      Swal.fire(
        "Borramos la pelicula",
        "La pelicula seleccionada fue eliminada correctamente",
        "success"
      );
    }
  });
};

window.editarPelicula = (codigoUnico) => {
  //mostrar la ventana modal
  const pelicula = listaPeliculas.find((peli) => peli.codigo === codigoUnico);
  console.log(pelicula);
  modalPelicula.show();
  //completar los datos en el modal
  codigo.value = pelicula.codigo;
  titulo.value = pelicula.titulo;
  descripcion.value = pelicula.descripcion;
  imagen.value = pelicula.imagen;
  genero.value = pelicula.genero;
  anio.value = pelicula.anio;
  console.log(pelicula.anio);
  duracion.value = pelicula.duracion;
  pais.value = pelicula.pais;
  reparto.value = pelicula.reparto;
  //cambiar el estado de la variable bandera
  estadoPelicula= false;
};

function actualizarPelicula(){
  //todo: validar los datos
  //necesito la pelicula que estoy editando
  let posicionPelicula = listaPeliculas.findIndex(peli => peli.codigo === codigo.value );
  //actualizar las propiedades de esa pelicula
listaPeliculas[posicionPelicula].titulo = titulo.value;
listaPeliculas[posicionPelicula].descripcion = descripcion.value;
listaPeliculas[posicionPelicula].imagen = imagen.value;
listaPeliculas[posicionPelicula].genero = genero.value;
listaPeliculas[posicionPelicula].pais = pais.value;
listaPeliculas[posicionPelicula].duracion = duracion.value;
listaPeliculas[posicionPelicula].reparto = reparto.value;
listaPeliculas[posicionPelicula].anio = anio.value;
  //actualizar el localstorage
guardarEnLocalStorage();
//mostrar un msj
Swal.fire(
  "Pelicula editada",
  "La pelicula seleccionada fue editada correctamente",
  "success"
  );
  //se vea en la tabla
  let datosTablaPelicula = document.querySelector("tbody");
  datosTablaPelicula.children[posicionPelicula].children[1].innerText = titulo.value;
  datosTablaPelicula.children[posicionPelicula].children[2].innerText = descripcion.value;
  datosTablaPelicula.children[posicionPelicula].children[3].innerText = imagen.value;
  datosTablaPelicula.children[posicionPelicula].children[4].innerText = genero.value;
  //limpiar el form
  limpiarFormularioPeliculas()
  //cerrar el modal
  modalPelicula.hide()
}
