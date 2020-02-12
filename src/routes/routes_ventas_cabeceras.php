<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
require_once __DIR__ .'./../Conexion.php';

return function (App $app) {
    $container = $app->getContainer();

    $app->get('/api/ventas_cabeceras/{id}', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $route = $request->getAttribute('route');
        $id_venta_cabecera =  $route->getArgument('id');

        error_log("---> ".$id_venta_cabecera);

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM ventas_cabeceras vs ".
               "LEFT JOIN clientes c ON vs.id_cliente = c.id_cliente ".
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

    $app->get('/api/ventas_cabeceras', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM ventas_cabeceras vs ".
               "LEFT JOIN clientes c ON vs.id_cliente = c.id_cliente ";
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

    $app->post('/api/ventas_cabeceras', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/ventas_cabeceras' post route");
        $datos = json_decode($request->getBody());
        $fiscal_venta_cabecera =  $datos->fiscal_venta_cabecera;
        $emision_venta_cabecera =  $datos->emision_venta_cabecera;
        $condicion_venta_cabecera =  $datos->condicion_venta_cabecera;
        $id_cliente =  $datos->id_cliente;
        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "INSERT INTO ventas_cabeceras(fiscal_venta_cabecera, emision_venta_cabecera, condicion_venta_cabecera, id_cliente) VALUES(:fiscal_venta_cabecera, :emision_venta_cabecera, :condicion_venta_cabecera, :id_cliente)";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':fiscal_venta_cabecera', $fiscal_venta_cabecera);
        $stmt->bindParam(':emision_venta_cabecera', $emision_venta_cabecera);
        $stmt->bindParam(':condicion_venta_cabecera', $condicion_venta_cabecera);
        $stmt->bindParam(':id_cliente', $id_cliente);
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

    $app->put('/api/ventas_cabeceras/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/ventas' post route");
        
        $route = $request->getAttribute('route');
        $id_venta_cabecera =  $route->getArgument('id');

        $datos = json_decode($request->getBody());
        $fiscal_venta_cabecera =  $datos->fiscal_venta_cabecera;
        $emision_venta_cabecera =  $datos->emision_venta_cabecera;
        $condicion_venta_cabecera =  $datos->condicion_venta_cabecera;
        $id_cliente =  $datos->id_cliente;

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "UPDATE ventas_cabeceras SET fiscal_venta_cabecera = :fiscal_venta_cabecera, ".
               "emision_venta_cabecera = :emision_venta_cabecera, condicion_venta_cabecera = :condicion_venta_cabecera, id_cliente = :id_cliente WHERE id_venta_cabecera = :id_venta_cabecera";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':fiscal_venta_cabecera', $fiscal_venta_cabecera);
        $stmt->bindParam(':emision_venta_cabecera', $emision_venta_cabecera);
        $stmt->bindParam(':condicion_venta_cabecera', $condicion_venta_cabecera);
        $stmt->bindParam(':id_cliente', $id_cliente);
        $stmt->bindParam(':id_venta_cabecera', $id_venta_cabecera);
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

    $app->delete('/api/ventas_cabeceras/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/ventas' post route");
        
        $route = $request->getAttribute('route');
        $id_venta_cabecera =  $route->getArgument('id');

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "DELETE FROM ventas_cabeceras WHERE id_venta_cabecera = :id_venta_cabecera";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':id_venta_cabecera', $id_venta_cabecera);
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

    $app->get('/api/ventas_cabeceras/imprimir/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/ventas_cabeceras/imprimir/{id}' post route");
        
        $response = $this->response->withHeader( 'Content-type', 'application/pdf' );
        include ('../../php/contract/pdf.php');
        $content = $pdf->toString();
        $response->write($content);

        return $response->withHeader('Access-Control-Allow-Origin', '*')
                        ->withJson($data, 200);
    });

};
