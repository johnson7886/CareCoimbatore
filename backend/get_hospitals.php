<?php
header("Content-Type: application/json");
require "db.php";

$result = $conn->query("SELECT * FROM hospitals ORDER BY city, name");
echo json_encode($result->fetch_all(MYSQLI_ASSOC));