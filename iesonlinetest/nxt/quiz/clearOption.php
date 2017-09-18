<?php 
	include_once("generateqnpaper.php");

	$questType = $_REQUEST["qt"];
	$qnum = $_REQUEST["qnum"];

	//echo "qt: " . $questType . "<br /> qnum = " . $qnum;

	clearChoice($questType, $qnum);

 ?>