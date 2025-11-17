<?php
// db.php (contoh aman)
// Cara pakai: simpan file ini di public_html/api/db.php atau di folder yang sesuai.
// Sangat direkomendasikan: letakkan kredensial DB di file di luar webroot seperti
// /home/username/.db_config.php dan require() file tersebut dari sini.
// Anda juga bisa mengatur environment variables di cPanel dan membacanya lewat getenv().

// --- Konfigurasi: prefer environment variables ---
$DB_HOST = getenv('DB_HOST') !== false ? getenv('DB_HOST') : 'localhost';
$DB_USER = getenv('DB_USER') !== false ? getenv('DB_USER') : 'iycoikah_trashtalk';
$DB_PASS = getenv('DB_PASS') !== false ? getenv('DB_PASS') : 'MagetanKota#11';
$DB_NAME = getenv('DB_NAME') !== false ? getenv('DB_NAME') : 'iycoikah_trashtalk';

// Jika Anda lebih suka memakai file konfigurasi di luar webroot,
// buat file .db_config.php di folder home Anda dan un-comment baris ini:
// require_once __DIR__ . '/../../.db_config.php';

// Koneksi MySQLi
$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ($conn->connect_error) {
    // Tidak menampilkan error DB ke klien agar tidak bocor informasi
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit;
}

// Set charset
$conn->set_charset('utf8mb4');
?>