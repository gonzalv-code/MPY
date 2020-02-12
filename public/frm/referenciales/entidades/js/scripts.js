$('#id_entidad').select();
habilitar_agregar();

function buscar_id() {
    var id_entidad = $('#id_entidad').val();
    var url = "/api/entidades/" + id_entidad;

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
                $('#id_entidad').val(myJson.datos[0].id_entidad);
                $('#nombre_entidad').val(myJson.datos[0].nombre_entidad);
                $('#nombre_entidad').select();
                deshabilitar_agregar();
            } else {
                $('#id_entidad').val(0);
                $('#nombre_entidad').val("");
                $('#nombre_entidad').select();
                habilitar_agregar();
            }
        });
}

function buscar_nombre() {

    var url = "/api/entidades";

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
                    filas += "<tr onclick='seleccionar_entidad($(this))'>";
                    filas += " <td>" + perfil.id_entidad + "</td>";
                    filas += " <td>" + perfil.nombre_entidad + "</td>";
                    filas += "</tr>";
                });
            } else {
                filas = 'No existen mas registros ...';
            }
            $('#tbody_datos').html(filas);
        });
}

function seleccionar_entidad($this) {
    var id_entidad = $this.find('td').eq(0).text();
    var nombre_entidad = $this.find('td').eq(1).text();
    $('#id_entidad').val(id_entidad);
    $('#nombre_entidad').val(nombre_entidad);
    salir_busqueda('#nombre_entidad');
    deshabilitar_agregar();
}

function agregar() {
    var nombre_entidad = $('#nombre_entidad').val();

    var url = "/api/entidades";
    var data = { nombre_entidad: nombre_entidad };

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
    var id_entidad = $('#id_entidad').val();
    var nombre_entidad = $('#nombre_entidad').val();

    var url = "/api/entidades/" + id_entidad;
    var data = { nombre_entidad: nombre_entidad };

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
    var id_entidad = $('#id_entidad').val();

    var url = "/api/entidades/" + id_entidad;

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