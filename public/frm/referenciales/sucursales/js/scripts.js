fetch("api/sucursales/permisos", {
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
$('#id_sucursal').select();
habilitar_agregar();
siguiente_campo('#id_sucursal', '#nombre_sucursal', '#direccion_sucursal', '#telefono_sucursal', false);
siguiente_campo('#nombre_sucursal', '#direccion_sucursal', '#telefono_sucursal', '#boton-agregar', true);


function buscar_id() {
    if (validar_formulario_id_sucursal()) {
        var id_sucursal = $('#id_sucursal').val();
        var url = "/api/sucursales/" + id_sucursal;

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
                if (myJson.sucursal.length > 0) {
                    $('#id_sucursal').val(myJson.sucursal[0].id_sucursal);
                    $('#nombre_sucursal').val(myJson.sucursal[0].nombre_sucursal);
                    $('#direccion_sucursal').val(myJson.sucursal[0].direccion_sucursal);
                    $('#telefono_sucursal').val(myJson.sucursal[0].telefono_sucursal);
                    $('#telefono_sucursal').select();
                    deshabilitar_agregar();
                } else {
                    $('#id_sucursal').val(0);
                    $('#nombre_sucursal').val("");
                    $('#direccion_sucursal').val("");
                    $('#telefono_sucursal').val("");
                    $('#telefono_sucursal').select();
                    habilitar_agregar();
                }
            }).catch(function(error) {
                location.href = "./menu";
                console.log('Hubo un problema con la petición Fetch:' + error.message);
              });
    }
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
    salir_busqueda('#telefono_sucursal');
    deshabilitar_agregar();
}

function agregar() {
    if (validar_formulario()) {
        var nombre_sucursal = $('#nombre_sucursal').val();
        var direccion_sucursal = $('#direccion_sucursal').val();
        var telefono_sucursal = $('#telefono_sucursal').val();

        var url = "/api/sucursales";
        var data = { nombre_sucursal: nombre_sucursal, direccion_sucursal: direccion_sucursal, telefono_sucursal: telefono_sucursal };

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
        var id_sucursal = $('#id_sucursal').val();
        var nombre_sucursal = $('#nombre_sucursal').val();
        var direccion_sucursal = $('#direccion_sucursal').val();
        var telefono_sucursal = $('#telefono_sucursal').val();

        var url = "/api/sucursales/" + id_sucursal;
        var data = { nombre_sucursal: nombre_sucursal, direccion_sucursal: direccion_sucursal, telefono_sucursal: telefono_sucursal };

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
                    mensaje("ERROR: Registro no modificado", "Aceptar", "focus_nombre_sucursal()");
                }
            })
            .catch(function (error) {
                mensaje(`ERROR SERVIDOR: ${error.message}`, "Aceptar", "focus_nombre_sucursal()");
            });
    }

}

function eliminar() {
    if (validar_formulario()) {
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
}

function validar_formulario() {
    var ok = true;
    var id_sucursal = $('#id_sucursal').val();
    var nombre_sucursal = $('#nombre_sucursal').val();
    //var expreg = /^\d+$/;
    //var expreg = new RegExp("^\\d+$");
    var expreg = new RegExp(/^\d+$/);
    console.log(expreg.test(id_sucursal));
    if (!expreg.test(id_sucursal)) {
        mensaje("Id de sucursal debe ser sólo números", "Aceptar", "focus_id_sucursal()")
        ok = false;
    } else if (nombre_sucursal.trim() === '') {
        mensaje("Nombre no puede estar vacio", "Aceptar", "focus_nombre_sucursal()")
        ok = false;
    }
    return ok;
}

function validar_formulario_id_sucursal() {
    var ok = true;
    var id_sucursal = $('#id_sucursal').val();
    var nombre_sucursal = $('#nombre_sucursal').val();
    var direccion_sucursal = $('#direccion_sucursal').val();
    var telefono_sucursal = $('#telefono_sucursal').val();
    //var expreg = /^\d+$/;
    //var expreg = new RegExp("^\\d+$");
    var expreg = new RegExp(/^\d+$/);
    console.log(expreg.test(id_sucursal));
    if (!expreg.test(id_sucursal)) {
        mensaje("Id de sucursal debe ser sólo números", "Aceptar", "focus_id_sucursal()")
        ok = false;
    }
    if (!expreg.test(nombre_sucursal)) {
        mensaje("Nombre de sucursal debe ser sólo letras", "Aceptar", "focus_nombre_sucursal()")
        ok = false;
    }
    if (!expreg.test(direccion_sucursal)) {
        mensaje("Direccion de sucursal debe ser sólo letras", "Aceptar", "focus_direccion_sucursal()")
        ok = false;
    }
    if (!expreg.test(telefono_sucursal)) {
        mensaje("Telefono de sucursal debe ser sólo numeros", "Aceptar", "focus_telefono_sucursal()")
        ok = false;
    }
    return ok;
}

function focus_id_sucursal() {
    $('#id_sucursal').select();
}

function focus_nombre_sucursal() {
    $('#nombre_sucursal').select();
}

function focus_direccion_sucursal() {
    $('#direccion_sucursal').select();
}

function focus_telefono_sucursal() {
    $('#telefono_sucursal').select();
}
function limpiar_campos() {
    $('#id_sucursal').val(0);
    $('#nombre_sucursal').val("");
    $('#direccion_sucursal').val("");
    $('#telefono_sucursal').val("");
    $('#id_sucursal').select();
}