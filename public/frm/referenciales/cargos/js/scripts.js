fetch("api/cargos/permisos", {
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
$('#id_cargo').select();
habilitar_agregar();
siguiente_campo('#id_cargo', '#nombre_cargo', false);
siguiente_campo('#nombre_cargo', '#boton-agregar', true);


function buscar_id() {
    if (validar_formulario_id_cargo()) {
        var id_cargo = $('#id_cargo').val();
        var url = "/api/cargos/" + id_cargo;

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
                if (myJson.cargo.length > 0) {
                    $('#id_cargo').val(myJson.cargo[0].id_cargo);
                    $('#nombre_cargo').val(myJson.cargo[0].nombre_cargo);
                    $('#nombre_cargo').select();
                    deshabilitar_agregar();
                } else {
                    $('#id_cargo').val(0);
                    $('#nombre_cargo').val("");
                    $('#nombre_cargo').select();
                    habilitar_agregar();
                }
            }).catch(function(error) {
                location.href = "./menu";
                console.log('Hubo un problema con la petición Fetch:' + error.message);
              });
    }
}

function buscar_nombre() {

    var url = "/api/cargos";

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
                myJson.datos.forEach(perfil => {
                    filas += "<tr onclick='seleccionar_cargo($(this))'>";
                    filas += " <td>" + perfil.id_cargo + "</td>";
                    filas += " <td>" + perfil.nombre_cargo + "</td>";
                    filas += "</tr>";
                });
            } else {
                filas = 'No existen mas registros ...';
            }
            $('#tbody_datos').html(filas);
        });
}

function seleccionar_cargo($this) {
    var id_cargo = $this.find('td').eq(0).text();
    var nombre_cargo = $this.find('td').eq(1).text();
    $('#id_cargo').val(id_cargo);
    $('#nombre_cargo').val(nombre_cargo);
    salir_busqueda('#nombre_cargo');
    deshabilitar_agregar();
}

function agregar() {
    if (validar_formulario()) {
        var nombre_cargo = $('#nombre_cargo').val();

        var url = "/api/cargos";
        var data = { nombre_cargo: nombre_cargo };

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
        var id_cargo = $('#id_cargo').val();
        var nombre_cargo = $('#nombre_cargo').val();

        var url = "/api/cargos/" + id_cargo;
        var data = { nombre_cargo: nombre_cargo };

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

}

function eliminar() {
    if (validar_formulario()) {
        var id_cargo = $('#id_cargo').val();

        var url = "/api/cargos/" + id_cargo;

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
    var id_cargo = $('#id_cargo').val();
    var nombre_cargo = $('#nombre_cargo').val();
    //var expreg = /^\d+$/;
    //var expreg = new RegExp("^\\d+$");
    var expreg = new RegExp(/^\d+$/);
    console.log(expreg.test(id_cargo));
    if (!expreg.test(id_cargo)) {
        mensaje("Id de cargo debe ser sólo números", "Aceptar", "focus_id_cargo()")
        ok = false;
    } else if (nombre_cargo.trim() === '') {
        mensaje("Nombre no puede estar vacio", "Aceptar", "focus_nombre_cargo()")
        ok = false;
    }
    return ok;
}

function validar_formulario_id_cargo() {
    var ok = true;
    var id_cargo = $('#id_cargo').val();
    var nombre_cargo = $('#nombre_cargo').val();
    //var expreg = /^\d+$/;
    //var expreg = new RegExp("^\\d+$");
    var expreg = new RegExp(/^\d+$/);
    console.log(expreg.test(id_cargo));
    if (!expreg.test(id_cargo)) {
        mensaje("Id de cargo debe ser sólo números", "Aceptar", "focus_id_cargo()")
        ok = false;
    }
    return ok;
}

function focus_id_cargo() {
    $('#id_cargo').select();
}

function focus_nombre_cargo() {
    $('#nombre_cargo').select();
}

function limpiar_campos() {
    $('#id_cargo').val(0);
    $('#nombre_cargo').val("");
    $('#id_cargo').select();
}