fetch("api/estados_civiles/permisos", {
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
$('#id_estado_civil').select();
habilitar_agregar();
siguiente_campo('#id_estado_civil', '#nombre_estado_civil', false);
siguiente_campo('#nombre_estado_civil', '#boton-agregar', true);


function buscar_id() {
    if (validar_formulario_id_estado_civil()) {
        var id_estado_civil = $('#id_estado_civil').val();
        var url = "/api/estados_civiles/" + id_estado_civil;

        fetch(url, {
            method: "GET",
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
                localStorage.token = myJson.token;
                if (myJson.estado_civil.length > 0) {
                    $('#id_estado_civil').val(myJson.estado_civil[0].id_estado_civil);
                    $('#nombre_estado_civil').val(myJson.estado_civil[0].nombre_estado_civil);
                    $('#nombre_estado_civil').select();
                    deshabilitar_agregar();
                } else {
                    $('#id_estado_civil').val(0);
                    $('#nombre_estado_civil').val("");
                    $('#nombre_estado_civil').select();
                    habilitar_agregar();
                }
            }).catch(function(error) {
                location.href = "./menu";
                console.log('Hubo un problema con la petición Fetch:' + error.message);
              });
    }
}

function buscar_nombre() {

    var url = "/api/estado_civiles";

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
                myJson.datos.forEach(estado_civil => {
                    filas += "<tr onclick='seleccionar_estado_civil($(this))'>";
                    filas += " <td>" + estado_civil.id_estado_civil + "</td>";
                    filas += " <td>" + estado_civil.nombre_estado_civil + "</td>";
                    filas += "</tr>";
                });
            } else {
                filas = 'No existen mas registros ...';
            }
            $('#tbody_datos').html(filas);
        });
}

function seleccionar_estado_civil($this) {
    var id_estado_civil = $this.find('td').eq(0).text();
    var nombre_estado_civil = $this.find('td').eq(1).text();
    $('#id_estado_civil').val(id_estado_civil);
    $('#nombre_estado_civil').val(nombre_estado_civil);
    salir_busqueda('#nombre_estado_civil');
    deshabilitar_agregar();
}

function agregar() {
    if (validar_formulario()) {
        var nombre_estado_civil = $('#nombre_estado_civil').val();

        var url = "/api/estado_civiles";
        var data = { nombre_estado_civil: nombre_estado_civil };

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
        var id_estado_civil = $('#id_estado_civil').val();
        var nombre_estado_civil = $('#nombre_estado_civil').val();

        var url = "/api/estados_civiles/" + id_estado_civil;
        var data = { nombre_estado_civil: nombre_estado_civil };

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
                    mensaje("ERROR: Registro no modificado", "Aceptar", "focus_nombre_estado_civil()");
                }
            })
            .catch(function (error) {
                mensaje(`ERROR SERVIDOR: ${error.message}`, "Aceptar", "focus_nombre_estado_civil()");
            });
    }

}

function eliminar() {
    if (validar_formulario()) {
        var id_estado_civil = $('#id_estado_civil').val();

        var url = "/api/estados_civiles/" + id_estado_civil;

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
}

function validar_formulario() {
    var ok = true;
    var id_estado_civil = $('#id_estado_civil').val();
    var nombre_estado_civil = $('#nombre_estado_civil').val();
    //var expreg = /^\d+$/;
    //var expreg = new RegExp("^\\d+$");
    var expreg = new RegExp(/^\d+$/);
    console.log(expreg.test(id_estado_civil));
    if (!expreg.test(id_estado_civil)) {
        mensaje("Id de estado_civil debe ser sólo números", "Aceptar", "focus_id_estado_civil()")
        ok = false;
    } else if (nombre_estado_civil.trim() === '') {
        mensaje("Nombre no puede estar vacio", "Aceptar", "focus_nombre_estado_civil()")
        ok = false;
    }
    return ok;
}

function validar_formulario_id_estado_civil() {
    var ok = true;
    var id_estado_civil = $('#id_estado_civil').val();
    var nombre_estado_civil = $('#nombre_estado_civil').val();
    //var expreg = /^\d+$/;
    //var expreg = new RegExp("^\\d+$");
    var expreg = new RegExp(/^\d+$/);
    console.log(expreg.test(id_estado_civil));
    if (!expreg.test(id_estado_civil)) {
        mensaje("Id de estado_civil debe ser sólo números", "Aceptar", "focus_id_estado_civil()")
        ok = false;
    }
    return ok;
}

function focus_id_estado_civil() {
    $('#id_estado_civil').select();
}

function focus_nombre_estado_civil() {
    $('#nombre_estado_civil').select();
}

function limpiar_campos() {
    $('#id_estado_civil').val(0);
    $('#nombre_estado_civil').val("");
    $('#id_estado_civil').select();
}