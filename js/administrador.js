import Pelicula from "./classPelicula.js";

const btnEditar = document.querySelector('#btnEditar');
const btnAgregar = document.querySelector('#btnAgregar');
const formularioPelicula = document.getElementById('formAdministrarPelicula');

btnEditar.addEventListener('click', crearPeli);
btnAgregar.addEventListener('click', mostrarModalPeli);
formularioPelicula.addEventListener('submit', cargarPelicula);

const modalPelicula = new bootstrap.Modal(document.querySelector('#modalAgregar'));

function crearPeli(){
// crear una nueva peli
let nuevaPeli = new Pelicula('Super mario','algo','url','aventura',2023, '2hs','EEUU','-');
console.log(nuevaPeli)

}

function mostrarModalPeli(){
    //abrir la ventana modal
    modalPelicula.show();
    console.log('aqui vamos a crear una peli')
}

function cargarPelicula(e){
    e.preventDefault();
    console.log('creando la pelicula...')
    //crear modal
    modalPelicula.hide();
}

// tarea agregar validaciones HTML