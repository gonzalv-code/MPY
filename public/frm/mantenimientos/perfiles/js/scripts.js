
$('#id_perfil').select();
habilitar_agregar();

function buscar_id() {
    var id_perfil = $('#id_perfil').val();
    var url = "/api/perfiles/" + id_perfil;

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
                $('#id_perfil').val(myJson.datos[0].id_perfil);
                $('#nombre_perfil').val(myJson.datos[0].nombre_perfil);
                $('#nombre_perfil').select();
                deshabilitar_agregar();
            } else {
                $('#id_perfil').val(0);
                $('#nombre_perfil').val("");
                $('#nombre_perfil').select();
                habilitar_agregar();
            }
        });
}

function buscar_nombre() {

    var url = "/api/perfiles";

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
                    filas += "<tr onclick='seleccionar_perfil($(this))'>";
                    filas += " <td>" + perfil.id_perfil + "</td>";
                    filas += " <td>" + perfil.nombre_perfil + "</td>";
                    filas += "</tr>";
                });
            } else {
                filas = 'No existen mas registros ...';
            }
            $('#tbody_datos').html(filas);
        });
}

function seleccionar_perfil($this) {
    var id_perfil = $this.find('td').eq(0).text();
    var nombre_perfil = $this.find('td').eq(1).text();
    $('#id_perfil').val(id_perfil);
    $('#nombre_perfil').val(nombre_perfil);
    salir_busqueda('#nombre_perfil');
    deshabilitar_agregar();
}

function agregar() {
    var nombre_perfil = $('#nombre_perfil').val();

    var url = "/api/perfiles";
    var data = { nombre_perfil: nombre_perfil };

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
    var id_perfil = $('#id_perfil').val();
    var nombre_perfil = $('#nombre_perfil').val();

    var url = "/api/perfiles/" + id_perfil;
    var data = { nombre_perfil: nombre_perfil };

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
    var id_perfil = $('#id_perfil').val();

    var url = "/api/perfiles/" + id_perfil;

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