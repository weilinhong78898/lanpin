<?php
header("Content-Type:application/json");

@$kw = $_REQUEST['kw'];
$output = [];

if(empty($kw))
{
    echo '[]';
    return;
}
require('init.php');
//$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
//$sql = 'SET NAMES UTF8';
//mysqli_query($conn,$sql);

$sql = "SELECT hid,name,country,img_sm,price,skills FROM sgs_hero WHERE name LIKE '%$kw%' OR country LIKE '%$kw%'  OR skills LIKE '%$kw%'";
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