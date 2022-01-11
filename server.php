<?php

use Workerman\Worker;

require_once __DIR__ . '/vendor/autoload.php';

$users = [];

// Create a Websocket server
$ws_worker = new Worker('websocket://ordercanban:1234');

// Emitted when new connection come
$ws_worker->onConnect = function ($connection) use (&$users){

    $connection->onWebSocketConnect = function($connection) use (&$users) {
        echo "New connection\n";
        echo  "{$_GET['user']}\n";
        $users[$_GET['user']] = $connection;
    };    
};

// Emitted when data received
$ws_worker->onMessage = function ($connection, $data) use (&$users){
    echo "{$data}\n";
    $currentUser = json_decode($data)->user;
    $date = json_decode($data)->date;

    // $log = fopen('data.log', 'w');
    // fwrite($log, print_r(json_decode($data),true) . PHP_EOL);
    // fclose($log);

    // echo "{$currentUser}\n";
    // echo "{$date}\n";
    foreach($users as $key=>$conn) {
        if ($key != $currentUser) {
            $conn->send($date);
        };
    };
    // $connection->send($data);

};

// Emitted when connection closed
$ws_worker->onClose = function ($connection) {
    echo "Connection closed\n";
};

// Run worker
Worker::runAll();