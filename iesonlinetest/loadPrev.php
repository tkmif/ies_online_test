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
	$_SESSION['tblname'] = $studentTableName; 

//extract the testid..	
	$recordTest = array_column($rowTable, 'testid');
	$chosen_testid = $recordTest[0];
	$_SESSION['test_id'] = $chosen_testid;
//get the qnbnkid..
	$qnbankid = getTestQnBankIds($chosen_testid);

//get the test infos like duration, test name, no of quests, category id..
	$testInfo = getTestInfo($chosen_testid);
//duration
	$durationArray = array_column($testInfo, 'duration');
	$duration = $durationArray[0]*60;
//Put it in session for later use
	$_SESSION['duration'] = $duration;

//Get the other details..
	$cat_id = array_column($testInfo, 'testcategory');
	$_SESSION['test_cat'] = $cat_id[0];
	$qnbankids = getTestQnBankIds($chosen_testid);
	$qntypeid = getQnTypeId($qnbankids);
	$_SESSION['qnbankids'] = $qnbankids;
	$_SESSION['qntypeid'] = $qntypeid;


		echo "This is the table name: " . $studentTableName;
		echo "<br> This is the test id: " . $chosen_testid;
		echo "<br> This is the duration: " . $duration;
		echo "<br> This is the category: " . $cat_id[0];
		echo "<br> this is the qnbankids: <pre>"; print_r($qnbankids); echo '</pre>';
		echo "<br> this is the qntypeids: <pre>"; print_r($qntypeid); echo '</pre>';

	echo '<script>window.location.assign("nxt/quiz/quiz.php", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width="+screen.width+",height="+screen.height); </script>';

/*	echo '<script>window.open("nxt/quiz/quiz.php", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width="+screen.width+",height="+screen.height); 
	</script>';*/

	exit();
  ?>