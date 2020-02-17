siguiente_campo('#login_usuario','#clave_usuario',false);
siguiente_campo('#clave_usuario','#boton-ingresar',false);

function ingresar() {
  var login = $('#login_usuario').val();
  var clave = $('#clave_usuario').val();
  if (login.trim() === '') {
    mensaje('Usuario vacio','Aceptar','focus_login()');
  } else if (clave.trim() === '') {
    mensaje('Contraseña vacia','Aceptar','focus_clave()');
  } else {
    ingresar_ajax(login, clave);
  }
}

function focus_login(){
  $('#login_usuario').select();
}

function focus_clave(){
  $('#clave_usuario').select();
}

function ingresar_ajax(login, clave) {
  var url = "/api/usuarios/login";
  var data = { login_usuario: login, clave_usuario: clave };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      console.log(myJson);
      if (myJson.datos.length > 0) {
        location.href = "./menu";
      } else {
        mensaje('Credencial incorrecta','Aceptar','focus_login()');
      }
    });
}


function salir_admin() {
  location.href = './';
}