function validation() {

  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  const expresion = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (user == "" || pass == "") {

    document.getElementById("msj").innerHTML = "Formulario inválido. Todos los campos son obligatorios.";
    return false;

  } else if (!expresion.test(user)) {

    document.getElementById("msj").innerHTML = "Debe ingresar una email válido.";
    document.getElementById("username").focus();
    return false;

  } else if (pass.length < 8) {

    document.getElementById("msj").innerHTML = "La contraseña debe tener un mínimo de 8 carácteres.";
    document.getElementById("password").focus();
    return false;
  }

  //Almacena datos del usuario para NavBar

  localStorage.setItem("Usuario", user);
  //localStorage.setItem("Contrasena", pass);

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {

});