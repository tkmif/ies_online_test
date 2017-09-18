<?php 
include_once('generateqnpaper.php');
	
	$questType = $_REQUEST["qt"];
	$qnum = $_REQUEST["qnum"];
	$status = $_REQUEST["status"];
	$tmp_tblname = $tmptableexample;
	//echo "qt: " . $questType . "qnum: " . $qnum . "status: " . $status; 
	
	$questid = getQuestid($questType, $qnum);
	$choice = getChosenChoice($questid);

	$buttonId = "#navButs" . $qnum;

	if($choice != null){
		statusUpdate($questType, $qnum, $status);
		$class = "answered";
	}
	else{
		statusUpdate($questType, $qnum, 4);
		$class = "visited";
	}

	echo $class;
 ?>