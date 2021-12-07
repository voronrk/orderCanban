<?php
$params=json_decode(file_get_contents('php://input'),true);

$date = $params['date'];
// $date = getdate(strtotime($params['date']));
// $date = getdate(strtotime($params['date']));

$data = [
    ["id" => "1",  "type" => "PostpressItem", "orderNum" => "01", "customer" =>"Детотрюн", "duration" =>1, "machine" => "ЛМ", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "previousOrder" => null, "nextOrder" => null, "previousPart" => null, "nextPart" => null, "date" => "Sat Dec 11 2021"],
    ["id" => "2",  "type" => "PostpressItem", "orderNum" => "02", "customer" =>"Детотрюн", "duration" =>2, "machine" => "ЛМ", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "previousOrder" => null, "nextOrder" => null, "previousPart" => null, "nextPart" => null, "date" => "Tue Dec 07 2021"],
    ["id" => "3",  "type" => "PostpressItem", "orderNum" => "03", "customer" =>"Детотрюн", "duration" =>3, "machine" => "ЛМ", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "previousOrder" => null, "nextOrder" => null, "previousPart" => null, "nextPart" => null, "date" => "Wed Dec 08 2021"],
    ["id" => "4",  "type" => "PostpressItem", "orderNum" => "04", "customer" =>"Детотрюн", "duration" =>6, "machine" => "ЛМ", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "previousOrder" => null, "nextOrder" => null, "previousPart" => null, "nextPart" => null, "date" => "Mon Dec 06 2021"],
    ["id" => "5",  "type" => "PostpressItem", "orderNum" => "05", "customer" =>"Детотрюн", "duration" =>1, "machine" => "ЛМ", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "previousOrder" => null, "nextOrder" => null, "previousPart" => null, "nextPart" => null, "date" => "Mon Dec 06 2021"],
    ["id" => "6",  "type" => "PostpressItem", "orderNum" => "06", "customer" =>"Детотрюн", "duration" =>4, "machine" => "ЛМ", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "previousOrder" => null, "nextOrder" => null, "previousPart" => null, "nextPart" => null, "date" => "Mon Dec 06 2021"],
    ["id" => "7",  "type" => "PostpressItem", "orderNum" => "07", "customer" =>"Детотрюн", "duration" =>7, "machine" => "ЛМ", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "previousOrder" => null, "nextOrder" => null, "previousPart" => null, "nextPart" => null, "date" => "Mon Dec 06 2021"],
    ["id" => "8",  "type" => "PostpressItem", "orderNum" => "08", "customer" =>"Детотрюн", "duration" =>2, "machine" => "ЛМ", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "previousOrder" => null, "nextOrder" => null, "previousPart" => null, "nextPart" => null, "date" => "Mon Dec 06 2021"],
    ["id" => "9",  "type" => "PostpressItem", "orderNum" => "09", "customer" =>"Детотрюн", "duration" =>1, "machine" => "ЛМ", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "previousOrder" => null, "nextOrder" => null, "previousPart" => null, "nextPart" => null, "date" => "Fri Dec 10 2021"],
    ["id" => "10", "type" => "PostpressItem", "orderNum" => "10", "customer" =>"Детотрюн", "duration" =>4, "machine" => "ЛМ", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "previousOrder" => null, "nextOrder" => null, "previousPart" => null, "nextPart" => null, "date" => "Fri Dec 10 2021"],
    ["id" => "11", "type" => "PostpressItem", "orderNum" => "11", "customer" =>"Детотрюн", "duration" =>3, "machine" => "ЛМ", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "previousOrder" => null, "nextOrder" => null, "previousPart" => null, "nextPart" => null, "date" => "Fri Dec 10 2021"],
    ["id" => "12", "type" => "PostpressItem", "orderNum" => "12", "customer" =>"Детотрюн", "duration" =>2, "machine" => "ЛМ", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "previousOrder" => null, "nextOrder" => null, "previousPart" => null, "nextPart" => null, "date" => "Wed Dec 08 2021"],
    ["id" => "13", "type" => "PostpressItem", "orderNum" => "13", "customer" =>"Детотрюн", "duration" =>1, "machine" => "ЛМ", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "previousOrder" => null, "nextOrder" => null, "previousPart" => null, "nextPart" => null, "date" => "Tue Dec 07 2021"],
    ["id" => "14", "type" => "PostpressItem", "orderNum" => "14", "customer" =>"Детотрюн", "duration" =>2, "machine" => "ЛМ", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "previousOrder" => null, "nextOrder" => null, "previousPart" => null, "nextPart" => null, "date" => "Tue Dec 07 2021"],
    ["id" => "15", "type" => "PostpressItem", "orderNum" => "15", "customer" =>"Детотрюн", "duration" =>3, "machine" => "ЛМ", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "previousOrder" => null, "nextOrder" => null, "previousPart" => null, "nextPart" => null, "date" => "Wed Dec 08 2021"],
    ["id" => "16", "type" => "PostpressItem", "orderNum" => "16", "customer" =>"Детотрюн", "duration" =>6, "machine" => "ЛМ", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "previousOrder" => null, "nextOrder" => null, "previousPart" => null, "nextPart" => null, "date" => "Wed Dec 08 2021"],
    ["id" => "17", "type" => "PostpressItem", "orderNum" => "17", "customer" =>"Детотрюн", "duration" =>1, "machine" => "ЛМ", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "previousOrder" => null, "nextOrder" => null, "previousPart" => null, "nextPart" => null, "date" => "Sat Dec 11 2021"],
    ["id" => "18", "type" => "PostpressItem", "orderNum" => "18", "customer" =>"Детотрюн", "duration" =>4, "machine" => "ЛМ", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "previousOrder" => null, "nextOrder" => null, "previousPart" => null, "nextPart" => null, "date" => "Sun Dec 12 2021"],
    ["id" => "19", "type" => "PostpressItem", "orderNum" => "19", "customer" =>"Детотрюн", "duration" =>7, "machine" => "ЛМ", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "previousOrder" => null, "nextOrder" => null, "previousPart" => null, "nextPart" => null, "date" => "Sun Dec 12 2021"],
    ["id" => "20", "type" => "PostpressItem", "orderNum" => "20", "customer" =>"Детотрюн", "duration" =>2, "machine" => "ЛМ", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "previousOrder" => null, "nextOrder" => null, "previousPart" => null, "nextPart" => null, "date" => "Sun Dec 12 2021"],
    ["id" => "21", "type" => "PostpressItem", "orderNum" => "21", "customer" =>"Детотрюн", "duration" =>1, "machine" => "ЛМ", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "previousOrder" => null, "nextOrder" => null, "previousPart" => null, "nextPart" => null, "date" => "Thu Dec 09 2021"],
    ["id" => "22", "type" => "PostpressItem", "orderNum" => "22", "customer" =>"Детотрюн", "duration" =>4, "machine" => "ЛМ", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "previousOrder" => null, "nextOrder" => null, "previousPart" => null, "nextPart" => null, "date" => "Thu Dec 09 2021"],
    ["id" => "23", "type" => "PostpressItem", "orderNum" => "23", "customer" =>"Детотрюн", "duration" =>3, "machine" => "ЛМ", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "previousOrder" => null, "nextOrder" => null, "previousPart" => null, "nextPart" => null, "date" => "Thu Dec 09 2021"],
    ["id" => "24", "type" => "PostpressItem", "orderNum" => "24", "customer" =>"Детотрюн", "duration" =>2, "machine" => "ЛМ", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "previousOrder" => null, "nextOrder" => null, "previousPart" => null, "nextPart" => null, "date" => "Thu Dec 09 2021"]
];

$output_data = array_values(array_filter($data, function($item) {
    global $date;
    return $item['date'] == $date;
}));

echo json_encode($output_data);
?>