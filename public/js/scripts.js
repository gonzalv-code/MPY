function siguiente_campo(actual, siguiente, preventDefault) {
    $(actual).on('keydown', function (event) {
        //console.log("---> "+event.which);
        if (event.which === 13) {
            if (preventDefault) {
                event.preventDefault();
            }
            $(siguiente).focus();
            $(siguiente).select();
        }
    });
}

function mensaje(mensaje, textoBoton, funcion) {
    $('body').append('<div id="mensajes"></div>');
    modal = `<div id="divModal" class="modal fade" tabindex="-1" role="dialog" 
                  aria-labelledby="gridSystemModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="gridSystemModalLabel">Mensaje del Sistema</h5>
                            <button type="button" class="close" data-dismiss="modal" 
                                    aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div class="modal-body">
                            ${mensaje}
                        </div>
                        <div class="modal-footer">
                            <button id="botonAceptar" type="button" class="btn btn-primary"
                                    data-dismiss="modal"> ${textoBoton} </button>
                        </div>
                    </div>
                </div>
            </div>`;
    $('#mensajes').html(modal);
    $('#divModal').modal('show');
    $('#divModal').on('shown.bs.modal', function (e) {
        $('#botonAceptar').focus();
    });
    $('#divModal').on('hidden.bs.modal', function (e) {
        eval(funcion);
        $('#mensajes').remove();
    });
}

function confirmar(mensaje, textoBoton, pFuncion) {
    $('body').append('<div id="mensajes"></div>');
    var modal = '<div id="divModal" class="modal fade" tabindex="-1" role="dialog">';
    modal += '  <div class="modal-dialog modal-dialog-centered" role="document">';
    modal += '      <div class="modal-content">';
    modal += '          <div class="modal-header">';
    modal += '              <h5 class="modal-title">Mensaje del Sistema</h5>';
    modal += '              <button type="button" class="close" data-dismiss="modal" aria-label="Close">';
    modal += '                  <span aria-hidden="true">&times;</span>';
    modal += '              </button>';
    modal += '          </div>';
    modal += '          <div class="modal-body">';
    modal += '              ' + mensaje;
    modal += '          </div>';
    modal += '          <div class="modal-footer">';
    modal += '              <button id="botonAceptar" type="button" onclick="eval(' + pFuncion + ')" class="btn btn-outline-primary"';
    modal += '                      data-dismiss="modal">' + textoBoton + '</button>';
    modal += '              <button id="botonCancelar" type="button" class="btn btn-outline-primary"';
    modal += '                      data-dismiss="modal">Cancelar</button>';
    modal += '          </div>';
    modal += '      </div>';
    modal += '  </div>';
    modal += '</div>';
    $('#mensajes').html(modal);
    $('#divModal').modal('show');
    $('#divModal').on('shown.bs.modal', function (e) {
        $('#botonAceptar').focus();
    });

    $('#divModal').on('hidden.bs.modal', function (e) {
        $("#mensajes").remove();
        $(".modal").remove();
        $(".modal-backdrop").remove();
    });
}