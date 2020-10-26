const ORDER_ASC_BY_COST = "Menor precio";
const ORDER_DESC_BY_COST = "Mayor precio";
const ORDER_BY_PROD_SOLD = "Más relevantes.";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCost = undefined;
let maxCost = undefined;

function sortProducts(criteria, array) {
    let result = [];

    // Ordena ascendente por precio
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function(a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
        // Ordena descendente por precio    
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function(a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });

        // Ordena por relevancia segun cantidad vendidos
    } else if (criteria === ORDER_BY_PROD_SOLD) {
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))) {

            htmlContentToAppend += `
            <div class="col-md-4 p-2 item">
                <div class="card border shadow-sm mb-1 bg-white rounded">
                    <div class="card-body d-flex flex-column p-0">
                        <div class="card-title pricing-card-title"> 
                            <img class="img-fluid p-0" src="${product.imgSrc}" alt="${product.description}">
                        </div>
                        <div class="text-left mt-3 mb-4 p-2">
                            <h5 class="name">${product.name}</h5>
                            <hr>
                            <p class="card-text desc">${product.description}</p>
                            <div class="d-flex w-100 justify-content-between mt-5">
                                <small class="mt-auto text-muted">` + product.soldCount + ` vendidos</small>
                                <h5 class="text-muted font-weight-bold">` + product.currency + ` ` + product.cost + `</h5>
                            </div>
                        </div>
                        <button type="button" onclick="window.location.href='product-info.html'" class="btnprodrelat mt-auto btn btn-outline-secondary p-2">Ver</button>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }

    // Buscador

    let busqueda = document.getElementById("buscadorProd");

    busqueda.addEventListener("input", function() {

        let dataToMayus = busqueda.value.toUpperCase();
        let list = document.getElementById("prod-list-container");
        var prod = list.getElementsByClassName("item");

        for (let i = 0; i < prod.length; i++) {

            let name = prod[i].querySelector(".name");
            let desc = prod[i].querySelector(".desc");
            let nameValue = name.innerHTML;
            let descValue = desc.innerHTML;

            if (nameValue.toUpperCase().indexOf(dataToMayus) > -1 || descValue.toUpperCase().indexOf(dataToMayus) > -1) {
                prod[i].style.display = "";
            } else {
                prod[i].style.display = "none";
            }

        }
    });

}

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function() {
        sortAndShowProducts(ORDER_BY_PROD_SOLD);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function() {

        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio

        minCost = document.getElementById("rangeFilterCountMin").value;
        maxCost = document.getElementById("rangeFilterCountMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        } else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        } else {
            maxCost = undefined;
        }

        showProductsList();
    });
});