var operacion = 'agregar';
$('#id_venta_cabecera').select();
habilitar_agregar();

function buscar_id() {
    var id_venta_cabecera = $('#id_venta_cabecera').val();
    var url = "/api/ventas_cabeceras/" + id_venta_cabecera;

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
                $('#id_venta_cabecera').val(myJson.datos[0].id_venta_cabecera);
                $('#fiscal_venta_cabecera').val(myJson.datos[0].fiscal_venta_cabecera);
                $('#emision_venta_cabecera').val(myJson.datos[0].emision_venta_cabecera);
                $('#condicion_venta_cabecera').val(myJson.datos[0].condicion_venta_cabecera);
                $('#id_cliente').val(myJson.datos[0].id_cliente);
                $('#nombre_cliente').val(myJson.datos[0].nombre_cliente);
                $('#id_venta_cabecera').select();
                buscar_id_venta_cabecera_ventas_detalles();
                deshabilitar_agregar();
            } else {
                $('#id_venta_cabecera').val(0);
                $('#fiscal_venta_cabecera').val("");
                $('#emision_venta_cabecera').val("");
                $('#condicion_venta_cabecera').val("");
                $('#id_cliente').val("");
                $('#nombre_cliente').val("");
                $('#id_venta_cabecera').select();
                $('#tbody_datos_detalle').text("");
                habilitar_agregar();
            }
        });
}

function buscar_venta() {

    var url = "/api/ventas_cabeceras";

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
                myJson.datos.forEach(venta => {
                    filas += "<tr onclick='seleccionar_venta($(this))'>";
                    filas += " <td>" + venta.id_venta_cabecera + "</td>";
                    filas += " <td>" + venta.fiscal_venta_cabecera + "</td>";
                    filas += " <td>" + venta.emision_venta_cabecera + "</td>";
                    filas += " <td>" + venta.condicion_venta_cabecera + "</td>";
                    filas += " <td>" + venta.id_cliente + "</td>";
                    filas += " <td>" + venta.nombre_cliente + "</td>";
                    filas += "</tr>";
                });
            } else {
                filas = 'No existen mas registros ...';
            }
            $('#tbody_datos').html(filas);
        });
}

function seleccionar_venta($this) {
    var id_venta_cabecera = $this.find('td').eq(0).text();
    var fiscal_venta_cabecera = $this.find('td').eq(1).text();
    var emision_venta_cabecera = $this.find('td').eq(2).text();
    var condicion_venta_cabecera = $this.find('td').eq(3).text();
    var id_cliente = $this.find('td').eq(4).text();
    var nombre_cliente = $this.find('td').eq(5).text();
    $('#id_venta_cabecera').val(id_venta_cabecera);
    $('#fiscal_venta_cabecera').val(fiscal_venta_cabecera);
    $('#emision_venta_cabecera').val(emision_venta_cabecera);
    $('#condicion_venta_cabecera').val(condicion_venta_cabecera);
    $('#id_cliente').val(id_cliente);
    $('#nombre_cliente').val(nombre_cliente);
    salir_busqueda('#id_venta_cabecera');
    deshabilitar_agregar();
}

function agregar() {
    var fiscal_venta_cabecera = $('#fiscal_venta_cabecera').val();
    var emision_venta_cabecera = $('#emision_venta_cabecera').val();
    var condicion_venta_cabecera = $('#condicion_venta_cabecera').val();
    var id_cliente = $('#id_cliente').val();

    var url = "/api/ventas_cabeceras";
    var data = {
                    fiscal_venta_cabecera: fiscal_venta_cabecera,
                    emision_venta_cabecera: emision_venta_cabecera,
                    condicion_venta_cabecera: condicion_venta_cabecera,
                    id_cliente: id_cliente
                };

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
            if (myJson.agregado) {
                limpiar_venta();
            } else {
                alert('Registro no agregado')
            }

        });
}

function limpiar_formulario() {
    $('#id_venta_cabecera').val(0);
    $('#fiscal_venta_cabecera').val("");
    $('#emision_venta_cabecera').val("");
    $('#condicion_venta_cabecera').val("");
    $('#id_cliente').val(0);
    $('#nombre_cliente').val("");
    $('#id_venta_cabecera').select();
}

function modificar() {
    var id_venta_cabecera = $('#id_venta_cabecera').val();
    var fiscal_venta_cabecera = $('#fiscal_venta_cabecera').val();
    var emision_venta_cabecera = $('#emision_venta_cabecera').val();
    var condicion_venta_cabecera = $('#condicion_venta_cabecera').val();
    var id_cliente = $('#id_cliente').val();

    var url = "/api/ventas_cabeceras/" + id_venta_cabecera;
    var data = {
        fiscal_venta_cabecera: fiscal_venta_cabecera,
        emision_venta_cabecera: emision_venta_cabecera,
        condicion_venta_cabecera: condicion_venta_cabecera,
        id_cliente: id_cliente
    };

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
                limpiar_formulario();
            } else {
                alert('Registro no modificado')
            }
        });
}

function eliminar() {
    var id_venta_cabecera = $('#id_venta_cabecera').val();

    var url = "/api/ventas_cabeceras/" + id_venta_cabecera;

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
            if (myJson.eliminado) {
                limpiar_formulario();
            } else {
                alert('Registro no eliminado')
            }
        });
}

// Cliente -----------------------------------------------------------------------------------------------------------------------
function buscar_id_cliente() {
    var id_cliente = $('#id_cliente').val();
    var url = "/api/clientes/" + id_cliente;

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
                $('#id_cliente').val(myJson.datos[0].id_cliente);
                $('#nombre_cliente').val(myJson.datos[0].nombre_cliente);
            } else {
                $('#id_cliente').val(0);
                $('#nombre_cliente').val("");
            }
        });
}

function buscar_nombre_cliente() {

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
                    filas += " <td>" + cliente.nombre_cliente + "</td>";
                    filas += " <td>" + cliente.ruc_cliente + "</td>";
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
    var nombre_cliente = $this.find('td').eq(1).text();
    $('#id_cliente').val(id_cliente);
    $('#nombre_cliente').val(nombre_cliente);
    salir_busqueda('#id_cliente');
}

// Detalles

function buscar_id_venta_cabecera_ventas_detalles(){
    var id_venta_cabecera = $('#id_venta_cabecera').val();
    var url = "/api/ventas_detalles/venta_cabecera/" + id_venta_cabecera;

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
            var filas = "";
            var total_detalles = 0;
            myJson.datos.forEach(detalle => {
                total_detalles += detalle.cantidad_venta_detalle*detalle.precio_venta_detalle;
                filas += "<tr>";
                filas += " <td>" + detalle.id_venta_detalle + "</td>";
                filas += " <td>" + detalle.id_item + "</td>";
                filas += " <td>" + detalle.nombre_item + "</td>";
                filas += " <td>" + detalle.id_iva + "</td>";
                filas += " <td>" + detalle.nombre_iva + "</td>";
                filas += " <td class='text-right'>" + detalle.cantidad_venta_detalle + "</td>";
                filas += " <td class='text-right'>" + detalle.precio_venta_detalle + "</td>";
                filas += " <td class='text-right'>" + detalle.cantidad_venta_detalle*detalle.precio_venta_detalle + "</td>";
                filas += "<td class='text-center'>";
                filas += "    <button type='button' onclick='modificar_detalle($(this))' class='btn btn-sm btn-primary'>";
                filas += "        <i class='fas fa-pencil-alt'></i>";
                filas += "    </button>";
                filas += "    <button type='button' onclick='eliminar_detalle($(this))' class='btn btn-sm btn-primary'>";
                filas += "        <i class='fas fa-trash'></i>";
                filas += "    </button>";
                filas += "</td>";
                filas += "</tr>";
            });
            $('#tbody_datos_detalle').html(filas);
            $('#total_detalles').html(total_detalles);

        });
}

function agregar_detalle(){
    operacion = 'agregar';
    limpiar_detalle();    
}

function limpiar_detalle(){
    $('#id_venta_detalle').val(0);
    $('#id_item').val(0);
    $('#nombre_item').val("");
    $('#id_iva').val("1");
    $('#cantidad_venta_detalle').val(0);
    $('#tipo_item').val(0);
    $('#total_venta_detalle').val(0);
    $('#id_item').select();
}

function modificar_detalle($this){
    operacion = 'modificar';
    var id_venta_detalle = $this.parent().parent().find('td').eq(0).text();    
    var id_item = $this.parent().parent().find('td').eq(1).text();    
    var nombre_item = $this.parent().parent().find('td').eq(2).text();    
    var id_iva = $this.parent().parent().find('td').eq(3).text();
    var cantidad_venta_detalle = $this.parent().parent().find('td').eq(5).text();
    var precio_venta_detalle = $this.parent().parent().find('td').eq(6).text();
    var total_venta_detalle = $this.parent().parent().find('td').eq(7).text();

    $('#id_venta_detalle').val(id_venta_detalle);
    $('#id_item').val(id_item);
    $('#nombre_item').val(nombre_item);
    $('#id_iva').val(id_iva);
    $('#cantidad_venta_detalle').val(cantidad_venta_detalle);
    $('#precio_venta_detalle').val(precio_venta_detalle);
    $('#total_venta_detalle').val(total_venta_detalle);
    $('#id_item').select();
}

function eliminar_detalle($this){
    //$this.parent().parent().remove();
    var id_venta_detalle = $('#id_venta_detalle').val();

    var url = "/api/ventas_detalles/" + id_venta_detalle;

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
            if(myJson.eliminado){
                buscar_id_venta_cabecera_ventas_detalles();
            } else {
                alert('Registro no eliminado');
            }

        });

}

function guardar_detalle(){
    if (operacion === 'agregar') {
        guardar_detalle_agregar();
    } else {
        guardar_detalle_modificar();
    }
}

function guardar_detalle_agregar(){

    var id_venta_cabecera = $('#id_venta_cabecera').val();
    var id_item = $('#id_item').val();
    var id_iva = $('#id_iva').val();
    var precio_venta_detalle = $('#precio_venta_detalle').val();
    var cantidad_venta_detalle = $('#cantidad_venta_detalle').val();
    

    var url = "/api/ventas_detalles";
    var data = {
        id_venta_detalle: id_venta_detalle,
        id_venta_cabecera: id_venta_cabecera,
        id_item: id_item,
        id_iva: id_iva,
        precio_venta_detalle: precio_venta_detalle,
        cantidad_venta_detalle: cantidad_venta_detalle
        
    };

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
            if(myJson.agregado){
                buscar_id_venta_cabecera_ventas_detalles();
                agregar_detalle();
            } else {
                alert('Registro no agregado');
            }
        });
}

function guardar_detalle_modificar(){
    var id_venta_detalle = $('#id_venta_detalle').val();

    var id_venta_cabecera = $('#id_venta_cabecera').val();
    var id_item = $('#id_item').val();
    var id_iva = $('#id_iva').val();
    var precio_venta_detalle = $('#precio_venta_detalle').val();
    var cantidad_venta_detalle = $('#cantidad_venta_detalle').val();
    

    var url = "/api/ventas_detalles/" + id_venta_detalle;
    var data = {
        id_venta_detalle: id_venta_detalle,
        id_venta_cabecera: id_venta_cabecera,
        id_item: id_item,
        id_iva: id_iva,
        precio_venta_detalle: precio_venta_detalle,
        cantidad_venta_detalle: cantidad_venta_detalle
        
    };

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
            if(myJson.modificado){
                buscar_id_venta_cabecera_ventas_detalles();
                agregar_detalle();
            } else {
                alert('Registro no modificado');
            }
            
        });
}

function calcular_total_linea(){
    var cantidad = $('#cantidad_venta_detalle').val();
    var precio = $('#precio_venta_detalle').val();
    var total = cantidad * precio;
    $('#total_venta_detalle').val(total);
}

// Item -----------------------------------------------------------------------------------------------------------------------
function buscar_id_item() {
    var id_item = $('#id_item').val();
    var url = "/api/items/" + id_item;

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
                $('#id_item').val(myJson.datos[0].id_item);
                $('#nombre_item').val(myJson.datos[0].nombre_item);
                $('#id_iva').val(myJson.datos[0].id_iva);
                $('#tipo_item').val(myJson.datos[0].tipo_item);
                $('#precio_venta_detalle').val(myJson.datos[0].precio_item);
            } else {
                $('#id_item').val(0);
                $('#nombre_item').val("");
                $('#id_iva').val("1");
                $('#tipo_item').val("");
                $('#precio_venta_detalle').val(0);
            }
        });
}

function buscar_nombre_item() {

    var url = "/api/items";

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
                myJson.datos.forEach(item => {
                    filas += "<tr onclick='seleccionar_item($(this))'>";
                    filas += " <td>" + item.id_item + "</td>";
                    filas += " <td>" + item.nombre_item + "</td>";
                    filas += " <td>" + item.precio_item + "</td>";
                    filas += " <td>" + item.id_iva + "</td>";
                    filas += " <td>" + item.tipo_item + "</td>";
                    
                    filas += "</tr>";
                });
            } else {
                filas = 'No existen mas registros ...';
            }
            $('#tbody_datos').html(filas);
        });
}

function seleccionar_item($this) {
    var id_item = $this.find('td').eq(0).text();
    var nombre_item = $this.find('td').eq(1).text();
    var precio_item = $this.find('td').eq(2).text();
    var id_iva = $this.find('td').eq(3).text();
    var tipo_item = $this.find('td').eq(4).text();
    
    $('#id_item').val(id_item);
    $('#nombre_item').val(nombre_item);
    $('#precio_venta_detalle').val(precio_item);
    $('#id_iva').val(id_iva);
    $('#tipo_item').val(tipo_item);
    
    salir_busqueda('#cantidad_venta_detalle');
}

function imprimir() {
    var ventana = window.open('rpt/ventas/imprimir.php',
            'ventana',
            'width=600 height=400, status=no scrollbars=no, location=no, resizable=no, manu=no');
    //ventana.print();
}