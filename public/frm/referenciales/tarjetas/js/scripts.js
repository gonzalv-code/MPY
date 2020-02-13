$('#id_tarjeta').select();
habilitar_agregar();

function buscar_id() {
    var id_tarjeta = $('#id_tarjeta').val();
    var url = "/api/tarjetas/" + id_tarjeta;

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
                $('#id_tarjeta').val(myJson.datos[0].id_tarjeta);
                $('#nombre_tarjeta').val(myJson.datos[0].nombre_tarjeta);
                $('#nombre_tarjeta').select();
                deshabilitar_agregar();
            } else {
                $('#id_tarjeta').val(0);
                $('#nombre_tarjeta').val("");
                $('#nombre_tarjeta').select();
                habilitar_agregar();
            }
        });
}

function buscar_nombre() {

    var url = "/api/tarjetas";

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
                myJson.datos.forEach(tarjeta => {
                    filas += "<tr onclick='seleccionar_tarjeta($(this))'>";
                    filas += " <td>" + tarjeta.id_tarjeta + "</td>";
                    filas += " <td>" + tarjeta.nombre_tarjeta + "</td>";
                    filas += "</tr>";
                });
            } else {
                filas = 'No existen mas registros ...';
            }
            $('#tbody_datos').html(filas);
        });
}

function seleccionar_tarjeta($this) {
    var id_tarjeta = $this.find('td').eq(0).text();
    var nombre_tarjeta = $this.find('td').eq(1).text();
    $('#id_tarjeta').val(id_tarjeta);
    $('#nombre_tarjeta').val(nombre_tarjeta);
    salir_busqueda('#nombre_tarjeta');
    deshabilitar_agregar();
}

function agregar() {
    var nombre_tarjeta = $('#nombre_tarjeta').val();

    var url = "/api/tarjetas";
    var data = { nombre_tarjeta: nombre_tarjeta };

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
    var id_tarjeta = $('#id_tarjeta').val();
    var nombre_tarjeta = $('#nombre_tarjeta').val();

    var url = "/api/tarjetas/" + id_tarjeta;
    var data = { nombre_tarjeta: nombre_tarjeta };

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
    var id_tarjeta = $('#id_tarjeta').val();

    var url = "/api/tarjetas/" + id_tarjeta;

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