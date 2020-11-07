function modificarData() {
    document.getElementById("guardarDatos").style.visibility = "visible";
    enableDisable();

}

function enableDisable() {

    let inputValue = Array.from(document.getElementsByClassName("profile"));
    const value = inputValue.map((i) => { return i.id })

    value.forEach((id) => {
        let input = document.getElementById(id);
        if (input.disabled) {
            input.disabled = false;
        } else {
            input.disabled = true;
        }
    })

}


function saveData() {

    let nombres = document.getElementById("input-first-name");
    let apellidos = document.getElementById("input-last-name");
    let edad = document.getElementById("input-age");
    let telefono = document.getElementById("input-telefono");
    let email = document.getElementById("input-email");
    let alerta;
    let contAlerta = document.getElementById("alerta");

    let inputValue = Array.from(document.getElementsByClassName("profile"));
    const value = inputValue.map((i) => { return i.value })

    let obj = new Object();

    obj.nombres = nombres.value;
    obj.apellidos = apellidos.value;
    obj.edad = edad.value;
    obj.telefono = telefono.value;
    obj.email = email.value;

    let objStr = JSON.stringify(obj);

    if (value.includes("")) {
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

    } else if (usuario != null) {
        localStorage.setItem("userDataObj", objStr);
        userData()
        $('#profileModal').modal('hide');
        $('body').removeClass('modal-open');
        $('body').css('padding-right', '0px');
        $('.modal-backdrop').remove();
        document.location.reload();
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


function userData() {

    let nombres = document.getElementById("first-name");
    let apellidos = document.getElementById("last-name");
    let edad = document.getElementById("age");
    let telefono = document.getElementById("telefono");
    let email = document.getElementById("email");

    let userDataObj = localStorage.getItem("userDataObj");

    if (userDataObj != null) {

        let dataUser = JSON.parse(userDataObj);

        nombres.value = dataUser.nombres;
        apellidos.value = dataUser.apellidos;
        edad.value = dataUser.edad;
        telefono.value = dataUser.telefono;
        email.value = dataUser.email;
    }
}

function setProfileImage() {
    const profileImageDataUrl = localStorage.getItem("profileImage");

    if (profileImageDataUrl) {
        document.getElementById("userImageProfile").setAttribute("src", profileImageDataUrl)
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    userData();
    document.getElementById("image-profile").addEventListener("change", () => {
        //console.log(this.activeElement.files);
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            //console.log(reader.result);
            localStorage.setItem("profileImage", reader.result)
        })

        reader.readAsDataURL(this.activeElement.files[0]);
    });
    setProfileImage()
});