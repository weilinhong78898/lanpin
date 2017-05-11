<?php
header("Content-Type:application/json");

@$phone = $_REQUEST['phone'];
$output = [];

if(empty($phone))
{
    echo '[]';
    return;
}
require('init.php');
//$conn = mysqli_connect(SAE_MYSQL_HOST_M,SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB,SAE_MYSQL_PORT);
//$sql = 'SET NAMES UTF8';
//mysqli_query($conn,$sql);

$sql = "SELECT sgs_order.oid,sgs_order.user_name,sgs_order.addr,sgs_order.order_time,sgs_hero.img_xs,sgs_hero.hid FROM sgs_order,sgs_hero WHERE sgs_order.phone='$phone' AND sgs_order.hid=sgs_hero.hid";
$result = mysqli_query($conn,$sql);

while(true)
{
    $row = mysqli_fetch_assoc($result);
    if(!$row)
    {
        break;
    }
    $output[] = $row;
}

echo json_encode($output);
?>