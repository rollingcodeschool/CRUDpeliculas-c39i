export default class Pelicula{
    #codigo;
    #titulo;
    #descripcion;
    #imagen;
    #genero;
    #anio;
    #duracion;
    #pais;
    #reparto;
    #estado;
    constructor(codigo = uuidv4(),titulo, descripcion, imagen, genero, anio, duracion, pais, reparto){
        this.#codigo = codigo;
        this.#titulo = titulo;
        this.#descripcion = descripcion;
        this.#imagen = imagen;
        this.#genero = genero;
        this.#anio = anio;
        this.#duracion = duracion;
        this.#pais = pais;
        this.#reparto = reparto;
        this.#estado = false;
    }
    // crear los getters y setters
    // getters
    get codigo() {
        return this.#codigo;
    }
    get titulo() {
        return this.#titulo;
    }
    get descripcion() {
        return this.#descripcion;
    }
    get imagen() {
        return this.#imagen;
    }
    get genero() {
        return this.#genero;
    }
    get anio() {
        return this.#anio;
    }
    get duracion() {
        return this.#duracion;
    }
    get pais() {
        return this.#pais;
    }
    get reparto() {
        return this.#reparto;
    }
    get estado() {
        return this.#estado;
    }
    
    // setters
    set codigo(codigo) {
        this.#codigo = codigo;
    }
    set titulo(titulo) {
        this.#titulo = titulo;
    }
    set descripcion(descripcion) {
        this.#descripcion = descripcion;
    }
    set imagen(imagen) {
        this.#imagen = imagen;
    }
    set genero(genero) {
        this.#genero = genero;
    }
    set anio(anio) {
        this.#anio = anio;
    }
    set duracion(duracion) {
        this.#duracion = duracion;
    }
    set pais(pais) {
        this.#pais = pais;
    }
    set reparto(reparto) {
        this.#reparto = reparto;
    }
    set estado(estado) {
        this.#estado = estado;
    }
    //stringify accede a este medoto
    toJSON(){
        return {
            codigo: this.codigo,
            titulo: this.titulo,
            descripcion: this.descripcion,
            imagen: this.imagen,
            genero: this.genero,
            duracion: this.duracion,
            pais: this.pais,
            reparto: this.reparto,
            estado: this.estado,
            anio: this.anio
        }
    }
}

