fetch("api/proveedores/permisos", {
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
$('#id_proveedor').select();
habilitar_agregar();
siguiente_campo('#id_proveedor', '#id_persona', '#estado_proveedor', false);
siguiente_campo('#id_persona', '#boton-agregar', true);


function buscar_id() {
    if (validar_formulario_id_proveedor()) {
        var id_proveedor = $('#id_proveedor').val();
        var url = "/api/proveedores/" + id_proveedor;

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
                if (myJson.proveedor.length > 0) {
                    $('#id_proveedor').val(myJson.proveedor[0].id_proveedor);
                    $('#id_persona').val(myJson.proveedor[0].id_persona);
                    $('#estado_proveedor').val(myJson.proveedor[0].estado_proveedor);
                    $('#estado_proveedor').select();
                    deshabilitar_agregar();
                } else {
                    $('#id_proveedor').val(0);
                    $('#id_persona').val(0);
                    $('#estado_proveedor').val("");
                    $('#id_persona').select();
                    habilitar_agregar();
                }
            }).catch(function(error) {
                location.href = "./menu";
                console.log('Hubo un problema con la petición Fetch:' + error.message);
              });
    }
}

function buscar_id_persona() {

    var url = "/api/proveedores";

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
                myJson.datos.forEach(proveedor => {
                    filas += "<tr onclick='seleccionar_proveedor($(this))'>";
                    filas += " <td>" + proveedor.id_proveedor + "</td>";
                    filas += " <td>" + proveedor.id_persona + "</td>";
                    filas += " <td>" + proveedor.estado_proveedor + "</td>";
                    filas += "</tr>";
                });
            } else {
                filas = 'No existen mas registros ...';
            }
            $('#tbody_datos').html(filas);
        });
}

function seleccionar_proveedor($this) {
    var id_proveedor = $this.find('td').eq(0).text();
    var id_persona = $this.find('td').eq(1).text();
    var estado_proveedor = $this.find('td').eq(2).text();
    $('#id_proveedor').val(id_proveedor);
    $('#id_persona').val(id_persona);
    $('#estado_proveedor').val(estado_proveedor);
    salir_busqueda('#estado_proveedor');
    deshabilitar_agregar();
}

function agregar() {
    if (validar_formulario()) {
        var id_persona = $('#id_persona').val();
        var estado_proveedor = $('#estado_proveedor').val();

        var url = "/api/proveedores";
        var data = { id_persona: id_persona, estado_proveedor: estado_proveedor };

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
        var id_proveedor = $('#id_proveedor').val();
        var id_persona = $('#id_persona').val();
        var estado_proveedor = $('#estado_proveedor').val();

        var url = "/api/proveedores/" + id_proveedor;
        var data = { id_persona: id_persona, estado_proveedor: estado_proveedor };

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
                    mensaje("ERROR: Registro no modificado", "Aceptar", "focus_id_persona()");
                }
            })
            .catch(function (error) {
                mensaje(`ERROR SERVIDOR: ${error.message}`, "Aceptar", "focus_id_persona()");
            });
    }

}

function eliminar() {
    if (validar_formulario()) {
        var id_proveedor = $('#id_proveedor').val();

        var url = "/api/proveedores/" + id_proveedor;

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
    var id_proveedor = $('#id_proveedor').val();
    var id_persona = $('#id_persona').val();
    var estado_proveedor = $('#estado_proveedor').val();
    //var expreg = /^\d+$/;
    //var expreg = new RegExp("^\\d+$");
    var expreg = new RegExp(/^\d+$/);
    console.log(expreg.test(id_proveedor));
    if (!expreg.test(id_proveedor)) {
        mensaje("Id de proveedor debe ser sólo números", "Aceptar", "focus_id_proveedor()")
        ok = false;
    } else if (id_persona.trim() === '') {
        mensaje("Persona no puede estar vacio", "Aceptar", "focus_id_persona()")
        ok = false;
    } else if (estado_proveedor.trim() === '') {
    mensaje("Estado no puede estar vacio", "Aceptar", "focus_estado_proveedor()")
    ok = false;
}
    return ok;
}

function validar_formulario_id_proveedor() {
    var ok = true;
    var id_proveedor = $('#id_proveedor').val();
    var id_persona = $('#id_persona').val();
    var estado_proveedor = $('#estado_proveedor').val();
    //var expreg = /^\d+$/;
    //var expreg = new RegExp("^\\d+$");
    var expreg = new RegExp(/^\d+$/);
    console.log(expreg.test(id_proveedor));
    if (!expreg.test(id_proveedor)) {
        mensaje("Id de proveedor debe ser sólo números", "Aceptar", "focus_id_proveedor()")
        ok = false;
    }
    if (!expreg.test(id_persona)) {
        mensaje("Id de persona debe ser sólo letras", "Aceptar", "focus_id_persona()")
        ok = false;
    }if (!expreg.test(estado_proveedor)) {
        mensaje("estado de proveedor debe ser sólo letras", "Aceptar", "focus_estado_proveedor()")
        ok = false;
    }
    return ok;
}

function focus_id_proveedor() {
    $('#id_proveedor').select();
}

function focus_id_persona() {
    $('#id_persona').select();
}

function focus_estado_proveedor() {
    $('#estado_proveedor').select();
}
function limpiar_campos() {
    $('#id_proveedor').val(0);
    $('#id_persona').val("");
    $('#estado_proveedor').val("");
    $('#id_proveedor').select();
}