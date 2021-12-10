<?php
$params=json_decode(file_get_contents('php://input'),true);

$date = $params['date'];
$machine = $params['machine'];
// $date = getdate(strtotime($params['date']));
// $date = getdate(strtotime($params['date']));

$data = [
    ["id" => "1",  "orderNum" => "01",  "customer" =>"Детотрюн", "duration" =>1, "machine" => "horizon1",   "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => "Sat Dec 11 2021"],
    ["id" => "2",  "orderNum" => "02",  "customer" =>"Детотрюн", "duration" =>2, "machine" => "horizon1",   "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => "Tue Dec 07 2021"],
    ["id" => "3",  "orderNum" => "03",  "customer" =>"Детотрюн", "duration" =>3, "machine" => "horizon1",   "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => "Wed Dec 08 2021"],
    ["id" => "4",  "orderNum" => "04",  "customer" =>"Детотрюн", "duration" =>6, "machine" => "horizon1",   "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => "Mon Dec 06 2021"],
    ["id" => "5",  "orderNum" => "05",  "customer" =>"Детотрюн", "duration" =>1, "machine" => "horizon1",   "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => "Mon Dec 06 2021"],
    ["id" => "6",  "orderNum" => "06",  "customer" =>"Детотрюн", "duration" =>4, "machine" => "horizon1",   "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => "Mon Dec 06 2021"],
    ["id" => "7",  "orderNum" => "07",  "customer" =>"Детотрюн", "duration" =>7, "machine" => "horizon1",   "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => "Mon Dec 06 2021"],
    ["id" => "8",  "orderNum" => "08",  "customer" =>"Детотрюн", "duration" =>2, "machine" => "horizon1",   "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => "Mon Dec 06 2021"],
    ["id" => "9",  "orderNum" => "09",  "customer" =>"Детотрюн", "duration" =>1, "machine" => "horizon2",   "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => "Fri Dec 10 2021"],
    ["id" => "10", "orderNum" => "10",  "customer" =>"Детотрюн", "duration" =>4, "machine" => "horizon2",   "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => "Fri Dec 10 2021"],
    ["id" => "11", "orderNum" => "11",  "customer" =>"Детотрюн", "duration" =>3, "machine" => "horizon2",   "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => "Fri Dec 10 2021"],
    ["id" => "12", "orderNum" => "12",  "customer" =>"Детотрюн", "duration" =>2, "machine" => "horizon2",   "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => "Wed Dec 08 2021"],
    ["id" => "13", "orderNum" => "13",  "customer" =>"Детотрюн", "duration" =>1, "machine" => "horizon2",   "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => "Tue Dec 07 2021"],
    ["id" => "14", "orderNum" => "14",  "customer" =>"Детотрюн", "duration" =>2, "machine" => "binder",     "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => "Tue Dec 07 2021"],
    ["id" => "15", "orderNum" => "15",  "customer" =>"Детотрюн", "duration" =>3, "machine" => "binder",     "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => "Wed Dec 08 2021"],
    ["id" => "16", "orderNum" => "16",  "customer" =>"Детотрюн", "duration" =>6, "machine" => "binder",     "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => "Wed Dec 08 2021"],
    ["id" => "17", "orderNum" => "17",  "customer" =>"Детотрюн", "duration" =>1, "machine" => "binder",     "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => "Sat Dec 11 2021"],
    ["id" => "18", "orderNum" => "18",  "customer" =>"Детотрюн", "duration" =>4, "machine" => "binder",     "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => "Sun Dec 12 2021"],
    ["id" => "19", "orderNum" => "19",  "customer" =>"Детотрюн", "duration" =>7, "machine" => "binder",     "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => "Sun Dec 12 2021"],
    ["id" => "20", "orderNum" => "20",  "customer" =>"Детотрюн", "duration" =>2, "machine" => "assembling", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => "Sun Dec 12 2021"],
    ["id" => "21", "orderNum" => "21",  "customer" =>"Детотрюн", "duration" =>1, "machine" => "assembling", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => "Thu Dec 09 2021"],
    ["id" => "22", "orderNum" => "22",  "customer" =>"Детотрюн", "duration" =>4, "machine" => "assembling", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => "Thu Dec 09 2021"],
    ["id" => "23", "orderNum" => "23",  "customer" =>"Детотрюн", "duration" =>3, "machine" => "assembling", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => "Thu Dec 09 2021"],
    ["id" => "24", "orderNum" => "24",  "customer" =>"Детотрюн", "duration" =>2, "machine" => "assembling", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => "Thu Dec 09 2021"],
    ["id" => "25", "orderNum" => "101", "customer" =>"Детотрюн", "duration" =>1, "machine" => "horizon1",   "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => ""],
    ["id" => "26", "orderNum" => "102", "customer" =>"Детотрюн", "duration" =>2, "machine" => "horizon1",   "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => ""],
    ["id" => "27", "orderNum" => "103", "customer" =>"Детотрюн", "duration" =>3, "machine" => "horizon1",   "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => ""],
    ["id" => "28", "orderNum" => "104", "customer" =>"Детотрюн", "duration" =>6, "machine" => "horizon1",   "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => ""],
    ["id" => "29", "orderNum" => "105", "customer" =>"Детотрюн", "duration" =>1, "machine" => "horizon1",   "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => ""],
    ["id" => "30", "orderNum" => "106", "customer" =>"Детотрюн", "duration" =>4, "machine" => "horizon1",   "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => ""],
    ["id" => "31", "orderNum" => "107", "customer" =>"Детотрюн", "duration" =>7, "machine" => "horizon1",   "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => ""],
    ["id" => "32", "orderNum" => "108", "customer" =>"Детотрюн", "duration" =>2, "machine" => "horizon1",   "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => ""],
    ["id" => "33", "orderNum" => "109", "customer" =>"Детотрюн", "duration" =>1, "machine" => "horizon2",   "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => ""],
    ["id" => "34", "orderNum" => "110", "customer" =>"Детотрюн", "duration" =>4, "machine" => "horizon2",   "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => ""],
    ["id" => "35", "orderNum" => "111", "customer" =>"Детотрюн", "duration" =>3, "machine" => "horizon2",   "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => ""],
    ["id" => "36", "orderNum" => "112", "customer" =>"Детотрюн", "duration" =>2, "machine" => "horizon2",   "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => ""],
    ["id" => "37", "orderNum" => "113", "customer" =>"Детотрюн", "duration" =>1, "machine" => "horizon2",   "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => ""],
    ["id" => "38", "orderNum" => "114", "customer" =>"Детотрюн", "duration" =>2, "machine" => "binder",     "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => ""],
    ["id" => "39", "orderNum" => "115", "customer" =>"Детотрюн", "duration" =>3, "machine" => "binder",     "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => ""],
    ["id" => "40", "orderNum" => "116", "customer" =>"Детотрюн", "duration" =>6, "machine" => "binder",     "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => ""],
    ["id" => "41", "orderNum" => "117", "customer" =>"Детотрюн", "duration" =>1, "machine" => "binder",     "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => ""],
    ["id" => "42", "orderNum" => "118", "customer" =>"Детотрюн", "duration" =>4, "machine" => "binder",     "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => ""],
    ["id" => "43", "orderNum" => "119", "customer" =>"Детотрюн", "duration" =>7, "machine" => "binder",     "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => ""],
    ["id" => "44", "orderNum" => "120", "customer" =>"Детотрюн", "duration" =>2, "machine" => "assembling", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => ""],
    ["id" => "45", "orderNum" => "121", "customer" =>"Детотрюн", "duration" =>1, "machine" => "assembling", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => ""],
    ["id" => "46", "orderNum" => "122", "customer" =>"Детотрюн", "duration" =>4, "machine" => "assembling", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => ""],
    ["id" => "47", "orderNum" => "123", "customer" =>"Детотрюн", "duration" =>3, "machine" => "assembling", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => ""],
    ["id" => "48", "orderNum" => "124", "customer" =>"Детотрюн", "duration" =>2, "machine" => "assembling", "options" =>"Матовая пленка", "status" => "", "dateLock" => false, "prev" => null, "next" => null, "prevPart" => null, "nextPart" => null, "date" => ""],
];

$output_data['notplanned'] = array_values(array_filter($data, function($item) {
    global $machine;
    return (($item['date'] == '') && ($item['machine']==$machine));
}));

$output_data['planned'] = array_values(array_filter($data, function($item) {
    global $date;
    global $machine;
    return (($item['date'] == $date) && ($item['machine']==$machine));
}));

echo json_encode($output_data);
?>