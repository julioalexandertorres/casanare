<?php
require 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$key = "tu_clave_secreta";
$headers = getallheaders();

if (isset($headers['Authorization'])) {
    $jwt = substr($headers['Authorization'], 7); // Quita "Bearer " del inicio
    try {
        $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
        // Token es válido, devuelve datos protegidos
        echo json_encode(["message" => "Acceso concedido", "data" => "Información secreta"]);
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(["message" => "Acceso denegado", "error" => $e->getMessage()]);
    }
} else {
    http_response_code(401);
    echo json_encode(["message" => "Token no proporcionado"]);
}