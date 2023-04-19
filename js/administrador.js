import Pelicula from "./classPelicula.js";
import { sumarioValidaciones } from "./helpers.js";

const btnEditar = document.querySelector('#btnEditar');
const btnAgregar = document.querySelector('#btnAgregar');
const titulo = document.getElementById('titulo');
const codigo = document.getElementById('codigo');
const descripcion = document.getElementById('descripcion');
const duracion = document.getElementById('duracion');
const anio = document.getElementById('anio');
const genero = document.getElementById('genero');
const pais = document.getElementById('pais');
const reparto = document.getElementById('reparto');
const imagen = document.getElementById('imagen');
const msjFormulario = document.getElementById('msjFormulario');

const formularioPelicula = document.getElementById('formAdministrarPelicula');

//trabajar las peliculas para que vuelvan a ser un objeto Pelicula.
let listaPeliculas = JSON.parse(localStorage.getItem('listaPeliculas')) || [];
console.log(listaPeliculas)

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
    //validar los datos
  let sumario = sumarioValidaciones(titulo.value, descripcion.value, imagen.value, duracion.value, genero.value, anio.value, pais.value, reparto.value)
  if(sumario.length === 0){
        console.log('creando la pelicula...')
         //crear la pelicula
         let nuevaPeli = new Pelicula(titulo.value,descripcion.value, imagen.value, genero.value, anio.value, duracion.value, pais.value, reparto.value);
         listaPeliculas.push(nuevaPeli);
        //almacenar la peli en Localstorage
        guardarEnLocalStorage();
        //limpiar el formulario
        limpiarFormularioPeliculas();
        //crear modal
        modalPelicula.hide();
    }else{
        msjFormulario.className = 'alert alert-danger mt-3';
        msjFormulario.innerHTML = sumario;
    }
   
}

function guardarEnLocalStorage(){
    localStorage.setItem('listaPeliculas', JSON.stringify(listaPeliculas)); //para objetos Publicos funciona
}

function limpiarFormularioPeliculas(){
    formularioPelicula.reset();
}

// tarea agregar validaciones HTML