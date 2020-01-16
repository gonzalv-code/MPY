<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
require_once __DIR__ .'./Conexion.php';

return function (App $app) {
    $container = $app->getContainer();

    $app->get('/', function (Request $request, Response $response, array $args) use ($container) {
        // Sample log message
        $container->get('logger')->info("Slim-Skeleton '/' route");

        // Render index view
        return $container->get('renderer')->render($response, 'index.phtml', $args);
    });

    $app->get('/admin', function (Request $request, Response $response, array $args) use ($container) {
        // Sample log message
        $container->get('logger')->info("Slim-Skeleton '/admin' route");

        // Render index view
        return $container->get('renderer')->render($response, 'admin.phtml', $args);
    });

    $app->get('/menu', function (Request $request, Response $response, array $args) use ($container) {
        // Sample log message
        $container->get('logger')->info("Slim-Skeleton '/menu' route");

        // Render index view
        return $container->get('renderer')->render($response, 'menu.phtml', $args);
    });
        // Conectar a la bd
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
        // Conectar a la tabla Perfiles
    $app->get('/api/perfiles/{id}', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $route = $request->getAttribute('route');
        $id_perfil =  $route->getArgument('id');

        error_log("---> ".$id_perfil);

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM perfiles ".
               "WHERE id_perfil = :id_perfil";
        $stmt = $pgsql->prepare($sql); 
        $stmt->bindParam(':id_perfil', $id_perfil); 
        
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
        // Agregar dato a la bd
    $app->post('/api/perfiles', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/perfiles' post route");
        $datos = json_decode($request->getBody());
        $nombre_perfil =  $datos->nombre_perfil;
        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "INSERT INTO perfiles(nombre_perfil) VALUES(:nombre_perfil)";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_perfil', $nombre_perfil);
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
        // Modificar dato de la bd
    $app->put('/api/perfiles/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/perfiles' post route");
        
        $route = $request->getAttribute('route');
        $id_perfil =  $route->getArgument('id');

        $datos = json_decode($request->getBody());
        $nombre_perfil =  $datos->nombre_perfil;

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "UPDATE perfiles SET nombre_perfil = :nombre_perfil WHERE id_perfil = :id_perfil";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_perfil', $nombre_perfil);
        $stmt->bindParam(':id_perfil', $id_perfil);
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
        // Eliminar dato de la bd
    $app->delete('/api/perfiles/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/perfiles' post route");
        
        $route = $request->getAttribute('route');
        $id_perfil =  $route->getArgument('id');

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "DELETE FROM perfiles WHERE id_perfil = :id_perfil";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':id_perfil', $id_perfil);
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


      // Conectar a la tabla Sucursales //
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
        // Agregar dato a la bd
    $app->post('/api/sucursales', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/sucursales' post route");
        $datos = json_decode($request->getBody());
        $nombre_sucursal =  $datos->nombre_sucursal;
        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "INSERT INTO sucursales(nombre_sucursal) VALUES(:nombre_sucursal)";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_sucursal', $nombre_sucursal);
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
        // Modificar dato de la bd
    $app->put('/api/sucursales/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/sucursales' post route");
        
        $route = $request->getAttribute('route');
        $id_sucursal =  $route->getArgument('id');

        $datos = json_decode($request->getBody());
        $nombre_sucursal =  $datos->nombre_sucursal;

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "UPDATE sucursales SET nombre_sucursal = :nombre_sucursal WHERE id_sucursal = :id_sucursal";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_sucursal', $nombre_sucursal);
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
        // Eliminar dato de la bd
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

    /// Conectar a la tabla Funcionarios ///
    $app->get('/api/funcionarios/{id}', function (Request $request, Response $response, array $args) use ($container) {
        $container->get('logger')->info("Slim-Skeleton '/api/usuarioss/login' route");

        $route = $request->getAttribute('route');
        $id_funcionario =  $route->getArgument('id');

        error_log("---> ".$id_funcionario);

        $conexion = new Conexion();
        
        $pgsql  =  $conexion->conectar();

        $sql = "SELECT * FROM funcionarios ".
               "WHERE id_funcionario = :id_funcionario";
        $stmt = $pgsql->prepare($sql); 
        $stmt->bindParam(':id_funcionario', $id_funcionario); 
        
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
        // Agregar dato a la bd
    $app->post('/api/funcionarios', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/funcionarios' post route");
        $datos = json_decode($request->getBody());
        $nombre_funcionario =  $datos->nombre_funcionario;
        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "INSERT INTO funcionarios(nombre_funcionario) VALUES(:nombre_funcionario)";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_funcionario', $nombre_funcionario);
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
        // Modificar dato de la bd
    $app->put('/api/funcionarios/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/funcionarios' post route");
        
        $route = $request->getAttribute('route');
        $id_funcionario =  $route->getArgument('id');

        $datos = json_decode($request->getBody());
        $nombre_funcionario =  $datos->nombre_funcionario;

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "UPDATE funcionarios SET nombre_funcionario = :nombre_funcionario WHERE id_funcionario = :id_funcionario";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':nombre_funcionario', $nombre_funcionario);
        $stmt->bindParam(':id_funcionario', $id_funcionario);
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
        // Eliminar dato de la bd
    $app->delete('/api/funcionarios/{id}', function (Request $request, Response $response, array $args) {
        $this->logger->info("Slim-Skeleton '/api/funcionarios' post route");
        
        $route = $request->getAttribute('route');
        $id_funcionario =  $route->getArgument('id');

        $conexion = new Conexion();
        $pgsql  =  $conexion->conectar();
        $sql = "DELETE FROM funcionarios WHERE id_funcionario = :id_funcionario";
        $stmt = $pgsql->prepare($sql);
        $stmt->bindParam(':id_funcionario', $id_funcionario);
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