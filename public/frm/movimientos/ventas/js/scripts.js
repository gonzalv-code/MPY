$('#id_venta_cabecera').select();
habilitar_agregar();

function buscar_id() {
    var id_venta_cabecera = $('#id_venta_cabecera').val();
    var url = "/api/ventas_cabeceras/" + id_venta_cabecera;

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
                $('#id_venta_cabecera').val(myJson.datos[0].id_venta_cabecera);
                $('#fiscal_venta_cabecera').val(myJson.datos[0].fiscal_venta_cabecera);
                $('#emision_venta_cabecera').val(myJson.datos[0].emision_venta_cabecera);
                $('#condicion_venta_cabecera').val(myJson.datos[0].condicion_venta_cabecera);
                $('#id_cliente').val(myJson.datos[0].id_cliente);
                $('#nombre_cliente').val(myJson.datos[0].nombre_cliente);
                $('#id_venta_cabecera').select();
                deshabilitar_agregar();
            } else {
                $('#id_venta_cabecera').val(0);
                $('#fiscal_venta_cabecera').val("");
                $('#emision_venta_cabecera').val("");
                $('#condicion_venta_cabecera').val("");
                $('#id_cliente').val("");
                $('#nombre_cliente').val("");
                $('#id_venta_cabecera').select();
                habilitar_agregar();
            }
        });
}

function buscar_venta() {

    var url = "/api/ventas";

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
                myJson.datos.forEach(venta => {
                    filas += "<tr onclick='seleccionar_venta($(this))'>";
                    filas += " <td>" + venta.id_venta_cabecera + "</td>";
                    filas += " <td>" + venta.fiscal_venta_cabecera + "</td>";
                    filas += " <td>" + venta.emision_venta_cabecera + "</td>";
                    filas += " <td>" + venta.condicion_venta_cabecera + "</td>";
                    filas += " <td>" + venta.id_cliente + "</td>";
                    filas += " <td>" + venta.nombre_cliente + "</td>";
                    filas += "</tr>";
                });
            } else {
                filas = 'No existen mas registros ...';
            }
            $('#tbody_datos').html(filas);
        });
}

function seleccionar_venta($this) {
    var id_venta_cabecera = $this.find('td').eq(0).text();
    var fiscal_venta_cabecera = $this.find('td').eq(1).text();
    var emision_venta_cabecera = $this.find('td').eq(2).text();
    var condicion_venta_cabecera = $this.find('td').eq(3).text();
    var id_cliente = $this.find('td').eq(4).text();
    var nombre_cliente = $this.find('td').eq(5).text();
    $('#id_venta_cabecera').val(id_venta_cabecera);
    $('#fiscal_venta_cabecera').val(fiscal_venta_cabecera);
    $('#emision_venta_cabecera').val(emision_venta_cabecera);
    $('#condicion_venta_cabecera').val(condicion_venta_cabecera);
    $('#id_cliente').val(id_cliente);
    $('#nombre_cliente').val(nombre_cliente);
    salir_busqueda('#id_venta_cabecera');
    deshabilitar_agregar();
}

function agregar() {
    var fiscal_venta_cabecera = $('#fiscal_venta_cabecera').val();
    var emision_venta_cabecera = $('#emision_venta_cabecera').val();
    var condicion_venta_cabecera = $('#condicion_venta_cabecera').val();
    var id_cliente = $('#id_cliente').val();

    var url = "/api/ventas";
    var data = {
                    fiscal_venta_cabecera: fiscal_venta_cabecera,
                    emision_venta_cabecera: emision_venta_cabecera,
                    condicion_venta_cabecera: condicion_venta_cabecera,
                    id_cliente: id_cliente
                };

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
            if (myJson.agregado) {
                limpiar_venta();
            } else {
                alert('Registro no agregado')
            }

        });
}

function limpiar_formulario() {
    $('#id_venta_cabecera').val(0);
    $('#fiscal_venta_cabecera').val("");
    $('#emision_venta_cabecera').val("");
    $('#condicion_venta_cabecera').val("");
    $('#id_cliente').val(0);
    $('#nombre_cliente').val("");
    $('#id_venta_cabecera').select();
}

function modificar() {
    var id_venta_cabecera = $('#id_venta_cabecera').val();
    var fiscal_venta_cabecera = $('#fiscal_venta_cabecera').val();
    var emision_venta_cabecera = $('#emision_venta_cabecera').val();
    var condicion_venta_cabecera = $('#condicion_venta_cabecera').val();
    var id_cliente = $('#id_cliente').val();

    var url = "/api/ventas/" + id_venta_cabecera;
    var data = {
        fiscal_venta_cabecera: fiscal_venta_cabecera,
        emision_venta_cabecera: emision_venta_cabecera,
        condicion_venta_cabecera: condicion_venta_cabecera,
        id_cliente: id_cliente
    };

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
            if (myJson.modificado) {
                limpiar_formulario();
            } else {
                alert('Registro no modificado')
            }
        });
}

function eliminar() {
    var id_venta_cabecera = $('#id_venta_cabecera').val();

    var url = "/api/ventas/" + id_venta_cabecera;

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
            if (myJson.eliminado) {
                limpiar_formulario();
            } else {
                alert('Registro no eliminado')
            }
        });
}

// Cliente -----------------------------------------------------------------------------------------------------------------------
function buscar_id_cliente() {
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
            } else {
                $('#id_cliente').val(0);
                $('#nombre_cliente').val("");
            }
        });
}

function buscar_nombre_cliente() {

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
    salir_busqueda('#id_cliente');
}