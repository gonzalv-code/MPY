<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
require_once __DIR__ .'./../Conexion.php';

return function (App $app) {
    $container = $app->getContainer();

    $app->get('/api/clientes/{id}', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/clientes/login' route");

        $route = $request->getAttribute('route');
        $id_cliente =  $route->getArgument('id');

        error_log("---> ".$id_cliente);

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM clientes ".
               "WHERE id_cliente = :id_cliente";
        $stmt = $pgsql->prepare($sql); 
        $stmt->bindParam(':id_cliente', $id_cliente); 
        
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

    $app->get('/api/clientes', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/clientes/login' route");

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM clientes";
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

    $app->post('/api/clientes', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/clientes' post route");
        $datos = json_decode($request->getBody());
        $nombre_cliente =  $datos->nombre_cliente;
        $ruc_cliente =  $datos->ruc_cliente;
        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "INSERT INTO clientes(nombre_cliente, ruc_cliente) VALUES(:nombre_cliente, :ruc_cliente)";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_cliente', $nombre_cliente);
        $stmt->bindParam(':ruc_cliente', $ruc_cliente);
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

    $app->put('/api/clientes/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/clientes' post route");
        
        $route = $request->getAttribute('route');
        $id_cliente =  $route->getArgument('id');

        $datos = json_decode($request->getBody());
        $nombre_cliente =  $datos->nombre_cliente;
        $ruc_cliente =  $datos->ruc_cliente;

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "UPDATE clientes SET nombre_cliente = :nombre_cliente, ruc_cliente = :ruc_cliente WHERE id_cliente = :id_cliente";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_cliente', $nombre_cliente);
        $stmt->bindParam(':ruc_cliente', $ruc_cliente);
        $stmt->bindParam(':id_cliente', $id_cliente);
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

    $app->delete('/api/clientes/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/clientes' post route");
        
        $route = $request->getAttribute('route');
        $id_cliente =  $route->getArgument('id');

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "DELETE FROM clientes WHERE id_cliente = :id_cliente";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':id_cliente', $id_cliente);
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
