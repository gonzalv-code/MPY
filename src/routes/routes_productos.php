<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
require_once __DIR__ .'./../Conexion.php';

return function (App $app) {
    $container = $app->getContainer();

    $app->get('/api/productos/{id}', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/productos/login' route");

        $route = $request->getAttribute('route');
        $id_producto =  $route->getArgument('id');

        error_log("---> ".$id_producto);

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM productos p ".
               "LEFT JOIN ivas i ON p.id_iva = i.id_iva ".
               "WHERE id_producto = :id_producto";
        $stmt = $pgsql->prepare($sql); 
        $stmt->bindParam(':id_producto', $id_producto); 
        
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

    $app->get('/api/productos', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/productos/login' route");

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM productos p ".
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

    $app->post('/api/productos', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/productos' post route");
        $datos = json_decode($request->getBody());
        $nombre_producto =  $datos->nombre_producto;
        $url_producto =  $datos->url_producto;
        $id_iva =  $datos->id_iva;
        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "INSERT INTO productos(nombre_producto, url_producto, id_iva) VALUES(:nombre_producto, :url_producto, :id_iva)";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_producto', $nombre_producto);
        $stmt->bindParam(':url_producto', $url_producto);
        $stmt->bindParam(':id_iva', $id_iva);
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

    $app->put('/api/productos/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/productos' post route");
        
        $route = $request->getAttribute('route');
        $id_producto =  $route->getArgument('id');

        $datos = json_decode($request->getBody());
        $nombre_producto =  $datos->nombre_producto;
        $url_producto =  $datos->url_producto;
        $id_iva =  $datos->id_iva;

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "UPDATE productos SET nombre_producto = :nombre_producto, ".
               "url_producto = :url_producto, id_iva = :id_iva WHERE id_producto = :id_producto";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_producto', $nombre_producto);
        $stmt->bindParam(':url_producto', $url_producto);
        $stmt->bindParam(':id_iva', $id_iva);
        $stmt->bindParam(':id_producto', $id_producto);
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

    $app->delete('/api/productos/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/productos' post route");
        
        $route = $request->getAttribute('route');
        $id_producto =  $route->getArgument('id');

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "DELETE FROM productos WHERE id_producto = :id_producto";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':id_producto', $id_producto);
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
