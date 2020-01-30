<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
require_once __DIR__ .'./../Conexion.php';

return function (App $app) {
    $container = $app->getContainer();

    $app->get('/api/ventas_detalles/{id}', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $route = $request->getAttribute('route');
        $id_venta_detalle =  $route->getArgument('id');

        error_log("---> ".$id_venta_detalle);

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM ventas_detalles vd ".
               "LEFT JOIN ventas_cabeceras vc ON vd.id_venta_cabecera = vc.id_venta_cabecera ".
               "WHERE id_venta_detalle = :id_venta_detalle";
        $stmt = $pgsql->prepare($sql); 
        $stmt->bindParam(':id_venta_detalle', $id_venta_detalle); 
        
        if ($stmt->execute()) { 
            $data = $stmt->fetchAll(PDO::FETCH_OBJ);
        } else {
            
        }
        
        $data = array('datos' => $data);
        $conexion->cerrar($pgsql);
        $code = 404;
        if(sizeof($data["datos"]) > 0){
            $code = 200;
        }
        return $response->withHeader('Access-Control-Allow-Origin', '*')
                        ->withJson($data, $code);
    });

    $app->get('/api/ventas_detalles', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM ventas_detalles vd ".
               "LEFT JOIN ventas_cabeceras vc ON vd.id_venta_cabecera = vc.id_ventas_cabeceras ";
        $stmt = $pgsql->prepare($sql); 
        
        if ($stmt->execute()) { 
            $data = $stmt->fetchAll(PDO::FETCH_OBJ);
        } else {
            
        }
        
        $data = array('datos' => $data);
        $conexion->cerrar($pgsql);
        $code = 404;
        if(sizeof($data["datos"]) > 0){
            $code = 200;
        }
        return $response->withHeader('Access-Control-Allow-Origin', '*')
                        ->withJson($data, $code);
    });

    $app->post('/api/ventas_detalles', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/ventas_detalles' post route");
        $datos = json_decode($request->getBody());

        $id_venta_cabecera =  $datos->id_venta_cabecera;
        $id_producto =  $datos->id_producto;
        $cantidad_venta_detalle =  $datos->cantidad_venta_detalle;
        $precio_venta_detalle =  $datos->precio_venta_detalle;
        $id_iva =  $datos->id_iva;
        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "INSERT INTO ventas_detalles(id_venta_cabecera, id_producto, cantidad_venta_detalle, precio_venta_detalle, id_iva) VALUES(:id_venta_cabecera, :id_producto, :cantidad_venta_detalle, :precio_venta_detalle, :id_iva)";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':id_venta_cabecera', $id_venta_cabecera);
        $stmt->bindParam(':id_producto', $id_producto);
        $stmt->bindParam(':cantidad_venta_detalle', $cantidad_venta_detalle);
        $stmt->bindParam(':precio_venta_detalle', $precio_venta_detalle);
        $stmt->bindParam(':id_iva', $id_iva);
        $data = array('agregado' => true);
        try {
            $pgsql->beginTransaction();
            $stmt->execute();
            $pgsql->commit();
        }catch (Exception $e){
            error_log($e);
            $pgsql->rollback();
            $data = array('agregado' => false);
        }
        return $response->withHeader('Access-Control-Allow-Origin', '*')
                        ->withJson($data, 200);
    });

    $app->put('/api/ventas_detalles/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/ventas' post route");
        
        $route = $request->getAttribute('route');
        $id_venta_detalle =  $route->getArgument('id');

        $datos = json_decode($request->getBody());
        $id_venta_cabecera =  $datos->id_venta_cabecera;
        $id_producto =  $datos->id_producto;
        $cantidad_venta_detalle =  $datos->cantidad_venta_detalle;
        $precio_venta_detalle =  $datos->precio_venta_detalle;
        $id_iva =  $datos->id_iva;

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "UPDATE ventas_detalles SET id_venta_detalle = :id_venta_detalle, ".
               "id_venta_cabecera = :id_venta_cabecera, id_producto = :id_producto, cantidad_venta_detalle = :cantidad_venta_detalle, precio_venta_detalle = :precio_venta_detalle, id_iva = :id_iva WHERE id_venta_detalle = :id_venta_detalle";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':id_venta_detalle', $id_venta_detalle);
        $stmt->bindParam(':id_venta_cabecera', $id_venta_cabecera);
        $stmt->bindParam(':id_producto', $id_producto);
        $stmt->bindParam(':cantidad_venta_detalle', $cantidad_venta_detalle);
        $stmt->bindParam(':precio_venta_detalle', $precio_venta_detalle);
        $stmt->bindParam(':id_iva', $id_iva);
        $data = array('modificado' => true);
        try {
            $pgsql->beginTransaction();
            $stmt->execute();
            $pgsql->commit();
        }catch (Exception $e){
            $pgsql->rollback();
            $data = array('modificado' => false);
        }
        return $response->withHeader('Access-Control-Allow-Origin', '*')
                        ->withJson($data, 200);
    });

    $app->delete('/api/ventas_detalles/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/ventas' post route");
        
        $route = $request->getAttribute('route');
        $id_venta_detalle =  $route->getArgument('id');

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "DELETE FROM ventas_detalles WHERE id_venta_detalle = :id_venta_detalle";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':id_venta_detalle', $id_venta_detalle);
        $data = array('eliminado' => true);
        try {
            $pgsql->beginTransaction();
            $stmt->execute();
            $pgsql->commit();
        }catch (Exception $e){
            $pgsql->rollback();
            $data = array('eliminado' => false);
        }
        return $response->withHeader('Access-Control-Allow-Origin', '*')
                        ->withJson($data, 200);
    });

    $app->get('/api/ventas_detalles/venta_cabecera/{id}', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/ventas_detalles/venta_cabecera/id' route");

        $route = $request->getAttribute('route');
        $id_venta_cabecera =  $route->getArgument('id');

        error_log("---> ".$id_venta_cabecera);

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM ventas_detalles vd ".
               "LEFT JOIN productos p ON vd.id_producto = p.id_producto ".
               "LEFT JOIN ivas i ON vd.id_iva = i.id_iva ".
               "WHERE id_venta_cabecera = :id_venta_cabecera";
        $stmt = $pgsql->prepare($sql); 
        $stmt->bindParam(':id_venta_cabecera', $id_venta_cabecera); 
        
        if ($stmt->execute()) { 
            $data = $stmt->fetchAll(PDO::FETCH_OBJ);
        } else {
            
        }
        
        $data = array('datos' => $data);
        $conexion->cerrar($pgsql);
        $code = 404;
        if(sizeof($data["datos"]) > 0){
            $code = 200;
        }
        return $response->withHeader('Access-Control-Allow-Origin', '*')
                        ->withJson($data, $code);
    });

};
