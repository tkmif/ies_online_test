<?php 

/*function dbCon(){
        $con = pg_connect("host = 192.168.10.88 port=50000 dbname = ies user = ies password = welcome123") or die("Cant Find the db..!");
        return $con;
}*/
//Code for displaying an image stored in the db
	/*
	$query = "SELECT content from onlinetestfullqnfile WHERE filename = '165_1_Q-Page-1.jpg' AND block = 2;";
	$query1 = "SELECT img FROM kensinitialimgtable WHERE id=1";
	$query2 = "SELECT content from onlinetestqnadditionaldetfile WHERE filename = '1006_pass.jpg' AND block = 0 AND version = 1";

	$res = pg_query($con, $query2) or die (pg_last_error($con)); 

	$data = pg_fetch_result($res, 'content');
	header('Content-Type: image/jpg');
	$unes_image = pg_unescape_bytea($data);
	echo $unes_image;*/

	/*$file_name = "2165_1_Q-Pa.jpg";
	$img = fopen($file_name, 'wb') or die("cannot open image\n");
	fwrite($img, $unes_image) or die("cannot write image data\n");
	fclose($img);
	*/

function getBlockids($filename){
	$con = pg_connect("host = localhost port=50000 dbname = institution user = ies password = welcome123") or die("Cant Find the db..!");

    $query = "SELECT DISTINCT block from onlinetestqnadditionaldetfile WHERE filename = '$filename' ORDER BY block";
    $result = pg_query($con, $query);
    if(pg_num_rows($result)){
    	while($row[] = pg_fetch_array($result));
    }
    $record = $row;
    $blocks = array_column($row, 'block');
    return $blocks;
    unset($result);
    unset($row);
    unset($record);
    unset($blocks);
}

function getMaxVersion($filename){
	$con = pg_connect("host = localhost port=50000 dbname = institution user = ies password = welcome123") or die("Cant Find the db..!");

    $query = "SELECT version from onlinetestqnadditionaldetfile WHERE filename = '$filename'";
    $result = pg_query($con, $query);
    if(pg_num_rows($result)){
    	while($row[] = pg_fetch_array($result));
    }
    $record = $row;
    $records = array_column($record, 'version');
    //print_r($records);
    return $records;
}

function getContents($filename, $blocks, $maxversion){

    $con = pg_connect("host = localhost port=50000 dbname = institution user = ies password = welcome123") or die("Cant Find the db..!");
    $query = "SELECT content from onlinetestqnadditionaldetfile WHERE filename = '$filename' AND block IN (". implode(",", $blocks) .") AND version = '$maxversion'";

    $result = pg_query($con, $query);
    if(pg_num_rows($result)){
    	while($row[] = pg_fetch_array($result));
    }
    $records = $row;
    $contents = array_column($records, 'content');
    return $contents;
}

/*$filename = "531_pass.jpg";
$blocks = getBlockids($filename);
$versions = getMaxVersion($filename);
$maxversion =  max($versions);
$contents = getContents($filename, $blocks, $maxversion);
$concatcont = join("", $contents);

$file_path = "additional_details_images/" . $filename;
$unes_image = pg_unescape_bytea($concatcont);
$img = fopen($file_path, 'wb') or die("cannot open image\n");
fwrite($img, $unes_image) or die("cannot write image data\n");
fclose($img);*/

//junk
	/*echo "<pre>";
	print_r($contents);
	echo "</pre>";
	echo $concatcont;*/
	//print_r($maxver);
	//echo implode("", $maxver);
	/*echo "<pre>"; print_r($blocks);
	echo "</pre>";
	echo join(" ", $blocks);
	echo "<br/>" . max($blocks);
	*/

?>