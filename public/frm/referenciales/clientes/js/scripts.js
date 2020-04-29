fetch("api/clientes/permisos", {
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
$('#id_cliente').select();
habilitar_agregar();
siguiente_campo('#id_cliente', '#ruc_cliente', '#nombre_persona', '#estado_cliente', false);
siguiente_campo('#ruc_cliente', '#nombre_persona', '#estado_cliente', '#boton-agregar', true);


function buscar_id() {
    if (validar_formulario_id_cliente()) {
        var id_cliente = $('#id_cliente').val();
        var ruc_cliente = $('#ruc_cliente').val();
        var nombre_persona = $('#nombre_persona').val();
        var estado_cliente = $('#estado_cliente').val();
        var url = "/api/clientes/" + id_cliente;

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
                if (myJson.cliente.length > 0) {
                    $('#id_cliente').val(myJson.cliente[0].id_cliente);
                    $('#ruc_cliente').val(myJson.cliente[0].ruc_cliente);
                    $('#nombre_persona').val(myJson.cliente[0].nombre_persona);
                    $('#estado_cliente').val(myJson.cliente[0].estado_cliente);
                    $('#estado_cliente').select();
                    deshabilitar_agregar();
                } else {
                    $('#id_cliente').val(0);
                    $('#ruc_cliente').val("");
                    $('#nombre_persona').val("");
                    $('#estado_cliente').val("");
                    $('#estado_cliente').select();
                    habilitar_agregar();
                }
            }).catch(function(error) {
                location.href = "./menu";
                console.log('Hubo un problema con la petición Fetch:' + error.message);
              });
    }
}

function buscar_nombre() {

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
                    filas += " <td>" + cliente.ruc_cliente + "</td>";
                    filas += " <td>" + cliente.nombre_persona + "</td>";
                    filas += " <td>" + cliente.estado_cliente + "</td>";
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
    var ruc_cliente = $this.find('td').eq(1).text();
    var nombre_persona = $this.find('td').eq(2).text();
    var estado_cliente = $this.find('td').eq(3).text();
    $('#id_cliente').val(id_cliente);
    $('#ruc_cliente').val(ruc_cliente);
    $('#nombre_persona').val(nombre_persona);
    $('#estado_cliente').val(estado_cliente);
    salir_busqueda('#estado_cliente');
    deshabilitar_agregar();
}

function agregar() {
    if (validar_formulario()) {
        var ruc_cliente = $('#ruc_cliente').val();
        var nombre_persona = $('#nombre_persona').val();
        var estado_cliente = $('#estado_cliente').val();
        

        var url = "/api/clientes";
        var data = {ruc_cliente: ruc_cliente, nombre_persona: nombre_persona, estado_cliente: estado_cliente};

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
        var id_cliente = $('#id_cliente').val();
        var ruc_cliente = $('#ruc_cliente').val();
        var nombre_persona = $('#nombre_persona').val();
        var estado_cliente = $('#estado_cliente').val();

        var url = "/api/clientes/" + id_cliente;
        var data = { ruc_cliente: ruc_cliente, nombre_persona: nombre_persona, estado_cliente: estado_cliente };

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
                    mensaje("ERROR: Registro no modificado", "Aceptar", "focus_ruc_cliente()");
                }
            })
            .catch(function (error) {
                mensaje(`ERROR SERVIDOR: ${error.message}`, "Aceptar", "focus_ruc_cliente()");
            });
    }

}

function eliminar() {
    if (validar_formulario()) {
        var id_cliente = $('#id_cliente').val();

        var url = "/api/clientes/" + id_cliente;

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
    var id_cliente = $('#id_cliente').val();
    var ruc_cliente = $('#ruc_cliente').val();
    var nombre_persona = $('#nombre_persona').val();
    var estado_cliente = $('#estado_cliente').val();
    //var expreg = /^\d+$/;
    //var expreg = new RegExp("^\\d+$");
    var expreg = new RegExp(/^\d+$/);
    console.log(expreg.test(id_cliente));
    if (!expreg.test(id_cliente)) {
        mensaje("Id de cliente debe ser sólo números", "Aceptar", "focus_id_cliente()")
        ok = false;
    } else if (ruc_cliente.trim() === '') {
        mensaje("Campo no puede estar vacio", "Aceptar", "focus_ruc_cliente()")
        ok = false;
    } else if (nombre_persona.trim() === '') {
        mensaje("Campo no puede estar vacio", "Aceptar", "focus_nombre_persona()")
        ok = false;
    } else if (estado_cliente.trim() === '') {
        mensaje("Campo no puede estar vacio", "Aceptar", "focus_estado_cliente()")
        ok = false;
    }
    return ok;
}

function validar_formulario_id_cliente() {
    var ok = true;
    var id_cliente = $('#id_cliente').val();
    //var expreg = /^\d+$/;
    //var expreg = new RegExp("^\\d+$");
    var expreg = new RegExp(/^\d+$/);
    console.log(expreg.test(id_cliente));
    if (!expreg.test(id_cliente)) {
        mensaje("Id de cliente debe ser sólo números", "Aceptar", "focus_id_cliente()")
        ok = false;
    }
    return ok;
}

function focus_id_cliente() {
    $('#id_cliente').select();
}

function focus_nombre_persona() {
    $('#nombre_persona').select();
}

function limpiar_campos() {
    $('#id_cliente').val(0);
    $('#ruc_cliente').val("");
    $('#nombre_persona').val("");
    $('#estado_cliente').val("");
    $('#id_cliente').select();
}