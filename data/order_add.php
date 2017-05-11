<?php
header("Content-Type:application/json");

@$user_name = $_REQUEST['user_name'];
@$phone = $_REQUEST['phone'];
@$addr = $_REQUEST['addr'];
@$hid = $_REQUEST['hid'];
@$sex = $_REQUEST['sex'];
$order_time = time()*1000;
if(empty($user_name) || empty($phone) || empty($addr) || empty($hid) || empty($sex))
{
    echo '[]';
    return;
}

require('init.php');
//$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
//$sql = 'SET NAMES UTF8';
//mysqli_query($conn,$sql);

$sql = "INSERT INTO sgs_order VALUES(NULL,'$phone','$user_name','$sex','$order_time','$addr','$hid')";
$result = mysqli_query($conn,$sql);

$output = [];
$arr = [];
if($result)
{
    $arr['msg'] = 'succ';
    $arr['oid'] = mysqli_insert_id($conn);
}
else
{
    $arr['msg'] = 'error';
}

$output[] = $arr;

echo json_encode($output);
?>