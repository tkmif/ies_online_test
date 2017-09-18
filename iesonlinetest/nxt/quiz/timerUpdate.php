<?php
include_once("generateqnpaper.php");

$db_con = dbCon();
$secRem = $_REQUEST["secRem"];
$studentTable = lcfirst($tmptableexample);

$queryGet = "SELECT timeremaining, status FROM onlinetesttablerepos WHERE tablename = '".$studentTable."';";
$resultGet = pg_query($db_con, $queryGet);
if(pg_num_rows($resultGet)){
	while($rowGet[] = pg_fetch_assoc($resultGet));
}
$recordGetTime = array_column($rowGet, 'timeremaining');
$recordGetStatus = array_column($rowGet, 'status');
$dbTime = $recordGetTime;
$dbStatus = $recordGetStatus;
unset($queryGet);
unset($resultGet);
unset($recordGetStatus);
unset($recordGetTime);

if($secRem > $dbTime){
    $secRem = $dbTime;
}
elseif($dbTime == 0 && $status == 0){
	$dbTime = $secRem;
}

$queryTimer = "UPDATE onlinetesttablerepos SET timeremaining = " . $secRem . " WHERE tablename = " . $studentTable;
$resulTimer = pg_query($db_con, $queryTimer);
echo $secRem;

?>