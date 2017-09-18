<?php 
session_start();

function temp_table_creation($namebase){
	$date = date('ymd_His');
	$tblname = $namebase;
	include_once("configQn.php");
	
	$create_tbl_query = "CREATE TABLE ". $tblname . "(
						 id serial NOT NULL,
						 questiontypeid integer NOT NULL,
						 questionid integer NOT NULL,
						 status smallint DEFAULT 0,
						 chosenchoice smallint,
						 CONSTRAINT pk_". $tblname ." PRIMARY KEY (questionid)
						)";

		$res_tbl = pg_query($db_con, $create_tbl_query);
		if($res_tbl){
			echo "Table created..! ";
			return $tblname;
		}
	pg_close($db_con);
}

function reposEntry($tblname){
	include_once("generateqnpaper.php");
	global $duration;
	$dbCon = dbCon();
//extracting system name from the table name..
	$split = explode("_", $tblname);
	$sysName = $split[0];
	$testId = $split[1];
	echo "I was here";
//entering into the table..
	$queryEntry = "INSERT INTO onlinetesttablerepos (tablename,testid,timeremaining,systemname) VALUES ('".$tblname."','".$testId."',".$duration.",'".$sysName."');";
	$resultEntry = pg_query($dbCon,$queryEntry);

	pg_close($dbCon);
}

function dropTableIfExist($userName){
	include_once("generateqnpaper.php");
	$db_con = dbCon();
	$tableToDrop = "null";
//check if there exist any table that is submitted..
	$queryChkRepos = "SELECT *FROM onlinetesttablerepos WHERE tablename LIKE '%".$userName."%' AND status= 1";
	$resultChkRepos = pg_query($db_con, $queryChkRepos);

//if the submitted table exists..
	if(pg_num_rows($resultChkRepos) > 0){
//check if there exists any table that is submitted..
		$queryGetTable = "SELECT *FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME LIKE '%".lcfirst($userName)."%'";
		$resultGetTable = pg_query($db_con, $queryGetTable);
		if(pg_num_rows($resultGetTable)){
			while($rowGetTable[] = pg_fetch_assoc($resultGetTable));
			$recordGetTable = array_column($rowGetTable, "table_name");
			
			for($i=0;$i<count($recordGetTable);$i++){
				echo "<br />this is table " . $i . ":" . $recordGetTable[$i];
				$split = explode("_", $recordGetTable[$i]);
				$userNameTbl = $split[0];
				echo "<br />User Name is : ".$userNameTbl;
				if($userNameTbl == lcfirst($userName)){
					$tableToDrop = $recordGetTable[$i];
					echo "<br />table to drop is: " . $tableToDrop;
				}

			}
		}
		
		if($tableToDrop != "null"){
			$queryDrop = "DROP TABLE ".$tableToDrop;
			$resultDrop = pg_query($db_con, $queryDrop);
			echo "Table to remove is ".$tableToDrop;
		}
	}else{
		echo "No table to remove..!";
	}

	pg_close($db_con);
}

require 'config.php';
if ($_SERVER["REQUEST_METHOD"] == "POST") {

	include_once("generateqnpaper.php");
	$chosen_testid = $_POST["typeofquest"];
	$user = $_SESSION['login_user'];
	$loginId = $_SESSION['login_id'];
	$_SESSION['test_id'] = $chosen_testid;
	echo $chosen_testid . "<br />" . $user. "<br/>". $loginId;
	$qnbankid = getTestQnBankIds($chosen_testid);

				//$_SESSION['test_id'] = $chosen_testid;
			//Get the duration of the test
				$testInfo = getTestInfo($chosen_testid);
				$durationArray = array_column($testInfo, 'duration');
				$duration = $durationArray[0]*60;

			//Put it in session for later use
				$_SESSION['duration'] = $duration;
				$userName = $_SESSION['login_username'];
				$namebase = $userName."_". $chosen_testid;
				dropTableIfExist($userName);
				$temp_tbl = temp_table_creation($namebase);

//enter the table into the repos...
				reposEntry($temp_tbl);
				echo "<br />".$temp_tbl;

			//Get category id..
				$cat_id = array_column($testInfo, 'testcategory');
				$_SESSION['test_cat'] = $cat_id[0];
				$_SESSION['tblname'] = $temp_tbl;
				$qnbankids = getTestQnBankIds($chosen_testid);
				$qntypeid = getQnTypeId($qnbankids);
				$_SESSION['qnbankids'] = $qnbankids;
				$_SESSION['qntypeid'] = $qntypeid;

// load questions into the temporary table
				
				$test = qnbankid_for_qntypeidchosen(15, $qnbankids);
				print_r($test);

				qnpreload($qnbankids,$qntypeid, $temp_tbl);

				// echo "<script>window.location('login.php')</script>";
				header("location:login.php");
				exit();
		
	}
/*	else{
		echo '<script language="javascript">';
		echo 'alert("Wrong username and password")';
			//echo 'window.location.assign("index.php")';
		echo '</script>';
			//header("location:index.php");
	}
	*/	

?>