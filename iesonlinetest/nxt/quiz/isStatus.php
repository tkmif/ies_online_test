<?php 

include_once("generateqnpaper.php");

$qt = $_REQUEST["qt"];
$qnum = $_REQUEST["qnum"];

$questid = getQuestid($qt,$qnum);
$choice = getChosenChoice($questid);

if($choice == 0){
	return 0;
}
else{
	return 1;
}

 ?>