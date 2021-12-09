<?php
include_once "functions.php";

$params=json_decode(file_get_contents('php://input'),true);

$data = $params['data'];

$log = fopen('update.log', 'a');
fwrite($log, print_r($data,true));

$result = db_query("UPDATE `operations` 
    SET 
        `orderNum` = '{$data['orderNum']}',
        `customer` = '{$data['customer']}',
        `duration` = '{$data['duration']}',
        `machine` = '{$data['machine']}',
        `options` = '{$data['options']}',
        `status` = '{$data['status']}',
        `datelock` = '{$data['datelock']}',
        `previousOrder` = '{$data['previousOrder']}',
        `nextOrder` = '{$data['nextOrder']}',
        `previousPart` = '{$data['previousPart']}',
        `nextPart` = '{$data['nextPart']}',
        `date` = '{$data['date']}'
    WHERE 
        `id`='{$data['id']}'; ");

fwrite($log, print_r($result,true));
fclose($log);
echo json_encode($result);
?>