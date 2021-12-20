<?php
include_once "functions.php";

$params=json_decode(file_get_contents('php://input'),true);

$data = $params['data'];

// $log = fopen('maxHours.log', 'a');
// fwrite($log, print_r($data,true));

$check = db_query("SELECT * FROM `days` WHERE `date`='{$data['date']}'; ")->fetch()['hours'];

if ($check) {
    $result = db_query("UPDATE `days` 
        SET 
            `hours` = '{$data['hours']}'
        WHERE 
            `date`='{$data['date']}'; ");
} else {
    $result = db_query("INSERT INTO `days`(`date`, `hours`) VALUES ('{$data['date']}','{$data['hours']}'); ");
}

// fwrite($log, print_r($result,true));
// fclose($log);
echo json_encode($result);
?>