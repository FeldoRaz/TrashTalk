<?php
// insert.php - menerima POST dari ESP32 (contoh aman)
// Harap set API_KEY di environment (recommended) atau ubah $EXPECTED_API_KEY di bawah.

header('Content-Type: application/json; charset=UTF-8');
// Batasi origin bila memungkinkan. Ganti dengan domain Anda untuk produksi.
$allowed_origin = getenv('ALLOWED_ORIGIN') !== false ? getenv('ALLOWED_ORIGIN') : 'https://nyampah-in.my.id';
header('Access-Control-Allow-Origin: ' . $allowed_origin);

include_once __DIR__ . '/db.php';

// API key check
$EXPECTED_API_KEY = getenv('API_KEY') !== false ? getenv('API_KEY') : 'change-this-default-api-key';
$headers = function_exists('getallheaders') ? getallheaders() : [];
$provided_key = null;
if (isset($headers['X-API-KEY'])) $provided_key = $headers['X-API-KEY'];
if (isset($_POST['api_key'])) $provided_key = $_POST['api_key'];

if (!$provided_key || !hash_equals($EXPECTED_API_KEY, $provided_key)) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Unauthorized"]);
    exit;
}

// Required params
if (!isset($_POST['device']) || !isset($_POST['volume']) || !isset($_POST['latitude']) || !isset($_POST['longitude'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Data tidak lengkap (dibutuhkan: device, volume, latitude, longitude)"]);
    exit;
}

// Sanitasi / cast
$device = substr(trim($_POST['device']), 0, 50); // batas panjang sesuai skema DB
$volume = (float) $_POST['volume'];
$latitude = (float) $_POST['latitude'];
$longitude = (float) $_POST['longitude'];

// Prepared statement untuk insert
$stmt = $conn->prepare("INSERT INTO data_sampah (device, volume, latitude, longitude, waktu) VALUES (?, ?, ?, ?, NOW())");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Prepare failed"]);
    exit;
}
$stmt->bind_param('sddd', $device, $volume, $latitude, $longitude);
$ok = $stmt->execute();

if ($ok) {
    echo json_encode(["status" => "success", "message" => "Data berhasil disimpan", "id" => $stmt->insert_id]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Gagal menyimpan data"]);
}

$stmt->close();
$conn->close();
?>