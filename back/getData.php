<?php
include_once "functions.php";

$params=json_decode(file_get_contents('php://input'),true);

$dateBegin = $params['date'];
$dateEnd = date("Y-m-d", strtotime($params['date'].'+ 20 days'));
$machine = $params['machine'];

$log = fopen('date.log', 'w');
fwrite($log, print_r($dateBegin,true) . PHP_EOL);
fwrite($log, print_r($dateEnd,true) . PHP_EOL);

// $machine = 'horizon1';

$output_data['notplanned'] = db_query("SELECT * FROM `operations` WHERE `date`=0 AND `machine`='{$machine}'; ")->fetchAll();
$output_data['planned'] = db_query("SELECT * FROM `operations` WHERE `date`='{$dateBegin}' AND `machine`='{$machine}'; ")->fetchAll();
// $output_data['planned'] = db_query("SELECT * FROM `operations` WHERE `date`>='{$dateBegin}' AND `date`<='{$dateEnd}' AND `machine`='{$machine}'; ")->fetchAll();
$output_data['maxhours'] = db_query("SELECT * FROM `days` WHERE `date`='{$date}' AND `machine`='{$machine}'; ")->fetch()['hours'];

fwrite($log, print_r($output_data['planned'],true));
fclose($log);

// echo '<pre>';
// echo print_r($output_data,true);
// echo '</pre>';

echo json_encode($output_data);
?>