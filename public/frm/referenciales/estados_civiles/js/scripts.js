$('#id_estado_civil').select();
habilitar_agregar();

function buscar_id() {
    var id_estado_civil = $('#id_estado_civil').val();
    var url = "/api/estados_civiles/" + id_estado_civil;

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
                $('#id_estado_civil').val(myJson.datos[0].id_estado_civil);
                $('#nombre_estado_civil').val(myJson.datos[0].nombre_estado_civil);
                $('#nombre_estado_civil').select();
                deshabilitar_agregar();
            } else {
                $('#id_estado_civil').val(0);
                $('#nombre_estado_civil').val("");
                $('#nombre_estado_civil').select();
                habilitar_agregar();
            }
        });
}

function buscar_nombre() {

    var url = "/api/estados_civiles";

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
                myJson.datos.forEach(perfil => {
                    filas += "<tr onclick='seleccionar_estado_civil($(this))'>";
                    filas += " <td>" + perfil.id_estado_civil + "</td>";
                    filas += " <td>" + perfil.nombre_estado_civil + "</td>";
                    filas += "</tr>";
                });
            } else {
                filas = 'No existen mas registros ...';
            }
            $('#tbody_datos').html(filas);
        });
}

function seleccionar_estado_civil($this) {
    var id_estado_civil = $this.find('td').eq(0).text();
    var nombre_estado_civil = $this.find('td').eq(1).text();
    $('#id_estado_civil').val(id_estado_civil);
    $('#nombre_estado_civil').val(nombre_estado_civil);
    salir_busqueda('#nombre_estado_civil');
    deshabilitar_agregar();
}

function agregar() {
    var nombre_estado_civil = $('#nombre_estado_civil').val();

    var url = "/api/estados_civiles";
    var data = { nombre_estado_civil: nombre_estado_civil };

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
    var id_estado_civil = $('#id_estado_civil').val();
    var nombre_estado_civil = $('#nombre_estado_civil').val();

    var url = "/api/estados_civiles/" + id_estado_civil;
    var data = { nombre_estado_civil: nombre_estado_civil };

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
    var id_estado_civil = $('#id_estado_civil').val();

    var url = "/api/estados_civiles/" + id_estado_civil;

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