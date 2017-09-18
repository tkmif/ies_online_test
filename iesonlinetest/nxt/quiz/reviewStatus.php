<?php 
include_once('generateqnpaper.php');
	
	$questType = $_REQUEST["qt"];
	$qnum = $_REQUEST["qnum"];
	$status = $_REQUEST["status"];
	$tmp_tblname = $tmptableexample;
	//echo "qt: " . $questType . "qnum: " . $qnum . "status: " . $status; 

		$db_con = dbCon();
		$query1 = "SELECT * FROM " . $tmp_tblname . " where questiontypeid = " . $questType . " ORDER BY id OFFSET ". $qnum ." LIMIT 1";
		$result1 = pg_query($db_con, $query1);

		if(pg_num_rows($result1)){
			while($row[] = pg_fetch_assoc($result1));
		}
		else{
			$endOf = 0;
			echo $endOf;
			//echo "<script>document.getElementById('but". $qnuminc ."').style.display = 'none';</script>";
			exit();
		}
		$record = array_column($row, 'questionid');
		$questionids_for_qntype = $record;
		$query2 = "SELECT chosenchoice FROM " . $tmp_tblname . " WHERE questionid = " . $questionids_for_qntype[0];
		$check = pg_query($db_con, $query2);
		if(pg_num_rows($check)){
			while($checkRow[] = pg_fetch_assoc($check));
		}
		$chkrecord = array_column($checkRow, 'chosenchoice');
		//echo $chkrecord[0];
		if(!$chkrecord[0]){
			$status = 2;
		}
	/*if($status == 2){
		echo "<script> var buttonId = '#navButs'". $qnum ."; $(buttonId).addClass('marked4review'); </script>";
	}
	if($status == 3){
		echo "<script> var buttonId = '#navButs'". $qnum ."; $(buttonId).addClass('ansmarked'); </script>";
	}
*/
	statusUpdate($questType, $qnum, $status);
		
 ?>