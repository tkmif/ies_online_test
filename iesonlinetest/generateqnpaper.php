
<?php

//include("config.php");

function dbCon(){
		 $db_con = pg_connect("host = localhost port=50000 dbname = institution user = ies password = welcome123") or die("Cant Find the db..!");
		return $db_con;
}


//give the $cat_id as parameter..!
function choosetestid($cat_id){
	//include("config.php");
	$db_con = dbCon();
	//$cat_id = $_POST["typeofquest"];
	//$query_type_id = "SELECT  *from onlinetestdetails where testcategory = $cat_id";
	$query_type_id = "SELECT  *from onlinetestdetails where testcategory = " . $cat_id;
	//$query_type_id = "SELECT *from fetch_array_testtable where testcategoryid = 1;";
	$result = pg_query($db_con, $query_type_id);
	if(pg_num_rows($result)){
		while($rows[]=pg_fetch_array($result));
	}else{
		$noTestId = 0;
		return $noTestId;
	}
	$records = $rows;
	$testid = array_column($records, 'testid');
	/*echo "<pre>";
	print_r($testid);
	echo "</pre>";
	echo "<br>" . count($testid) . "<br>";*/
	//echo $testid[0];
	
	if(count($testid)>1){
		shuffle($testid);
		$rand_keys = array_rand($testid, 2);
		return $testid[$rand_keys[0]];
	}
	else{
		$chosen = $testid[0];
		return $chosen;
	}
	
	pg_close($db_con);
}

function countTestid($cat_id){
	//include("config.php");
	$db_con = dbCon();
	$query_type_id = "SELECT  *from onlinetestdetails where testcategory = " . $cat_id;
	$result = pg_query($db_con, $query_type_id);
	if(pg_num_rows($result)){
		while($rows[]=pg_fetch_array($result));
	}else{
		$noTestId = 0;
		return $noTestId;
	}
	$records = $rows;
	$testid = array_column($records, 'testid');
	return count($testid);
}


function getTestQnBankIds($testid){
	//include 'config.php';
	$db_con = dbCon();
	
	$query_gettestqnbankids = "SELECT *from onlinetestdynamicquestionmap where testid = $testid";
	$result = pg_query($db_con, $query_gettestqnbankids);
	if(pg_num_rows($result)){
		while ($row[] = pg_fetch_array($result));
	}else{
		$noitem = 0;
		return $noitem;
	}
	//print_r($row);
	$record = $row;
	$qnbankidcolumn = array_column($record, 'testquestionbankid');
	return $qnbankidcolumn;
	pg_close($db_con);
}

function getTestInfo(){
	global $chosen_testid;
	$db_con = dbCon();

	$queryGetInfo = "SELECT name,noofquestions,duration,maxmarks,passmarks,testcategory from  onlinetestdetails WHERE testid = ". $chosen_testid;
	$resultInfo = pg_query($db_con, $queryGetInfo);

	if(pg_num_rows($resultInfo)){
		while($rowInfo[] = pg_fetch_assoc($resultInfo));
	}
	$recordInfo = $rowInfo;
	return $recordInfo;
}

function getQnTypeId($qnbankids){
	$db_con = dbCon();

	$query_qn_typeid = "SELECT DISTINCT (questiontypeid) from onlinetestquestionbank where testquestionbankid IN (".implode(",", $qnbankids).")";
	$result = pg_query($db_con, $query_qn_typeid);
	if(pg_num_rows($result)){
		while($row[] = pg_fetch_array($result));
	}
	$record = $row;
	$qntypeid = array_column($record, 'questiontypeid');
	return $qntypeid;
	pg_close($db_con);
}

function getQuestionIds($qnbankids){
	$db_con = dbCon();

	$query = "SELECT *from onlinetestqnbankquestionmap where testquestionbankid IN (".implode(",", $qnbankids).")";
	$result = pg_query($db_con, $query);
	if(pg_num_rows($result)){
		while($row[] = pg_fetch_array($result));
	}
	$record = $row;
	$questids = array_column($record, 'questionid');
	return $questids;
	pg_close($db_con);
}

function questsperQnbank($qnbnid){
	$db_con = dbCon();
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
	pg_close($db_con);
}

function getFilenames($qnperqnbank){
	$db_con = dbCon();
	$qids = $qnperqnbank;
	/*for ($i=0; $i < count($qnperqnbank); $i++) { 
		$qids = $qnperqnbank[$i];*/
		//$query = "SELECT *from onlinetestquestion where questionid IN (" .implode(",", $qids). ")";
		$query = "SELECT CONCAT(question, filename), imagetype from onlinetestquestion where questionid IN (" .implode(", ", $qids).") AND imagetype IN (1,0)";
		$result = pg_query($db_con, $query); 
		if(pg_num_rows($result)){
			while($row[] = pg_fetch_assoc($result));
		}
		$records = $row;

		//$filenames[$i] = array_column($records, 'concat');

		$filenames = $records;
		/*unset($row);
		unset($records);
		unset($qids);
	}*/
		reset($filenames);
	//$flat_filenames = call_user_func_array('array_merge', $filenames);
	return $filenames;
	pg_close($db_con);
	
}

function getContentversion($filename){
	$db_con = dbCon();

	$query = "SELECT MAX(version) from onlinetestquestionfile where filename = '$filename'";
	$result = pg_query($db_con, $query);
	if(pg_num_rows($result)){
		while($row[] = pg_fetch_assoc($result));
	} 
	$record = $row;
	$version = $record;
	return implode('.', $version[0]);
	pg_close($db_con);
}

function dispContent($filename, $maxversion){
	$url = "quesion_images/" . $filename;
	if(!file_exists($url)){
		$db_con = dbCon();
		$query = "SELECT content from onlinetestquestionfile where filename = '$filename' AND version = " . $maxversion;

		$result = pg_query($db_con, $query);
		if(pg_num_rows($result)){
			while($row[] = pg_fetch_array($result));
		}
		$record = $row;
		$cont[] = array_column($record, 'content');
		$content = implode('.', $cont[0]);
		
		$unes_image = pg_unescape_bytea($content);
		$img = fopen($url, 'wb') or die("cannot open image\n");
	 	fwrite($img, $unes_image) or die("cannot write image data\n");
		fclose($img);
	}

	echo "<img src = " . $url . " /><br /><br /><br />";
}

function getImagetypeqns($qnbankids){
	$db_con = dbCon();
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
	$flat_filenames = call_user_func_array('array_merge', $filename);
	return $flat_filenames;
	pg_close($db_con);
}

function gettxttypeqns($qnbankids){
	$db_con = dbCon();
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
	pg_close($db_con);
}

function getChoiceContent($partialurl, $filename){
	//db connection...
	$db_con = dbCon();
	//query for the maxversion...
	$query_maxversion = "SELECT MAX(version) from onlinetestchoicefile where filename = '" . $filename . "'";

	//Get the max version...
	$result_max = pg_query($db_con, $query_maxversion);
	if(pg_num_rows($result_max)){
		while($row_max[] = pg_fetch_assoc($result_max));
	}
	$record_max = $row_max;
	$max_version = implode(".", $record_max[0]);
	unset($result_max);
	unset($row_max);
	unset($record_max);
	//query for the filename...
	$query = "SELECT content from onlinetestchoicefile where filename = '" . $filename . "' AND version = $max_version";
	//Get the file...
	$result = pg_query($db_con,$query);
	if(pg_num_rows($result)){
		while($row[] = pg_fetch_assoc($result));
	}
	$records = $row;
	$content = implode(".", $records[0]);
	//print_r($content);
	unset($result);
	unset($row);
	unset($records);

	//fix the content type as image...
	//header('Content-Type: image/jpg');
	$unes_image = pg_unescape_bytea($content);
	//echo $unes_image;
	$folder_name = "choices";
	$url = $partialurl . $filename;
	$img = fopen($url, 'wb') or die("cannot open image\n");
	fwrite($img, $unes_image) or die("cannot write image data\n");
	fclose($img);
	pg_close($db_con);
}

function fetchchoices($questid){
	$db_con = dbCon();
	$query = "select choiceid,choicetype,choice,filename from onlinetestquestionchoicemap where questionid = $questid";
	$result = pg_query($db_con,$query);
	if(pg_num_rows($result)){
		while($rows[] = pg_fetch_assoc($result));
	}
	$records = $rows;
	$choiceids = array_column($records, 'choiceid');
	$choicetype = array_column($records, 'choicetype');
	$choicetxt = array_column($records, 'choice');
	$choicefile = array_column($records, 'filename');
	
	//print_r($choicefile);
	//$_SESSION['choice_filename'] = array();
	//$_SESSION['index'] = array();

	$choice_count = count($choiceids);
	for ($i=0; $i < $choice_count; $i++) { 
		//html code for radio button..
		echo "<input type= 'radio' name = 'choice' style='margin-left:15px; margin-bottom: 20px;' value = > ";

		if($choicetype[$i] == 0){
			echo $choicetxt[$i] . "<br />";
		}
		else{
		$choice_filename = $choicefile[$i];
		//url for the file..
		$URL = "choice_images/" . $questid;
		
		if(!file_exists($URL . $choice_filename)){
			getChoiceContent($URL, $choice_filename);
		}
		echo "<img src = " . $URL . $choice_filename . " /><br /><br />";

		}


	}
	pg_close($db_con);
}

function qnpreload($qnbankids, $qntypeids, $tblname){
	$db_con = dbCon();

	$tmpTblname = $tblname . "temp";
	$create_tbl_query = "CREATE TABLE ". $tmpTblname . "(

						 questiontypeid integer NOT NULL,
						 questionid integer NOT NULL,
						 addndetid integer DEFAULT 0,
						 status smallint DEFAULT 0,
						 chosenchoice smallint,
						 CONSTRAINT pk_". $tmpTblname ." PRIMARY KEY (questionid)
						)";

// create temperory table..!
		$res_tbl = pg_query($db_con, $create_tbl_query);
		
		echo "<br/>hey temporary table is created..!";
		echo "<br />count of qntypeid: ".count($qntypeids);
	for($i = 0; $i< count($qntypeids); $i++){
		$query_qnbnk = "SELECT testquestionbankid from onlinetestquestionbank where questiontypeid = " . $qntypeids[$i] . " AND testquestionbankid IN (" . implode(",", $qnbankids) . ")";
		$result_qnbnk = pg_query($db_con,$query_qnbnk);
		if(pg_num_rows($result_qnbnk)){
			while($row_qnbnk[] = pg_fetch_assoc($result_qnbnk));
		}
		$qnbn4qntype = array_column($row_qnbnk, 'testquestionbankid');
		/*echo "\n $qntypeids[$i]";
		echo "<pre>";
		print_r($qnbn4qntype);
		echo "</pre>";*/
		/*echo "<br /><h2>For questiontypeid: ".$qntypeids[$i]." </h2>";
		isAddnDet($qnbn4qntype);*/

		$query2 = "INSERT INTO ". $tmpTblname . " (questionid,questiontypeid)
				SELECT DISTINCT a.questionid, b.questiontypeid 
				from onlinetestqnbankquestionmap a, onlinetestquestionbank b
				where a.testquestionbankid IN (" . implode(",", $qnbn4qntype) . ") 
				AND b.testquestionbankid IN (" . implode(",", $qnbn4qntype) . ") 
				AND b.questiontypeid = " . $qntypeids[$i];
		pg_query($db_con, $query2);
		unset($qnbn4qntype);
		unset($row_qnbnk);
		unset($result_qnbnk);

		echo "<br/> the questions in ".$qntypeids[$i]." has been inserted.>!";

	}	

	pinAddnId($tmpTblname);
	shuffleQuests($tblname, $qntypeids);
	/*$res = pg_query($db_con, "SELECT questiontypeid, questionid FROM ".$tblname);
	while($row[] = pg_fetch_assoc($res));
	echo "<pre>";
	print_r($row);
	echo "</pre>";*/
	pg_close($db_con);
}

function isAddnDet($qnbnid){
	$db_con = dbCon();
	$counter = 0;
	for ($i=0; $i < count($qnbnid); $i++) { 
		$queryAdd = "SELECT additionaldetailsid FROM onlinetestqnbnadditionaldetmap WHERE questionbankid = ".$qnbnid[$i];
		
		$resAdd = pg_query($db_con, $queryAdd);
		if(pg_num_rows($resAdd)){
			while($row[]=pg_fetch_assoc($resAdd));
			echo "<h3>The questionbankid: ".$qnbnid[$i]." </h3>";
		}else{
			$row = "Nothing to show >>";
		}
	echo "<pre>";
	print_r($row);
	echo "</pre>";
	echo "<br>".$counter;
	unset($row);
	unset($resAdd);	
	}
	
}
function pinAddnId($tmpTblname){
	$db_con = dbCon();
	$queryPin = "UPDATE ".$tmpTblname." SET addndetid = onlinetestqnbnadditionaldetmap.additionaldetailsid FROM onlinetestqnbnadditionaldetmap WHERE ".$tmpTblname.".questionid = onlinetestqnbnadditionaldetmap.questionid";
	$resPin = pg_query($db_con, $queryPin);
}

function shuffleQuests($tblname, $qntypeids){
	$db_con = dbCon();
	global $qnbankids;

	$tmpTblname = $tblname."temp";
// start a counter with the number of question types..!
	for($i = 0; $i< count($qntypeids); $i++){
		
		$queryAddn = "SELECT DISTINCT addndetid FROM ".$tmpTblname. " WHERE questiontypeid= ".$qntypeids[$i];
		$resAddn = pg_query($db_con, $queryAddn);
		if(pg_num_rows($resAddn)){
			while($row[] = pg_fetch_assoc($resAddn));
			$addDet = array_column($row, 'addndetid');
		}
		else{
			echo "<br/>NO ADDN DETAILS RECORDED..!";
		}
		if($addDet!=0){
			echo "<h1>HEY I WAS HERE..!!</h1>";
			for ($j=0; $j < count($addDet); $j++) {
//get the questions for the questiontype[i] and Let's Shuffle..! 
				$queryShuffleGrup =	"INSERT INTO ".$tblname. " (questiontypeid, questionid) SELECT questiontypeid, questionid FROM ".$tmpTblname." WHERE questiontypeid= ".$qntypeids[$i]." AND addndetid= ".$addDet[$j]." ORDER BY random();";
				pg_query($db_con,$queryShuffleGrup);
			}	
		}
		else{

				/*$queryShuffle =	"INSERT INTO ".$tblname. " (questiontypeid, questionid) SELECT questiontypeid, questionid FROM ".$tmpTblname." WHERE questiontypeid= ".$qntypeids[$i]." AND addndetid is null ORDER BY random();";
				pg_query($db_con,$queryShuffle);*/
		}

	}
	echo "<br/>table shuffled.>!";
		// drop the temporary table..!
		$queryDrop = "DROP TABLE ".$tmpTblname;
		pg_query($db_con, $queryDrop);
}

function loadQuestsOfType($qt){
	$db_con = dbCon();
	$imgtype_flag = "imagetype";
	$concat_flag = "concat";
	global $tmptableexample, $qnbankids;
	$tmp_tblname = $tmptableexample;
	$qntypeid = $qt;


	$qnbankid_for_qntypeidchosen = qnbankid_for_qntypeidchosen($qntypeid, $qnbankids);
	//echo "<br />" . $qnbankid_for_qntypeidchosen[0] . "<br />";
		$query1 = "SELECT * FROM " . $tmp_tblname . " where questiontypeid = " . $qntypeid;
		$result1 = pg_query($db_con, $query1);

		if(pg_num_rows($result1)){
			while($row[] = pg_fetch_assoc($result1));	
				//if(status == 0 || status == 1)
		}
		$record = array_column($row, 'questionid');
		$questionids_for_qntype = $record;
		return $questionids_for_qntype;
}

function disp_qnpaper($qntypeid,$qnum){
	$db_con = dbCon();
	$imgtype_flag = "imagetype";
	$concat_flag = "concat";
	global $tmptableexample, $qnbankids;
	$tmp_tblname = $tmptableexample;


	$qnbankid_for_qntypeidchosen = qnbankid_for_qntypeidchosen($qntypeid, $qnbankids);
	//echo "<br />" . $qnbankid_for_qntypeidchosen[0] . "<br />";
		$query1 = "SELECT * FROM " . $tmp_tblname . " where questiontypeid = " . $qntypeid. " ORDER BY id OFFSET ". $qnum ." LIMIT 1";
		$result1 = pg_query($db_con, $query1);

		if(pg_num_rows($result1)){
			while($row[] = pg_fetch_assoc($result1));	
				//if(status == 0 || status == 1)
		}
		$record = array_column($row, 'questionid');
		$questionids_for_qntype = $record;
		$filenames_for_qntype = getFilenames($questionids_for_qntype);

		for($i = 0; $i < count($questionids_for_qntype); $i++){
			if(isAdditionalDetailsAvailable($questionids_for_qntype[$i])){
				$addn_det_id = getAddnDetailsId($questionids_for_qntype[$i]);
				$addn_details = getAdditionalDetails($addn_det_id);
				showAdditionalDetails($addn_details);
			}
			if($filenames_for_qntype[$i][$imgtype_flag] == 0){
				echo $filenames_for_qntype[$i][$concat_flag] . "<br /><br />";
				fetchchoices($questionids_for_qntype[$i]);
			}
			else{
				$imgfile = $filenames_for_qntype[$i][$concat_flag];
				$maxversion = getContentversion($imgfile);
				$content = dispContent($imgfile, $maxversion);
				fetchchoices($questionids_for_qntype[$i]);
			}
		}
		//pg_close($db_con);
}

function qnbankid_for_qntypeidchosen($questiontypeidexample, $qnbankids){

		$db_con = dbCon();
		if(count($qnbankids)>1){
		
		  $query1 = "SELECT testquestionbankid from onlinetestquestionbank where testquestionbankid IN (".implode(",", $qnbankids).") AND questiontypeid = " . $questiontypeidexample;

		}
		else if(count($qnbankids)==1){
		  $query1 = "SELECT testquestionbankid from onlinetestquestionbank where testquestionbankid = ".$qnbankids[0]." AND questiontypeid = " . $questiontypeidexample;
		}
		
		$result1 = pg_query($db_con,$query1);
		if(pg_num_rows($result1)){
			while($row[] = pg_fetch_assoc($result1));
			$record = $row;
			$qnbnkids = array_column($record, 'testquestionbankid');
			return $qnbnkids;
		}
		
		
		pg_close($db_con);
}

function isAdditionalDetailsAvailable($question_id){

	$db_con = dbCon();
	//$query = "SELECT * from onlinetestqnbnadditionaldetmap where questionbankid IN (" . implode(',', $qnbankid_for_qntypeidchosen) . ")" ;
	$query = "SELECT * from onlinetestqnbnadditionaldetmap where questionid = $question_id" ;
	$flag_result = pg_query($db_con, $query);
	if(pg_num_rows($flag_result)){
		return true;
	}
	else{
		return false;
	}
	pg_close($db_con);
}

function getAddnDetailsId($question_id){

	$db_con = dbCon();

	$query = "SELECT * from onlinetestqnbnadditionaldetmap where questionid = $question_id";
	$result = pg_query($db_con, $query);
	if(pg_num_rows($result)){
		while($row[] = pg_fetch_assoc($result));
	}
	$record = $row;
	$addn_det_array = array_column($record, 'additionaldetailsid');
	$addn_det_id = implode(',', $addn_det_array);
	return $addn_det_id;
	pg_close($db_con);
}

function getAdditionalDetails($addn_det_id){
	$db_con = dbCon();
	$query = "SELECT * FROM onlinetestqnbnadditionaldet where detailsid = " . $addn_det_id;

	$result = pg_query($db_con, $query);
	if(pg_num_rows($result)){
		while ($row[] = pg_fetch_assoc($result));
	}
	$record = $row;
	$additionalDetailsArray = $record;
	$additionalDetails = $additionalDetailsArray[0];
	return $additionalDetails;
	pg_close($db_con);
}

function showAdditionalDetails($addn_details){

	$instructions = $addn_details["instructions"];
	$passagetype = $addn_details["passagetype"];
	echo "<br />" . $instructions . "<br />";
	if($passagetype == 1){
		$filename = $addn_details["filename"];
		$file_path = "additional_details_images/" . $filename;
		if(!file_exists($file_path)){	
			require "imgupload.php"; 
		
			$blocks = getBlockids($filename);
			$versions = getMaxVersion($filename);
			$maxversion =  max($versions);
			$contents = getContents($filename, $blocks, $maxversion);
			$concatcont = join("", $contents);

			$unes_image = pg_unescape_bytea($concatcont);
			$img = fopen($file_path, 'wb') or die("cannot open image\n");
			fwrite($img, $unes_image) or die("cannot write image data\n");
			fclose($img);
		}
		echo "<br /><img src =" . $file_path . " algn = 'center' /><br />";  
	}
	else
	{
		$passagetxt = $addn_details["passage"];
		echo "<br />" . $passagetxt . "<br />";
	}
}

function setStatus($qId, $statusId){
	$db_con = dbCon();
	global $tmptableexample;
	$queryUpdate = "UPDATE $tmptableexample SET status = $statusId WHERE questionid = $qId";
	$queryCheck = "SELECT status FROM $tmptableexample WHERE questionid = $qId";

	$resUpdate = pg_query($db_con, $queryUpdate);
	$resCheck = pg_query($db_con, $queryCheck);

	if(pg_num_rows($resCheck)){
		while($rowCheck[] = pg_fetch_assoc($resCheck));
	}
	$checkStatus = $rowCheck["status"];
	if($checkStatus == $statusId){
		echo "update successfull";
	} 
	else{
		echo "update failed";
	}
	pg_close($db_con);
}
function setSections(){
	global $tmptableexample;

	$db_con = dbCon();
	$queryGetQid = "SELECT DISTINCT questiontypeid from " . $tmptableexample;
	

	$resQid = pg_query($db_con,$queryGetQid);
	if(pg_num_rows($resQid)){
		while($rowQid[] = pg_fetch_assoc($resQid));
	}
	$recQid = $rowQid;
	$Qid = array_column($recQid, 'questiontypeid');

	$queryGetQtype = "SELECT questiontypeid, questiontype FROM onlinetestquestiontype WHERE questiontypeid IN (" . implode(',', $Qid) . ")";
	$resQtype = pg_query($db_con,$queryGetQtype);
	if(pg_num_rows($resQtype)){
		while($rowQtype[] = pg_fetch_assoc($resQtype));
	}
	$recQtype = $rowQtype;
	$Qtype = array_column($recQtype, 'questiontype');
	$iteration = count($Qtype);

	for($i = 0; $i<$iteration; $i++){
		echo '<input type = "button" name = "' . $Qid[$i] . '" value = "'. $Qtype[$i] . '" class= "subject-name" onclick = "showQuestOnRequest(' . $Qid[$i] . '); showNavigationOnRequest('. $Qid[$i] .');" />';
	}

	pg_close($db_con);
}

function showNavigationButtons($qt){
	$questions = loadQuestsOfType($qt);
	$count = count($questions);
	$no_of_rows = ceil($count/4);
	for($i=0;$i<$count;$i++){
		$j = $i+1;
		echo '<button class = "navButs" id="navButs" onclick = "showQuest('. $qt .','. $i .'); changeQnum('. $j .')">'. $j .'</button>';
	}
}

/*echo "THIS IS THE CHOSEN TEST ID <br />";
	$chosen_testid = choosetestid();
	echo $chosen_testid . "<br />";

	$testtestid = $chosen_testid;
	echo "<pre>";	
	$qnbankids = array();*/
$egtestid = 224;
//echo "THIS IS THE QUESTION BANK IDs... <br />";
	$qnbankids = getTestQnBankIds($egtestid);
	/*echo "<br /><pre>";
	print_r($qnbankids);
	echo "<br /></pre><br />";
	$implodedlist = implode(",", $qnbankids);

	echo $implodedlist . "<br />";

	echo count($qnbankids) . "<br />";

echo "THIS IS THE QUESTION TYPE IDs...<br />";
	$qntypeid = getQnTypeId($qnbankids);
	echo "<br /><pre>";
	print_r($qntypeid);
	echo "<br /></pre><br />";*/

	//$tmptableexample = "doe223160811_121350";
	//$questiontypeidexample = 13;
	//disp_qnpaper($questiontypeidexample);

/*echo "THIS IS THE QUESTION IDs...<br />";
	$questids = getQuestionIds($qnbankids);
	echo "<br />";
	$count = count($questids);
	echo $count;
	echo "<br /> <pre>";
	print_r($questids);
	echo "<br />";*/

/*$qnbnid = array(215, 217, 220);
questsperQnbank($qnbankids);
echo "<br />";
echo "<br />";
echo "THIS IS THE QUESTIONS PER QUESTION BANK IDs...<br />";
	$qnperqnbank = questsperQnbank($qnbankids);

	//echo count($qnperqnbank);
	echo "<pre>";
	print_r($qnperqnbank);
	echo "</pre>";*/

/*echo "THIS IS THE CORRESPONDING FILENAMES...<br />";
	$filenames = getFilenames($questids);
	echo "<br/> <pre>";
	print_r($filenames);
	echo "<br />";*/
	//require ("testupload.php");
/*
getImagetypeqns($qnbankids);
echo "<br />";*/

/*echo "THIS IS THE FILES THAT ARE IN IMAGE FORMAT WITHIN THIS TEST ID...";
	$filenamearray = getImagetypeqns($qnbankids);
	echo "<pre>";
	print_r($filenamearray);
	echo "</pre><br />";*/

/*echo "<br />THIS IS THE QUESTIONS THAT ARE IN TEXT FORMAT WITHIN THIS TEST ID...<br />";
	$qnarray = gettxttypeqns($qnbankids);
	echo "<pre>";
	print_r($qnarray);
	echo "</pre>";*/
//echo "THIS IS QUESTION ID S AND QUESTION TYPE ID MAP<br />";

//qnpreload($qnbankids,$qntypeid);

/*header('Content-Type: image/jpg');
$unes_image = pg_unescape_bytea($content);
echo $unes_image;
//display qn type id*/
	/*
	echo "<br />";
	echo join("", $qntypeid);
	*/
/*	$imgfile = "6662_139.jpg";
	$maxversion = getContentversion($imgfile);
	//THIS IS THE CONTENTS  OF THE QUESION IN $imgfile...
	$content = dispContent($imgfile, $maxversion);
	$questtestid = "6662";
//echo "THIS IS THE CHOICES OF QUEST ID " . $questtestid . " ...<br />";
	fetchchoices($questtestid);*/


?>