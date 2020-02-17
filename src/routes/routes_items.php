<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
require_once __DIR__ .'./../Conexion.php';

return function (App $app) {
    $container = $app->getContainer();

    $app->get('/api/items/{id}', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/items/login' route");

        $route = $request->getAttribute('route');
        $id_item =  $route->getArgument('id');

        error_log("---> ".$id_item);

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM items p ".
               "LEFT JOIN ivas i ON p.id_iva = i.id_iva ".
               "WHERE id_item = :id_item";
        $stmt = $pgsql->prepare($sql); 
        $stmt->bindParam(':id_item', $id_item); 
        
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

    $app->get('/api/items', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/items/login' route");

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM items p ".
               "LEFT JOIN ivas i ON p.id_iva = i.id_iva ";
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

    $app->post('/api/items', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/items' post route");
        $datos = json_decode($request->getBody());
        $nombre_item =  $datos->nombre_item;
        $precio_item =  $datos->precio_item;
        $id_iva =  $datos->id_iva;
        $tipo_item =  $datos->tipo_item;
        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "INSERT INTO items(nombre_item, precio_item, id_iva, tipo_item) VALUES(:nombre_item, :precio_item, :id_iva, :tipo_item)";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_item', $nombre_item);
        $stmt->bindParam(':precio_item', $precio_item);
        $stmt->bindParam(':id_iva', $id_iva);
        $stmt->bindParam(':tipo_item', $tipo_item);
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

    $app->put('/api/items/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/items' post route");
        
        $route = $request->getAttribute('route');
        $id_item =  $route->getArgument('id');

        $datos = json_decode($request->getBody());
        $nombre_item =  $datos->nombre_item;
        $precio_item =  $datos->precio_item;
        $id_iva =  $datos->id_iva;
        $tipo_item =  $datos->tipo_item;

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "UPDATE items SET nombre_item = :nombre_item, ".
               "precio_item = :precio_item, id_iva = :id_iva, tipo_item = :tipo_item WHERE id_item = :id_item";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_item', $nombre_item);
        $stmt->bindParam(':precio_item', $precio_item);
        $stmt->bindParam(':id_iva', $id_iva);
        $stmt->bindParam(':id_item', $id_item);
        $stmt->bindParam(':tipo_item', $tipo_item);
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

    $app->delete('/api/items/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/items' post route");
        
        $route = $request->getAttribute('route');
        $id_item =  $route->getArgument('id');

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "DELETE FROM items WHERE id_item = :id_item";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':id_item', $id_item);
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
