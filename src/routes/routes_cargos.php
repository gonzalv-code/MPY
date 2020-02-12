<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
require_once __DIR__ .'./../Conexion.php';

return function (App $app) {
    $container = $app->getContainer();

    $app->get('/api/cargos/{id}', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $route = $request->getAttribute('route');
        $id_cargo =  $route->getArgument('id');

        error_log("---> ".$id_cargo);

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM cargos ".
               "WHERE id_cargo = :id_cargo";
        $stmt = $pgsql->prepare($sql); 
        $stmt->bindParam(':id_cargo', $id_cargo); 
        
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

    $app->get('/api/cargos', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM cargos";
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

    $app->post('/api/cargos', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/cargos' post route");
        $datos = json_decode($request->getBody());
        $nombre_cargo =  $datos->nombre_cargo;
        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "INSERT INTO cargos(nombre_cargo) VALUES(:nombre_cargo)";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_cargo', $nombre_cargo);
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

    $app->put('/api/cargos/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/cargos' post route");
        
        $route = $request->getAttribute('route');
        $id_cargo =  $route->getArgument('id');

        $datos = json_decode($request->getBody());
        $nombre_cargo =  $datos->nombre_cargo;

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "UPDATE cargos SET nombre_cargo = :nombre_cargo WHERE id_cargo = :id_cargo";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_cargo', $nombre_cargo);
        $stmt->bindParam(':id_cargo', $id_cargo);
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

    $app->delete('/api/cargos/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/cargos' post route");
        
        $route = $request->getAttribute('route');
        $id_cargo =  $route->getArgument('id');

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "DELETE FROM cargos WHERE id_cargo = :id_cargo";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':id_cargo', $id_cargo);
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
