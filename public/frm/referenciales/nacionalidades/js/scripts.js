fetch("api/nacionalidades/permisos", {
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
$('#id_nacionalidad').select();
habilitar_agregar();
siguiente_campo('#id_nacionalidad', '#nombre_nacionalidad', false);
siguiente_campo('#nombre_nacionalidad', '#boton-agregar', true);


function buscar_id() {
    if (validar_formulario_id_nacionalidad()) {
        var id_nacionalidad = $('#id_nacionalidad').val();
        var url = "/api/nacionalidades/" + id_nacionalidad;

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
                if (myJson.nacionalidad.length > 0) {
                    $('#id_nacionalidad').val(myJson.nacionalidad[0].id_nacionalidad);
                    $('#nombre_nacionalidad').val(myJson.nacionalidad[0].nombre_nacionalidad);
                    $('#nombre_nacionalidad').select();
                    deshabilitar_agregar();
                } else {
                    $('#id_nacionalidad').val(0);
                    $('#nombre_nacionalidad').val("");
                    $('#nombre_nacionalidad').select();
                    habilitar_agregar();
                }
            }).catch(function(error) {
                location.href = "./menu";
                console.log('Hubo un problema con la petición Fetch:' + error.message);
              });
    }
}

function buscar_nombre() {

    var url = "/api/nacionalidades";

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
                myJson.datos.forEach(nacionalidad => {
                    filas += "<tr onclick='seleccionar_nacionalidad($(this))'>";
                    filas += " <td>" + nacionalidad.id_nacionalidad + "</td>";
                    filas += " <td>" + nacionalidad.nombre_nacionalidad + "</td>";
                    filas += "</tr>";
                });
            } else {
                filas = 'No existen mas registros ...';
            }
            $('#tbody_datos').html(filas);
        });
}

function seleccionar_nacionalidad($this) {
    var id_nacionalidad = $this.find('td').eq(0).text();
    var nombre_nacionalidad = $this.find('td').eq(1).text();
    $('#id_nacionalidad').val(id_nacionalidad);
    $('#nombre_nacionalidad').val(nombre_nacionalidad);
    salir_busqueda('#nombre_nacionalidad');
    deshabilitar_agregar();
}

function agregar() {
    if (validar_formulario()) {
        var nombre_nacionalidad = $('#nombre_nacionalidad').val();

        var url = "/api/nacionalidades";
        var data = { nombre_nacionalidad: nombre_nacionalidad };

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
        var id_nacionalidad = $('#id_nacionalidad').val();
        var nombre_nacionalidad = $('#nombre_nacionalidad').val();

        var url = "/api/nacionalidades/" + id_nacionalidad;
        var data = { nombre_nacionalidad: nombre_nacionalidad };

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
                    mensaje("ERROR: Registro no modificado", "Aceptar", "focus_nombre_nacionalidad()");
                }
            })
            .catch(function (error) {
                mensaje(`ERROR SERVIDOR: ${error.message}`, "Aceptar", "focus_nombre_nacionalidad()");
            });
    }

}

function eliminar() {
    if (validar_formulario()) {
        var id_nacionalidad = $('#id_nacionalidad').val();

        var url = "/api/nacionalidades/" + id_nacionalidad;

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
    var id_nacionalidad = $('#id_nacionalidad').val();
    var nombre_nacionalidad = $('#nombre_nacionalidad').val();
    //var expreg = /^\d+$/;
    //var expreg = new RegExp("^\\d+$");
    var expreg = new RegExp(/^\d+$/);
    console.log(expreg.test(id_nacionalidad));
    if (!expreg.test(id_nacionalidad)) {
        mensaje("Id de nacionalidad debe ser sólo números", "Aceptar", "focus_id_nacionalidad()")
        ok = false;
    } else if (nombre_nacionalidad.trim() === '') {
        mensaje("Nombre no puede estar vacio", "Aceptar", "focus_nombre_nacionalidad()")
        ok = false;
    }
    return ok;
}

function validar_formulario_id_nacionalidad() {
    var ok = true;
    var id_nacionalidad = $('#id_nacionalidad').val();
    var nombre_nacionalidad = $('#nombre_nacionalidad').val();
    //var expreg = /^\d+$/;
    //var expreg = new RegExp("^\\d+$");
    var expreg = new RegExp(/^\d+$/);
    console.log(expreg.test(id_nacionalidad));
    if (!expreg.test(id_nacionalidad)) {
        mensaje("Id de nacionalidad debe ser sólo números", "Aceptar", "focus_id_nacionalidad()")
        ok = false;
    }
    if (!expreg.test(nombre_nacionalidad)) {
        mensaje("Id de nacionalidad debe ser sólo letras", "Aceptar", "focus_nombre_nacionalidad()")
        ok = false;
    }
    return ok;
}

function focus_id_nacionalidad() {
    $('#id_nacionalidad').select();
}

function focus_nombre_nacionalidad() {
    $('#nombre_nacionalidad').select();
}

function limpiar_campos() {
    $('#id_nacionalidad').val(0);
    $('#nombre_nacionalidad').val("");
    $('#id_nacionalidad').select();
}