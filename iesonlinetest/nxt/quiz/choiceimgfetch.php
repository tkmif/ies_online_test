<?php 
session_start();

$filename = $_SESSION['choice_filename'];
$testfile = "Question10153_Choice1_1.jpg";

$db_con = pg_connect("host = localhost dbname = sampledb user = postgres password = abc123AB") or die("Cant Find the db..!");

$query_maxversion = "SELECT MAX(version) from onlinetestchoicefile where filename = '$filename'";

//Get the max version...
$result_max = pg_query($db_con, $query_maxversion);
if(pg_num_rows($result_max)){
	while($row_max[] = pg_fetch_assoc($result_max));
}
$record_max = $row_max;
$max_version = implode(".", $record_max[0]);

$query = "SELECT content from onlinetestchoicefile where filename = '$filename' AND version = $max_version";

//Get the file...
$result = pg_query($db_con,$query);
if(pg_num_rows($result)){
	while($row[] = pg_fetch_assoc($result));
}
$records = $row;
$content = implode(".", $records[0]);
//print_r($content);

header('Content-Type: image/jpg');
$unes_image = pg_unescape_bytea($content);
echo $unes_image;
?>
