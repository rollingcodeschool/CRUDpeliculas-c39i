export function cantidadCaracteres(texto, min, max){
    if(texto.length >= min && texto.length <= max){
        console.log('cantidad de caracteres correcto');
        return true;
    }else{
        console.log('cantidad de caracteres incorrecto');
        return false;
    }
}

function validarDuracion(value){
    let patron = /^[0-9]{1,3}$/;
    if(patron.test(value)){
        console.log('digito valido de 1 a 3 caracteres');
        return true;
    }else{
        console.log('no paso la expresion regular del tiempo');
        return false;
    }
}
function validarURLImagen(value){
    let patron = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/;
    if(patron.test(value)){
        console.log('url valida');
        return true;
    }else{
        console.log('url invalida');
        return false;
    }
}

function validarGenero(texto){
    if(texto.length > 0 && (texto === 'Aventura' || texto === 'Accion' || texto === 'Drama' || texto === 'Terror')){
        console.log('genero valido');
        return true;
    }else{
        console.log('genero invalido');
        return false;
    }
}

//agregar la validacion año 1985 - (año actual +1)
function validarAnio(value){
    console.log(value)
    const anioActual = new Date().getFullYear();
    if(value >= 1985 && value <= (anioActual+1)){
        return true
    }
    else{
        return false
    }
}
//validacion para el pais
//validacion para el Reparto

export function sumarioValidaciones(titulo, descripcion, imagen, duracion, genero, anio, pais, reparto){
    let resumen='';
    if(!cantidadCaracteres(titulo, 3, 100)){
        resumen += 'Corregir el campo del titulo debe contener entre 3 y 100 caracteres <br>';
    }
    if(!cantidadCaracteres(descripcion, 3, 100)){
        resumen += 'Corregir la cantidad de caracteres de la descripcion <br>'
    }
    if(!validarURLImagen(imagen)){
        resumen += 'Corregir la URL de la imagen, la extension debe ser .jpg, .gif o .png <br>'
    }
    if(!validarGenero(genero)){
        resumen += 'Seleccione un genero de la lista de opciones <br>'
    }
    
    if(duracion.length !==0  && !validarDuracion(parseInt(duracion))){
        resumen += 'Corregir la duracion, debe ser un numero de 3 digitos como maximo, expresado en minutos<br>'
    }
    if(anio.length !== 0 && !validarAnio(parseInt(anio))){
        resumen += `Ingrese un año correcto (entre 1985 y como maximo el proximo año ${new Date().getFullYear()+1}) <br>`
    }
    if(pais.length !== 0 && !cantidadCaracteres(pais,2,30)){
        resumen += `Ingrese un pais correcto (debe tener un rango entre 2 y 30 caracteres como maximo)<br>`
    }
    if(reparto.length !== 0 && !cantidadCaracteres(reparto,2,200)){
        resumen += `Ingrese un texto correcto (debe tener un rango entre 2 y 200 caracteres como maximo) separados por coma<br>`
    }

    if(resumen.length !== 0 ){
        return resumen;
    }else{
        console.log('todo esta ok con el formulario')
        return '';
    }
}