<?php
// $test = file_get_contents("php://input");
// $test = json_decode($test,true);
// var_dump($_FILES);

$r = array(
    'res'=>true,
    'data'  =>array(
        'list' => 'test'
    ),
    'msg' => 'success'
);
echo json_encode($r);