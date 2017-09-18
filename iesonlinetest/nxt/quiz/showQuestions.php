<?php
include_once("generateqnpaper.php");

$questType = $_REQUEST["qt"];
	if(!isset($_REQUEST["qnum"])){
		$questNum = 0;
	}
	else{
		$questNum = $_REQUEST["qnum"];
	}
$remTime = $_REQUEST["remTime"];

//update the remaining time...
$db_con = dbCon();
$queryTimeUpdate = "UPDATE onlinetesttablerepos SET timeremaining= ".$remTime." WHERE tablename = '".$tmptableexample."' AND status=0";
$resultTimeUpdate = pg_query($db_con, $queryTimeUpdate);

//fetch the question..
disp_qnpaper($questType,$questNum);

//pg_close($db_con);
?>