<?php 
include_once('generateqnpaper.php');
	
	$questType = $_REQUEST["qtype"];
	$qnum = $_REQUEST["qnum"];
	$tmp_tblname = $tmptableexample;

	$db_con = dbCon();
		$query1 = "SELECT * FROM " . $tmp_tblname . " where questiontypeid = " . $questType . "ORDER BY questionid OFFSET ". $qnum ." LIMIT 1";
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
		$questionid_for_qntype = $record[0];

		return $questionid_for_qntype;
		pg_close($db_con);
 ?>