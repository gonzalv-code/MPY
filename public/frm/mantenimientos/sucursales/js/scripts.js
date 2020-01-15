$('#id_sucursal').select();

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
                $('#nombre_sucursal').select();
            } else {
                $('#id_sucursal').val(0);
                $('#nombre_sucursal').val("");
                $('#nombre_sucursal').select();
            }
        });
}

function agregar() {
    var nombre_sucursal = $('#nombre_sucursal').val();

    var url = "/api/sucursales";
    var data = { nombre_sucursal: nombre_sucursal };

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

    var url = "/api/sucursales/"+id_sucursal;
    var data = { nombre_sucursal: nombre_sucursal };

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

    var url = "/api/sucursales/"+id_sucursal;

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