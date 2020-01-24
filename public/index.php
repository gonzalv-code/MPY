<?php
if (PHP_SAPI == 'cli-server') {
    // To help the built-in PHP dev server, check if the request was actually for
    // something which should probably be served as a static file
    $url  = parse_url($_SERVER['REQUEST_URI']);
    $file = __DIR__ . $url['path'];
    if (is_file($file)) {
        return false;
    }
}

require __DIR__ . '/../vendor/autoload.php';

session_start();

// Instantiate the app
$settings = require __DIR__ . '/../src/settings.php';
$app = new \Slim\App($settings);

// Set up dependencies
$dependencies = require __DIR__ . '/../src/dependencies.php';
$dependencies($app);

// Register middleware
$middleware = require __DIR__ . '/../src/middleware.php';
$middleware($app);

// Register routes
$routes = require __DIR__ . '/../src/routes/routes.php';
$routes_usuarios = require __DIR__ . '/../src/routes/routes_usuarios.php';
$routes_perfiles = require __DIR__ . '/../src/routes/routes_perfiles.php';
$routes_formularios = require __DIR__ . '/../src/routes/routes_formularios.php';
$routes_menus = require __DIR__ . '/../src/routes/routes_menus.php';
$routes_ventas_cabeceras = require __DIR__ . '/../src/routes/routes_ventas_cabeceras.php';
$routes_clientes = require __DIR__ . '/../src/routes/routes_clientes.php';

$routes($app);
$routes_usuarios($app);
$routes_perfiles($app);
$routes_formularios($app);
$routes_menus($app);
$routes_ventas_cabeceras($app);
$routes_clientes($app);

// Run app
$app->run();
