function ingresar(){
    var usuario = $('#usuario_usuario').val();
    var clave = $('#clave_usuario').val();
    if (usuario.trim() === '') {
        alert('Usuario vacio');
        $('#usuario_usuario').select();
    } else if (clave.trim() === '') {
        alert('Contraseña vacia');
        $('#clave_usuario').select();
    } else {
        location.href='./menu';
    }    
}

function salir_admin(){
    location.href='./';
}