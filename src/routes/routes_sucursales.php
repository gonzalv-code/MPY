<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
require_once __DIR__ .'./../Conexion.php';

return function (App $app) {
    $container = $app->getContainer();

    $app->get('/api/sucursales/{id}', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $route = $request->getAttribute('route');
        $id_sucursal =  $route->getArgument('id');

        error_log("---> ".$id_sucursal);

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM sucursales ".
               "WHERE id_sucursal = :id_sucursal";
        $stmt = $pgsql->prepare($sql); 
        $stmt->bindParam(':id_sucursal', $id_sucursal); 
        
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

    $app->get('/api/sucursales', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM sucursales";
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

    $app->post('/api/sucursales', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/sucursales' post route");
        $datos = json_decode($request->getBody());
        $nombre_sucursal =  $datos->nombre_sucursal;
        $direccion_sucursal =  $datos->direccion_sucursal;
        $telefono_sucursal =  $datos->telefono_sucursal;
        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "INSERT INTO sucursales(nombre_sucursal, direccion_sucursal, telefono_sucursal)
                            VALUES(:nombre_sucursal, :direccion_sucursal, :telefono_sucursal)";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_sucursal', $nombre_sucursal);
        $stmt->bindParam(':direccion_sucursal', $direccion_sucursal);
        $stmt->bindParam(':telefono_sucursal', $telefono_sucursal);
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

    $app->put('/api/sucursales/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/sucursales' post route");
        
        $route = $request->getAttribute('route');
        $id_sucursal =  $route->getArgument('id');

        $datos = json_decode($request->getBody());
        $nombre_sucursal =  $datos->nombre_sucursal;
        $direccion_sucursal =  $datos->direccion_sucursal;
        $telefono_sucursal =  $datos->telefono_sucursal;

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "UPDATE sucursales SET nombre_sucursal = :nombre_sucursal, direccion_sucursal = :direccion_sucursal, telefono_sucursal = :telefono_sucursal "."
        WHERE id_sucursal = :id_sucursal";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_sucursal', $nombre_sucursal);
        $stmt->bindParam(':direccion_sucursal', $direccion_sucursal);
        $stmt->bindParam(':telefono_sucursal', $telefono_sucursal);
        $stmt->bindParam(':id_sucursal', $id_sucursal);
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

    $app->delete('/api/sucursales/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/sucursales' post route");
        
        $route = $request->getAttribute('route');
        $id_sucursal =  $route->getArgument('id');

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "DELETE FROM sucursales WHERE id_sucursal = :id_sucursal";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':id_sucursal', $id_sucursal);
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
