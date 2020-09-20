const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json"
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url) {
    var result = {};
    showSpinner();
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function(response) {
            result.status = 'ok';
            result.data = response;
            hideSpinner();
            return result;
        })
        .catch(function(error) {
            result.status = 'error';
            result.data = error;
            hideSpinner();
            return result;
        });
}

// Cierra sesión

function sessionOut() {
    localStorage.clear();
}

// Constante usuario que contiene nombre del mismo

const usuario = localStorage.getItem("Usuario");

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e) {

    const userInput = document.getElementById("USER"); // Define la constante con el elemento button de id="USER"

    if (userInput) {
        userInput.innerHTML = usuario; // Si el elemento existe, le agrega el nombre del usuario logueado
    }
    if (userInput && usuario === null) {

        userInput.innerHTML = "Iniciar sesión"; // Si el elemento existe, pero la constante usuario esta vacia muestra el boton "Iniciar sesion"

        userInput.addEventListener("click", () => { // funcion que redirige al login cuando se hace click sobre el boton "Iniciar sesion"
            window.location.assign("index.html");
        });

        userInput.nextElementSibling.remove(); // Elimina el dropdown ya que el usuario no esta logueado
    }
});