<?php
require_once 'vendor/autoload.php';
use Firebase\JWT\JWT;

/*header("Access-Control-Allow-Origin: *"); // Permite todos los dominios. Ajusta esto para mayor seguridad en producción.
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");*/

header("Content-Type: application/json");

ini_set('display_errors', 0);
error_reporting(E_ALL);
ini_set('log_errors', '1');


// La clave secreta para JWT
$key = "jwtwebgis88888888";

// Lee los datos JSON enviados a través de POST
$data = json_decode(file_get_contents("php://input"), true);

// Verifica si los datos están presentes
$rol = "";

date_default_timezone_set('America/Bogota');
$fecha = date('Y-m-d H:i:s');

if (isset($data['username']) && isset($data['password'])) {
    $username = $data['username'];
    $password = $data['password'];

    if (usuarioYContrasenaSonValidos($username, $password, $rol)) {
        $payload = [
            'iat' => time(),
            'exp' => time() + 600, // 10 minutos después
            'sub' => $username,
            'rol' => $rol,
            'fecha' => $fecha
        ];

        $jwt = JWT::encode($payload, $key, 'HS256');
        echo json_encode(['token' => $jwt]);
    } else {
        http_response_code(401);
        echo json_encode(["error" => "Login incorrecto"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "Datos incorrectos o incompletos"]);
}

function usuarioYContrasenaSonValidos($username, $password, &$rol) {
    $host = '35.202.245.48'; // Asegúrate de que esta dirección sea accesible
    $db = 'buenaventura';
    $user = 'postgres';
    $pass = 'buenaventura2023';
    $charset = 'utf8';

    $dsn = "pgsql:host=$host;dbname=$db;user=$user;password=$pass";

    try {
        $pdo = new PDO($dsn);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare("SELECT usuario, tipo, contrasena FROM usuario WHERE usuario = :username");
        $stmt->execute([':username' => $username]);

        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($user && password_verify($password, $user['contrasena'])) {
            $rol = $user['tipo'];  // Asigna el valor de 'tipo' a la variable $rol
            return true;
        }
        return false;
    } catch (PDOException $e) {
        error_log("Error de conexión a la base de datos: " . $e->getMessage());
        return false;
    }
}

?>