let subTotal = document.getElementById("st"); // Variable que almacena ubicacion de subtotal del carrito
let costoTotal = document.getElementById("ct"); // Variable que almacena ubicacion de costo total del carrito
let costoEnvio = document.getElementById("ce"); // Variable que almacena ubicacion de costo de envio
let porcentajeEnvio;
let valorCostoEnvio;
let arraySubtotales = document.getElementsByClassName("subtotal"); // Variable que almacena array de elementos con clase "subtotal"
let msgCompraFinalizada;

let numFormat = function(valor) { // Funcion que toma un valor numerico y le da un formato numerico
    let price = new Intl.NumberFormat().format(valor);
    return price;
}

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

    subTotal.innerHTML = numFormat(cartSubtotalCost(subtotales));

    if (porcentajeEnvio != 'undefined' && porcentajeEnvio != null) {
        valorCostoEnvio = (cartSubtotalCost(subtotales)) * (porcentajeEnvio / 100);
        document.getElementById("monenvio").innerHTML = "UYU";
        costoEnvio.innerHTML = numFormat(valorCostoEnvio);
        costoTotal.innerHTML = numFormat((cartSubtotalCost(subtotales)) + valorCostoEnvio);
    } else {
        costoTotal.innerHTML = numFormat(cartSubtotalCost(subtotales));
    }
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

function cartSubtotalCost(array) { // Funcion que calcula el subtotal del carrito recibiendo un array por parametro

    let totalCost = 0; // Variable donde se va adicionando los subtotales por item

    for (let i = 0; i < array.length; i++) {
        let str = array[i];
        let id;
        let newI = i;

        if (str != 'undefined' && str != null) { // Evalua que exista el elemento html
            str = str.innerHTML; // Como no es indefinido, podemos tomar el string del elemento
            id = "moneda" + (i); // A cada item se le genero dinamicamente un id donde se guardaba la moneda del mismo
            monedaItem = document.getElementById(id); // Se Obtiene el elemento donde se guarda la moneda mediante el id

            if (monedaItem != 'undefined' && monedaItem != null) { // Evalua que exista el elemento html
                monedaItem = monedaItem.innerHTML; // Como no   es indefinido, podemos tomar el contenido del elemento
                precio = parseInt(str); //Se transforman en valor numerico por parseInt
                totalCost += cambio(monedaItem, precio); //Se adiciona a la variable declarada anteriormente
            } else {
                while (monedaItem === 'undefined' || monedaItem === null) { // Mientras no exite el elemento, se suma una unidad a i para obtener el id siguiente que se genero de forma automatica
                    newI = (newI + 1);
                    id = "moneda" + (newI);
                    monedaItem = document.getElementById(id); // Se almacena en la variable monedaItem el elemento obtenido mediante el id para volver a evaluarse
                }
                monedaItem = document.getElementById(id).innerHTML;
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
    $("#" + id).removeClass('show'); //eliminamos la clase show para dejar de mostrar la ventana del modal
    evt.preventDefault(); //Detiene el evento que refresca la pagina
}

function clearModalForm(id) { // Recibe por parametro id y resetea el formulario
    document.getElementById(id).reset();
    disabled(); // Deshabilita los campos de Tarjeta de credito
    let itemShip = document.getElementsByClassName("ship"); // Quita las alertas de formulario valido/invalido modal envio
    for (let i = 0; i < itemShip.length; i++) {
        id = itemShip[i].id;
        document.getElementById(id).classList.remove("is-invalid");
        document.getElementById(id).classList.remove("is-valid");
    }
    let itemPay = document.getElementsByClassName("pay"); // Quita las alertas de formulario valido/invalido modal pago
    for (let i = 0; i < itemPay.length; i++) {
        id = itemPay[i].id;
        document.getElementById(id).classList.remove("is-invalid");
        document.getElementById(id).classList.remove("is-valid");
    }
    document.getElementById("bankcountnumber").disabled = true; // Deshabilita los campos de cuenta bancaria
}

function shipping() { // Verifica que se haya seleccionado tipo de envio y calcula el costo en base a la opcion seleccionada
    let shipmentRadioButtons = document.getElementsByClassName("shipment");

    for (let i = 0; i < (shipmentRadioButtons.length); i++) {

        shipmentRadioButtons[i].addEventListener("click", function() {
            let shipmentButton = document.getElementById("shippingButtonModal");
            let premium = document.getElementById("premium").checked;
            let express = document.getElementById("express").checked;
            let standard = document.getElementById("standard").checked;

            if ((premium) || (express) || (standard)) {
                shipmentButton.disabled = false;
                let id = this.id;
                porcentajeEnvio = (document.getElementById(id).value);
                calculoDeCostos(arraySubtotales);
            }
        });
    }
}

function paymentInput() { // Funcion que habilita o deshabilita los campos del modal para pagos en funcion de lo seleccionado

    let paymentRadioButtons = document.getElementsByClassName("payment-radio");

    for (let i = 0; i < (paymentRadioButtons.length); i++) {

        paymentRadioButtons[i].addEventListener("click", function() {

            let tdc = document.getElementById("credit").checked;
            let transf = document.getElementById("transf").checked;
            let bankCount = document.getElementById("bankcountnumber");

            if (tdc) {
                bankCount.disabled = true;
                enabled();
            } else if (transf) {
                disabled();
                bankCount.disabled = false;
            }

        })
    }
}

function enabled() { // Funcion que habilita los campos de tarjeta de credito
    let tdcInput = document.getElementsByClassName("tdcInput");
    for (let i = 0; i < tdcInput.length; i++) {
        let tdcItem = tdcInput[i].attributes[0].nodeValue;
        document.getElementById(tdcItem).disabled = false;
    }
}

function disabled() { // Funcion que deshabilita los campos de tarjeta de credito
    let tdcInput = document.getElementsByClassName("tdcInput");
    for (let i = 0; i < tdcInput.length; i++) {
        let tdcItem = tdcInput[i].attributes[0].nodeValue;
        document.getElementById(tdcItem).disabled = true;
    }
}

// Validacion de formulario envio

function shippingForm(evt, id) { // En caso de fallar en algun campo, retorna false deteniendo la funcion y haciendo enfoque en el input correpondiente
    let status = true;
    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let direccion = document.getElementById("direccion");
    let numero = document.getElementById("numpuerta");
    let esquina = document.getElementById("esquina");
    let pais = document.getElementById("pais");
    let departamento = document.getElementById("departamento");
    let codigoPostal = document.getElementById("codigopostal");

    if (nombre.value.trim() == "") {
        nombre.className += " is-invalid";
        status = false;
        nombre.focus();
    } else if (apellido.value.trim() == "") {
        apellido.className += " is-invalid";
        status = false;
        apellido.focus();
    } else if (direccion.value.trim() == "") {
        direccion.className += " is-invalid";
        status = false;
        direccion.focus();
    } else if (numero.value.trim() == "") {
        numero.className += " is-invalid";
        status = false;
        numero.focus();
    } else if (esquina.value.trim() == "") {
        esquina.className += " is-invalid";
        status = false;
        esquina.focus();
    } else if (pais.value.trim() == "") {
        pais.className += " is-invalid";
        status = false;
        pais.focus();
    } else if (departamento.value.trim() == "") {
        departamento.className += " is-invalid";
        status = false;
        departamento.focus();
    } else if (codigoPostal.value.trim() == "") {
        codigoPostal.className += " is-invalid";
        status = false;
        codigoPostal.focus();
    }

    if (status == true) {
        let modal = document.getElementById("shippingModal").attributes[0].nodeValue;
        if (modal.includes("show")) { // Verifica que el modal este abierto o no
            CierraPopup(evt, id);
        }
        return true;
    } else {
        return false;
    }
}

function validShipForm() { // Funcion que se ejecuta en tiempo real y a medida que el usuario digita informa que sea correcto o no
    let itemShip = document.getElementsByClassName("ship");

    for (let i = 0; i < itemShip.length; i++) {
        itemShip[i].addEventListener("input", function() {
            id = this.id;
            if (document.getElementById(id).value.trim() == "") {
                document.getElementById(id).className += " is-invalid";
            } else if (document.getElementById(id).value.trim() != "") {
                document.getElementById(id).classList.remove("is-invalid");
                document.getElementById(id).className += " is-valid";
            }
        })
    }
}

function validpayForm() { // Funcion similar a la anterior pero con los campos de pagos

    let itemPay = document.getElementsByClassName("pay");

    for (let i = 0; i < itemPay.length; i++) {
        itemPay[i].addEventListener("input", function() {
            id = this.id;
            if (document.getElementById(id).value.trim() == "") {
                document.getElementById(id).className += " is-invalid";
            } else if (document.getElementById(id).value.trim() != "") {
                document.getElementById(id).classList.remove("is-invalid");
                document.getElementById(id).className += " is-valid";
            }
        })
    }
}

// Validacion de formulario envio

function paymentForm(evt, id) { // En caso de fallar en algun campo, retorna false deteniendo la funcion y haciendo enfoque en el input correpondiente
    let status = true; // Auxiliar que se utiliza para frenar la funcion
    let nombreTDC = document.getElementById("tdcName");
    let numeroTDC = document.getElementById("tdcNumber");
    let monthTDC = document.getElementById("tdcMonth");
    let yearTDC = document.getElementById("tdcYear");
    let cvvTDC = document.getElementById("tdc-cvv");
    let bankcountnumber = document.getElementById("bankcountnumber");
    let tdc = document.getElementById("credit").checked;
    let transf = document.getElementById("transf").checked;

    if (!tdc && !transf) { // Evalua que se haya seleccionado forma de pago, de lo contrario emite una alerta en el modal
        let formaDePago = document.getElementById("seleccionformadepago");
        let alertFormaDePago = `
        <div class="w-25 alert alert-danger alert-dismissible fade show" role="alert">
            <h4 class="alert-heading"><strong>Atención</strong></h4>
            <hr>
            <p>Debes seleccionar y completar forma de pago.</p>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `
        formaDePago.innerHTML = alertFormaDePago; // Se envia al html la alerta generada
        status = false;
    } else if (tdc) {
        if (nombreTDC.value.trim() == "") {
            nombreTDC.className += " is-invalid";
            status = false;
            nombreTDC.focus();
        } else if (numeroTDC.value.trim() == "") {
            numeroTDC.className += " is-invalid";
            status = false;
            numeroTDC.focus();
        } else if (monthTDC.value.trim() == "") {
            monthTDC.className += " is-invalid";
            status = false;
            monthTDC.focus();
        } else if (yearTDC.value.trim() == "") {
            yearTDC.className += " is-invalid";
            status = false;
            yearTDC.focus();
        } else if (cvvTDC.value.trim() == "") {
            cvvTDC.className += " is-invalid";
            status = false;
            cvvTDC.focus();
        }
    } else if (transf) {
        if (bankcountnumber.value.trim() == "") {
            bankcountnumber.className += " is-invalid";
            status = false;
            bankcountnumber.focus();
        }
    }
    if (status == true) {
        let modal = document.getElementById("paymentModal").attributes[0].nodeValue;
        if (modal.includes("show")) { // Verifica que el modal este abierto o no
            CierraPopup(evt, id);
        }
        return true;
    } else {
        return false;
    }
}

function finalizarCompra() { // Verifica que este todo correcto para completar la compra, de lo contrario genera la alerta correspondiente
    if (porcentajeEnvio != 'undefined' && porcentajeEnvio != null) {
        if (!(shippingForm("submit", "shippingModal"))) { // Alerta si no se completaron los datos de envio
            let datosEnvio = document.getElementById("datosdeenvio");
            let alertDatosEnvio = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Debes completar datos de envío.</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `
            datosEnvio.innerHTML = alertDatosEnvio;
            return false
        }
    } else { // Alerta si no se selecciono el tipo de envio
        let tipoDeEnvio = document.getElementById("tipodeenvio");
        let alertTipoEnvio = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Debes seleccionar método de envío.</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `
        tipoDeEnvio.innerHTML = alertTipoEnvio;
        return false
    }

    if (!(paymentForm("submit", "paymentModal"))) { // Alerta si no se completo formulario de forma de pago
        let formaDePago = document.getElementById("formadepago");
        let alertFormaDePago = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Debes completar forma de pago.</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `
        formaDePago.innerHTML = alertFormaDePago;
        return false
    } else { // Alerta si la compra se realizo correctamente
        let compraFinalizada = document.getElementById("comprafinalizada");
        let alertcompraFinalizada = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>${msgCompraFinalizada}</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `
        compraFinalizada.innerHTML = alertcompraFinalizada;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    let cartInfo = {};
    getJSONData("https://raw.githubusercontent.com/Marcos170393/products-cart-info/main/json").then(function(resultObj) {
        if (resultObj.status === "ok") {
            cartInfo = resultObj.data.articles;
            showCartProductsAndTotalCost(cartInfo);
        };
    });
    shipping();
    paymentInput();
    validShipForm();
    validpayForm();

    getJSONData(CART_BUY_URL).then(result => { // Se obtiene el mensaje de compra finalizada desde el JSON
        if (result.status === "ok") {
            msgCompraFinalizada = result.data.msg;
        }
    })
})