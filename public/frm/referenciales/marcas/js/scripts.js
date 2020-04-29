fetch("api/marcas/permisos", {
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
$('#id_marca').select();
habilitar_agregar();
siguiente_campo('#id_marca', '#nombre_marca', false);
siguiente_campo('#nombre_marca', '#boton-agregar', true);


function buscar_id() {
    if (validar_formulario_id_marca()) {
        var id_marca = $('#id_marca').val();
        var url = "/api/marcas/" + id_marca;

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
                if (myJson.marca.length > 0) {
                    $('#id_marca').val(myJson.marca[0].id_marca);
                    $('#nombre_marca').val(myJson.marca[0].nombre_marca);
                    $('#nombre_marca').select();
                    deshabilitar_agregar();
                } else {
                    $('#id_marca').val(0);
                    $('#nombre_marca').val("");
                    $('#nombre_marca').select();
                    habilitar_agregar();
                }
            }).catch(function(error) {
                location.href = "./menu";
                console.log('Hubo un problema con la petición Fetch:' + error.message);
              });
    }
}

function buscar_nombre() {

    var url = "/api/marcas";

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
                    filas += "<tr onclick='seleccionar_marca($(this))'>";
                    filas += " <td>" + perfil.id_marca + "</td>";
                    filas += " <td>" + perfil.nombre_marca + "</td>";
                    filas += "</tr>";
                });
            } else {
                filas = 'No existen mas registros ...';
            }
            $('#tbody_datos').html(filas);
        });
}

function seleccionar_marca($this) {
    var id_marca = $this.find('td').eq(0).text();
    var nombre_marca = $this.find('td').eq(1).text();
    $('#id_marca').val(id_marca);
    $('#nombre_marca').val(nombre_marca);
    salir_busqueda('#nombre_marca');
    deshabilitar_agregar();
}

function agregar() {
    if (validar_formulario()) {
        var nombre_marca = $('#nombre_marca').val();

        var url = "/api/marcas";
        var data = { nombre_marca: nombre_marca };

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
        var id_marca = $('#id_marca').val();
        var nombre_marca = $('#nombre_marca').val();

        var url = "/api/marcas/" + id_marca;
        var data = { nombre_marca: nombre_marca };

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
                    mensaje("ERROR: Registro no modificado", "Aceptar", "focus_nombre_marca()");
                }
            })
            .catch(function (error) {
                mensaje(`ERROR SERVIDOR: ${error.message}`, "Aceptar", "focus_nombre_marca()");
            });
    }

}

function eliminar() {
    if (validar_formulario()) {
        var id_marca = $('#id_marca').val();

        var url = "/api/marcas/" + id_marca;

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
    var id_marca = $('#id_marca').val();
    var nombre_marca = $('#nombre_marca').val();
    //var expreg = /^\d+$/;
    //var expreg = new RegExp("^\\d+$");
    var expreg = new RegExp(/^\d+$/);
    console.log(expreg.test(id_marca));
    if (!expreg.test(id_marca)) {
        mensaje("Id de marca debe ser sólo números", "Aceptar", "focus_id_marca()")
        ok = false;
    } else if (nombre_marca.trim() === '') {
        mensaje("Nombre no puede estar vacio", "Aceptar", "focus_nombre_marca()")
        ok = false;
    }
    return ok;
}

function validar_formulario_id_marca() {
    var ok = true;
    var id_marca = $('#id_marca').val();
    var nombre_marca = $('#nombre_marca').val();
    //var expreg = /^\d+$/;
    //var expreg = new RegExp("^\\d+$");
    var expreg = new RegExp(/^\d+$/);
    console.log(expreg.test(id_marca));
    if (!expreg.test(id_marca)) {
        mensaje("Id de marca debe ser sólo números", "Aceptar", "focus_id_marca()")
        ok = false;
    }
    return ok;
}

function focus_id_marca() {
    $('#id_marca').select();
}

function focus_nombre_marca() {
    $('#nombre_marca').select();
}

function limpiar_campos() {
    $('#id_marca').val(0);
    $('#nombre_marca').val("");
    $('#id_marca').select();
}