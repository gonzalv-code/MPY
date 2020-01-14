$('#id_perfil').select();

function buscar_id() {  // Buscar
    var id_perfil = $('#id_perfil').val();
    var url = "/api/perfiles/" + id_perfil;

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
                $('#id_perfil').val(myJson.datos[0].id_perfil);
                $('#nombre_perfil').val(myJson.datos[0].nombre_perfil);
                $('#nombre_perfil').select();
            } else {
                $('#id_perfil').val(0);
                $('#nombre_perfil').val("");
                $('#nombre_perfil').select();
            }
        });
}

function agregar() {  //Agregar
    var nombre_perfil = $('#nombre_perfil').val();

    var url = "/api/perfiles";
    var data = { nombre_perfil: nombre_perfil };

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

function modificar() {  //Modificar
    var id_perfil = $('#id_perfil').val();
    var nombre_perfil = $('#nombre_perfil').val();

    var url = "/api/perfiles/"+id_perfil;
    var data = { nombre_perfil: nombre_perfil };

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

function eliminar() {  // Eliminar
    var id_perfil = $('#id_perfil').val();

    var url = "/api/perfiles/"+id_perfil;

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