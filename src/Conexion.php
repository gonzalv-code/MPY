<?php
// Plano -> Fabrica para fabricar -> auto
// Clase -> Instanciacion         -> objeto
class Conexion{
    // Propiedades o Atributos
    private $SERVIDOR = "localhost";
    private $PORT = 5432;
    private $USUARIO  = "postgres";
    private $CLAVE = "123";
    private $BASEDATOS = "micropy";
    // Metodos o funciones
    public function conectar(){
        // tratamiento de errores (excepciones)
        try{ // intentar 
            $string_conexion = "pgsql:host=".$this->SERVIDOR.
                                    ";port=".$this->PORT.";dbname=".$this->BASEDATOS;
            $conexion = new PDO($string_conexion, $this->USUARIO, $this->CLAVE, 
                                array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
            return $conexion;
        } catch (PDOException $e) { // capturar
            error_log($e);
            return null;
        }
    }
    // Cerrar
    public function cerrar($conexion){
        $conexion = null;
    }
}