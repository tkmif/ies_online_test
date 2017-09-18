<?php
include 'config.php';
$array_testid = array();
//$query = "SELECT *from onlinetestdetails where testcategory = 1;";
$query = "SELECT *from fetch_array_testtable where testcategoryid = 1;";
$res = pg_query($db_con, $query);
if(pg_num_rows($res)){
	while($rows[]=pg_fetch_array($res));
}
$records = $rows;
$testid = array_column($records, 'testid');
$rand_keys = array_rand($testid, 2);
echo $testid[$rand_keys[0]];
echo "<br />";
$count = count($rows);
echo $count;
echo "<br />";
$str = "505";
$int = intval($str);

echo "the type of $str is: " . gettype($str);
echo "<br />";
echo "the type of $int is: " . gettype($int);

$test_implode = implode(",", $testid);
$test_int = intval($test_implode);


echo "<br />" . implode(",", $testid) . "<br />" . gettype($testid) . "<br />" . $test_implode . "<br />" . gettype($test_int) . "<br/>" . $test_implode_int_add;
pg_close();

$db_con = pg_connect("host = localhost dbname = sampledb user = postgres password = abc123AB") or die("Cant Find the db..!");

$qnbankids = array(3189, 3190, 3191);

$testarray = implode(",", array_map('intval', $qnbankids));
echo $testarray;

//$query_qn_typeid = "SELECT *from onlinetestquestionbank where testquestionbankid IN (".$testarray.")";
$query_qn_typeid = "SELECT *from onlinetestquestionbank where testquestionbankid IN (233,245,324)";	
	$result = pg_query($db_con, $query_qn_typeid);
	if(pg_num_rows($result)){
		echo "<br />hey im here.!" . $result;
		$testrow = pg_fetch_array($result);
		echo "<br />";
		$testqnid = array_column($testrow, 'questiontypeid');
		print_r($testqnid);

		while($row[] = pg_fetch_array($result));
		echo "<br/>hey no probs here";
		print_r($row);
	}
	$record = $row;
	$qntypeid = array_column($record, 'questiontypeid');
	print_r($qntypeid);

//echo posix_getlogin();
$kensarray = array('outer' => array('inner' => '1','inneranother' => '' ),'outeranother'=> array('inner' =>'3' ,'inneranother' => '4' ) );
echo "<pre>";
print_r($kensarray);
echo "</pre><br /><br />";

$kenstest = $kensarray;
print_r(array_filter($kenstest));

$val = array('k1', 'k2', 'k3', 'k4');
$array = array("v1", "v2", "v3", "v4");

$tst = 'k2';
function getArray($val, $array){
	for ($i=0; $i < count($val); $i++) { 
		
		foreach($array as $row){
		
	    // notice the brackets
	    $newArray = array($val[$i] => $row);
		}
	}
}
$hooyi = array();
$hooyi[] = getArray($val, $array);
echo "<br /><br /><pre>";

print_r($hooyi);

$arr = array("1", "2", "3", "4", "5");
$str= implode('.', $arr[0]);

echo $str;

session_start();
$timestamp = time();
$diff = 3600;
$hours = floor($diff / 3600) . ' : ';
$diff = $diff % 3600;
$minutes = floor($diff / 60) . ' : ';
$diff = $diff % 60;
$seconds = $diff;
echo $hours;



/*
echo "<br/><h1>Replacing Starts Here..!</h1><br />";
		while ($kenstest = current($filenames)) {
			$countqn = count($kenstest);
			echo "<br />kenstest array is: ";
			print_r($kenstest);
			for ($i=0; $i < $countqn; $i++) { 
				if($kenstest[$i] = ""){
					if($qtype = "question"){
						$qtype = "filename";
					}
					else{
						$qtype = "question";
					}
					exit();
				}

			}
			$replacearray = array_column($kenstest, $qtype);
			array_replace(current($filenames), $replacearray);
			echo "<br /><h3>Current filenames after replacement: </h3><pre>";
			print_r(current($filenames));
			echo "</pre>";
			unset($kenstest);
			unset($replacearray);
			next($filenames);
		}*/



if(file_exists("choice_images/Question10153_Choice1_1.jpg")){
	echo "file exist..!";
}
else
echo "file not found";

function temp_table_creation($namebase){

	$date = date('ymd_His');
	$tblname = $namebase . $date;

	$db_con = pg_connect("host = localhost dbname = sampledb user = postgres password = abc123AB") or die("Cant Find the db..!");
	$create_tbl_query = "CREATE TABLE " . $tblname . "(

						 questiontypeid integer NOT NULL,
						 questionid integer NOT NULL,
						 chosenchoice smallint,
						 rightanswer smallint NOT NULL,
						 CONSTRAINT pk_". $tblname . " PRIMARY KEY (questionid)
						)";

		$res_tbl = pg_query($db_con, $create_tbl_query);
		if($res_tbl){
			return $tblname;
		}
}
function temp_table_drop($tblname){
	$db_con = pg_connect("host = localhost dbname = sampledb user = postgres password = abc123AB") or die("Cant Find the db..!");
	$drpquery = "DROP TABLE " . $tblname;
	$checkquery = "SELECT DISTINCT TABLE_NAME
				FROM sampledb.INFORMATION_SCHEMA.COLUMNS
				WHERE TABLE_NAME LIKE '" . $tblname . "'";
	$tbl_exist = pg_query($db_con, $checkquery);
	if(!pg_num_rows($tbl_exist)){
		echo "Table not found..!";
	}
	else{
		pg_query($db_con,$drpquery);	
	 	echo "Table Dropped successfully..!";
		 
	}

}

/*$namebase = "user1_testid_";
$tblname = temp_table_creation($namebase);
if($tblname){
	echo "Table created successfully..!";
}*/
$folder = "quesion_images/testid";
if(!file_exists($folder)){
	mkdir($folder, 0777);
}
else{
	echo "<br /><br />Folder Alredy exists";
}

$a = array("a"=>"hey", "c"=> "there", "b"=>"yoohoo");
echo "<br />" . $a[];
?>

