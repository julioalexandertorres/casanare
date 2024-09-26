<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$query = $input['query'];

// Conexión a la base de datos
$host = "35.202.245.48";
$port = "5432";  // Puerto por defecto de PostgreSQL
$dbname = "casanare";
$user = "postgres";
$password = "buenaventura2023";

$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

if (!$conn) {
    echo json_encode(['success' => false, 'error' => 'Connection failed: ' . pg_last_error()]);
    exit;
}

$result = pg_query($conn, $query);

if ($result) {
    $rows = [];
    while ($row = pg_fetch_assoc($result)) {
        $rows[] = $row;
    }
    echo json_encode(['success' => true, 'result' => $rows]);
} else {
    echo json_encode(['success' => false, 'error' => 'Error: ' . pg_last_error()]);
}

pg_close($conn);
?>
