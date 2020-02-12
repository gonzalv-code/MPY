$('#id_producto').select();
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