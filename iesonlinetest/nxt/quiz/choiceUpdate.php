<?php 
	include_once("generateqnpaper.php");

	$questid = $_REQUEST["questid"];
	$qnum = $_REQUEST["qnum"];

	storeChoice($questid, $qnum);

 ?>