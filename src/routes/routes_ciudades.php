<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
require_once __DIR__ .'./../Conexion.php';

return function (App $app) {
    $container = $app->getContainer();

    $app->get('/api/ciudades/{id}', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $route = $request->getAttribute('route');
        $id_ciudad =  $route->getArgument('id');

        error_log("---> ".$id_ciudad);

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM ciudades ".
               "WHERE id_ciudad = :id_ciudad";
        $stmt = $pgsql->prepare($sql); 
        $stmt->bindParam(':id_ciudad', $id_ciudad); 
        
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

    $app->get('/api/ciudades', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM ciudades";
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

    $app->post('/api/ciudades', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/ciudades' post route");
        $datos = json_decode($request->getBody());
        $nombre_ciudad =  $datos->nombre_ciudad;
        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "INSERT INTO ciudades(nombre_ciudad) VALUES(:nombre_ciudad)";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_ciudad', $nombre_ciudad);
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

    $app->put('/api/ciudades/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/ciudades' post route");
        
        $route = $request->getAttribute('route');
        $id_ciudad =  $route->getArgument('id');

        $datos = json_decode($request->getBody());
        $nombre_ciudad =  $datos->nombre_ciudad;

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "UPDATE ciudades SET nombre_ciudad = :nombre_ciudad WHERE id_ciudad = :id_ciudad";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_ciudad', $nombre_ciudad);
        $stmt->bindParam(':id_ciudad', $id_ciudad);
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

    $app->delete('/api/ciudades/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/ciudades' post route");
        
        $route = $request->getAttribute('route');
        $id_ciudad =  $route->getArgument('id');

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "DELETE FROM ciudades WHERE id_ciudad = :id_ciudad";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':id_ciudad', $id_ciudad);
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
