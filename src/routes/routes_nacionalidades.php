<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
require_once __DIR__ .'./../Conexion.php';

return function (App $app) {
    $container = $app->getContainer();

    $app->get('/api/nacionalidades/{id}', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $route = $request->getAttribute('route');
        $id_nacionalidad =  $route->getArgument('id');

        error_log("---> ".$id_nacionalidad);

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM nacionalidades ".
               "WHERE id_nacionalidad = :id_nacionalidad";
        $stmt = $pgsql->prepare($sql); 
        $stmt->bindParam(':id_nacionalidad', $id_nacionalidad); 
        
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

    $app->get('/api/nacionalidades', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM nacionalidades";
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

    $app->post('/api/nacionalidades', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/nacionalidades' post route");
        $datos = json_decode($request->getBody());
        $nombre_nacionalidad =  $datos->nombre_nacionalidad;
        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "INSERT INTO nacionalidades(nombre_nacionalidad) VALUES(:nombre_nacionalidad)";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_nacionalidad', $nombre_nacionalidad);
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

    $app->put('/api/nacionalidades/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/nacionalidades' post route");
        
        $route = $request->getAttribute('route');
        $id_nacionalidad =  $route->getArgument('id');

        $datos = json_decode($request->getBody());
        $nombre_nacionalidad =  $datos->nombre_nacionalidad;

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "UPDATE nacionalidades SET nombre_nacionalidad = :nombre_nacionalidad WHERE id_nacionalidad = :id_nacionalidad";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_nacionalidad', $nombre_nacionalidad);
        $stmt->bindParam(':id_nacionalidad', $id_nacionalidad);
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

    $app->delete('/api/nacionalidades/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/nacionalidades' post route");
        
        $route = $request->getAttribute('route');
        $id_nacionalidad =  $route->getArgument('id');

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "DELETE FROM nacionalidades WHERE id_nacionalidad = :id_nacionalidad";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':id_nacionalidad', $id_nacionalidad);
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
