
<?php
 session_start();
 	$tmptableexample = $_SESSION['tblname'];
 	$chosen_testid = $_SESSION['test_id'];
//include("config.php");

function dbCon(){
		$db_con = pg_connect("host = localhost port=50000 dbname = institution user = ies password = welcome123") or die("Cant Find the db..!");
		return $db_con;
}

function getCategoryName($catId){
	$db_con = dbCon();
	$query = "Select testcategoryid, testcategory from onlinetestcategory where testcategoryid= ".$catId;
	$res = pg_query($db_con, $query);
	if(pg_num_rows($res)){
		while($rs[] = pg_fetch_array($res));
	}
	$recordCat = array_column($rs, 'testcategory');
	$testcategoryName = $recordCat;
	return $testcategoryName;
}

function getCatId($testId){
	$db_con = dbCon();
	$queryCatId = "SELECT testcategory FROM onlinetestdetails WHERE testid= ". $testId;
	$resultCatId = pg_query($db_con, $queryCatId);
	if(pg_num_rows($resultCatId)){
		while($rowCatId[]= pg_fetch_assoc($resultCatId));
	}
	$recordCatId = array_column($rowCatId, 'testcategory');
	$catId = $recordCatId[0];
	return $catId;
}

function getTestIdName($testid){
	$db_con = dbCon();
	$queryTestName = "SELECT name FROM onlinetestdetails WHERE testid= ". $testid;

	$resultName = pg_query($db_con,$queryTestName);
	if(pg_num_rows($resultName)){
		while($rowName[] = pg_fetch_assoc($resultName));
	}
	$recordName = array_column($rowName, 'name');
	$testName = $recordName[0];
	return $testName;
}

//get the remamining time of the current test...
function getRemTime($tmptableexample){
	$db_con = dbCon();
	$queryRemTime = "SELECT timeremaining FROM onlinetesttablerepos WHERE tablename= '".$tmptableexample."' AND status = 0";
	$resultRemTime = pg_query($db_con, $queryRemTime);
	if(pg_num_rows($resultRemTime)){
		while($rowRemTime[] = pg_fetch_assoc($resultRemTime));
	}
	$recordRemTime = array_column($rowRemTime, 'timeremaining');
	$remTime = $recordRemTime[0];
	return $remTime;
}

/*$rem = getRemTime($tmptableexample);
echo $rem ;*/
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
	echo count($testid);
	if(count($testid)>1){
	shuffle($testid);
	$rand_keys = array_rand($testid, 2);
	$chosen = $testid[$rand_keys[0]];
	return $chosen;
	}
	else if(count($testid) == 1){
		$chosen = $testid[0];
		return $chosen;
	}
	
	pg_close($db_con);
}

//$chosen = choosetestid(14);
/*$qbnkid = getTestQnBankIds($chosen);
echo $qbnkid;*/

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
	echo count($testid);
}

function getTestInfo($chosen_testid){
	//global $chosen_testid;
	$db_con = dbCon();

	$queryGetInfo = "SELECT name,noofquestions,duration,maxmarks,passmarks,testcategory from  onlinetestdetails WHERE testid = ". $chosen_testid;
	$resultInfo = pg_query($db_con, $queryGetInfo);

	if(pg_num_rows($resultInfo)){
		while($rowInfo[] = pg_fetch_assoc($resultInfo));
	}
	$recordInfo = $rowInfo;
	return $recordInfo;
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
	if($record != null){
		$qnbankidcolumn = array_column($record, 'testquestionbankid');
	}
	else{
		$qnbankidcolumn = 0;
	}
	return $qnbankidcolumn;
	pg_close($db_con);
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

function getFilenameReview($qnid){
	$db_con = dbCon();
	$qids = $qnid;
	/*for ($i=0; $i < count($qnperqnbank); $i++) { 
		$qids = $qnperqnbank[$i];*/
		//$query = "SELECT *from onlinetestquestion where questionid IN (" .implode(",", $qids). ")";
		$query =  "SELECT CONCAT(question, filename), imagetype from onlinetestquestion where questionid = $qids AND imagetype IN (1,0)";
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
		// reset($filenames);
	//$flat_filenames = call_user_func_array('array_merge', $filenames);
	return $filenames;
	
}

function getFilenames($qnperqnbank){
	$db_con = dbCon();
	$qids = $qnperqnbank;
	/*for ($i=0; $i < count($qnperqnbank); $i++) { 
		$qids = $qnperqnbank[$i];*/
		//$query = "SELECT *from onlinetestquestion where questionid IN (" .implode(",", $qids). ")";
		$query =  "SELECT CONCAT(question, filename), imagetype from onlinetestquestion where questionid IN (" .implode(", ", $qids).") AND imagetype IN (1,0)";
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
		// reset($filenames);
	//$flat_filenames = call_user_func_array('array_merge', $filenames);
	return $filenames;
	
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

	echo "<img src = '" . $url . "' style= 'max-width:1070px;width:auto;' /><br /><br /><br />";
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
	global $tmptableexample;
	$queryCC = "SELECT chosenchoice FROM $tmptableexample where questionid = $questid";
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
	
	$name = "choice".$questid;
	$qt = getQuestType($questid);

	$resultCC = pg_query($db_con,$queryCC);
	if(pg_num_rows($resultCC)){
		while($rowCC[]=pg_fetch_assoc($resultCC));
	}
	$recordCC = array_column($rowCC, 'chosenchoice');
	$CC = $recordCC[0];
	unset($resultCC);
	unset($rowCC);
	unset($recordCC);
	//print_r($choicefile);
	//$_SESSION['choice_filename'] = array();
	//$_SESSION['index'] = array();

	$choice_count = count($choiceids);
	echo "<div id = 'radio-container'>";
	echo "<form action='' method='post' name = 'choiceForm' id = 'choiceForm'>";
	//echo $CC;
	for ($i=0; $i < $choice_count; $i++) { 
		//html code for radio button..
		$j = $i+1;
		if($j==$CC){
			echo "<input type= 'radio' class = 'radio_class' name = 'choice' id = ". $questid . $j ." style='margin-left:15px; margin-bottom: 20px;' value = " . $j . " onclick = 'storeChoice(" . $questid . "," . $j .")' style='height:5px; width:5px; vertical-align: middle;' checked='checked' > ";
		}
		else{
			echo "<input type= 'radio' class = 'radio_class' name = 'choice' id = ". $questid . $j ." style='margin-left:15px; margin-bottom: 20px;' value = " . $j . " onclick = 'storeChoice(" . $questid . "," . $j .")' style='height:5px; width:5px; vertical-align: middle;'> ";
		}

		if($choicetype[$i] == 0){
			echo "&nbsp;&nbsp;&nbsp;". $choicetxt[$i] . "<br />";
		}
		else{
		$choice_filename = $choicefile[$i];
		//url for the file..
		$URL = "choice_images/" . $questid;
		
		if(!file_exists($URL . $choice_filename)){
			getChoiceContent($URL, $choice_filename);
		}
		echo "&nbsp;&nbsp;&nbsp; <img src = '" . $URL . $choice_filename . "' /><br /><br />";

		}


	}
	echo "</form>";
	echo "</div>";
	//echo $questid.$j;
}

function qnpreload($qnbankids, $qntypeids, $tblname){

	$db_con = dbCon();
	for($i = 0; $i< count($qntypeids); $i++){
		$query_qnbnk = "SELECT testquestionbankid from onlinetestquestionbank where questiontypeid = " . $qntypeids[$i] . " AND testquestionbankid IN (" . implode(",", $qnbankids) . ")";
		$result_qnbnk = pg_query($db_con,$query_qnbnk);
		if(pg_num_rows($result_qnbnk)){
			while($row_qnbnk[] = pg_fetch_assoc($result_qnbnk));
		}
		$qnbn4qntype = array_column($row_qnbnk, 'testquestionbankid');

		$query2 = "INSERT INTO ". $tblname . " (questionid,questiontypeid)
				SELECT DISTINCT a.questionid, b.questiontypeid
				from onlinetestqnbankquestionmap a, onlinetestquestionbank b
				where a.testquestionbankid IN (" . implode(",", $qnbn4qntype) . ") 
				AND b.testquestionbankid IN (" . implode(",", $qnbn4qntype) . ") 
				AND b.questiontypeid = " . $qntypeids[$i];
		pg_query($db_con, $query2);
		unset($qnbn4qntype);
		unset($row_qnbnk);
		unset($result_qnbnk);
	}	
	pg_close($db_con);
}

function getQuestType($questid){
	$db_con = dbCon();
	global $tmptableexample;
	$queryGetQt = "SELECT * FROM " . $tmptableexample . " where questionid = " . $questid;

	$resultGetQt = pg_query($db_con, $queryGetQt);
	if(pg_num_rows($resultGetQt)){
		while($rowGetQt[] = pg_fetch_assoc($resultGetQt));
	}
	$recordQt = array_column($rowGetQt, 'questiontypeid');
	$qt = $recordQt[0];
	return $qt;
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
	$qnuminc = $qnum + 1;


	$qnbankid_for_qntypeidchosen = qnbankid_for_qntypeidchosen($qntypeid, $qnbankids);
	//echo "<br />" . $qnbankid_for_qntypeidchosen[0] . "<br />";
		$query1 = "SELECT * FROM " . $tmp_tblname . " where questiontypeid = " . $qntypeid . " ORDER BY id OFFSET ". $qnum ." LIMIT 1";
		$result1 = pg_query($db_con, $query1);

		if(pg_num_rows($result1)){
			while($row[] = pg_fetch_assoc($result1));	
				//if(status == 0 || status == 1)
		}
		else{
			$endOf = 0;
			echo $endOf;
			//echo "<script>document.getElementById('but". $qnuminc ."').style.display = 'none';</script>";
			exit();
		}
		$record = array_column($row, 'questionid');
		$questionids_for_qntype = $record;
		$filenames_for_qntype = getFilenames($questionids_for_qntype);

		for($i = 0; $i < count($questionids_for_qntype); $i++){
            // echo "$questionids_for_qntype[$i]<br />";
			if(isAdditionalDetailsAvailable($questionids_for_qntype[$i])){
				$addn_det_id = getAddnDetailsId($questionids_for_qntype[$i]);
				$addn_details = getAdditionalDetails($addn_det_id);
				showAdditionalDetails($addn_details);
			}
			if($filenames_for_qntype[$i][$imgtype_flag] == 0){
				echo "<span style= 'font-face:sans-serif;font-size: 15px; font-weight: normal;'>" . $filenames_for_qntype[$i][$concat_flag] . "</span><br /><br />";
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
		$query1 = "SELECT testquestionbankid from onlinetestquestionbank where testquestionbankid IN (".implode(",", $qnbankids).") AND questiontypeid = " . $questiontypeidexample;

		$result1 = pg_query($db_con,$query1);
		if(pg_num_rows($result1)){
			while($row[] = pg_fetch_assoc($result1));
		}
		$record = $row;
		$qnbnkids = array_column($record, 'testquestionbankid');
		return $qnbnkids;
		//pg_close($db_con);
}

function getCount($qnTypeId){
	$db_con = dbCon();
	global $tmptableexample;
	$query1 = "SELECT * FROM " . $tmptableexample . " where questiontypeid = " . $qnTypeId . " order by id";
		$result1 = pg_query($db_con, $query1);

		if(pg_num_rows($result1)){
			while($row[] = pg_fetch_assoc($result1));	
				//if(status == 0 || status == 1)
		}
		$record = array_column($row, 'questionid');
		$questionids_for_qntype = $record;
		return count($questionids_for_qntype);
}

function dispAllQnpaper($qntypeid){
	$db_con = dbCon();
	$imgtype_flag = "imagetype";
	$concat_flag = "concat";
	global $tmptableexample, $qnbankids;
	$tmp_tblname = $tmptableexample;
	


	$qnbankid_for_qntypeidchosen = qnbankid_for_qntypeidchosen($qntypeid, $qnbankids);
	//echo "<br />" . $qnbankid_for_qntypeidchosen[0] . "<br />";
		$query1 = "SELECT * FROM " . $tmp_tblname . " where questiontypeid = " . $qntypeid . " ORDER BY id";
		$result1 = pg_query($db_con, $query1);

		if(pg_num_rows($result1)){
			while($row[] = pg_fetch_assoc($result1));	
				//if(status == 0 || status == 1)
		}
		else{
			$endOf = 0;
			echo $endOf;
			//echo "<script>document.getElementById('but". $qnuminc ."').style.display = 'none';</script>";
			exit();
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
				echo "<span style= 'font-face:sans-serif;font-size: 15px; font-weight: normal;'>" . $filenames_for_qntype[$i][$concat_flag] . "</span><br /><br />";
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
	// pg_close($db_con);
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
	//pg_close($db_con);
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
	//pg_close($db_con);
}

function showAdditionalDetails($addn_details){

	$instructions = $addn_details["instructions"];
	$passagetype = $addn_details["passagetype"];
	echo "<br />" . $instructions . "<br />";
	if($passagetype == 1){
		$filename = $addn_details["filename"];
		$file_path = "additional_details_images/" . $filename;
		if(!file_exists($file_path)){	
			include_once "imgupload.php"; 
		
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
		echo "<br /><img src ='". $file_path ."' style= 'max-width:1000px;width:auto;' /><br />";  
	}
	else
	{
		$passagetxt = $addn_details["passage"];
		echo "<br /><span style= 'font-face:sans-serif; font-size: 15px; font-weight: bold;'>" . $passagetxt . "</span><br />";
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
	$queryGetQid = "SELECT DISTINCT questiontypeid from " . $tmptableexample . " ORDER BY questiontypeid";

	$resQid = pg_query($db_con,$queryGetQid);
	if(pg_num_rows($resQid)){
		while($rowQid[] = pg_fetch_assoc($resQid));
		$recQid = $rowQid;
		$Qid = array_column($recQid, 'questiontypeid');
	}
	else{
	  echo "<h3>Saved exam does not exist..!</h3> <h4>Please start a new test..</h4>";
	  exit();
	}

	$queryGetQtype = "SELECT questiontypeid, questiontype FROM onlinetestquestiontype WHERE questiontypeid IN (" . implode(',', $Qid) . ") ORDER BY questiontypeid";
	$resQtype = pg_query($db_con,$queryGetQtype);
	if(pg_num_rows($resQtype)){
		while($rowQtype[] = pg_fetch_assoc($resQtype));
	}
	$recQtype = $rowQtype;
	$Qtype = array_column($recQtype, 'questiontype');
	$iteration = count($Qtype);
	$_SESSION['frstSec']= $Qtype[0];
	$i = 0;
	$questid = getQuestid($Qid[$i], 0);
	$choiceId = getChosenChoice($questid);
	if($iteration > 5){
		$limit = round($iteration/5);
		$numperslide = round($iteration/$limit);
		if($numperslide > 5){
			$numperslide = 5;
		}
	}else{
		$numperslide = 0;
	}
		echo '<li>
				<button name = "' . $Qid[$i] . '" value = "'. $Qtype[$i] . '" id= "frstSec" title= "" class= "tooltip" onclick = "showQuestOnRequest(' . $Qid[$i] . ', ' . $choiceId . ', 0 ); showNavigationOnRequest('. $Qid[$i] .');">'.$Qtype[$i].'
				<span class="tooltiptext" id = "popCount'.$Qid[$i].'">'.$Qtype[$i].'</span></button>';
		echo "<script>document.getElementById('frstSec').click();</script>";

		for($i = 1; $i<$iteration; $i++){
			$questid = getQuestid($Qid[$i], 0);
			$choiceId = getChosenChoice($questid);

			if($numperslide != 0){
				if($i%$numperslide == 0){
					echo  '</li><li>';
				}
			}

			echo '<button name = "' . $Qid[$i] . '" id = "' . $Qid[$i] . '" value = "'. $Qtype[$i] . '" class= "tooltip" onclick = "showQuestOnRequest(' . $Qid[$i] . ', ' . $choiceId . ', ' . $i . '); showNavigationOnRequest('. $Qid[$i] .');" >'.$Qtype[$i].'<span class="tooltiptext" id = "popCount'.$Qid[$i].'">'.$Qtype[$i].'</span></button>';
		}
echo '</li>';

	pg_close($db_con);
}

function showNavigationButtons($qt){
	//error_reporting(E_ALL & ~E_NOTICE);
	global $tmptableexample;
	$db_con = dbCon();
	$questions = loadQuestsOfType($qt);
	$count = count($questions);
	$no_of_rows = ceil($count/4);

//load the questionid and status belongs to the $qt..
	$queryList = "SELECT questionid, status FROM $tmptableexample where questiontypeid = $qt order by id";
	$resultList = pg_query($db_con, $queryList);
	if(pg_num_rows($resultList)){
		while($rowList[] = pg_fetch_assoc($resultList));
	}
	$infoList = $rowList;
	/*echo "<pre>";
	print_r($infoList);*/

	for($i=0;$i<$count;$i++){
		$j = $i+1;
		$questid = getQuestid($qt, $i);
		$choiceId = getChosenChoice($questid);
		$b = getStatus($questid);

//sort the navigation buttons according to the status..
		//if($a==$questid){ setVisited('. $questid . ',' . $i .');
			if($b == 0){
				echo '<button class = "navButs" id="navButs'. $i .'" name = "navButs" onclick = "showQuest('. $qt .','. $i . ',' . $choiceId .','. $count .');">'. $j .'</button>';
			}
			else if($b == 1){
				echo '<button class = "answered" id="navButs'. $i .'" name = "navButs" onclick = "showQuest('. $qt .','. $i . ',' . $choiceId .','. $count .');">'. $j .'</button>';
			}
			else if($b == 2){
				echo '<button class = "marked4review" id="navButs'. $i .'" name = "navButs" onclick = "showQuest('. $qt .','. $i . ',' . $choiceId .','. $count .');">'. $j .'</button>';
			}
			else if($b == 3){
				echo '<button class = "ansmarked" id="navButs'. $i .'" name = "navButs" onclick = "showQuest('. $qt .','. $i . ',' . $choiceId .','. $count .');">'. $j .'</button>';
			}
			else if($b == 4){
				echo '<button class = "visited" id="navButs'. $i .'" name = "navButs" onclick = "showQuest('. $qt .','. $i . ',' . $choiceId .','. $count .');">'. $j .'</button>';
			}
		//}
	//}

		/*echo '<button class = "navButs" id="navButs'. $i .'" name = "navButs" onclick = "showQuest('. $qt .','. $i . ',' . $choiceId .')">'. $j .'</button>';
*/
		
		
		unset($resultChoice);
		unset($rowChoice);
		unset($recordChoice);
	}
	pg_close($db_con);
}

function getChosenChoice($questid){
	global $tmptableexample;
	$db_con = dbCon();
		$queryChoice = "SELECT chosenchoice FROM $tmptableexample where questionid = $questid";
		$resultChoice = pg_query($db_con,$queryChoice);
		
		if(pg_num_rows($resultChoice)){
			while($rowChoice[] = pg_fetch_assoc($resultChoice)); 
		
			$recordChoice = array_column($rowChoice, 'chosenchoice');
			$chosen = $recordChoice[0];
		}if($chosen==null){
			$choiceId = 0;
		}else{
			$choiceId = $questid.$chosen;
		}
		return $choiceId;
}

function getStatus($questid){
	global $tmptableexample;
	$db_con = dbCon();
		$queryStatus = "SELECT status FROM $tmptableexample where questionid = $questid";
		$resultStatus = pg_query($db_con,$queryStatus);
		
		if(pg_num_rows($resultStatus)){
			while($rowStatus[] = pg_fetch_assoc($resultStatus));
		} 
		
			$recordStatus = array_column($rowStatus, 'status');
			$status = $recordStatus[0];
		return $status;
}

function setVisited($questid){
	global $tmptableexample;
	$db_con = dbCon();
	$curStatus = getStatus($questid);
	$chosenChoice = getChosenChoice($questid);

	if($curStatus==0 || $curStatus != 2 && $chosenchoice == null){
		$queryV = "UPDATE " . $tmptableexample . " SET status = '4' WHERE questionid = " . $questid;
		pg_query($db_con, $queryV);	
	}
	
}

function storeChoice($questid, $choice_chosen){
	global $tmptableexample;
	$db_con = dbCon();
	$choice = $choice_chosen;
	$questid = $questid;

	$query = "UPDATE " . $tmptableexample . " SET chosenchoice = " . $choice . " WHERE questionid = " . $questid;
	//echo " choice num: " . $choice_chosen . "  question id: " . $questid . "  table name: " . $tmptableexample;
	$result = pg_query($db_con, $query);
	pg_close($db_con);
}

function statusUpdate($questType, $qnum, $status){
	global $tmptableexample, $qnbankids;
	$db_con = dbCon();

	$qnbankid_for_qntypeidchosen = qnbankid_for_qntypeidchosen($questType, $qnbankids);
	//echo "<br />" . $qnbankid_for_qntypeidchosen[0] . "<br />";
	$questionids_for_qntype = getQuestid($questType, $qnum);

/*	$query3 = "SELECT chosenchoice FROM " . $tmptableexample . "WHERE questionid = " . $questionids_for_qntype;
	$result3 = pg_query($db_con, $query3);

	if(!pg_num_rows($result3)){
		echo "alert('Please choose an option')";
	}*/
	$query2 = "UPDATE " . $tmptableexample . " SET status = " . $status . " WHERE questionid = " . $questionids_for_qntype;
	$result2 = pg_query($db_con, $query2);

	pg_close($db_con);
}

function clearChoice($questType, $qnum){

	$clear = "";
	global $tmptableexample, $qnbankids;
	$db_con = dbCon();

	$qnbankid_for_qntypeidchosen = qnbankid_for_qntypeidchosen($questType, $qnbankids);
	//echo "<br />" . $qnbankid_for_qntypeidchosen[0] . "<br />";
	$query1 = "SELECT * FROM " . $tmptableexample . " where questiontypeid = " . $questType . " OFFSET ". $qnum ." LIMIT 1;";
	$result1 = pg_query($db_con, $query1);

	if(pg_num_rows($result1)){
		while($row[] = pg_fetch_assoc($result1));	
	}
	$record1 = array_column($row, 'questionid');
	$questionids_for_qntype = $record1[0];

	$query2 = "UPDATE " . $tmptableexample . " SET chosenchoice = null WHERE questionid = " . $questionids_for_qntype;
	$result2 = pg_query($db_con, $query2);

	pg_close($db_con);
}

function flushTable($studentTable){
	$db_con = dbCon();
	$queryDelete = "DROP TABLE ".$studentTable.";";
	$resultDelete = pg_query($db_con,$queryDelete);
}

function getQuestid($qt, $qnum){
	global $tmptableexample;
	$tmp_tblname = $tmptableexample;

	$db_con = dbCon();
		$query1 = "SELECT * FROM " . $tmp_tblname . " where questiontypeid = " . $qt . " ORDER BY id OFFSET ". $qnum ." LIMIT 1";
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
}


/*echo "THIS IS THE CHOSEN TEST ID <br />";
	$chosen_testid = choosetestid();
	echo $chosen_testid . "<br />";

	$testtestid = $chosen_testid;
	echo "<pre>";	
	$qnbankids = array();*/
//$egtestid = 224;
//echo "THIS IS THE QUESTION BANK IDs... <br />";
	$qnbankids = getTestQnBankIds($chosen_testid);
	//showNavigationButtons(13);
	
	/*$questid = getQuestid(15,2);
	echo $questid;*/
	/*echo "<br /><pre>";
	print_r($qnbankids);
	echo "<br /></pre><br />";
	$implodedlist = implode(",", $qnbankids);

	echo $implodedlist . "<br />";

	echo count($qnbankids) . "<br />";

echo "THIS IS THE QUESTION TYPE IDs...<br />";*/
//	$qntypeid = getQnTypeId($qnbankids);
/*	echo "<br /><pre>";
	print_r($qntypeid);
	echo "<br /></pre><br />";*/

//	$tmptableexample = "doe223160811_121350";
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