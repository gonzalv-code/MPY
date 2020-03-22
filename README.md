# Slim Framework 3 Skeleton Application

Use this skeleton application to quickly setup and start working on a new Slim Framework 3 application. This application uses the latest Slim 3 with the PHP-View template renderer. It also uses the Monolog logger.

This skeleton application was built for Composer. This makes setting up a new Slim Framework application quick and easy.

## Install the Application

Run this command from the directory in which you want to install your new Slim Framework application.

    php composer.phar create-project slim/slim-skeleton [my-app-name]

Replace `[my-app-name]` with the desired directory name for your new application. You'll want to:

* Point your virtual host document root to your new application's `public/` directory.
* Ensure `logs/` is web writeable.

To run the application in development, you can run these commands 

	cd [my-app-name]
	php composer.phar start
	
Or you can use `docker-compose` to run the app with `docker`, so you can run these commands:

         cd [my-app-name]
	 docker-compose up -d
After that, open `http://0.0.0.0:8080` in your browser.

Run this command in the application directory to run the test suite

	php composer.phar test

That's it! Now go build something cool.

## Instalaciones
1. Instalar xampp
2. Instalar composer: https://getcomposer.org/download/
3. Crear la carpeta para tu proyecto
4. Ejecutar en la terminal dentro de la carpeta de tu proyecto: composer create-project slim/slim-skeleton:3.1.8 micropy
5. Bajar bootstrap: https://getbootstrap.com/
6. Bajar jquery: https://jquery.com/
7. Bajar fontawesome: https://fontawesome.com/
8. Bajar https://github.com/daneden/animate.css

## Materiales
1. Bootstrap: https://www.youtube.com/watch?v=8nEDw7gGLYM&list=PLPl81lqbj-4IcaAluUlCTmbYz0h9XQ8U1
2. GitHub: https://www.youtube.com/watch?v=zH3I1DZNovk&list=PL9xYXqvLX2kMUrXTvDY6GI2hgacfy0rId
3. Slim: https://www.youtube.com/watch?v=iLRjbGC6jIs&t=1368s

## CLASE 13/03/2020
1. Modal de ayuda agregado en el menú (agregado estilos en admin.css, la función load en generar_menu() a fin de cargar el contenido de ayuda/index_menu.html en el modal, agregado también carpeta de ayuda en img y subcarpetas pertinentes, y en el template menu.phtml para el modal), items de la ayuda agregados de acuerdo al menú, los que no presentan imagen deben de terminarse, tanto los formularios como la ayuda. 4 horas reloj.