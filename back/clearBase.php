<?php
include_once "functions.php";

$params=json_decode(file_get_contents('php://input'),true);

$result = db_query("UPDATE `operations` SET `prev`='',`next`='',`prevPart`='',`nextPart`='',`status`='',`date`=null WHERE 1");

echo json_encode('База очищена!');
?>