<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
require_once __DIR__ .'./../Conexion.php';

return function (App $app) {
    $container = $app->getContainer();

    $app->get('/api/estados_civiles/{id}', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $route = $request->getAttribute('route');
        $id_estado_civil =  $route->getArgument('id');

        error_log("---> ".$id_estado_civil);

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM estados_civiles ".
               "WHERE id_estado_civil = :id_estado_civil";
        $stmt = $pgsql->prepare($sql); 
        $stmt->bindParam(':id_estado_civil', $id_estado_civil); 
        
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

    $app->get('/api/estados_civiles', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM estados_civiles";
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

    $app->post('/api/estados_civiles', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/estados_civiles' post route");
        $datos = json_decode($request->getBody());
        $nombre_estado_civil =  $datos->nombre_estado_civil;
        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "INSERT INTO estados_civiles(nombre_estado_civil) VALUES(:nombre_estado_civil)";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_estado_civil', $nombre_estado_civil);
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

    $app->put('/api/estados_civiles/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/estados_civiles' post route");
        
        $route = $request->getAttribute('route');
        $id_estado_civil =  $route->getArgument('id');

        $datos = json_decode($request->getBody());
        $nombre_estado_civil =  $datos->nombre_estado_civil;

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "UPDATE estados_civiles SET nombre_estado_civil = :nombre_estado_civil WHERE id_estado_civil = :id_estado_civil";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_estado_civil', $nombre_estado_civil);
        $stmt->bindParam(':id_estado_civil', $id_estado_civil);
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

    $app->delete('/api/estados_civiles/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/estados_civiles' post route");
        
        $route = $request->getAttribute('route');
        $id_estado_civil =  $route->getArgument('id');

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "DELETE FROM estados_civiles WHERE id_estado_civil = :id_estado_civil";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':id_estado_civil', $id_estado_civil);
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
