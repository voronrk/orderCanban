<?php
include_once "functions.php";

$params=json_decode(file_get_contents('php://input'),true);

$date = $params['date'];
$machine = $params['machine'];

$output_data['notplanned'] = db_query("SELECT * FROM `operations` WHERE `date`='' AND `machine`='{$machine}'; ")->fetchAll();
$output_data['planned'] = db_query("SELECT * FROM `operations` WHERE `date`='{$date}' AND `machine`='{$machine}'; ")->fetchAll();
$output_data['maxhours'] = db_query("SELECT * FROM `days` WHERE `date`='{$date}' AND `machine`='{$machine}'; ")->fetch()['hours'];

echo json_encode($output_data);
?>