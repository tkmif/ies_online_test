<?php 
session_start();

function checkIfExists($sysName){
	include_once("configQn.php");
	$exists = 1;
	$notExist = 0;

//checking whether there is a pending test..
	$queryUnSubmit = "SELECT *FROM onlinetesttablerepos where systemname ='".$sysName."' AND status = 0";
	$resultUnSubmit = pg_query($db_con,$queryUnSubmit);
	if(pg_num_rows($resultUnSubmit)){
		while ($rowUnSubmit[] = pg_fetch_assoc($resultUnSubmit));
	}else{
		return $notExist;
	}
	$recordUnSubmit = array_column($rowUnSubmit, 'tablename');

//if exists returns the array containing the table names else return 0..
	if(count($recordUnSubmit) != 0){
		return $exists;
	}else{
		return $notExist;
	}
}

//require 'config.php';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$user = $_POST["uname"];
	$pass = $_POST["pass"];
	//$type_id = $_POST["typeofquest"];
		include_once('config.php');
		/*$db_con = pg_connect("host = localhost dbname = postgres user = postgres password = abc123AB") or die("Cant Find the db..!");*/
		$date = date('Y-m-d H:i:s');
		$query = "SELECT *from login WHERE loginname = '$user'";
		$result = pg_query($db_con, $query);
		
		if(pg_num_rows($result)>0 && $pass == "ies"){
			while($row[] = pg_fetch_assoc($result));
			$record = array_column($row, 'loginid');
			$loginId = $record[0];
			//require 'generateqnpaper1.php';
			//include("generateqnpaper.php");
			$split = explode("@", $user);
			$userName = $split[0];
			$_SESSION['login_user'] = ucwords($user);
			$_SESSION['login_username'] = ucwords($userName);
			$_SESSION['login_id'] = $loginId;
//checks if the system has any pending test..
			$getPendingTest = checkIfExists(ucwords($userName));

//if there is a pending test then alert the user to continue or clear it else go to the next page..
			if($getPendingTest != 0){
				echo "<script>if(confirm('You have an unsubmitted test, would you like to continue the unsubmitted test?')==true){
						window.location.assign('loadPrev.php');
				}else{
					window.location.assign('clearPrev.php');
				}</script>";
				exit();
			}else{
			 	header("location:chooseCategory.php");
				exit();
			}
		}
		else{
			echo '<script language="javascript">';
			
			//echo 'window.location.assign("index.php")';
			echo '</script>';
			echo "<span>Wrong Username or Password..!</span>";
			echo "<script>document.getElementById('retry').innerHTML = 'username or password incorrect'</script>";
			header("location:login.php");
			echo 'window.alert("Wrong username and password")';

		}	
		
}
?>

