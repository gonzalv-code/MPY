<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
require_once __DIR__ .'./../Conexion.php';

return function (App $app) {
    $container = $app->getContainer();

    $app->get('/api/entidades/{id}', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $route = $request->getAttribute('route');
        $id_entidad =  $route->getArgument('id');

        error_log("---> ".$id_entidad);

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM entidades ".
               "WHERE id_entidad = :id_entidad";
        $stmt = $pgsql->prepare($sql); 
        $stmt->bindParam(':id_entidad', $id_entidad); 
        
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

    $app->get('/api/entidades', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM entidades";
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

    $app->post('/api/entidades', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/entidades' post route");
        $datos = json_decode($request->getBody());
        $nombre_entidad =  $datos->nombre_entidad;
        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "INSERT INTO entidades(nombre_entidad) VALUES(:nombre_entidad)";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_entidad', $nombre_entidad);
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

    $app->put('/api/entidades/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/entidades' post route");
        
        $route = $request->getAttribute('route');
        $id_entidad =  $route->getArgument('id');

        $datos = json_decode($request->getBody());
        $nombre_entidad =  $datos->nombre_entidad;

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "UPDATE entidades SET nombre_entidad = :nombre_entidad WHERE id_entidad = :id_entidad";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_entidad', $nombre_entidad);
        $stmt->bindParam(':id_entidad', $id_entidad);
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

    $app->delete('/api/entidades/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/entidades' post route");
        
        $route = $request->getAttribute('route');
        $id_entidad =  $route->getArgument('id');

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "DELETE FROM entidades WHERE id_entidad = :id_entidad";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':id_entidad', $id_entidad);
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
