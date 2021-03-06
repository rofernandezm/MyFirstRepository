let product = {}; // Array del JSON PRODUCT_INFO_URL
let productsList = {}; // Array del JSON PRODUCTS_URL
let comments = {}; // Array del JSON PRODUCT_INFO_COMMENTS_URL
let firstImg; // Variable definida para asignar la primer imagen en carousel
let newComments = new Object(); // Objeto utilizado para generar nuevo comentario

// Funcion que muestra las imagenes en carousel

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend +=
            `<div class="zoom carousel-item fimg">
                <a href="${imageSrc}" target="_blank"><img class="d-block w-100" src="${imageSrc}"></a>
            </div>
            `
        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    };
};

// funcion que asigna la primer imagen al carousel

function firstImagen() {

    firstImg = document.getElementsByClassName("fimg")[0];
    firstImg.className += " active";
};

// funcion que muestra los productos relacionados

function showRelatedProduct(array) {

    getJSONData(PRODUCTS_URL).then(function(resultObj) { // Peticion de datos a PRODUCTS_URL
        if (resultObj.status === "ok") {
            productsList = resultObj.data;

            let htmlRelatedProducts = "";

            for (let i = 0; i < array.length; i++) {
                let relatedProducsPosition = array[i]; // Toma como arrar el parametro indicado al llamar la funcion linea 188
                let relatedProducts = productsList[relatedProducsPosition]; // Se combina array de productos con posicion indicada por propiedad "relatedProducts"

                htmlRelatedProducts +=

                    `
                    
                    <div class="card mb-4 box-shadow col-sm-12 col-md-3 border m-1 shadow-sm p-2 mb-5 bg-white rounded">
                        <div class="card-body d-flex flex-column p-0">
                            <div class="card-title pricing-card-title"> 
                                <img class="img-fluid p-0" src="${relatedProducts.imgSrc}">
                            </div>
                            <div class="text-left mt-3 mb-4 p-2">
                                <h5>${relatedProducts.name}</h5>
                                <hr>
                                <p class="card-text">${relatedProducts.description}</p>
                            </div>
                            <button type="button" onclick="window.location.href='product-info.html'" class="btnprodrelat mt-auto btn btn-outline-secondary p-2">Ver</button>
                        </div>
                    </div>
                
                `

                document.getElementById("productRelated").innerHTML = htmlRelatedProducts;
            };

        };
    });
};

// funcion que muestra los comentarios

function showComments(array) {

    let htmlComments = "";

    for (let i = 0; i < array.length; i++) {

        let comment = array[i]; // Toma como arrar el parametro indicado al llamar la funcion linea 197

        let stars = `<span class="fa fa-star checked"></span>`.repeat(comment.score); // Conteo de estrellas pintadas
        let starsNull = `<span class="fa fa-star"></span>`.repeat(5 - comment.score); // Conteo de estrellas vacias (Total - pintadas)

        htmlComments += `
        <li class="media">
            <div class="media-body">
                <label class="mt-0"><strong>${comment.user}</strong>
                    <span class="mute"> - ${comment.dateTime}</span>
                    <span> - ${stars}${starsNull}</span>
                </label>
                <br/>
                <label class="small">${comment.description}</label>
                <hr/>
            </div>
        </li>    
        `
    };
    document.getElementById("productComment").innerHTML = htmlComments;
};

// Nuevo Comentario

function newComment() {

    newComments.description = document.getElementById("textComment").value;

    if (newComments.description != "" || newComments.description.length > 20) {

        let fecha = new Date(); // Obtiene la fecha al momento de enviar el comentario
        let mm = fecha.getMonth() + 1; // Mes
        let dd = fecha.getDate(); // Dia
        let hh = fecha.getHours(); // Hora
        let min = fecha.getMinutes(); // Minutos
        let ss = fecha.getSeconds(); // Segundos

        // Funcion que formatea fecha y hora como los comentarios del JSON

        function dateFormat() {
            if (mm < 10) {
                mm = "0" + mm;
            }
            if (dd < 10) {
                dd = "0" + dd;
            }
            if (hh < 10) {
                hh = "0" + hh;
            }
            if (min < 10) {
                min = "0" + min;
            }
            if (ss < 10) {
                ss = "0" + ss;
            }
        };
        dateFormat();

        commentDate = `${fecha.getFullYear()}-${mm}-${dd} ${hh}:${min}:${ss}`

        newComments.score = document.getElementById("clasification").value;
        let nameUser = /^([^]+)@(\w+).(\w+)$/.exec(usuario);
        newComments.user = nameUser[1];
        newComments.dateTime = commentDate;

        let htmlComments = "";

        let stars = `<span class="fa fa-star checked"></span>`.repeat(newComments.score);
        let starsNull = `<span class="fa fa-star"></span>`.repeat(5 - newComments.score);

        htmlComments = `
            <div class="media-body">
                <label class="mt-0"><strong>${newComments.user}</strong>
                    <span class="mute"> - ${newComments.dateTime}</span>
                    <span> - ${stars}${starsNull}</span>
                </label>
                <br/>
                <label class="small">${newComments.description}</label>
                <hr/>
            </div>  
        `
        document.getElementById("productComment").innerHTML += htmlComments;
        document.getElementById("formComment").reset();
    } else {
        alert("El mensaje debe tener un mínimo de 20 caracteres");
        document.getElementById("textComment").focus();
    }
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

    // Peticion al JSON de la info del producto

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productPriceHTML = document.getElementById("productPrice");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCategoryHTML = document.getElementById("productCategory");
            let productSoldCountHTML = document.getElementById("productSoldCount");

            productNameHTML.innerHTML = product.name;
            productPriceHTML.innerHTML = product.currency + " " + product.cost;
            productDescriptionHTML.innerHTML = product.description;
            productCategoryHTML.innerHTML = product.category;
            productSoldCountHTML.innerHTML = product.soldCount + " " + "vendidos";

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            // Aplico class "active" para mostrar imagenes en Carousel
            firstImagen();
            // Muestro productos relacionado
            showRelatedProduct(product.relatedProducts);

        };
    });

    // Peticion para mostrar comentarios desde Json

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {

        if (resultObj.status === "ok") {
            comments = resultObj.data;

            //Envio comentarios formateados a html

            showComments(comments);

            if (usuario != null) {

                document.getElementById("usrComment").innerHTML = usuario;

            } else {

                let buttonComment = document.getElementById("buttonComment");

                buttonComment.addEventListener("click", () => {

                    alert("Debes iniciar sesión para poder comentar");
                });
            }
        };
    });

});