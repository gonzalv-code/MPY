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
$routes_cargos = require __DIR__ . '/../src/routes/routes_cargos.php';
$routes_formularios = require __DIR__ . '/../src/routes/routes_formularios.php';
$routes_menus = require __DIR__ . '/../src/routes/routes_menus.php';
$routes_clientes = require __DIR__ . '/../src/routes/routes_clientes.php';
$routes_ciudades = require __DIR__ . '/../src/routes/routes_ciudades.php';
$routes_entidades = require __DIR__ . '/../src/routes/routes_entidades.php';
$routes_estados_civiles = require __DIR__ . '/../src/routes/routes_estados_civiles.php';
$routes_ivas = require __DIR__ . '/../src/routes/routes_ivas.php';
$routes_nacionalidades = require __DIR__ . '/../src/routes/routes_nacionalidades.php';
$routes_marcas = require __DIR__ . '/../src/routes/routes_marcas.php';
$routes_productos = require __DIR__ . '/../src/routes/routes_productos.php';
$routes_sucursales = require __DIR__ . '/../src/routes/routes_sucursales.php';
$routes_tarjetas = require __DIR__ . '/../src/routes/routes_tarjetas.php';
$routes_ventas_cabeceras = require __DIR__ . '/../src/routes/routes_ventas_cabeceras.php';
$routes_ventas_detalles = require __DIR__ . '/../src/routes/routes_ventas_detalles.php';
$routes_compras_cabeceras = require __DIR__ . '/../src/routes/routes_compras_cabeceras.php';
$routes_compras_detalles = require __DIR__ . '/../src/routes/routes_compras_detalles.php';

$routes($app);
$routes_usuarios($app);
$routes_perfiles($app);
$routes_cargos($app);
$routes_formularios($app);
$routes_menus($app);
$routes_ciudades($app);
$routes_clientes($app);
$routes_entidades($app);
$routes_estados_civiles($app);
$routes_ivas($app);
$routes_nacionalidades($app);
$routes_marcas($app);
$routes_productos($app);
$routes_tarjetas($app);

$routes_sucursales($app);
$routes_ventas_cabeceras($app);
$routes_compras_cabeceras($app);
$routes_ventas_detalles($app);
$routes_compras_detalles($app);

// Run app
$app->run();
