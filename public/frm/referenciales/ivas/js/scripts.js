fetch("api/ivas/permisos", {
    headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
    }
})
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        console.log(myJson);
        if (!myJson.ok) {
            localStorage.removeItem("token");
            location.href = "./admin";
        } else {
            localStorage.token = myJson.token;
            var botones = "";
            $.each(myJson.permisos, function (key, value) {
                if (value.agregar_permiso) {
                    botones += "<button type='button' id='boton-agregar' class='btn btn-sm btn-primary' onclick='agregar()'>Agregar</button>\n";
                }
                if (value.modificar_permiso) {
                    botones += "<button type='button' id='boton-modificar' class='btn btn-sm btn-success' onclick='modificar()'>Modificar</button>\n";
                }
                if (value.eliminar_permiso) {
                    botones += "<button type='button' id='boton-eliminar' class='btn btn-sm btn-danger' onclick='eliminar()'>Eliminar</button>\n";
                }
            });
            if (botones != "") {
                $('#botonera').prepend(botones);
            }
        }
    });
$('#id_iva').select();
habilitar_agregar();
siguiente_campo('#id_iva', '#nombre_iva', '#porcentaje_iva', false);
siguiente_campo('#nombre_iva', '#porcentaje_iva', '#boton-agregar', true);

function buscar_id() {
    if (validar_formulario_id_iva()) {
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
        }).catch(function(error) {
            location.href = "./menu";
            console.log('Hubo un problema con la petición Fetch:' + error.message);
        });
    }    
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
    if (validar_formulario()) {
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
}

function modificar() {
    if (validar_formulario()) {
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
                if (myJson.modificado) {
                    limpiar_campos();
                } else {
                    mensaje("ERROR: Registro no modificado", "Aceptar", "focus_nombre_cargo()");
                }
            })
            .catch(function (error) {
                mensaje(`ERROR SERVIDOR: ${error.message}`, "Aceptar", "focus_nombre_cargo()");
            });
}

function eliminar() {
    if (validar_formulario()) {
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

function validar_formulario() {
    var ok = true;
    var id_iva = $('#id_iva').val();
    var nombre_iva = $('#nombre_iva').val();
    var porcentaje_iva = $('#porcentaje_iva').val();
    //var expreg = /^\d+$/;
    //var expreg = new RegExp("^\\d+$");
    var expreg = new RegExp(/^\d+$/);
    console.log(expreg.test(id_iva));
    if (!expreg.test(id_iva)) {
        mensaje("Id de cargo debe ser sólo números", "Aceptar", "focus_id_iva()")
        ok = false;
    } else if (nombre_iva.trim() === '') {
        mensaje("Nombre no puede estar vacio", "Aceptar", "focus_nombre_iva()")
        ok = false;
    } else if (porcentaje_iva.trim() === '') {
        mensaje("Nombre no puede estar vacio", "Aceptar", "focus_porcentaje_iva()")
        ok = false;
    }
    return ok;
}

function validar_formulario_id_iva() {
    var ok = true;
    var id_iva = $('#id_iva').val();
    var nombre_iva = $('#nombre_iva').val();
    var porcentaje_iva = $('#porcentaje_iva').val();
    //var expreg = /^\d+$/;
    //var expreg = new RegExp("^\\d+$");
    var expreg = new RegExp(/^\d+$/);
    console.log(expreg.test(id_iva));
    if (!expreg.test(id_iva)) {
        mensaje("Id de cargo debe ser sólo números", "Aceptar", "focus_id_iva()")
        ok = false;
    }
    return ok;
}

function focus_id_iva() {
    $('#id_iva').select();
}

function focus_nombre_iva() {
    $('#nombre_iva').select();
}

function focus_porcentaje_iva() {
    $('#porcentaje_iva').select();
}
function limpiar_campos() {
    $('#id_iva').val(0);
    $('#nombre_iva').val("");
    $('#porcentaje_iva').val("");
    $('#id_iva').select();
}