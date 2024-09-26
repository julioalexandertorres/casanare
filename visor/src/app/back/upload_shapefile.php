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

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['shapefile'])) {
    $tableName = $_POST['tableName'];
    $fileTmpPath = $_FILES['shapefile']['tmp_name'];
    $extractPath = '/tmp/' . uniqid() . '/';

    if (!mkdir($extractPath, 0777, true)) {
        echo json_encode(['success' => false, 'message' => 'Failed to create extraction directory.']);
        exit();
    }

    // Extract the ZIP file
    $zip = new ZipArchive();
    if ($zip->open($fileTmpPath) === TRUE) {
        $zip->extractTo($extractPath);
        $zip->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to extract ZIP file.']);
        exit();
    }

    // Find .shp and .dbf files
    $shpFile = null;
    $dbfFile = null;
    foreach (glob($extractPath . '*') as $file) {
        if (pathinfo($file, PATHINFO_EXTENSION) === 'shp') {
            $shpFile = $file;
        }
        if (pathinfo($file, PATHINFO_EXTENSION) === 'dbf') {
            $dbfFile = $file;
        }
    }

    if (!$shpFile || !$dbfFile) {
        echo json_encode(['success' => false, 'message' => 'Shapefile or DBF file not found in the ZIP archive.']);
        exit();
    }

    // Process shapefile using shp2pgsql and psql
    $shp2pgsql = "shp2pgsql -I -s 4326 -g geom $shpFile $tableName";
    $psql = "psql -h $host -d $dbname -U $user";

    $output = [];
    $return_var = 0;
    exec("$shp2pgsql | $psql 2>&1", $output, $return_var);

    if ($return_var !== 0) {
        echo json_encode(['success' => false, 'message' => 'Failed to import shapefile to database.', 'error' => implode("\n", $output)]);
        exit();
    }

    echo json_encode(['success' => true, 'message' => 'Shapefile uploaded and processed successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
}
?>


