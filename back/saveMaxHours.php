<?php
include_once "functions.php";

$params=json_decode(file_get_contents('php://input'),true);

$data = $params['data'];

$check = db_query("SELECT * FROM `days` WHERE `date`='{$data['date']}' AND `machine`='{$data['machine']}'; ")->fetch()['hours'];

if ($check) {
    $result = db_query("UPDATE `days` 
        SET 
            `hours` = '{$data['hours']}'
        WHERE 
        `date`='{$data['date']}' AND `machine`='{$data['machine']}'; ");
} else {
    $result = db_query("INSERT INTO `days`(`date`, `machine`, `hours`) VALUES ('{$data['date']}','{$data['machine']}','{$data['hours']}'); ");
}

echo json_encode($result);
?>