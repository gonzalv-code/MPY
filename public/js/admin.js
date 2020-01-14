function ingresar() {
  var login = $('#login_usuario').val();
  var clave = $('#clave_usuario').val();
  if (login.trim() === '') {
    alert('Usuario vacio');
    $('#login_usuario').select();
  } else if (clave.trim() === '') {
    alert('Contraseña vacia');
    $('#clave_usuario').select();
  } else {
    ingresar_ajax(login, clave);
  }
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
        alert('Credencial incorrecta');
        $('#usuario_usuario').select();
      }
    });
}


function salir_admin() {
  location.href = './';
}