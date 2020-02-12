$('#id_marca').select();
habilitar_agregar();

function buscar_id() {
    var id_marca = $('#id_marca').val();
    var url = "/api/marcas/" + id_marca;

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
                $('#id_marca').val(myJson.datos[0].id_marca);
                $('#nombre_marca').val(myJson.datos[0].nombre_marca);
                $('#nombre_marca').select();
                deshabilitar_agregar();
            } else {
                $('#id_marca').val(0);
                $('#nombre_marca').val("");
                $('#nombre_marca').select();
                habilitar_agregar();
            }
        });
}

function buscar_nombre() {

    var url = "/api/marcas";

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
                myJson.datos.forEach(marca => {
                    filas += "<tr onclick='seleccionar_marca($(this))'>";
                    filas += " <td>" + marca.id_marca + "</td>";
                    filas += " <td>" + marca.nombre_marca + "</td>";
                    filas += "</tr>";
                });
            } else {
                filas = 'No existen mas registros ...';
            }
            $('#tbody_datos').html(filas);
        });
}

function seleccionar_marca($this) {
    var id_marca = $this.find('td').eq(0).text();
    var nombre_marca = $this.find('td').eq(1).text();
    $('#id_marca').val(id_marca);
    $('#nombre_marca').val(nombre_marca);
    salir_busqueda('#nombre_marca');
    deshabilitar_agregar();
}

function agregar() {
    var nombre_marca = $('#nombre_marca').val();

    var url = "/api/marcas";
    var data = { nombre_marca: nombre_marca };

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
    var id_marca = $('#id_marca').val();
    var nombre_marca = $('#nombre_marca').val();

    var url = "/api/marcas/" + id_marca;
    var data = { nombre_marca: nombre_marca };

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
    var id_marca = $('#id_marca').val();

    var url = "/api/marcas/" + id_marca;

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