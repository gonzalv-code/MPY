<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
use \Firebase\JWT\JWT;
require_once __DIR__ .'./../Conexion.php';

return function (App $app) {
    $container = $app->getContainer();

    $app->get('/api/marcas/permisos', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/marcas/permisos' route");
        $route = $request->getAttribute('route');
        $id_formulario = 1;
        $key = "clave_segura";
        $jwt = $request->getHeader("Authorization")[0];
        error_log($jwt);
        $code = 404;
        $data = array('ok' => false, 'token' => '', 'permiso' => '');
        if (!empty($jwt)) {
            try {
                $decoded = JWT::decode($jwt, $key, array('HS256'));
                $payload = array(
                    "iss" => "WEB",
                    "aud" => "WEB",
                    "usuario" => $decoded->usuario,
                    "iat" => round(microtime(true)),
                    "nbf" => round(microtime(true)),
                    "exp" => round(microtime(true) + 300)
                );
                $token = JWT::encode($payload, $key);
                $conexion = new Conexion();
                $pgsql  =  $conexion->conectar();
                $sql = "SELECT * FROM permisos p ".
                    "LEFT JOIN perfiles pe ON p.id_perfil = pe.id_perfil ".
                    "LEFT JOIN formularios f ON p.id_formulario = f.id_formulario ".
                    "LEFT JOIN menus m ON f.id_menu = m.id_menu ".
                    "WHERE p.id_formulario = :id_formulario AND p.id_perfil = :id_perfil";
                $stmt = $pgsql->prepare($sql);
                $stmt->bindParam(':id_formulario', $id_formulario);
                $stmt->bindParam(':id_perfil', $decoded->usuario->id_perfil);
                $permisos = '';
                if ($stmt->execute()) { 
                    $permisos = $stmt->fetchAll(PDO::FETCH_OBJ);
                }
                $conexion->cerrar($pgsql);
                $code = 404;
                if(sizeof($permisos) > 0){
                    $code = 200;
                }
                $data = array('ok' => true, 'token' => $token, 'permisos' => $permisos);
                $code = 200;
            } catch (\Exception $e) { // Also tried JwtException
                error_log($e);
            }
        }
        return $response->withHeader('Access-Control-Allow-Origin', '*')
                        ->withJson($data, $code);
    });

    $app->get('/api/marcas/{id}', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $route = $request->getAttribute('route');
        $id_marca =  $route->getArgument('id');

        error_log("---> ".$id_marca);
        $id_formulario = 1;
        $agregar_permiso = true;
        $key = "clave_segura";
        $jwt = $request->getHeader("Authorization")[0];
        error_log($jwt);
        $code = 404;
        $data = array('ok' => false, 'token' => '', 'permiso' => '');
        if (!empty($jwt)) {
            try {
                $decoded = JWT::decode($jwt, $key, array('HS256'));
                $payload = array(
                    "iss" => "WEB",
                    "aud" => "WEB",
                    "usuario" => $decoded->usuario,
                    "iat" => round(microtime(true)),
                    "nbf" => round(microtime(true)),
                    "exp" => round(microtime(true) + 300)
                );
                $token = JWT::encode($payload, $key);
                $conexion = new Conexion();
                $pgsql  =  $conexion->conectar();
                $sql = "SELECT * FROM permisos p ".
                    "LEFT JOIN perfiles pe ON p.id_perfil = pe.id_perfil ".
                    "LEFT JOIN formularios f ON p.id_formulario = f.id_formulario ".
                    "LEFT JOIN menus m ON f.id_menu = m.id_menu ".
                    "WHERE p.id_formulario = :id_formulario AND p.id_perfil = :id_perfil"; //AND agregar_permiso = :agregar_permiso
                $stmt = $pgsql->prepare($sql);
                $stmt->bindParam(':id_formulario', $id_formulario);
                $stmt->bindParam(':id_perfil', $decoded->usuario->id_perfil);
                //$stmt->bindParam(':agregar_permiso', $agregar_permiso);
                $permiso = '';
                if ($stmt->execute()) { 
                    $permiso = $stmt->fetchAll(PDO::FETCH_OBJ);
                }
                if(sizeof($permiso) > 0){
                    $sql = "SELECT * FROM marcas ".
                        "WHERE id_marca = :id_marca";
                    $stmt = $pgsql->prepare($sql); 
                    $stmt->bindParam(':id_marca', $id_marca); 
                    $marca = "";
                    if ($stmt->execute()) { 
                        $marca = $stmt->fetchAll(PDO::FETCH_OBJ);
                    }
                    if(sizeof($marca) > 0){
                        $code = 200;
                    }
                    $data = array('ok' => true, 'token' => $token, 'marca' => $marca);
                    $conexion->cerrar($pgsql);
                }
            } catch (\Exception $e) { // Also tried JwtException
                error_log($e);
            }
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
