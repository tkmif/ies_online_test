<?php
include_once("generateqnpaper.php");

$questType = $_REQUEST["qt"];
	if(!isset($_REQUEST["qnum"])){
		$questNum = 0;
	}
	else{
		$questNum = $_REQUEST["qnum"];
	}
$questId = getQuestid($questType, $questNum);
ansReview($questType,$questNum,$questId);


function ansReview($qntypeid,$qnum,$questId){
	$db_con = dbCon();
	$imgtype_flag = "imagetype";
	$concat_flag = "concat";
	global $tmptableexample, $qnbankids;
	$tmp_tblname = $tmptableexample;
	$qnuminc = $qnum + 1;


	$qnbankid_for_qntypeidchosen = qnbankid_for_qntypeidchosen($qntypeid, $qnbankids);
	//echo "<br />" . $qnbankid_for_qntypeidchosen[0] . "<br />";
		$query1 = "SELECT * FROM " . $tmp_tblname . " where questiontypeid = " . $qntypeid . "ORDER BY id OFFSET ". $qnum ." LIMIT 1";
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

		//for($i = 0; $i < count($questionids_for_qntype); $i++){
			if(isAdditionalDetailsAvailable($questionids_for_qntype[0])){
				$addn_det_id = getAddnDetailsId($questionids_for_qntype[0]);
				$addn_details = getAdditionalDetails($addn_det_id);
				showAdditionalDetails($addn_details);
			}
			if($filenames_for_qntype[0][$imgtype_flag] == 0){
				echo "<span style= 'font-face:sans-serif;font-size: 15px; font-weight: bold;'>" . $filenames_for_qntype[0][$concat_flag] . "</span><br /><br />";
				fetchChoicesWORadio($questionids_for_qntype[0]);
				echo "<br /><br /><br />";
			}
			else{
				$imgfile = $filenames_for_qntype[0][$concat_flag];
				$maxversion = getContentversion($imgfile);
				$content = dispContent($imgfile, $maxversion);
				fetchChoicesWORadio($questionids_for_qntype[0]);
				echo "<br /><br /><br />";
			}
		//}
		//pg_close($db_con);
}

function fetchChoicesWORadio($questid){
	$db_con = dbCon();
	global $tmptableexample;
	$queryCC = "SELECT chosenchoice FROM $tmptableexample where questionid = $questid";
	$queryRC = "SELECT choiceorder FROM onlinetestanswerchoicemap WHERE questionid = $questid";
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

	$resultRC = pg_query($db_con, $queryRC);
	if(pg_num_rows($resultRC)){
		while($rowRC[] = pg_fetch_assoc($resultRC));
	}
	$recordRC = array_column($rowRC, 'choiceorder');
	$RC = $recordRC[0];
	unset($resultRC);
	unset($rowRC);
	unset($recordRC);

	$choice_count = count($choiceids);
	echo "<div id = 'radio-container'>";
	echo "<form action='' method='post' name = 'choiceForm' id = 'choiceForm'>";
	//echo $CC;
	for ($i=0; $i < $choice_count; $i++) { 
		//html code for radio button..
		$j = $i+1;
		if($j==$CC){
			if($CC == $RC){
				echo "<img src = 'images/tick.png' width='30px' height='30px' />";
			}else{
				echo "<img src = 'images/close.png' width='30px' height='30px' />";
			}
		}
		else if($j == $RC){
			if($CC != $RC){
				echo "<img src = 'images/tick.png' width='30px' height='30px' />";
			}
		}else{
			echo "<img src = 'images/dot.png' width='30px' height='30px' style='display:inline;' />";
		}

		if($choicetype[$i] == 0){
			echo "<span style= 'font-face:sans-serif;font-size: 15px; font-weight: bold; position:relative; top:-10px'>&nbsp;&nbsp;&nbsp;". $choicetxt[$i] . "</span><br /><br />";
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

function fetchCnRChoice($questId){
	$db_con = dbCon();
	global $tmptableexample;
	$queryCC = "SELECT chosenchoice FROM $tmptableexample where questionid = $questId[0]";
	$queryRC = "SELECT choiceorder FROM onlinetestanswerchoicemap WHERE questionid = $questId[0]";
	$query = "SELECT choiceid,choicetype,choice,filename from onlinetestquestionchoicemap where questionid = $questId[0]";
	$result = pg_query($db_con,$query);
	if(pg_num_rows($result)){
		while($rows[] = pg_fetch_assoc($result));
	}
	$records = $rows;
	$choiceids = array_column($records, 'choiceid');
	$choicetype = array_column($records, 'choicetype');
	$choicetxt = array_column($records, 'choice');
	$choicefile = array_column($records, 'filename');
	
	$name = "choice".$questId[0];
	$qt = getQuestType($questId[0]);

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

	$resultRC = pg_query($db_con, $queryRC);
	if(pg_num_rows($resultRC)){
		while($rowRC[] = pg_fetch_assoc($resultRC));
	}
	$recordRC = array_column($rowRC, 'choiceorder');
	$RC = $recordRC[0];
	unset($resultRC);
	unset($rowRC);
	unset($recordRC);

	$choice_count = count($choiceids);
	echo "<div id = 'radio-container'>";
	echo "<form action='' method='post' name = 'choiceForm' id = 'choiceForm'>";
	//echo $CC;
	for ($i=0; $i < $choice_count; $i++) { 
		//html code for radio button..
		$j = $i+1;
		if($j == $CC || $j == $RC){
			if($j==$CC){
				/*echo "<input type= 'radio' class = 'radio_class' name = 'choice' id = ". $questid . $j ." style='margin-left:15px; margin-bottom: 20px;' value = " . $j . " onclick = 'storeChoice(" . $questid . "," . $j .")' style='height:5px; width:5px; vertical-align: middle;' checked='checked' > ";*/
					if($choicetype[$i] == 0){
				echo "<center><span style='font-face:sans-serif;color:red;'>Your Choice: &nbsp;&nbsp;&nbsp;". $choicetxt[$i] . "</span></center><br />";
				}
				else{
				$choice_filename = $choicefile[$i];
				//url for the file..
				$URL = "choice_images/" . $questId[0];
				
				if(!file_exists($URL . $choice_filename)){
					getChoiceContent($URL, $choice_filename);
				}
				echo "<center><span style='font-face:sans-serif;color:red;'>Your Choice: &nbsp;&nbsp;&nbsp; <img src = '" . $URL . $choice_filename . "' /></span></center><br /><br />";

				}
			}
			if($j == $RC){
				/*echo "<input type= 'radio' class = 'radio_class' name = 'choice' id = ". $questid . $j ." style='margin-left:15px; margin-bottom: 20px;' value = " . $j . " onclick = 'storeChoice(" . $questid . "," . $j .")' style='height:5px; width:5px; vertical-align: middle;'> ";*/
				if($choicetype[$i] == 0){
					echo "<center><span style='font-face:sans-serif;color:green;'>Right Choice: &nbsp;&nbsp;&nbsp;". $choicetxt[$i] . "</span></center><br />";
				}
				else{
				$choice_filename = $choicefile[$i];
				//url for the file..
				$URL = "choice_images/" . $questId[0];
				
				if(!file_exists($URL . $choice_filename)){
					getChoiceContent($URL, $choice_filename);
				}
				echo "<center><span style='font-face:sans-serif;color:green;'>Right Choice: &nbsp;&nbsp;&nbsp; <img src = '" . $URL . $choice_filename . "' /></span></center><br /><br />";

				}
			}
		}
/*		if($choicetype[$i] == 0){
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

		}*/
	}
	echo "</form>";
	echo "</div>";
	//echo $questid.$j;
}

?>