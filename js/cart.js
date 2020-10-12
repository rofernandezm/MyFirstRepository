let subTotal = document.getElementById("st"); // Variable que almacena ubicacion de subtotal del carrito
let costoTotal = document.getElementById("ct"); // Variable que almacena ubicacion de costo total del carrito
let arraySubtotales = document.getElementsByClassName("subtotal"); // Variable que almacena array de elementos con clase "subtotal"

function showCartProductsAndTotalCost(array) { // Funcion que muestra productos y costos

    let htmlContentToAppend = ""; // Variable donde se almacena el html que se genera de forma dinamica

    array.forEach((products, i) => { // Se recorre el array que trae por parametro, la i es contador

        htmlContentToAppend = // La i se utilizo para generar ids unicos al recorrer el array
            `<div id="$${i}" class="row mb-4 item">
                <div class="col-md-5 col-lg-3 col-xl-3">
                    <!-- Imagen producto -->
                    <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                        <img class="img-fluid w-100" src="${products.src}">
                    </div>
                </div>                    
                <div class="col-md-7 col-lg-9 col-xl-9">
                    <!-- Info producto -->
                    <div>
                        <div class="d-flex justify-content-between">
                            <!-- Nombre -->
                            <div>
                                <h5>${products.name}</h5>
                            </div>

                            <!-- cantidadeses -->
                            <div class="mb-5">
                                <input id="${i}" style="width:80px; border:none" type="number" min="1" value="${products.count}" class="form-control shadow-sm p-3 bg-white rounded count">
                                <small class="text-muted d-flex justify-content-center mt-2">Unidades</small>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <!-- Remove Item -->
                            <a type="button" onclick="removeElement($${i})" class="card-link-secondary small text-uppercase mr-3">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                                Eliminar item
                            </a>
                            <!-- Precio -->
                            <p class="mb-0">
                                <strong id="moneda${i}" class="monedas pr-1">${products.currency}</strong>
                                <strong id="sub${i}" class="subtotal"></strong
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="mb-4">
            `;

        document.getElementById("products").innerHTML += htmlContentToAppend; // Se vuelca el contenido de la variable al html dentro del div "products"
        var count = parseInt(document.getElementById(i).value); // Se almacena en la varible las unidades de cada item segun su id ( id = i), se transforman en valor numerico por parseInt
        document.getElementById("sub" + i).innerHTML = productSubTotal(products, count); // Calcula subtotal por item y lo vuelca al html
        sessionStorage.setItem(i, products.unitCost); // Se guarda en sessionStorage bajo el numero de id (i) el costo unitario de cada articulo

        function newSubtotalPorItem() { // Funcion que recalcula el subtotal por item cuando se modifican las unidades

            var cantidades = document.getElementsByClassName('count'); // Almacena en la variable el array de elementos con clase "count"

            for (i = 0; i < (cantidades.length); i++) { // Recorre el array anterior

                cantidades[i].addEventListener("change", function() { // Por cada item del array, genera un addEventListener que escucha
                    let id = this.id; // Obtiene el id del item que tuvo un cambio
                    let newValue = parseInt(this.value); // Obtiene el valor de las unidades luego de la modificacion
                    let costo = Number(sessionStorage.getItem(id)); // Obtiene el costo unitario del articulo por id, previamente guardado en sessionStorage
                    let newPrice = newValue * costo; // Calcula nuevo subtotal para el item que se cambio cantidades
                    document.getElementById("sub" + id).innerHTML = newPrice; // Vuelca al html el nuevo subtotal
                    // Actualiza carrito
                    calculoDeCostos(arraySubtotales); // Funcion que calcula los subtotales de todos los items
                }, false);

            }
        };
        newSubtotalPorItem(); // Ejecuta la funcion anterior
    });
    cantItemsCart(); // Funcion que calcula la cantida de items en carrito
    calculoDeCostos(arraySubtotales); // Calcula los subtotales de todos los items
};

function calculoDeCostos(subtotales) { // Funcion que recibe por parametro el array donde se almacenan los subtotales por cada item y calcula el subtotal del carrito
    subTotal.innerHTML = new Intl.NumberFormat().format(cartTotalCost(subtotales));
    costoTotal.innerHTML = new Intl.NumberFormat().format(cartTotalCost(subtotales));
};

function cantItemsCart() { // Funcion que calcula la cantida de items en carrito
    let items = document.getElementsByClassName("item"); // Se le agrega la clase "item" a cada articulo en el carrito para contabilizarlo
    let location = document.getElementById("cantItems");
    let palabra = document.getElementById("item");
    if (items.length === 1) { // Evalua si el array tiene longitud 1 ya que la palabra item seria en singular
        location.innerHTML = items.length;
        palabra.innerHTML = "item";
    } else {
        if (items.length >= 2) { // Evalua si el array tiene longitud 2 ya que la palabra item seria en plural
            location.innerHTML = items.length;
            palabra.innerHTML = "items";
        } else { // Si no encuentra items envia el numero 0 
            location.innerHTML = 0;
            palabra.innerHTML = "items";
        }
    }
}

function productSubTotal(products, count) { // Recibe un array con un producto y la cantidad para retorna el costo del item
    return products.unitCost * count;
}

function cambio(tipo, costo) { // Funcion que recibe por parametro moneda(USD o UYU) y costo
    let moneda = tipo;
    let costoEnUyu = 0;
    if (moneda === "USD") { // Si la moneda es USD multiplica el costo por 40, de lo contrario no lo modifica y retorna el costo en UYU
        costoEnUyu = costo * 40;
    } else {
        costoEnUyu = costo;
    }
    return costoEnUyu;
}

function cartTotalCost(array) { // Funcion que calcula el costo total del carrito recibiendo un array por parametro

    let totalCost = 0; // Variable donde se va adicionando los subtotales por item

    for (let i = 0; i < array.length; i++) {
        let str = array[i];
        let id;

        if (typeof(str) != 'undefined' && str != null) { // Evalua que exista el elemento html
            str = str.innerHTML; // Como no es indefinido, podemos tomar el string del elemento
            id = "moneda" + (i); // A cada item se le genero dinamicamente un id donde se guardaba la moneda del mismo
            monedaItem = document.getElementById(id); // Se Obtiene el elemento donde se guarda la moneda mediante el id

            if (typeof(monedaItem) != 'undefined' && monedaItem != null) { // Evalua que exista el elemento html
                monedaItem = monedaItem.innerHTML; // Como no es indefinido, podemos tomar el contenido del elemento
                precio = parseInt(str); //Se transforman en valor numerico por parseInt
                totalCost += cambio(monedaItem, precio); //Se adiciona a la variable declarada anteriormente
            } else {
                while (typeof(monedaItem) === 'undefined' || monedaItem === null) { // Mientras no exite el elemento, se suma una unidad a i para obtener el id siguiente que se genero de forma automatica
                    i = (i + 1);
                    id = "moneda" + (i);
                    monedaItem = document.getElementById(id).innerHTML; // Se almacena en la variable monedaItem el elemento obtenido mediante el id para volver a evaluarse
                }
                precio = parseInt(str) //Se transforman en valor numerico por parseInt
                totalCost += cambio(monedaItem, precio); //Se adiciona a la variable declarada anteriormente
            }
        }
    }
    return totalCost; // Se retorna el valor luego de recorrer el array 
}


function removeElement(elementId) {
    //Elimina un elemento del documento
    let element = document.getElementById(elementId.id);
    element.nextElementSibling.remove();
    element.parentNode.removeChild(element);

    //recalcula carrito
    cantItemsCart();
    calculoDeCostos(arraySubtotales);
}

function CierraPopup(evt, id) { // Recive el evento y el id para cerrar cualquiera de los dos modales sin refrescar la pagina
    $(id).modal('hide'); //ocultamos el modal
    $('body').removeClass('modal-open'); //eliminamos la clase del body para poder hacer scroll
    $('.modal-backdrop').remove(); //eliminamos el backdrop del modal
    $(id).removeClass('show'); //eliminamos la clase show para dejar de mostrar la ventana del modal
    evt.preventDefault(); //Detiene el evento que refresca la pagina
}

function clearModalForm(id) { // Recibe por parametro ir y resetea el formulario
    document.getElementById(id).reset();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    let cartInfo = {};
    getJSONData(CART_INFO_URL_2).then(function(resultObj) {
        if (resultObj.status === "ok") {
            cartInfo = resultObj.data.articles;
            showCartProductsAndTotalCost(cartInfo);
        };
    });
})