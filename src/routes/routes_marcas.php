<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
require_once __DIR__ .'./../Conexion.php';

return function (App $app) {
    $container = $app->getContainer();

    $app->get('/api/marcas/{id}', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $route = $request->getAttribute('route');
        $id_marca =  $route->getArgument('id');

        error_log("---> ".$id_marca);

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM marcas ".
               "WHERE id_marca = :id_marca";
        $stmt = $pgsql->prepare($sql); 
        $stmt->bindParam(':id_marca', $id_marca); 
        
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

    $app->get('/api/marcas', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM marcas";
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

    $app->post('/api/marcas', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/marcas' post route");
        $datos = json_decode($request->getBody());
        $nombre_marca =  $datos->nombre_marca;
        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "INSERT INTO marcas(nombre_marca) VALUES(:nombre_marca)";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_marca', $nombre_marca);
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

    $app->put('/api/marcas/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/marcas' post route");
        
        $route = $request->getAttribute('route');
        $id_marca =  $route->getArgument('id');

        $datos = json_decode($request->getBody());
        $nombre_marca =  $datos->nombre_marca;

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "UPDATE marcas SET nombre_marca = :nombre_marca WHERE id_marca = :id_marca";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_marca', $nombre_marca);
        $stmt->bindParam(':id_marca', $id_marca);
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

    $app->delete('/api/marcas/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/marcas' post route");
        
        $route = $request->getAttribute('route');
        $id_marca =  $route->getArgument('id');

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "DELETE FROM marcas WHERE id_marca = :id_marca";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':id_marca', $id_marca);
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
