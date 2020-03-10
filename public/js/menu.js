if (localStorage.token != undefined) {
  var url = "/api/sesion/validar";
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.token
    }
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      console.log(myJson);
      if (!myJson.ok) {
        localStorage.removeItem("token");
        location.href = "./admin";
      } else {
        localStorage.token = myJson.token;
        generar_menu();
      }
    });
} else {
  location.href = "./admin";
}

function generar_menu() {
  var url = "/api/permisos";
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.token
    }
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      if (!myJson.ok) {
        localStorage.removeItem("token");
        location.href = "./admin";
      } else {
        localStorage.token = myJson.token;
        var menu = '';
        var g_id_menu = 0;
        var id_menu = 0;
        $.each(myJson.permisos, function (key, value) {
          id_menu = value.id_menu;
          if (g_id_menu !== id_menu) {
            if (g_id_menu !== 0) {
              menu += "</div>\n";
              menu += "</li>\n";
            }
            menu += "<li class='nav-item dropdown'>\n";
            menu += "<a class='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" + value.nombre_menu + '</a>\n';
            menu += "<div class='dropdown-menu' aria-labelledby='navbarDropdown'>\n";
            g_id_menu = id_menu;
          }
          if (value.id_formulario === 12) {
            menu += "<div class='dropdown-divider'></div>\n";
          }
          menu += "<a class='dropdown-item' href='#' onclick=\"cargar_formulario('" + value.url_formulario + "')\">" + value.nombre_formulario + "</a>\n";
        });
        if (menu !== '') {
          menu += "</div>\n";
          menu += "</li>\n";
        }
        $('#menu').html(menu);
      }
    });
}

function salir_menu() {
  location.href = './admin';
  localStorage.removeItem("token");
}

function cargar_formulario(frm) {
  $('.formularios').load(frm);
}

function salir_formulario(frm) {
  $('.formularios').html('');
}

function cargar_busqueda(frm) {
  $('.formularios').fadeOut('slow', function () {
    $('.busquedas').load(frm);
    $('.busquedas').fadeIn('slow');
  });
}

function salir_busqueda(campo) {
  $('.busquedas').fadeOut('slow', function () {
    $('.formularios').fadeIn('slow', function () {
      $(campo).select();
    });
  });
}

function habilitar_agregar() {
  $('#boton-agregar').attr('disabled', false);
  $('#boton-modificar').attr('disabled', true);
  $('#boton-eliminar').attr('disabled', true);
}

function deshabilitar_agregar() {
  $('#boton-agregar').attr('disabled', true);
  $('#boton-modificar').attr('disabled', false);
  $('#boton-eliminar').attr('disabled', false);
}