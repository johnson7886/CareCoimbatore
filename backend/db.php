<?php
$conn = new mysqli("localhost", "root", "", "carecoimbatore", 3306);
if ($conn->connect_error) {
  http_response_code(500);
  die(json_encode(["error" => "DB connection failed"]));
}
$conn->set_charset("utf8mb4");