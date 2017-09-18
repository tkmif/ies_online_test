<?php
session_start();

$cat_id = $_SESSION['test_cat'];
$test_id = $_SESSION['test_id'];

//give the $cat_id as parameter..!
function choosetestid(){
	//include("config.php");
	$db_con = pg_connect("host = localhost dbname = sampledb user = postgres password = abc123AB") or die("Cant Find the db..!");
	//$cat_id = $_POST["typeofquest"];
	$query_type_id = "SELECT  *from onlinetestdetails where testcategory = $cat_id";
	//$query_type_id = "SELECT  *from onlinetestdetails where testcategory = 5";
	//$query_type_id = "SELECT *from fetch_array_testtable where testcategoryid = 1;";
	$result = pg_query($db_con, $query_type_id);
	if(pg_num_rows($result)){
		while($rows[]=pg_fetch_array($result));
	}
	$records = $rows;
	$testid = array_column($records, 'testid');
	if(count($testid)>1){
	$rand_keys = array_rand($testid, 2);
	return $testid[$rand_keys[0]];
	}
	else{
		$chosen = $testid[0];
		return $chosen;
	}
}
function getTestQnBankIds($testid){
	//include 'config.php';
	$db_con = pg_connect("host = localhost dbname = sampledb user = postgres password = abc123AB") or die("Cant Find the db..!");
	
	$query_gettestqnbankids = "SELECT *from onlinetestdynamicquestionmap where testid = $testid";
	$result = pg_query($db_con, $query_gettestqnbankids);
	if(pg_num_rows($result)){
		while ($row[] = pg_fetch_array($result));
	}
	//print_r($row);
	$record = $row;
	$qnbankidcolumn = array_column($record, 'testquestionbankid');
	return $qnbankidcolumn;
}
function getQnTypeId($qnbankids){
	$db_con = pg_connect("host = localhost dbname = sampledb user = postgres password = abc123AB") or die("Cant Find the db..!");

	$query_qn_typeid = "SELECT *from onlinetestquestionbank where testquestionbankid IN (".implode(",", $qnbankids).")";
	$result = pg_query($db_con, $query_qn_typeid);
	if(pg_num_rows($result)){
		while($row[] = pg_fetch_array($result));
	}
	$record = $row;
	$qntypeid = array_column($record, 'questiontypeid');
	$qntypedistinct = array_unique($qntypeid);
	return $qntypedistinct;
}

function getQuestionIds($qnbankids){
	$db_con = pg_connect("host = localhost dbname = sampledb user = postgres password = abc123AB") or die("Cant Find the db..!");

	$query = "SELECT *from onlinetestqnbankquestionmap where testquestionbankid IN (".implode(",", $qnbankids).")";
	$result = pg_query($db_con, $query);
	if(pg_num_rows($result)){
		while($row[] = pg_fetch_array($result));
	}
	$record = $row;
	$questids = array_column($record, 'questionid');
	return $questids;
}

function questsperQnbank($qnbnid){
	$db_con = pg_connect("host = localhost dbname = sampledb user = postgres password = abc123AB") or die("Cant Find the db..!");
	$count = 0;
	$i = 0;
	foreach ($qnbnid as $value) {
		$query = "SELECT questionid from onlinetestqnbankquestionmap where testquestionbankid = '$value'";
		$result = pg_query($db_con, $query);
		if(pg_num_rows($result)){
			while($row[] = pg_fetch_assoc($result));
		}
		else{
			//echo "No quesions for " . $value . " to show..!<br />";
			continue;
		}
		$records = $row;
		$col = array_column($records, 'questionid');
		//echo "questids for " . $value . " are: <br />";
		//print_r($records);
		//echo "<br />";echo "<br />";
		//echo implode(", ", $col);
		//echo "<br /><br />";
		$count += count($col);
				if($i < count($qnbnid)) { 
			$qnarray[$i] = array(implode(',', $col));
			$i += 1;
		}
		unset($records);
		unset($row);
		unset($col);


	}
	//echo "<br /><br /><br />" . $count;
	//echo "<br />" . count($qnarray);
	return $qnarray;
}

function getFilenames($qnperqnbank){
	$db_con = pg_connect("host = localhost dbname = sampledb user = postgres password = abc123AB") or die("Cant Find the db..!");

	for ($i=0; $i < count($qnperqnbank); $i++) { 
		$qids = $qnperqnbank[$i];
		//$query = "SELECT *from onlinetestquestion where questionid IN (" .implode(",", $qids). ")";
		$query = "SELECT CONCAT(question, filename), imagetype from onlinetestquestion where questionid IN (" .implode(", ", $qids).") AND imagetype IN (1,0)";
		$result = pg_query($db_con, $query);
		if(pg_num_rows($result)){
			while($row[] = pg_fetch_assoc($result));
		}
		$records = $row;

		//$filenames[$i] = array_column($records, 'concat');

		$filenames[$i] = $records;
		unset($row);
		unset($records);
		unset($qids);
	}

		reset($filenames);

	return $filenames;
}

function getContentversion($filename){
	$db_con = pg_connect("host = localhost dbname = sampledb user = postgres password = abc123AB") or die("Cant Find the db..!");

	$query = "SELECT MAX(version) from onlinetestquestionfile where filename = '$filename'";
	$result = pg_query($db_con, $query);
	if(pg_num_rows($result)){
		while($row[] = pg_fetch_assoc($result));
	} 
	$record = $row;
	$version = $record;
	return implode('.', $version[0]);
}

function dispContent($filename, $maxversion){
	$db_con = pg_connect("host = localhost dbname = sampledb user = postgres password = abc123AB") or die("Cant Find the db..!");
	$query = "SELECT content from onlinetestquestionfile where filename = '$filename' AND version = 1";

	$result = pg_query($db_con, $query);
	if(pg_num_rows($result)){
		while($row[] = pg_fetch_array($result));
	}
	$record = $row;
	$cont[] = array_column($record, 'content');
	$content = implode('.', $cont[0]);
	//header('Content-Type: image/jpg');
	//$unes_image = pg_unescape_bytea($content);
	//return $unes_image;
	return $content;
	
}

function getImagetypeqns($qnbankids){
	$db_con = pg_connect("host = localhost dbname = sampledb user = postgres password = abc123AB") or die("Cant Find the db..!");
	for ($i=0; $i < count($qnbankids); $i++) { 
		$str = $qnbankids[$i];
		$query4qid = "SELECT questionid from onlinetestqnbankquestionmap where testquestionbankid = $str";	

		$qids = pg_query($db_con, $query4qid);
		if(pg_num_rows($qids)){
			while($rowqid[] = pg_fetch_assoc($qids));
		}
		$record = array_column($rowqid, 'questionid');
		$qidcolumn = $record;

		$query4img = "SELECT filename from onlinetestquestion where questionid IN (" .implode(", ", $qidcolumn).") AND imagetype = 1";
		$filenamearray = pg_query($db_con, $query4img);
		if(pg_num_rows($filenamearray)){
			while($row[] = pg_fetch_assoc($filenamearray));
		}
		else{
			continue;
		}
		$recordfile = $row;
		$filename[$i] = array_column($recordfile, 'filename');
		unset($rowqid);
		unset($record);
		unset($qidcolumn);
		unset($row);
		unset($recordfile);
	}
	return $filename;
}

function gettxttypeqns($qnbankids){
	$db_con = pg_connect("host = localhost dbname = sampledb user = postgres password = abc123AB") or die("Cant Find the db..!");
	for ($i=0; $i < count($qnbankids); $i++) { 
		$str = $qnbankids[$i];
		$query4qid = "SELECT questionid from onlinetestqnbankquestionmap where testquestionbankid = $str";	

		$qids = pg_query($db_con, $query4qid);
		if(pg_num_rows($qids)){
			while($rowqid[] = pg_fetch_assoc($qids));
		}
		$record = array_column($rowqid, 'questionid');
		$qidcolumn = $record;

		$query4txt = "SELECT question from onlinetestquestion where questionid IN (" .implode(", ", $qidcolumn).") AND imagetype = 0";
		$qnarray = pg_query($db_con, $query4txt);
		if(pg_num_rows($qnarray)){
			while($row[] = pg_fetch_assoc($qnarray));
		}
		else{
			continue;
		}
		$recordqn = $row;
		$qnname[$i] = array_column($recordqn, 'question');
		unset($rowqid);
		unset($record);
		unset($qidcolumn);
		unset($row);
		unset($recordqn);
	}
	return $qnname;	
}

$qnbankids = array();
$qnbankids = getTestQnBankIds($test_id);
$qntypeid = getQnTypeId($qnbankids);
$questids = getQuestionIds($qnbankids);
$qnperqnbank = questsperQnbank($qnbankids);
$filenames = getFilenames($qnperqnbank);
getImagetypeqns($qnbankids);
$filenamearray = getImagetypeqns($qnbankids);
$qnarray = gettxttypeqns($qnbankids);
//echo "<br><pre>"; print_r($qnarray); echo "</pre>";
$imgfile = "6501_4.jpg";
$maxversion = getContentversion($imgfile);
$content = dispContent($imgfile, $maxversion);

dispContent($imgfile, $maxversion);				
header('Content-Type: image/jpg');
$unes_image = pg_unescape_bytea($content);
echo $unes_image;

?>