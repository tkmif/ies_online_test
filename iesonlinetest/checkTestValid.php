<?php 
include_once("generateqnpaper.php");

$testId = $_REQUEST["testId"];

$noQnBnkId = 2;
	$qnbankid = getTestQnBankIds($testId);
	if($qnbankid == 0){
			echo $noQnBnkId;
	}


 ?>