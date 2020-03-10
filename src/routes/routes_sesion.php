<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
use \Firebase\JWT\JWT;

return function (App $app) {
    $container = $app->getContainer();

    $app->get('/api/sesion/validar', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/sesion/validar' route");
        $key = "clave_segura";
        $jwt = $request->getHeader("Authorization")[0];
        error_log($jwt);
        $code = 404;
        $data = array('ok' => false, 'token' => '');
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
                $data = array('ok' => true, 'token' => $token);
                $code = 200;
            } catch (\Exception $e) { // Also tried JwtException
                error_log($e);
            }
        }
        return $response->withHeader('Access-Control-Allow-Origin', '*')
                        ->withJson($data, $code);
    });
};
