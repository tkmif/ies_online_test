<?php

	session_start();
	include_once("generateqnpaper.php");

	$sysName = $_SESSION['login_username'];
	$db_con = dbCon();

//get the table name and testid..
	$queryTable = "SELECT tablename, testid FROM onlinetesttablerepos WHERE systemname = '".$sysName."' AND status = 0";
	$resultTable = pg_query($db_con, $queryTable);
	if(pg_num_rows($resultTable)){
		while($rowTable[] = pg_fetch_assoc($resultTable));
	}
//extract the table name..
	$recordTable = array_column($rowTable, 'tablename');
	$studentTableName = $recordTable[0];
//extract the testid..	
	$recordTest = array_column($rowTable, 'testid');
	$chosen_testid = $recordTest[0];

//update the status as submitted(1)..
	updateReposStatus($studentTableName);

//flush the student table...
	flushTable($studentTableName);

//redirect to choosecategory page..
	echo "<script>window.location.assign('chooseCategory.php')</script>";


function updateReposStatus($studentTable){
	$db_con = dbCon();

//update the status as submitted...
	$querySubmit = "UPDATE onlinetesttablerepos SET status = 1 where tablename = '".$studentTable."' AND status = 0";
	$resultSubmit = pg_query($db_con, $querySubmit);
	pg_close($db_con);
}

function flushTable($studentTable){
	$db_con = dbCon();
	$queryDelete = "DROP TABLE ".$studentTable.";";
	$resultDelete = pg_query($db_con,$queryDelete);
}

?>