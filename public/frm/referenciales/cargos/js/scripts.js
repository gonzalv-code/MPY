$('#id_cargo').select();
habilitar_agregar();

function buscar_id() {
    var id_cargo = $('#id_cargo').val();
    var url = "/api/cargos/" + id_cargo;

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
                $('#id_cargo').val(myJson.datos[0].id_cargo);
                $('#nombre_cargo').val(myJson.datos[0].nombre_cargo);
                $('#nombre_cargo').select();
                deshabilitar_agregar();
            } else {
                $('#id_cargo').val(0);
                $('#nombre_cargo').val("");
                $('#nombre_cargo').select();
                habilitar_agregar();
            }
        });
}

function buscar_nombre() {

    var url = "/api/cargos";

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
                    filas += "<tr onclick='seleccionar_cargo($(this))'>";
                    filas += " <td>" + perfil.id_cargo + "</td>";
                    filas += " <td>" + perfil.nombre_cargo + "</td>";
                    filas += "</tr>";
                });
            } else {
                filas = 'No existen mas registros ...';
            }
            $('#tbody_datos').html(filas);
        });
}

function seleccionar_cargo($this) {
    var id_cargo = $this.find('td').eq(0).text();
    var nombre_cargo = $this.find('td').eq(1).text();
    $('#id_cargo').val(id_cargo);
    $('#nombre_cargo').val(nombre_cargo);
    salir_busqueda('#nombre_cargo');
    deshabilitar_agregar();
}

function agregar() {
    var nombre_cargo = $('#nombre_cargo').val();

    var url = "/api/cargos";
    var data = { nombre_cargo: nombre_cargo };

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
    var id_cargo = $('#id_cargo').val();
    var nombre_cargo = $('#nombre_cargo').val();

    var url = "/api/cargos/" + id_cargo;
    var data = { nombre_cargo: nombre_cargo };

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
    var id_cargo = $('#id_cargo').val();

    var url = "/api/cargos/" + id_cargo;

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