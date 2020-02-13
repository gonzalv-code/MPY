$('#id_iva').select();
habilitar_agregar();

function buscar_id() {
    var id_iva = $('#id_iva').val();
    var url = "/api/ivas/" + id_iva;

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
                $('#id_iva').val(myJson.datos[0].id_iva);
                $('#nombre_iva').val(myJson.datos[0].nombre_iva);
                $('#porcentaje_iva').val(myJson.datos[0].porcentaje_iva);
                $('#nombre_iva').select();
                deshabilitar_agregar();
            } else {
                $('#id_iva').val(0);
                $('#nombre_iva').val("");
                $('#porcentaje_iva').val("");
                $('#nombre_iva').select();
                habilitar_agregar();
            }
        });
}

function buscar_nombre() {

    var url = "/api/ivas";

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
                myJson.datos.forEach(ivas => {
                    filas += "<tr onclick='seleccionar_iva($(this))'>";
                    filas += " <td>" + ivas.id_iva + "</td>";
                    filas += " <td>" + ivas.nombre_iva + "</td>";
                    filas += " <td>" + ivas.porcentaje_iva + "</td>";
                    filas += "</tr>";
                });
            } else {
                filas = 'No existen mas registros ...';
            }
            $('#tbody_datos').html(filas);
        });
}

function seleccionar_iva($this) {
    var id_iva = $this.find('td').eq(0).text();
    var nombre_iva = $this.find('td').eq(1).text();
    var porcentaje_iva = $this.find('td').eq(2).text();
    $('#id_iva').val(id_iva);
    $('#nombre_iva').val(nombre_iva);
    $('#porcentaje_iva').val(porcentaje_iva);
    salir_busqueda('#nombre_iva');
    deshabilitar_agregar();
}

function agregar() {
    var nombre_iva = $('#nombre_iva').val();
    var porcentaje_iva = $('#porcentaje_iva').val();

    var url = "/api/ivas";
    var data = { nombre_iva: nombre_iva, porcentaje_iva: porcentaje_iva };

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
    var id_iva = $('#id_iva').val();
    var nombre_iva = $('#nombre_iva').val();
    var porcentaje_iva = $('#porcentaje_iva').val();

    var url = "/api/ivas/" + id_iva;
    var data = { nombre_iva: nombre_iva, porcentaje_iva: porcentaje_iva };

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
    var id_iva = $('#id_iva').val();

    var url = "/api/ivas/" + id_iva;

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