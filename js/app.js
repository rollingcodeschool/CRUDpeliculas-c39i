let temaConfigurado = JSON.parse(localStorage.getItem('tema')) || 'dark';
console.log(temaConfigurado);

cambiarTema(temaConfigurado);

document
  .getElementById("btnThemeDark")
  .addEventListener("click", () => cambiarTema("dark"));
document
  .getElementById("btnThemeLight")
  .addEventListener("click", () => cambiarTema("light"));

function cambiarTema(color) {
  let body = document.querySelector("body");
  // let body = document.getElementsByTagName('body');
  body.setAttribute(
    "data-bs-theme",
    color
  );
 
    //actualizar el icono
    color === "dark"    ? (document.getElementById("iconTheme").className = "bi bi-moon-stars-fill")
    : (document.getElementById("iconTheme").className =
        "bi bi-brightness-high-fill");

    //guardar color en localstorage
    localStorage.setItem('tema', JSON.stringify(color))
}
