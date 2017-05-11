<?php
header("Content-Type:application/json");

@$id = $_REQUEST['id'];
$output = [];

if(empty($id))
{
    echo '[]';
    return;
}
 require('init.php');
//$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
//$sql = 'SET NAMES UTF8';
//mysqli_query($conn,$sql);

$sql = "SELECT hid,name,detail,country,img_lg,price,skills FROM sgs_hero WHERE hid=$id";
$result = mysqli_query($conn,$sql);

$row = mysqli_fetch_assoc($result);
if(empty($row))
{
    echo '[]';
}
else
{
    $output[] = $row;
    echo json_encode($output);

}
?>