$('#id_sucursal').select();
habilitar_agregar();

function buscar_id() {
    var id_sucursal = $('#id_sucursal').val();
    var url = "/api/sucursales/" + id_sucursal;

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
                $('#id_sucursal').val(myJson.datos[0].id_sucursal);
                $('#nombre_sucursal').val(myJson.datos[0].nombre_sucursal);
                $('#direccion_sucursal').val(myJson.datos[0].direccion_sucursal);
                $('#telefono_sucursal').val(myJson.datos[0].telefono_sucursal);
                $('#nombre_sucursal').select();
                deshabilitar_agregar();
            } else {
                $('#id_sucursal').val(0);
                $('#nombre_sucursal').val("");
                $('#direccion_sucursal').val("");
                $('#telefono_sucursal').val("");
                $('#nombre_sucursal').select();
                habilitar_agregar();
            }
        });
}

function buscar_nombre() {

    var url = "/api/sucursales";

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
                myJson.datos.forEach(sucursal => {
                    filas += "<tr onclick='seleccionar_sucursal($(this))'>";
                    filas += " <td>" + sucursal.id_sucursal + "</td>";
                    filas += " <td>" + sucursal.nombre_sucursal + "</td>";
                    filas += " <td>" + sucursal.direccion_sucursal + "</td>";
                    filas += " <td>" + sucursal.telefono_sucursal + "</td>";
                    filas += "</tr>";
                });
            } else {
                filas = 'No existen mas registros ...';
            }
            $('#tbody_datos').html(filas);
        });
}

function seleccionar_sucursal($this) {
    var id_sucursal = $this.find('td').eq(0).text();
    var nombre_sucursal = $this.find('td').eq(1).text();
    var direccion_sucursal = $this.find('td').eq(2).text();
    var telefono_sucursal = $this.find('td').eq(3).text();
    $('#id_sucursal').val(id_sucursal);
    $('#nombre_sucursal').val(nombre_sucursal);
    $('#direccion_sucursal').val(direccion_sucursal);
    $('#telefono_sucursal').val(telefono_sucursal);
    salir_busqueda('#nombre_sucursal');
    deshabilitar_agregar();
}

function agregar() {
    var nombre_sucursal = $('#nombre_sucursal').val();
    var direccion_sucursal = $('#direccion_sucursal').val();
    var telefono_sucursal = $('#telefono_sucursal').val();

    var url = "/api/sucursales";
    var data = { nombre_sucursal: nombre_sucursal, 
                 direccion_sucursal: direccion_sucursal, 
                 telefono_sucursal: telefono_sucursal};
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
    var id_sucursal = $('#id_sucursal').val();
    var nombre_sucursal = $('#nombre_sucursal').val();
    var direccion_sucursal = $('#direccion_sucursal').val();
    var telefono_sucursal = $('#telefono_sucursal').val();

    var url = "/api/sucursales/" + id_sucursal;
    var data = { nombre_sucursal: nombre_sucursal, direccion_sucursal: direccion_sucursal, telefono_sucursal: telefono_sucursal};

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
    var id_sucursal = $('#id_sucursal').val();

    var url = "/api/sucursales/" + id_sucursal;

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