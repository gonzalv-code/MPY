$('#id_cliente').select();
habilitar_agregar();

function buscar_id() {
    var id_cliente = $('#id_cliente').val();
    var url = "/api/clientes/" + id_cliente;

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
                $('#id_cliente').val(myJson.datos[0].id_cliente);
                $('#nombre_cliente').val(myJson.datos[0].nombre_cliente);
                $('#nombre_cliente').select();
                deshabilitar_agregar();
            } else {
                $('#id_cliente').val(0);
                $('#nombre_cliente').val("");
                $('#nombre_cliente').select();
                habilitar_agregar();
            }
        });
}

function buscar_nombre() {

    var url = "/api/clientes";

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
                myJson.datos.forEach(cliente => {
                    filas += "<tr onclick='seleccionar_cliente($(this))'>";
                    filas += " <td>" + cliente.id_cliente + "</td>";
                    filas += " <td>" + cliente.nombre_cliente + "</td>";
                    filas += "</tr>";
                });
            } else {
                filas = 'No existen mas registros ...';
            }
            $('#tbody_datos').html(filas);
        });
}

function seleccionar_cliente($this) {
    var id_cliente = $this.find('td').eq(0).text();
    var nombre_cliente = $this.find('td').eq(1).text();
    $('#id_cliente').val(id_cliente);
    $('#nombre_cliente').val(nombre_cliente);
    salir_busqueda('#nombre_cliente');
    deshabilitar_agregar();
}

function agregar() {
    var nombre_cliente = $('#nombre_cliente').val();

    var url = "/api/clientes";
    var data = { nombre_cliente: nombre_cliente };

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
    var id_cliente = $('#id_cliente').val();
    var nombre_cliente = $('#nombre_cliente').val();

    var url = "/api/clientes/" + id_cliente;
    var data = { nombre_cliente: nombre_cliente };

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
    var id_cliente = $('#id_cliente').val();

    var url = "/api/clientes/" + id_cliente;

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