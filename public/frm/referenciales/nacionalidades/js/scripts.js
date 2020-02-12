$('#id_nacionalidad').select();
habilitar_agregar();

function buscar_id() {
    var id_nacionalidad = $('#id_nacionalidad').val();
    var url = "/api/nacionalidades/" + id_nacionalidad;

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
                $('#id_nacionalidad').val(myJson.datos[0].id_nacionalidad);
                $('#nombre_nacionalidad').val(myJson.datos[0].nombre_nacionalidad);
                $('#nombre_nacionalidad').select();
                deshabilitar_agregar();
            } else {
                $('#id_nacionalidad').val(0);
                $('#nombre_nacionalidad').val("");
                $('#nombre_nacionalidad').select();
                habilitar_agregar();
            }
        });
}

function buscar_nombre() {

    var url = "/api/nacionalidades";

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
                myJson.datos.forEach(nacionalidad => {
                    filas += "<tr onclick='seleccionar_nacionalidad($(this))'>";
                    filas += " <td>" + nacionalidad.id_nacionalidad + "</td>";
                    filas += " <td>" + nacionalidad.nombre_nacionalidad + "</td>";
                    filas += "</tr>";
                });
            } else {
                filas = 'No existen mas registros ...';
            }
            $('#tbody_datos').html(filas);
        });
}

function seleccionar_nacionalidad($this) {
    var id_nacionalidad = $this.find('td').eq(0).text();
    var nombre_nacionalidad = $this.find('td').eq(1).text();
    $('#id_nacionalidad').val(id_nacionalidad);
    $('#nombre_nacionalidad').val(nombre_nacionalidad);
    salir_busqueda('#nombre_nacionalidad');
    deshabilitar_agregar();
}

function agregar() {
    var nombre_nacionalidad = $('#nombre_nacionalidad').val();

    var url = "/api/nacionalidades";
    var data = { nombre_nacionalidad: nombre_nacionalidad };

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
    var id_nacionalidad = $('#id_nacionalidad').val();
    var nombre_nacionalidad = $('#nombre_nacionalidad').val();

    var url = "/api/nacionalidades/" + id_nacionalidad;
    var data = { nombre_nacionalidad: nombre_nacionalidad };

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
    var id_nacionalidad = $('#id_nacionalidad').val();

    var url = "/api/nacionalidades/" + id_nacionalidad;

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