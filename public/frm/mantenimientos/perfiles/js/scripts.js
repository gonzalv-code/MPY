$('#id_perfil').select();

function buscar_id() {
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