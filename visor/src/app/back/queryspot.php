<?php
header('Content-Type: application/json');

// Configuración de la base de datos
$host = '35.202.245.48';
$dbname = 'buenaventura';
$user = 'postgres';
$password = 'buenaventura2023';

// Conexión a la base de datos
try {
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Connection failed: ' . $e->getMessage()]);
    exit();
}

// Obtener la consulta SQL del cuerpo de la solicitud
$data = json_decode(file_get_contents('php://input'), true);
$query = $data['query'];

try {
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'result' => $result]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Query failed: ' . $e->getMessage(), 'query' => $query]);
}
?>