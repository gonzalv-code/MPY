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

    $app->get('/api/usuarios/{id}', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $route = $request->getAttribute('route');
        $id_usuario =  $route->getArgument('id');

        error_log("---> ".$id_usuario);

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM usuarios u ".
               "LEFT JOIN perfiles p ON u.id_perfil = c.id_perfil ".
               "LEFT JOIN funcionarios f ON u.id_funcionario = f.id_funcionario ".
               "LEFT JOIN sucursales s ON u.id_sucursal = s.id_sucursal ".
               "WHERE id_usuario = :id_usuario";
        $stmt = $pgsql->prepare($sql); 
        $stmt->bindParam(':id_usuario', $id_usuario); 
        
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

    $app->get('/api/usuarios', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM usuarios u ".
               "LEFT JOIN perfiles p ON u.id_perfil = c.id_perfil ".
               "LEFT JOIN funcionarios f ON u.id_funcionario = f.id_funcionario ".
               "LEFT JOIN sucursales s ON u.id_sucursal = s.id_sucursal ";
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

    $app->post('/api/usuarios', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/usuarios' post route");
        $datos = json_decode($request->getBody());
        $login_usuario =  $datos->login_usuario;
        $id_perfil =  $datos->id_perfil;
        $clave_usuario =  $datos->clave_usuario;
        $estado_usuario =  $datos->estado_usuario;
        $id_funcionario =  $datos->id_funcionario;
        $id_sucursal =  $datos->id_sucursal;
        $id_usuario =  $datos->id_usuario;
        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "INSERT INTO usuarios(login_usuario, id_perfil, clave_usuario, estado_usuario, id_funcionario, id_sucursal, id_usuario) VALUES(:login_usuario, :id_perfil, :clave_usuario, :estado_usuario, :id_funcionario, :id_sucursal, :id_usuario)";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':login_usuario', $login_usuario);
        $stmt->bindParam(':id_perfil', $id_perfil);
        $stmt->bindParam(':clave_usuario', $clave_usuario);
        $stmt->bindParam(':estado_usuario', $estado_usuario);
        $stmt->bindParam(':id_funcionario', $id_funcionario);
        $stmt->bindParam(':id_sucursal', $id_sucursal);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $data = array('agregado' => true);
        try {
            $pgsql->beginTransaction();
            $stmt->execute();
            $pgsql->commit();
        }catch (Exception $e){
            error_log($e);
            $pgsql->rollback();
            $data = array('agregado' => false);
        }
        return $response->withHeader('Access-Control-Allow-Origin', '*')
                        ->withJson($data, 200);
    });

    $app->put('/api/usuarios/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/ventas' post route");
        
        $route = $request->getAttribute('route');
        $id_usuario =  $route->getArgument('id');

        $datos = json_decode($request->getBody());
        $login_usuario =  $datos->login_usuario;
        $id_perfil =  $datos->id_perfil;
        $clave_usuario =  $datos->clave_usuario;
        $estado_usuario =  $datos->estado_usuario;
        $id_funcionario =  $datos->id_funcionario;
        $id_sucursal =  $datos->id_sucursal;

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "UPDATE usuarios SET login_usuario = :login_usuario, ".
               "id_perfil = :id_perfil, clave_usuario = :clave_usuario, estado_usuario = :estado_usuario, id_funcionario = :id_funcionario, id_sucursal = :id_sucursal WHERE id_usuario = :id_usuario";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':login_usuario', $login_usuario);
        $stmt->bindParam(':id_perfil', $id_perfil);
        $stmt->bindParam(':clave_usuario', $clave_usuario);
        $stmt->bindParam(':estado_usuario', $estado_usuario);
        $stmt->bindParam(':id_funcionario', $id_funcionario);
        $stmt->bindParam(':id_sucursal', $id_sucursal);
        $stmt->bindParam(':id_usuario', $id_usuario);
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

    $app->delete('/api/usuarios/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/ventas' post route");
        
        $route = $request->getAttribute('route');
        $id_usuario =  $route->getArgument('id');

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "DELETE FROM usuarios WHERE id_usuario = :id_usuario";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':id_usuario', $id_usuario);
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

    $app->get('/api/usuarios/imprimir/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/usuarios/imprimir/{id}' post route");
        
        $response = $this->response->withHeader( 'Content-type', 'application/pdf' );
        include ('../../php/contract/pdf.php');
        $content = $pdf->toString();
        $response->write($content);

        return $response->withHeader('Access-Control-Allow-Origin', '*')
                        ->withJson($data, 200);
    });

};
