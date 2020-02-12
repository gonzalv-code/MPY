$('#id_ciudad').select();
habilitar_agregar();

function buscar_id() {
    var id_ciudad = $('#id_ciudad').val();
    var url = "/api/ciudades/" + id_ciudad;

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
                $('#id_ciudad').val(myJson.datos[0].id_ciudad);
                $('#nombre_ciudad').val(myJson.datos[0].nombre_ciudad);
                $('#nombre_ciudad').select();
                deshabilitar_agregar();
            } else {
                $('#id_ciudad').val(0);
                $('#nombre_ciudad').val("");
                $('#nombre_ciudad').select();
                habilitar_agregar();
            }
        });
}

function buscar_nombre() {

    var url = "/api/ciudades";

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
                    filas += " <td>" + perfil.id_ciudad + "</td>";
                    filas += " <td>" + perfil.nombre_ciudad + "</td>";
                    filas += "</tr>";
                });
            } else {
                filas = 'No existen mas registros ...';
            }
            $('#tbody_datos').html(filas);
        });
}

function seleccionar_cargo($this) {
    var id_ciudad = $this.find('td').eq(0).text();
    var nombre_ciudad = $this.find('td').eq(1).text();
    $('#id_ciudad').val(id_ciudad);
    $('#nombre_ciudad').val(nombre_ciudad);
    salir_busqueda('#nombre_ciudad');
    deshabilitar_agregar();
}

function agregar() {
    var nombre_ciudad = $('#nombre_ciudad').val();

    var url = "/api/ciudades";
    var data = { nombre_ciudad: nombre_ciudad };

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
    var id_ciudad = $('#id_ciudad').val();
    var nombre_ciudad = $('#nombre_ciudad').val();

    var url = "/api/ciudades/" + id_ciudad;
    var data = { nombre_ciudad: nombre_ciudad };

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
    var id_ciudad = $('#id_ciudad').val();

    var url = "/api/ciudades/" + id_ciudad;

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