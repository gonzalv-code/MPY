<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
require_once __DIR__ .'./../Conexion.php';

return function (App $app) {
    $container = $app->getContainer();

    $app->get('/api/tarjetas/{id}', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $route = $request->getAttribute('route');
        $id_tarjeta =  $route->getArgument('id');

        error_log("---> ".$id_tarjeta);

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM tarjetas ".
               "WHERE id_tarjeta = :id_tarjeta";
        $stmt = $pgsql->prepare($sql); 
        $stmt->bindParam(':id_tarjeta', $id_tarjeta); 
        
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

    $app->get('/api/tarjetas', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM tarjetas";
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

    $app->post('/api/tarjetas', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/tarjetas' post route");
        $datos = json_decode($request->getBody());
        $nombre_tarjeta =  $datos->nombre_tarjeta;
        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "INSERT INTO tarjetas(nombre_tarjeta) VALUES(:nombre_tarjeta)";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_tarjeta', $nombre_tarjeta);
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

    $app->put('/api/tarjetas/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/tarjetas' post route");
        
        $route = $request->getAttribute('route');
        $id_tarjeta =  $route->getArgument('id');

        $datos = json_decode($request->getBody());
        $nombre_tarjeta =  $datos->nombre_tarjeta;

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "UPDATE tarjetas SET nombre_tarjeta = :nombre_tarjeta WHERE id_tarjeta = :id_tarjeta";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_tarjeta', $nombre_tarjeta);
        $stmt->bindParam(':id_tarjeta', $id_tarjeta);
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

    $app->delete('/api/tarjetas/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/tarjetas' post route");
        
        $route = $request->getAttribute('route');
        $id_tarjeta =  $route->getArgument('id');

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "DELETE FROM tarjetas WHERE id_tarjeta = :id_tarjeta";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':id_tarjeta', $id_tarjeta);
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
