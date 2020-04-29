fetch("api/entidades/permisos", {
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
$('#id_entidad').select();
habilitar_agregar();
siguiente_campo('#id_entidad', '#nombre_entidad', false);
siguiente_campo('#nombre_entidad', '#boton-agregar', true);


function buscar_id() {
    if (validar_formulario_id_entidad()) {
        var id_entidad = $('#id_entidad').val();
        var url = "/api/entidades/" + id_entidad;

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
                if (myJson.entidad.length > 0) {
                    $('#id_entidad').val(myJson.entidad[0].id_entidad);
                    $('#nombre_entidad').val(myJson.entidad[0].nombre_entidad);
                    $('#nombre_entidad').select();
                    deshabilitar_agregar();
                } else {
                    $('#id_entidad').val(0);
                    $('#nombre_entidad').val("");
                    $('#nombre_entidad').select();
                    habilitar_agregar();
                }
            }).catch(function(error) {
                location.href = "./menu";
                console.log('Hubo un problema con la petición Fetch:' + error.message);
              });
    }
}

function buscar_nombre() {

    var url = "/api/entidades";

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
                myJson.datos.forEach(entidad => {
                    filas += "<tr onclick='seleccionar_entidad($(this))'>";
                    filas += " <td>" + entidad.id_entidad + "</td>";
                    filas += " <td>" + entidad.nombre_entidad + "</td>";
                    filas += "</tr>";
                });
            } else {
                filas = 'No existen mas registros ...';
            }
            $('#tbody_datos').html(filas);
        });
}

function seleccionar_entidad($this) {
    var id_entidad = $this.find('td').eq(0).text();
    var nombre_entidad = $this.find('td').eq(1).text();
    $('#id_entidad').val(id_entidad);
    $('#nombre_entidad').val(nombre_entidad);
    salir_busqueda('#nombre_entidad');
    deshabilitar_agregar();
}

function agregar() {
    if (validar_formulario()) {
        var nombre_entidad = $('#nombre_entidad').val();

        var url = "/api/entidades";
        var data = { nombre_entidad: nombre_entidad };

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
        var id_entidad = $('#id_entidad').val();
        var nombre_entidad = $('#nombre_entidad').val();

        var url = "/api/entidades/" + id_entidad;
        var data = { nombre_entidad: nombre_entidad };

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
                    mensaje("ERROR: Registro no modificado", "Aceptar", "focus_nombre_entidad()");
                }
            })
            .catch(function (error) {
                mensaje(`ERROR SERVIDOR: ${error.message}`, "Aceptar", "focus_nombre_entidad()");
            });
    }

}

function eliminar() {
    if (validar_formulario()) {
        var id_entidad = $('#id_entidad').val();

        var url = "/api/entidades/" + id_entidad;

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
    var id_entidad = $('#id_entidad').val();
    var nombre_entidad = $('#nombre_entidad').val();
    //var expreg = /^\d+$/;
    //var expreg = new RegExp("^\\d+$");
    var expreg = new RegExp(/^\d+$/);
    console.log(expreg.test(id_entidad));
    if (!expreg.test(id_entidad)) {
        mensaje("Id de entidad debe ser sólo números", "Aceptar", "focus_id_entidad()")
        ok = false;
    } else if (nombre_entidad.trim() === '') {
        mensaje("Nombre no puede estar vacio", "Aceptar", "focus_nombre_entidad()")
        ok = false;
    }
    return ok;
}

function validar_formulario_id_entidad() {
    var ok = true;
    var id_entidad = $('#id_entidad').val();
    var nombre_entidad = $('#nombre_entidad').val();
    //var expreg = /^\d+$/;
    //var expreg = new RegExp("^\\d+$");
    var expreg = new RegExp(/^\d+$/);
    console.log(expreg.test(id_entidad));
    if (!expreg.test(id_entidad)) {
        mensaje("Id de entidad debe ser sólo números", "Aceptar", "focus_id_entidad()")
        ok = false;
    }
    return ok;
}

function focus_id_entidad() {
    $('#id_entidad').select();
}

function focus_nombre_entidad() {
    $('#nombre_entidad').select();
}

function limpiar_campos() {
    $('#id_entidad').val(0);
    $('#nombre_entidad').val("");
    $('#id_entidad').select();
}