<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
require_once __DIR__ .'./../Conexion.php';

return function (App $app) {
    $container = $app->getContainer();

    $app->get('/api/ivas/{id}', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $route = $request->getAttribute('route');
        $id_iva =  $route->getArgument('id');

        error_log("---> ".$id_iva);

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM ivas ".
               "WHERE id_iva = :id_iva";
        $stmt = $pgsql->prepare($sql); 
        $stmt->bindParam(':id_iva', $id_iva); 
        
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

    $app->get('/api/ivas', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM ivas";
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

    $app->post('/api/ivas', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/ivas' post route");
        $datos = json_decode($request->getBody());
        $nombre_iva =  $datos->nombre_iva;
        $porcentaje_iva =  $datos->porcentaje_iva;
        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "INSERT INTO ivas(nombre_iva, porcentaje_iva) VALUES(:nombre_iva, :porcentaje_iva)";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_iva', $nombre_iva);
        $stmt->bindParam(':porcentaje_iva', $porcentaje_iva);
        $data = array('agregado' => true);
        try {
            $pgsql->beginTransaction();
            $stmt->execute();
            $pgsql->commit();
        }catch (Exception $e){
            $pgsql->rollback();
            $data = array('agregado' => false);
        }
        return $response->withHeader('Access-Control-Allow-Origin', '*')
                        ->withJson($data, 200);
    });

    $app->put('/api/ivas/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/ivas' post route");
        
        $route = $request->getAttribute('route');
        $id_iva =  $route->getArgument('id');

        $datos = json_decode($request->getBody());
        $nombre_iva =  $datos->nombre_iva;
        $porcentaje_iva =  $datos->porcentaje_iva;

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "UPDATE ivas SET nombre_iva = :nombre_iva, porcentaje_iva = :porcentaje_iva ".
        "WHERE id_iva = :id_iva";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_iva', $nombre_iva);
        $stmt->bindParam(':porcentaje_iva', $porcentaje_iva);
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

    $app->delete('/api/ivas/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/ivas' post route");
        
        $route = $request->getAttribute('route');
        $id_iva =  $route->getArgument('id');

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "DELETE FROM ivas WHERE id_iva = :id_iva";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':id_iva', $id_iva);
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

};
