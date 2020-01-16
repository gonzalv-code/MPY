$('#id_funcionario').select();

function buscar_id() {
    var id_funcionario = $('#id_funcionario').val();
    var url = "/api/funcionarios/" + id_funcionario;

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
                $('#id_funcionario').val(myJson.datos[0].id_funcionario);
                $('#nombre_funcionario').val(myJson.datos[0].nombre_funcionario);
                $('#nombre_funcionario').select();
            } else {
                $('#id_funcionario').val(0);
                $('#nombre_funcionario').val("");
                $('#nombre_funcionario').select();
            }
        });
}

function agregar() {
    var nombre_funcionario = $('#nombre_funcionario').val();

    var url = "/api/funcionarios";
    var data = { nombre_funcionario: nombre_funcionario };

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
    var id_funcionario = $('#id_funcionario').val();
    var nombre_funcionario = $('#nombre_funcionario').val();

    var url = "/api/funcionarios/"+id_funcionario;
    var data = { nombre_funcionario: nombre_funcionario };

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
    var id_funcionario = $('#id_funcionario').val();

    var url = "/api/funcionarios/"+id_funcionario;

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