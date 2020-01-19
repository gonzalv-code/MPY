function cargar_formulario(frm){
    $('.formularios').load(frm);
}

function salir_formulario(frm){
    $('.formularios').html('');
}

function cargar_busqueda(frm){
    $('.formularios').fadeOut('slow', function(){
        $('.busquedas').load(frm);
        $('.busquedas').fadeIn('slow');
    });
}

function salir_busqueda(campo){
    $('.busquedas').fadeOut('slow', function(){
        $('.formularios').fadeIn('slow', function(){
            $(campo).select();  
        });
    });   
}

function habilitar_agregar(){
    $('#boton-agregar').attr('disabled',false);
    $('#boton-modificar').attr('disabled',true);
    $('#boton-eliminar').attr('disabled',true);
}

function deshabilitar_agregar(){
    $('#boton-agregar').attr('disabled',true);
    $('#boton-modificar').attr('disabled',false);
    $('#boton-eliminar').attr('disabled',false);
}