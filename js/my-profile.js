function saveData() { // Funcion que obtiene los datos ingresados en el modal y los almacena en local storage

    let nombres = document.getElementById("input-first-name");
    let apellidos = document.getElementById("input-last-name");
    let edad = document.getElementById("input-age");
    let telefono = document.getElementById("input-telefono");
    let email = document.getElementById("input-email");
    let alerta; // Variable auxiliar para generar alerta de boostrap dinamicamente
    let contAlerta = document.getElementById("alerta");

    let inputValue = Array.from(document.getElementsByClassName("profile")); // Se genera un array por todos los elementos con clase Profile
    const value = inputValue.map((i) => { return i.value }) //Se genera un nuevo array solo con los valores de los elementos en inputValue

    let obj = new Object(); // Se declara el objeto donde se agregaran los datos del usuario

    obj.nombres = nombres.value;
    obj.apellidos = apellidos.value;
    obj.edad = edad.value;
    obj.telefono = telefono.value;
    obj.email = email.value;

    let objStr = JSON.stringify(obj); // Se convierte el objeto a string

    if (value.includes("")) { // Se verifica que en los input no exista valores vacios de lo contrario se genera una alerta en pantalla
        alerta =
            `<div class="alert alert-danger" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="alert-heading">Atención</h4>
            <hr>
            <p class="mb-0">Debe completar los campos.</p>
        </div>`

        contAlerta.innerHTML = alerta;

    } else if (usuario != null) { // Se verifica que previamente el usuario este logueado, de lo contrario emite una alerta indicando que debe iniciar sesion
        localStorage.setItem("userDataObj", objStr); // Se guardan los datos del usuario en Local Storage
        userData()
        $('#profileModal').modal('hide'); // Hasta la linea 43 se ejecutan comandos para cerrar el modal
        $('body').removeClass('modal-open');
        $('body').css('padding-right', '0px');
        $('.modal-backdrop').remove();
        document.location.reload(); // Se recarga la pagina para actualizar foto de perfil
    } else {
        alerta =
            `<div class="alert alert-danger" role="alert">
            <button type="button" onclick="window.location.href = 'index.html'" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="alert-heading">Atención</h4>
            <hr>
            <p class="mb-0">Debes iniciar sesión.</p>
        </div>`

        contAlerta.innerHTML = alerta;
    }
}


function userData() { // Funcion que muestra los datos del usuario en los campos correspondientes obteniendo la info desde local storage

    let nombres = document.getElementById("first-name");
    let apellidos = document.getElementById("last-name");
    let edad = document.getElementById("age");
    let telefono = document.getElementById("telefono");
    let email = document.getElementById("email");

    let userDataObj = localStorage.getItem("userDataObj");

    if (userDataObj != null) { // Se verifica que previamente existan datos guardados en local storage

        let dataUser = JSON.parse(userDataObj); // Se convierte el string a objeto nuevamente

        nombres.value = dataUser.nombres;
        apellidos.value = dataUser.apellidos;
        edad.value = dataUser.edad;
        telefono.value = dataUser.telefono;
        email.value = dataUser.email;
    }
}

function setProfileImage() { // Funcion que obtiene desde local storage la imagen almacenada en formato string
    const profileImageDataUrl = localStorage.getItem("profileImage");

    if (profileImageDataUrl) { // Se verifica que existan datos de imagen guardados
        document.getElementById("userImageProfile").setAttribute("src", profileImageDataUrl)
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    userData(); // Se ejecuta la funcion para que cuando el usuario vuelva a my-profile.html sin cerrar sesion se muestren sus datos en pantalla
    document.getElementById("image-profile").addEventListener("change", () => {

        const reader = new FileReader(); // FileReader es utilizado para leer los datos de la imagen 

        reader.readAsDataURL(this.activeElement.files[0]); // Obtiene los datos de la imagen y los almacena en reader.result

        reader.addEventListener("load", () => {
            localStorage.setItem("profileImage", reader.result) // Se guardan los datos de la imagen en localstorage
        })

    });
    setProfileImage() //Se ejecuta la funcion al cargar el DOM para que el usuario visualice la imagen almacenada previamente
});