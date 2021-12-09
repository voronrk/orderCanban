<?php
include_once "functions.php";

$params=json_decode(file_get_contents('php://input'),true);

// $log = fopen('get.log', 'w');
// fwrite($log, print_r($params,true));
// fclose($log);

$date = $params['date'];
$machine = $params['machine'];

// $date = "Mon Dec 06 2021";
// $machine = 'horizon1';

$output_data['notplanned'] = db_query("SELECT * FROM `operations` WHERE `date`='' AND `machine`='{$machine}'; ")->fetchAll();
$output_data['planned'] = db_query("SELECT * FROM `operations` WHERE `date`='{$date}' AND `machine`='{$machine}'; ")->fetchAll();

echo json_encode($output_data);
?>