$('#id_formulario').select();
habilitar_agregar();

function buscar_id() {
    var id_formulario = $('#id_formulario').val();
    var url = "/api/formularios/" + id_formulario;

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
                $('#id_formulario').val(myJson.datos[0].id_formulario);
                $('#nombre_formulario').val(myJson.datos[0].nombre_formulario);
                $('#url_formulario').val(myJson.datos[0].url_formulario);
                $('#id_menu').val(myJson.datos[0].id_menu);
                $('#nombre_menu').val(myJson.datos[0].nombre_menu);
                $('#nombre_formulario').select();
                deshabilitar_agregar();
            } else {
                $('#id_formulario').val(0);
                $('#nombre_formulario').val("");
                $('#url_formulario').val("");
                $('#id_menu').val("");
                $('#nombre_menu').val("");
                $('#nombre_formulario').select();
                habilitar_agregar();
            }
        });
}

function buscar_nombre() {

    var url = "/api/formularios";

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
                myJson.datos.forEach(formulario => {
                    filas += "<tr onclick='seleccionar_formulario($(this))'>";
                    filas += " <td>" + formulario.id_formulario + "</td>";
                    filas += " <td>" + formulario.nombre_formulario + "</td>";
                    filas += " <td>" + formulario.url_formulario + "</td>";
                    filas += " <td>" + formulario.id_menu + "</td>";
                    filas += " <td>" + formulario.nombre_menu + "</td>";
                    filas += "</tr>";
                });
            } else {
                filas = 'No existen mas registros ...';
            }
            $('#tbody_datos').html(filas);
        });
}

function seleccionar_formulario($this) {
    var id_formulario = $this.find('td').eq(0).text();
    var nombre_formulario = $this.find('td').eq(1).text();
    $('#id_formulario').val(id_formulario);
    $('#nombre_formulario').val(nombre_formulario);
    salir_busqueda('#nombre_formulario');
    deshabilitar_agregar();
}

function agregar() {
    var nombre_formulario = $('#nombre_formulario').val();

    var url = "/api/formularios";
    var data = { nombre_formulario: nombre_formulario };

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
    var id_formulario = $('#id_formulario').val();
    var nombre_formulario = $('#nombre_formulario').val();

    var url = "/api/formularios/" + id_formulario;
    var data = { nombre_formulario: nombre_formulario };

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
    var id_formulario = $('#id_formulario').val();

    var url = "/api/formularios/" + id_formulario;

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