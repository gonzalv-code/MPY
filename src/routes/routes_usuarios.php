<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
require_once __DIR__ .'./../Conexion.php';

return function (App $app) {
    $container = $app->getContainer();

$app->post('/api/usuarios/login', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");
        $datos = json_decode($request->getBody());
        $login_usuario =  $datos->login_usuario;
        $clave_usuario = $datos->clave_usuario;
        $estado_usuario = "A";
        error_log("---> ".$login_usuario);
        error_log("---> ".$clave_usuario);
        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM usuarios ".
               "WHERE login_usuario = :login_usuario AND clave_usuario = :clave_usuario AND estado_usuario = :estado_usuario";
        $stmt = $pgsql->prepare($sql); 
        $stmt->bindParam(':login_usuario', $login_usuario); 
        $stmt->bindParam(':clave_usuario', $clave_usuario);
        $stmt->bindParam(':estado_usuario', $estado_usuario);
        
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
};