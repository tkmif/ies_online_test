<?php 
include_once('generateqnpaper.php');
	
	$questType = $_REQUEST["qt"];
	$qnum = $_REQUEST["qnum"];
	$tmp_tblname = $tmptableexample;

	$questid = getQuestid($questType, $qnum);
	$choice = getChosenChoice($questid);

	$buttonId = "#navButs" . $qnum;

	if($choice != null){
		$status = 3;
		$class = "ansmarked";
	}
	else{
		$status = 2;
		$class = "marked4review";
	}

	statusUpdate($questType, $qnum, $status);
	echo $class;
 ?>