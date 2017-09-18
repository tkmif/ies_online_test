<?php 

	include_once("generateqnpaper.php");
	$testId = $chosen_testid;
	$studentTable = $tmptableexample;
	$duration = $_SESSION['duration'];
	
	$user = $_SESSION['login_username'];

	$testCatId = $_SESSION['test_cat'];
	$testName = getTestIdName($testId);
	error_reporting(E_ALL & ~E_NOTICE);

	$durationInHrs = round($duration/3600, 1);
	$durationDisp = $durationInHrs." hrs";
	if($durationInHrs<1){
		$durationInHrs = round($duration / 60, 1);
		$durationDisp = $durationInHrs." mins";
	}

	$db_con = dbCon();
	global $studentTable, $testId;

	$testCat = getCategoryName($testCatId);


	$queryGetRightAnswered = "SELECT a.questiontypeid,a.questionid,a.chosenchoice,b.choiceorder FROM ". $studentTable ." a, onlinetestanswerchoicemap b WHERE a.questionid = b.questionid AND a.status IN (1,3) AND a.chosenchoice = b.choiceorder;";

	$resultRight = pg_query($db_con, $queryGetRightAnswered);

	if(pg_num_rows($resultRight)){
		while($rowRight[] = pg_fetch_assoc($resultRight));
	}
	if(!$rowRight){
		$recordRight = "";
		$totalRight = 0;
	}else{
		$recordRight = array_column($rowRight, 'chosenchoice');
		$totalRight = count($recordRight);
	}
	

	$queryGetWrongAnswered = "SELECT a.questiontypeid,a.questionid,a.chosenchoice,b.choiceorder FROM ". $studentTable ." a, onlinetestanswerchoicemap b WHERE a.questionid = b.questionid AND a.status IN (1,3) AND a.chosenchoice != b.choiceorder;";

	$resultWrong = pg_query($db_con, $queryGetWrongAnswered);

	if(pg_num_rows($resultWrong)){
		while($rowWrong[] = pg_fetch_assoc($resultWrong));
	}
	if(!$rowWrong){
		$recordWrong = "";
		$totalWrong = 0;
	}else{
		$recordWrong = array_column($rowWrong, 'chosenchoice');
		$totalWrong = count($recordWrong);
	}
	$totalAttempt = $totalRight + $totalWrong;

	$testInfo = getTestInfo($chosen_testid);
	$testName = array_column($testInfo, 'name');
	$noOfQuestions = array_column($testInfo, 'noofquestions');
	$maxMarks = array_column($testInfo, 'maxmarks');
	$passMarks = array_column($testInfo, 'passmarks');

	$markPerQn = $maxMarks[0] / $noOfQuestions[0];
	//$markPerQn = 400/160;
	$totalMark = $totalRight * $markPerQn;
	$negativeMark = getNegative($markPerQn, $totalWrong);
	$netTotalMark = $totalMark - $negativeMark;

	$testResult = getResult($passMarks[0], $netTotalMark);

//to get the count of visited and not visited
	$countVisited = getVisitCount();
	$countNotVisited = $noOfQuestions[0] - $countVisited;

//set submit flag in repos..
	updateReposStatus($studentTable);

	//store to database..!
	storeToRepose();

	/*echo "<center><h2>". $testName[0] ."</h2><br />Total Marks Obtained: ".$netTotalMark." out of ". $maxMarks[0] ."<br />Total Attempts: ". $totalAttempt ."<br />Right Answers: ". $totalRight . "<br />Wrong Answers: ". $totalWrong ."<br /> Negative Marks: ". $negativeMark ."<br /><br /><br/><h3>Final Result: ".$testResult. "</h3><br /><h4>Pass Mark: ".$passMarks[0]." </h4></center>";

	echo "<br /><br /><br /><a href= 'logout.php'>Logout</a>";*/

function updateReposStatus($studentTable){
	$db_con = dbCon();

//update the status as submitted...
	$querySubmit = "UPDATE onlinetesttablerepos SET status = 1 where tablename = '".$studentTable."' AND status = 0";
	$resultSubmit = pg_query($db_con, $querySubmit);
	//pg_close($db_con);
}

function getNegative($markPerQn, $totalWrong){
	
	$totalNegativeMarks = $totalWrong / 4;
	$modulo = $totalWrong % 4;
	if($modulo == 2){
		return $totalNegativeMarks;
	}else{
		$totalNegativeMarks = round($totalNegativeMarks);
		return $totalNegativeMarks;
	}
	
}
function getResult($passMarks, $netTotalMark){
	$pass = "PASS";
	$fail = "FAIL";
	if($netTotalMark >= $passMarks){
		return $pass;
	}else{
		return $fail;
	}
}

function  getTestQtypeIds(){
	$db_con = dbCon();
	global $studentTable;
	$queryQtype = "SELECT DISTINCT questiontypeid FROM $studentTable ORDER BY questiontypeid";
	$resultQtype = pg_query($db_con, $queryQtype);
	if(pg_num_rows($resultQtype)){
		while($rowQtype[] = pg_fetch_assoc($resultQtype));
	}
	$recordQtype = array_column($rowQtype, 'questiontypeid');
	$testQtypes = $recordQtype;
	return $testQtypes;
}

function getTestQtypeNames($qtypeIDs){
	$db_con = dbCon();

	$queryGetQtype = "SELECT questiontypeid, questiontype FROM onlinetestquestiontype WHERE questiontypeid IN (".implode(',', $qtypeIDs).") ORDER BY questiontypeid";
	
	$resQtype = pg_query($db_con,$queryGetQtype);
	if(pg_num_rows($resQtype)){
		while($rowQtype[] = pg_fetch_assoc($resQtype));
	}
	$recQtype = $rowQtype;
	$Qtype = array_column($recQtype, 'questiontype');
	//return $Qtype[0];
	return $Qtype;
}

function getQCounts($qtypeID){
	$db_con = dbCon();
	global $studentTable;
	$queryQCount = "SELECT COUNT(questionid) FROM $studentTable WHERE questiontypeid = $qtypeID";
	$resultQCount = pg_query($db_con, $queryQCount);
	if(pg_num_rows($resultQCount)){
		while($rowQCount[] = pg_fetch_assoc($resultQCount));
	}
	$recordQCount = array_column($rowQCount, 'count');
	$qCount = $recordQCount[0];
	return $qCount;
}

function getACounts($qtypeID){
	$db_con = dbCon();
	global $studentTable;
	$queryACount = "SELECT COUNT(questionid) FROM $studentTable WHERE questiontypeid = $qtypeID AND status IN (1,3)";
	$resultACount = pg_query($db_con, $queryACount);
	if(pg_num_rows($resultACount)){
		while($rowACount[] = pg_fetch_assoc($resultACount));
	}
	$recordACount = array_column($rowACount, 'count');
	$aCount = $recordACount[0];
	return $aCount;
}

function getMrCount($qtypeID){
	$db_con = dbCon();
	global $studentTable;
	$queryMrCount = "SELECT COUNT(questionid) FROM $studentTable WHERE questiontypeid = $qtypeID AND status IN (2,3)";
	$resultMrCount = pg_query($db_con, $queryMrCount);
	if(pg_num_rows($resultMrCount)){
		while($rowMrCount[] = pg_fetch_assoc($resultMrCount));
	}
	$recordMrCount = array_column($rowMrCount, 'count');
	$MrCount = $recordMrCount[0];
	return $MrCount;

}

function getVisitCount(){
	$db_con = dbCon();
	global $tmptableexample;

	$queryGetVisited= "SELECT COUNT(status) FROM ".$tmptableexample." WHERE status != 0;";
	$resultGetVisisted = pg_query($db_con, $queryGetVisited);
	if(pg_num_rows($resultGetVisisted)){
		while($rowVisited[] = pg_fetch_assoc($resultGetVisisted));
	}else{
		$rowVisited = 0;
	}
	$recordVisited = $rowVisited;
	$countVisited = $recordVisited[0];
	return $countVisited['count'];
}

function storeToRepose(){
	global $user, $testCatId, $testId, $netTotalMark, $testResult, $maxMarks, $passMarks, $totalRight, $totalWrong, $countVisited, $countNotVisited;
	$db_con = dbCon();
	$testDate = date("F j, Y, g:i a");
	$queryRepos = "INSERT INTO onlinetestresultrepository (username, testdate, testcategoryid, testid, netscore, result, maxmarks, passmarks, rightanswers, wronganswers, visited, notvisited) VALUES ('".$user."', '".$testDate."', ".$testCatId.", ".$testId.", ".$netTotalMark.", '".$testResult."', ".$maxMarks[0].", ".$passMarks[0].", ".$totalRight.", ".$totalWrong.", ".$countVisited.", ".$countNotVisited.")";
	pg_query($db_con, $queryRepos);
	//pg_close($db_con);

}

/*$totalMarks = getTotalMarks();
echo "Total Marks Obtained: " . $totalMarks;*/
pg_close($db_con);
 ?>

<html>
    <head>
    	 <meta http-equiv="X-UA-Compatible" content="IE=8" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
       
        <title>Test Report</title>
        <link href="css/style-login.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="css/keyboard.css" />
        <link rel="stylesheet" href="css/number_style.css" />
        <script type="text/javascript" src="js/keyboard.js"></script>
        <link rel="stylesheet" type="text/css" href="css/default.css" />
		<link rel="stylesheet" type="text/css" href="css/component.css" />
		<script src="js/modernizr.custom.js"></script>
		<!-- <link rel="stylesheet" type="text/css" href="css/style.css"> -->
		<link rel="stylesheet" type="text/css" href="css/review.css">
		<link rel="stylesheet" type="text/css" href="popupTag.css">

        <script type="text/javascript">
        /*function flushOut(){
        	$.get("logout.php");
    		return false;
		}*/
		/*window.onbeforeunload = function(){
    		window.confirm("Please use the Close button to close the window.");
    		return false;
		}*/

		function printFunc(){
			window.print();
		}

//review part function START..
		function showQuestOnRequest(qt, slNum){

			var xmlhttp = new XMLHttpRequest();
			var answered = 1;
			var markForReview = 2;
			var ansMarkForReview = 3;
			var notAnswered = 4;

			 $('[name = '+qt+']').addClass('subject-name-visited').siblings().removeClass('subject-name-visited');

			/*var secName = qt;
            $("[name = secName]").addClass("subject-name-visited");*/
		

			var next = "<form action='' method = 'POST'><input type='button' style='margin-left: 5px; line-height: 33px;' id='savenext'  class='btn-primary-save btnCustom' name = 'next' id = 'but1' btnEnabled auditlog' value='Next' title='Next' onclick = 'showQuest("+ qt +","+ 1 +");' /></form>";

			xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	                document.getElementById("questions").innerHTML = xmlhttp.responseText;
	              }
        	};
        	xmlhttp.open("GET", "testViewAll.php?qt=" + qt, true);
        	xmlhttp.send();

		}
		
function clickFrst(){
		$('#frstSec').click();
}
//review part function END..

        </script>
<style type="text/css">.subject-name-visited{
			height: 35px;
		    border-right: 1px solid #c3c3c1;
			border-left: 1px solid #c3c3c1;
			border-bottom: 1px solid #c3c3c1;
			border-top: none;
		    float: left;
			font-size: 1.15em;
			color:#ffffff;
			background-color: #4a76a6;
			padding-left:12px;
			padding-right:12px;
			cursor:pointer;	
		}</style>
        </head>

        <!--<body onload="alignHeight();getCandName();loadIndexLabels()" onselectstart="return false;" ondragstart="return false;">-->
        <body onload="clickFrst()" onunload="flushOut()" onselectstart="return false;" ondragstart="return false;">
        <div id="wrapper">
        <div id="minwidth"> 
                <!--header starts-->
       	<div id="header">
			 <table width="95%" border="0px" style="border-spacing:5px">
				<tbody>
				  <tr  align="center" >
					<td style="padding-left:8%" id="bannerImage" width="100%">
						<div id="bannerText" align="center" style="margin-top:10px;margin-left:11%;"><font face= "calibri" size="6" color="#ffffff">IES Test Report</font></div>						
					</td>
					<td style="padding-right:10px">
						<span align= "right"><a href="#openModal">Review</a></span>
					</td>
					<td style="padding-right:15px">
						<span align= "right"><a href= '#' onclick="printFunc();" class="closeBut">Print</a></span>
					</td>
					<td>
						<span align= "right" ><a href= 'logout.php' class="closeBut">Close</a></span>
					</td>
				  </tr>
				</tbody>
			  </table>
		</div>
	<center>	
    <div class="userInfo">
   		<div class="system_info">
   		
			<table  class="subHdReport" width="85%" >
				<tr>
				<td></td>
				<td>   		
					<div class="details3" align="center"><?php echo $testName[0];?></div>
				</td>
				<td></td><td></td>
				</tr>
				<tr>
					<td class="testdetails">
						<div class="details4">Test Name: </div>
					</td>
					<td class="testdetails">
						<div class="details4"><?php echo $testName[0];?></div>
					</td>
					<td class="testdetails">
						<div class="details4">Maximum Marks: </div>
					</td>
					<td class="testdetails">
						<div class="details4"><?php echo $maxMarks[0];?></div>
					</td>
				</tr>
				<tr>
					<td  class="testdetails">
						<div class="details4">Total Questions: </div>
					</td>
					<td class="testdetails">
						<div class="details4"><?php echo $noOfQuestions[0]; ?></div>
					</td>
					<td class="testdetails">
						<div class="details4">Duration: </div>
					</td>
					<td class="testdetails">
						<div class="details4"><?php echo $durationDisp;?></div>
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<div class="details4" align="center">Score</div>
						<div class="details3" align="center"><?php echo $netTotalMark;?></div>
					</td>
					<td>
						<div class="details3" align="center"><?php echo $testResult;?></div>
					</td>
					<td></td>
				</tr>
			</table>
			</center>
			<center>
			<table class="rowStyle" width="90%" style="box-shadow: 0px 5px 10px #888888; border-collapse: collapse; margin-bottom:15px;">
				<tr height="60px" class="details5" align="center" style="background-color:#216fa0;">
					<td>
						Questions Attempted
					</td>
					<td>
						Right Answers
					</td>
					<td>
						Wrong Answers
					</td>
					<td>
						Total Marks
					</td>
					<td>
						Negative Marks
					</td>
					<td>
						Net Score
					</td>
				</tr>
				<tr align="center" class="details5" height="60px" >
				<!-- attempted -->
					<td >
						<?php echo $totalAttempt; ?>
					</td>
				<!-- right answers -->
					<td>
						<?php echo $totalRight; ?>
					</td>
				<!-- wrong answers -->
					<td>
						<?php echo $totalWrong; ?>
					</td>
					<!-- Total Score -->
					<td>
						<?php echo $totalMark; ?>
					</td>
					<!-- Negative Score -->
					<td>
						<?php echo $negativeMark; ?>
					</td>
					<!-- Net Score -->
					<td>
						<?php echo $netTotalMark; ?>
					</td>
				</tr>
			</table>
			<!-- <br /><br /><br /><a href= 'logout.php'>Logout</a> -->
			<table class="rowStyle" width="90%"  style="box-shadow: 0px 5px 10px #888888; border-collapse: collapse; margin-bottom:50px">
				<tr height="50px" class="details4" align="center" style="background-color:#216fa0; border-spacing: 40px; ">
					<td width="25%">
						Section Name
					</td>
					<td>
						No. of Questions
					</td>
					<td>
						Answered
					</td>
					<td>
						Marked for Review
					</td>
					<td>
						Unattempted
					</td>
				</tr>
				<?php  
					$qtypeIDs = getTestQtypeIds();
					$qtypeNames = getTestQtypeNames($qtypeIDs);
					
					for($r = 0; $r<count($qtypeIDs); $r++){
						$qCount = getQCounts($qtypeIDs[$r]);
						$aCount = getACounts($qtypeIDs[$r]);
						$mrCount = getMrCount($qtypeIDs[$r]);
						$naCount = $qCount - $aCount;
						echo '<tr align="left" class="reportDetails" height="45px" style= "padding: 20";>
								<td style = "padding-left: 20px;">'. ucwords(strtolower($qtypeNames[$r])) .'</td>
								<td align = "center">'. $qCount .'</td>
								<td align = "center">'. $aCount .'</td>
								<td align = "center">'. $mrCount .'</td>
								<td align = "center">'. $naCount .'</td>
							</tr>';
					}
				?>
				
				<!-- attempted -->
					<!-- <td>
						<?php //echo $totalAttempt; ?>
					</td> -->
				<!-- right answers -->
					<!-- <td>
						<?php //echo $totalRight; ?>
					</td> -->
				<!-- wrong answers -->
					<!-- <td>
						<?php //	echo $totalWrong; ?>
					</td>
				</tr> -->
			</table>
			</center>
		</div>
	</div>
<!-- Review Part Start -->

<div id="openModal" class="modalDialog">
		<div id="cbp-fwslider" class="cbp-fwslider">
			<a href="#close" title="Close" class="close">X</a>
			<link rel="stylesheet" type="text/css" href="css/popupTag.css">
			<button title="" class="legend" style="margin-right: 10px;">?
			<div class="tooltiptext" id = "tooltipLegend">
				<table>
				<tr>
				<td><img src="images/tickBlue.png" width="16px" height="16px"></td><td><label class="legendLab">Right Answer</label></td></tr>
				<tr>
				<td><img src="images/tick.png" width="16px" height="16px"></td><td><label class="legendLab">Right Choice</label></td></tr>
				<tr>
				<td><img src="images/close.png" width="17px" height="17px"></td><td><label class="legendLab">Wrong Choice</label></td></tr>
				<tr>
				<td><img src="images/dot.png" width="16px" height="16px"></td><td><label class="legendLab">Options</label></td></tr>
				</table>

			</div>
			</button>
			<ul style="margin-bottom: 8.5%;">
				<?php 
					setSections();
				 ?>
			</ul>
		</div>
		<div class="innerDiv" id="questions"></span></div>
		<!-- <div class="butDiv" id = "next"></div> -->

</div>
		
		<!-- <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script> -->
		<script src="js/jquery-1.8.0.min.js"></script>
		<script src="js/jquery.cbpFWSlider.js"></script>

		<script>
			$( function() {
				$( '#cbp-fwslider' ).cbpFWSlider();

			} );
		</script>
			    <!-- <div id="footer">
			    <center>
	<div id="VersionNo"> Version 1.0</div></center>
    <div class="clear"></div>
</div> -->

        </div>
</body>
</html>
