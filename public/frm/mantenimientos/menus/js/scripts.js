$('#id_menu').select();
habilitar_agregar();

function buscar_id() {
    var id_menu = $('#id_menu').val();
    var url = "/api/menus/" + id_menu;

    fetch(url, {
        method: "GET",
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
                $('#id_menu').val(myJson.datos[0].id_menu);
                $('#nombre_menu').val(myJson.datos[0].nombre_menu);
                $('#nombre_menu').select();
                deshabilitar_agregar();
            } else {
                $('#id_menu').val(0);
                $('#nombre_menu').val("");
                $('#nombre_menu').select();
                habilitar_agregar();
            }
        });
}

function buscar_nombre() {

    var url = "/api/menus";

    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson);
            $('#tbody_datos').html('');
            if (myJson.datos.length > 0) {
                var filas = "";
                myJson.datos.forEach(menu => {
                    filas += "<tr onclick='seleccionar_menu($(this))'>";
                    filas += " <td>" + menu.id_menu + "</td>";
                    filas += " <td>" + menu.nombre_menu + "</td>";
                    filas += "</tr>";
                });
            } else {
                filas = 'No existen mas registros ...';
            }
            $('#tbody_datos').html(filas);
        });
}

function seleccionar_menu($this) {
    var id_menu = $this.find('td').eq(0).text();
    var nombre_menu = $this.find('td').eq(1).text();
    $('#id_menu').val(id_menu);
    $('#nombre_menu').val(nombre_menu);
    salir_busqueda('#nombre_menu');
    deshabilitar_agregar();
}

function agregar() {
    var nombre_menu = $('#nombre_menu').val();

    var url = "/api/menus";
    var data = { nombre_menu: nombre_menu };

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

        });
}

function modificar() {
    var id_menu = $('#id_menu').val();
    var nombre_menu = $('#nombre_menu').val();

    var url = "/api/menus/" + id_menu;
    var data = { nombre_menu: nombre_menu };

    fetch(url, {
        method: "PUT",
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
        });
}

function eliminar() {
    var id_menu = $('#id_menu').val();

    var url = "/api/menus/" + id_menu;

    fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson);
        });
}