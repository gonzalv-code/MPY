<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
require_once __DIR__ .'./../Conexion.php';

return function (App $app) {
    $container = $app->getContainer();

    $app->get('/api/formularios/{id}', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $route = $request->getAttribute('route');
        $id_formulario =  $route->getArgument('id');

        error_log("---> ".$id_formulario);

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM formularios f ".
               "LEFT JOIN menus m ON f.id_menu = m.id_menu ".
               "WHERE id_formulario = :id_formulario";
        $stmt = $pgsql->prepare($sql); 
        $stmt->bindParam(':id_formulario', $id_formulario); 
        
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

    $app->get('/api/formularios', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM formularios f ".
               "LEFT JOIN menus m ON f.id_menu = m.id_menu ";
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

    $app->post('/api/formularios', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/formularios' post route");
        $datos = json_decode($request->getBody());
        $nombre_formulario =  $datos->nombre_formulario;
        $url_formulario =  $datos->url_formulario;
        $id_menu =  $datos->id_menu;
        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "INSERT INTO formularios(nombre_formulario, url_formulario, id_menu) VALUES(:nombre_formulario, :url_formulario, :id_menu)";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_formulario', $nombre_formulario);
        $stmt->bindParam(':url_formulario', $url_formulario);
        $stmt->bindParam(':id_menu', $id_menu);
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

    $app->put('/api/formularios/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/formularios' post route");
        
        $route = $request->getAttribute('route');
        $id_formulario =  $route->getArgument('id');

        $datos = json_decode($request->getBody());
        $nombre_formulario =  $datos->nombre_formulario;
        $url_formulario =  $datos->url_formulario;
        $id_menu =  $datos->id_menu;

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "UPDATE formularios SET nombre_formulario = :nombre_formulario, ".
               "url_formulario = :url_formulario, id_menu = :id_menu WHERE id_formulario = :id_formulario";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_formulario', $nombre_formulario);
        $stmt->bindParam(':url_formulario', $url_formulario);
        $stmt->bindParam(':id_menu', $id_menu);
        $stmt->bindParam(':id_formulario', $id_formulario);
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

    $app->delete('/api/formularios/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/formularios' post route");
        
        $route = $request->getAttribute('route');
        $id_formulario =  $route->getArgument('id');

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "DELETE FROM formularios WHERE id_formulario = :id_formulario";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':id_formulario', $id_formulario);
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
