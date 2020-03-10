<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
use \Firebase\JWT\JWT;
require_once __DIR__ .'./../Conexion.php';

return function (App $app) {
    $container = $app->getContainer();

    $app->get('/api/permisos', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");
        $route = $request->getAttribute('route');
        $key = "clave_segura";
        $jwt = $request->getHeader("Authorization")[0];
        error_log($jwt);
        $code = 404;
        $data = array('ok' => false, 'token' => '', 'permisos' => '');
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
                    "WHERE p.id_perfil = :id_perfil ORDER BY f.id_menu, f.id_formulario ASC";
                $stmt = $pgsql->prepare($sql); 
                error_log($decoded->usuario->id_perfil);
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
};
