<?php
// read.php - ambil data (mis. untuk dashboard atau debugging)
// metode: GET

header('Content-Type: application/json; charset=UTF-8');
$allowed_origin = getenv('ALLOWED_ORIGIN') !== false ? getenv('ALLOWED_ORIGIN') : 'https://nyampah-in.my.id';
header('Access-Control-Allow-Origin: ' . $allowed_origin);

include_once __DIR__ . '/db.php';

// Simple optional filtering: ?device=T01&limit=20
$device_filter = isset($_GET['device']) ? trim($_GET['device']) : null;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 20;
if ($limit <= 0 || $limit > 100) $limit = 20; // batas agar tidak overload

if ($device_filter) {
    $stmt = $conn->prepare("SELECT id, device, volume, latitude, longitude, waktu FROM data_sampah WHERE device = ? ORDER BY waktu DESC LIMIT ?");
    $stmt->bind_param('si', $device_filter, $limit);
} else {
    $stmt = $conn->prepare("SELECT id, device, volume, latitude, longitude, waktu FROM data_sampah ORDER BY waktu DESC LIMIT ?");
    $stmt->bind_param('i', $limit);
}

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Gagal mengeksekusi query"]);
    exit;
}

$res = $stmt->get_result();
$data = [];
while ($row = $res->fetch_assoc()) {
    // Cast numeric fields to proper types so JSON contains numbers, not strings
    $row['id'] = isset($row['id']) ? (int)$row['id'] : null;
    $row['volume'] = isset($row['volume']) ? (float)$row['volume'] : null;
    $row['latitude'] = isset($row['latitude']) ? (float)$row['latitude'] : null;
    $row['longitude'] = isset($row['longitude']) ? (float)$row['longitude'] : null;
    $data[] = $row;
}

echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

$stmt->close();
$conn->close();
?>