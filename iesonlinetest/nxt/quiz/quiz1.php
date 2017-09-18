<?php
session_start();
// Report all errors except E_NOTICE
error_reporting(E_ALL & ~E_NOTICE);

?>

<!DOCTYPE html>
<html>
<head>
<script src="js/jquery-1.8.0.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title> IES Online Test </title>
<!--CSS for protactor-->
<link rel="stylesheet" type="text/css" href="skin/blue.monday/jplayer.blue.monday.css" />
<link rel="shortcut icon" href="favicon.png">
<link rel="stylesheet" type="text/css" href="css/default.css" />
		<link rel="stylesheet" type="text/css" href="css/component.css" />
		<script src="js/modernizr.custom.js"></script>

<?php
	include_once("generateqnpaper.php");
	$cat_id = $_SESSION['test_cat'];
	$test_id = $_SESSION['test_id'];
	$duration = $_SESSION['duration'];
	$testCat = getCategoryName($cat_id);
	$testName = getTestIdName($test_id);
	$remainingTime = getRemTime($tmptableexample);
//the exam duration is set for the redirection and report generation
	header('refresh: '. $remainingTime .'; url = report.php');
?>
<script>
var date = new Date();
var jsVersion = date.getTime();
document.write('<link rel="stylesheet" type="text/css" href="css/mock_style.css?v='+jsVersion+'"\/\>');
document.write('<link rel="stylesheet" href="css/jquery.freetrans.css?v='+jsVersion+'"\/\>');
document.write('<link rel="stylesheet" href="css/jquery-ui-1.10.4.custom.min.css?v='+jsVersion+'"\/\>');
document.write('<link rel="stylesheet" href="css/jquery.ui.rotatable.css?v='+jsVersion+'"\/\>');
document.write('<link type="text/css" rel="stylesheet" href="css/calc.css?v='+jsVersion+'"\/\>');
document.write('<link type="text/css" rel="stylesheet" href="css/screen.css?v='+jsVersion+'"\/\>');
document.write('<link type="text/css" rel="stylesheet" href="css/scratchpad.css?v='+jsVersion+'"\/\>');
document.write('<link rel="stylesheet" href="css/nanoscroller.css?v='+jsVersion+'"\/\>');
document.write('<link rel="stylesheet"  type="text/css" media="all" href="css/style.css?v='+jsVersion+'"\/\>');
document.write('<link rel="stylesheet" type="text/css"  href="css/thickbox.css?v='+jsVersion+'"\/\>');
document.write('<link rel="stylesheet" type="text/css" href="css/jquery.alerts.css?v='+jsVersion+'"\/\>');
document.write('<link rel="stylesheet" type="text/css" href="css/aecInstructions.css?v='+jsVersion+'"\/\>');
document.write('<link rel="stylesheet" type="text/css" href="css/codemirror.css?v='+jsVersion+'"\/\>');
document.write('<link rel="stylesheet" type="text/css" href="css/keyboard_style.css?v='+jsVersion+'"\/\>');
document.write('<script type="text/javascript" src="js/jquery-1.8.0.min.js?v='+jsVersion+'"\><\/script>');
//document.write('<script type="text/javascript" src="js/bean.js?v='+jsVersion+'"\><\/script>');
//document.write('<script type="text/javascript" src="js/top.js?v='+jsVersion+'"\><\/script>');
document.write('<script type="text/javascript" src="js/jquery-ui-1.10.4.min.js?v='+jsVersion+'"\><\/script>');
document.write('<script type="text/javascript" src="js/jquery.ui.touch-punch.min.js?v='+jsVersion+'"\><\/script>');
document.write('<script type="text/javascript" src="js/jquery.nanoscroller.min.js?v='+jsVersion+'"\><\/script>');
document.write('<script type="text/javascript" src="js/jquery.corner.js?v='+jsVersion+'"\><\/script>');
document.write('<script type="text/javascript" src="js/jquery.caret.min.js?v='+jsVersion+'"\><\/script>')
document.write('<script type="text/javascript" src="js/virtual_keyboard.js?v='+jsVersion+'"\><\/script>');
document.write('<script type="text/javascript" src="js/jquery.actual.min.js?v='+jsVersion+'"\><\/script>');
document.write('<script type="text/javascript" src="js/typing.js?v='+jsVersion+'"\><\/script>');
document.write('<script type="text/javascript" src="js/restrictedTyping.js?v='+jsVersion+'"\><\/script>');
document.write('<script type="text/javascript" src="js/codemirror.js?v='+jsVersion+'"\><\/script>');
document.write('<script type="text/javascript" src="js/javascript.js?v='+jsVersion+'"\><\/script>');
document.write('<script type="text/javascript" src="js/active-line.js?v='+jsVersion+'"\><\/script>');
document.write('<script type="text/javascript" src="js/matchbrackets.js?v='+jsVersion+'"\><\/script>');
document.write('<script type="text/javascript" src="js/jquery.jplayer.min.js?v='+jsVersion+'"\><\/script>');
document.write('<script type="text/javascript" src="js/thickbox-compressed.js?v='+jsVersion+'"\><\/script>');
//document.write('<script type="text/javascript" src="js/jquery.ui.rotatable.min.js?v='+jsVersion+'"\><\/script>');
</script>




<!-- <script>
		window.onresize = function(event) {
			quizPageHeight();
		}
		$('a').mousedown(function(event){
			avoidKeyPressing(event);
		});
		var editor;
		
		$( document ).ready(function() {
			var url = document.URL;
			var params = url.split("quiz.html?");
			var orgId =  $.trim(params[1]).split("@@")[0];
			var mockId = $.trim(params[1]).split("@@")[1];
			if(mockId.indexOf("M")==-1){
				var attemptNo = $.trim(params[1]).split("@@")[2];
				var candMasterId = $.trim(params[1]).split("@@")[3];
				 saveSysConfig(orgId,mockId,candMasterId,attemptNo);
			}

		});
	</script> -->
	<style type="text/css">

		#overlay{
		  position:fixed;
		  z-index:99999;
		  top:0;
		  left:0;
		  bottom:0;
		  right:0;
		  background:rgba(0,0,0,0.9);
		  transition: 1s 0.8s;
		}

		#progress{
		  position:absolute;
		  top:40%;
		  height: 70px;
		  width: 70px;
		}

		.navButs{
			background: url(images/notvisited.png) no-repeat top; 
			height: 48px; 
			width: 50px;
			border:none; 
			/*padding: 20px;*/
			margin-bottom: 2px; 
			margin-right: 2px;	
		}

		.subject-name-visited{
			height: 35px;
		    border-right: 1px solid #c3c3c1;
			border-left: 1px solid #c3c3c1;
			border-bottom: 1px solid #c3c3c1;
			border-top: none;
		    float: left;
			font-size: 1.15em;
			color:#ffffff;
			background-color: #36ace9;
			padding-left:12px;
			padding-right:12px;
			cursor:pointer;	
		}

		.visited{
			background: url(images/NotAnswered.png);
			height: 48px; 
			width: 50px; 
			border:none; 
			margin-bottom: 2px; 
			margin-right: 2px	
		}		

		.answered{
			background: url(images/answered.png);
			height: 48px; 
			width: 50px; 
			border:none; 
			margin-bottom: 2px; 
			margin-right: 2px	
		}
		.marked4review{
			background: url(images/marked4review.png);
			height: 48px; 
			width: 50px; 
			border:none; 
			margin-bottom: 2px; 
			margin-right: 2px
		}

		.ansmarked{
			background: url(images/ansmarked.png);
			height: 48px; 
			width: 50px; 
			border:none; 
			margin-bottom: 2px; 
			margin-right: 2px
		}

	</style>

	<script>

	  


		function showQuestOnRequest(qt, slNum){
			//var id = choiceId;
			/*$('[name = '+qt+']').click(function(){
				$('[name = '+qt+']').addClass("subject-name-visited");
			})*/
			//$('[name = '+qt+']').addClass("subject-name-visited");
			/*var secId = "#"+qt;
			$(secId).tabs({active: slNum})*/

			var xmlhttp = new XMLHttpRequest();
			var answered = 1;
			var markForReview = 2;
			var ansMarkForReview = 3;
			var notAnswered = 4;

			 $('[name = '+qt+']').addClass('subject-name-visited').siblings().removeClass('subject-name-visited');

			/*var secName = qt;
            $("[name = secName]").addClass("subject-name-visited");*/
			
			var remTime = document.getElementById("secHid").innerHTML;

			var next = "<form action='' method = 'POST'><input type='button' style='margin-left: 5px; line-height: 33px;' id='savenext'  class='normalBtn btn btn-primary-save name = 'next' id = 'but1' btnEnabled auditlog' value='Save &amp; Next' title='Save &amp; Next' onclick = 'showQuest("+ qt +","+ 1 +"); updateStatus("+ qt + "," + 0 + "," + answered + ");' /></form>";
			
			var review = "<input type='button' onclick='updateReview("+ qt + "," + 0 +"); showQuest("+ qt +","+ 1 +");' id='underreview' class='normalBtn btn btn-primary auditlog' value='Mark for Review &amp; Next' style='margin-left: 1%;' title='Mark for Review &amp; Next' />";	

			/*var review = "<input type='button' onclick='updateStatus("+ qt + "," + 0 + "," + ansMarkForReview + "); showQuest("+ qt +","+ 1 +");' id='underreview' class='normalBtn btn btn-primary auditlog' value='Mark for Review &amp; Next' style='margin-left: 1%;' title='Mark for Review &amp; Next' />";*/

			var clear = '<input type="button" id="clearResponse" onclick=" clearOption('+ qt + ','+ 0 +'); updateStatus('+ qt +', '+ 0 +', '+notAnswered+');" class="normalBtn btn btn-primary auditlog" value="Clear Response" style="" title="Clear Response" />';

			xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	                document.getElementById("qnArea").innerHTML = xmlhttp.responseText;
	                document.getElementById("questNo").innerHTML = "Question No. "+1;
	                document.getElementById("savenextspan").innerHTML = next;
	                document.getElementById("review").innerHTML = review;
	                document.getElementById("clearRes").innerHTML = clear;
	               	//document.getElementById("currentQtype").innerHTML = qname;
	               	//document.getElementById(id).click();
	              }
        	};
        	xmlhttp.open("GET", "showQuestions.php?qt=" + qt + "&remTime=" + remTime, true);
        	xmlhttp.send();

		}

		function showNavigationOnRequest(qt,qname){
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	                document.getElementById("numberpanelQues").innerHTML = xmlhttp.responseText;
	                var buttonId = "#navButs"+0;
            		$(buttonId).click();
            		//$(buttonId).addClass("visited");
	                //document.getElementById("currentQtype").innerHTML = qname;
	            }
        	};
        	xmlhttp.open("GET", "showNavigationButtons.php?qt=" + qt, true);
        	xmlhttp.send();

		}

		function setVisited(questid,qnum){
			var xmlhttp = new XMLHttpRequest();
			var id = "#navButs"+qnum;
			xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	            	$(id).removeClass("answered");
	            	$(id).removeClass("ansmarked");
	            	$(id).removeClass("marked4review");
	                $(id).addClass("visited");
	            }
        	};
        	xmlhttp.open("GET", "setVisited.php?questid=" + questid, true);
        	xmlhttp.send();

		}

		function showQtype(qt){
			//$('[name="secTab"]').addClass("subject-name-visited");
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	                document.getElementById("currentQtype").innerHTML = xmlhttp.responseText;
	            }
        	};
        	xmlhttp.open("GET", "showQtype.php?qtype=" + qt, true);
        	xmlhttp.send();

		}



		function showQuest(qt,qnum,choiceId){
			var id = choiceId;
			var xmlhttp = new XMLHttpRequest();
			var num = qnum + 1;
			var answered = 1;
			var markForReview = 2;
			var ansMarkForReview = 3;
			var notAnswered = 4;

			var buttonId = "#navButs"+qnum;
            $(buttonId).addClass("visited");
			
			var endOf = "<h3><b>End of questions in this part..!</b></h3>";


			/*var questid = getQuestid(qt, qnum);
			var radioName = "choice"+questid;

			var el = document.getElementsByName("savenextspan").innerHTML;
			if ($('input[name=radioName]:checked')) {
				reviewStatus = 3;
			}*/

/*//set the cookie for elaspsed time..
	var count = 9;
	var name = "elaspsedTime";

	function runTimer(){
		var name = "elaspsedTime";
		var d = new Date();
	    d.setTime(d.getTime() + (365*24*60*60*1000));
	    var expires = "expires="+d.toUTCString();
		count = count+1;
			document.cookie = "elaspsedTime = "+count+";"+expires;
		document.getElementById("questNo").innerHTML= count;
		setTimeout("runTimer()",1000);
	}

runTimer();*/

/*function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}*/


			var next = "<form action='' method = 'POST'><input type='button' style='margin-left: 5px; line-height: 33px;' id='savenext'  class='normalBtn btn btn-primary-save  btnEnabled auditlog' id = but"+ qnum +" name = 'next' value='Save &amp; Next' title='Save &amp; Next' onclick = 'showQuest("+ qt +","+ num +"); updateStatus("+ qt + "," + qnum + "," + answered + ");'></form>";

			var review = "<input type='button' onclick='updateReview("+ qt + "," + qnum +"); showQuest("+ qt +","+ num +");' id='underreview' class='normalBtn btn btn-primary auditlog' value='Mark for Review &amp; Next' style='margin-left: 1%;' title='Mark for Review &amp; Next' />";
			
			/*var review = "<input type='button' onclick='updateStatus("+ qt + "," + qnum + "," + ansMarkForReview + "); showQuest("+ qt +","+ num +");' id='underreview' class='normalBtn btn btn-primary auditlog' value='Mark for Review &amp; Next' style='margin-left: 1%;' title='Mark for Review &amp; Next' />";*/

			var clear = '<input type="button" id="clearResponse" onclick=" clearOption('+ qt + ','+ qnum +'); updateStatus('+qt+', '+qnum+', '+notAnswered+');" class="normalBtn btn btn-primary auditlog" value="Clear Response" style="" title="Clear Response" />';

			var remTime = document.getElementById("secHid").innerHTML;

			xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					document.getElementById("qnArea").innerHTML = xmlhttp.responseText;
	            	
	            	if(document.getElementById("qnArea").innerHTML == 0){
	            		
	            		document.getElementById("qnArea").innerHTML = "<div width = '100px' height = '100px' margin-top = '100px'><h3 style= 'color: #3e8dbf;' align = 'center'>End of part..!</h3></div>";
	                	document.getElementById("savenextspan").innerHTML = "";
	                	document.getElementById("questNo").innerHTML = "";
	                	document.getElementById("review").innerHTML = "";
	                	document.getElementById("clearRes").innerHTML = "";
	                	if(id!=0){
	                		document.getElementById(id).click();
	                	} 

	                }
	                else{
		                document.getElementById("savenextspan").innerHTML = next;
		                document.getElementById("questNo").innerHTML = "Question No. " + num;
		                document.getElementById("review").innerHTML = review;
		                document.getElementById("clearRes").innerHTML = clear;

		                if(id!=0){
	                		document.getElementById(id).click();
	                	}
	                }
	            }
	           
        	};
        	xmlhttp.open("GET", "showQuestions.php?qt=" + qt + "&qnum=" + qnum + "&remTime=" + remTime, true);
        	xmlhttp.send();

		}

		function getQuestid(qt, qnum){
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	               return xmlhttp.responseText;
	               // document.getElementById("qtypeHeader").innerHTML = xmlhttp.responseText;
	            }
        	};
        	xmlhttp.open("GET", "getQuestid.php?qtype=" + qt + "&qnum=" + qnum, true);
        	xmlhttp.send();
		}

		function showQuestType(qtypename){
			var questiontypename = qtypename;
			document.getElementById("viewSection").innerHTML = questiontypename;
		}
		
		function setCheckedValue(radioObj, newValue) {
			if(!radioObj)
				return;
			var radioLength = radioObj.length;
			if(radioLength == undefined) {
				radioObj.checked = (radioObj.value == newValue.toString());
				return;
			}
			for(var i = 0; i < radioLength; i++) {
				radioObj[i].checked = false;
				if(radioObj[i].value == newValue.toString()) {
					radioObj[i].checked = true;
				}
			}
		}

		function storeChoice(questid, qnum){
			var nameradio = "choice"+questid;
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	               // document.getElementById("qnArea").innerHTML = xmlhttp.responseText;
	            }
        	};
        	xmlhttp.open("GET", "choiceUpdate.php?questid=" + questid + "&qnum=" + qnum, true);
        	xmlhttp.send();
        	
        	
        
		}

		function isStatus(qt, qnum){
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	               return xmlhttp.responseText;
	               // document.getElementById("qtypeHeader").innerHTML = xmlhttp.responseText;
	            }
        	};
        	xmlhttp.open("GET", "isStatus.php?qtype=" + qt + "&qnum=" + qnum, true);
        	xmlhttp.send();
        	return xmlhttp.onreadystatechange();
		}

		function updateReview(qt, qnum){
			var xmlhttp = new XMLHttpRequest();
			var buttonId = "#navButs"+qnum;
            $(buttonId).addClass("visited");
			xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	            	$(buttonId).removeClass("marked4review");
	            	$(buttonId).removeClass("ansmarked");
	              //document.getElementById("qnArea").innerHTML = xmlhttp.responseText;
	             var classAdd = xmlhttp.responseText;
	             $(buttonId).addClass(classAdd);
	            }
        	};
			xmlhttp.open("GET", "reviewUpdate.php?qt=" + qt + "&qnum=" + qnum, true);
			xmlhttp.send();
		}

		function updateStatus(qt, qnum, status){
			var xmlhttp = new XMLHttpRequest();
			var buttonId = "#navButs"+qnum;
            $(buttonId).addClass("visited");
           

			xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	             var classAdd = xmlhttp.responseText;
	            if(status == 1){
	            	$(buttonId).removeClass("marked4review");
	            	$(buttonId).removeClass("ansmarked");
	            	$(buttonId).removeClass("answered");
	            	$(buttonId).removeClass("visited");
            		$(buttonId).addClass(classAdd);
            	}
	            	if(status == 4){
	            		$(buttonId).addClass("visited");
	            	}
	            }
        	};
        	if(status == 2 || status == 3){
        		xmlhttp.open("GET", "reviewStatus.php?qt=" + qt + "&qnum=" + qnum + "&status=" + status, true);
        	}
        	else{
        		xmlhttp.open("GET", "statusUpdate.php?qt=" + qt + "&qnum=" + qnum + "&status=" + status, true);
        	}
        	xmlhttp.send();

        	//updateImg(qt, qnum, status);
        
        	
            /*if(status == 2){
            	$(buttonId).addClass("marked4review");
            }
            if(status == 3){
            	isChoice = isStatus(qt, qnum);
	        	if(isChoice == 1){
	        		$(buttonId).addClass("ansmarked");
	        	}
	        	else{
	        		$(buttonId).addClass("ansmarked");
	        	}
            }*/
		}

		/*function updateImg(qt, qnum, status){
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	             return xmlhttp.responseText;
	            }
        	};
        	xmlhttp.open("GET", "updateImg.php?qt=" + qt + "&qnum=" + qnum + "&status=" + status, true);
        	xmlhttp.send();
        	return xmlhttp.onreadystatechange();

		}*/

		/*$('#underreview').on("click", function(event){
	    $('.radio_class').prop('checked', false);
	});*/

		function clearOption(qt, qnum){
			var xmlhttp = new XMLHttpRequest();
			/*var buttonId = "#navButs"+qnum;
            $(buttonId).addClass("visited");*/

			xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	             // document.getElementById("qnArea").innerHTML = xmlhttp.responseText;
	            }
        	};
        	xmlhttp.open("GET", "clearOption.php?qt=" + qt + "&qnum=" + qnum, true);
        	xmlhttp.send();

        	$('input[name = choice]').prop('checked', false);

		}

		function submitTest(){
			 location.href = "report.php";
		}

		function flushOut(){
			location.href = "logout.php";
		}
		function initialQn() {
			//$( "#cbp-fwslider" ).tabs();
		    document.getElementById("frstSec").click();

		    //$(frstSec).addClass("subject-name-visited");
		    //$( "#frstSec" ).tabs({ active: 0 });
		}
		/*$(window).load(function () {
    // Page is fully loaded .. time to fade out your div with a timer ..
   			$('.loader').fadeOut("slow");
   		});

		function countElapse() {
                             
                             //document.getElementById('Questn_Innr_Div_section').innerHTML = secElap;
                             document.getElementById('viewQPTD').innerHTML = secElap;

                             secElap = incr++;
                             $("input[name = 'navButs']").click(function(){
                             	var incr = "hey";
                             });

                             //document.getElementById('strclock').innerHTML = "Time Left: " + hour+":"+min+":"+sec;
							 setTimeout("countElapse()",1000);
							 }*/

	</script>
<!-- <style type="text/css">
.loader {
	position: fixed;
	left: 0px;
	top: 0px;
	width: 100%;
	height: 100%;
	z-index: 9999;
	background: url('images/page-loader.gif') 50% 50% no-repeat rgb(249,249,249);
}
</style> -->

</head>
<body onload="initialQn()" onselectstart="return false;" ondragstart="return false;">
<div class="loader"></div>
<center>
<!-- <div id="overlay">
    <img src="loading.gif" alt="Loading" id="progress"/><br />Loading...
</div> -->
</center>
<div id="wrapper">
  <div id="minwidth">
			<!-- <div id="header">
			 <table width="100%" cellspacing="0" cellpadding="0" border="0">
				<tbody>
				  <tr>
					<td align="left" id="bannerImage">
						<div id="bannerImg" style="float:left"></div>
						<div id="bannerText" align="center" style="margin-top:10px; font-weight:bold;"><font size="4" color="#ffffff"></font></div>
					</td>
				  </tr>
				</tbody>
			  </table>
		</div> -->

    <div id="sub-header">
    <div class="exam_name">
    <center>
    <span class="test-header" style="display:block"><?php echo $testName; ?></span>
    <span class="details2">IES Online Exam</span></center>
		</div>
		<div class="helpinstruction_div" style="display: none;">
		<div class="instruction_div" title=""><span class="instruction_icon">
		</span><a class="test-instruct thickbox" href=".TB_inline2?height=&amp;width=520&amp;inlineId=hiddenModal1&amp;modal=true" onclick=""><span  id="VI" class="auditlogButton">Instructions</span></a>
		</div>
		<div class="viewquestion_div" id="viewQPTD" style="display:none;"><span class="questionpaper_icon"></span><a class="test-instruct thickbox" href=".TB_inline2?height=&amp;width=520&amp;inlineId=hiddenModal3&amp;modal=true" onclick=""/><span id="viewQPButton" class="auditlogButton" title="View Entire Question Paper">Question Paper</span></a></div></div>
    </div>
    <!-- header ends-->
	<!--Container starts-->
    <div class="Container">
      <!--Center Container Starts-->
	  <div id="questionContent">
		<div class="profile-grouping-section">
		<div class="Rght_Section column" id="col2">
              <div id="User_Hldr">
				<div class="profile_image">
					<img width="94" height="101" align="absmiddle" class="candidateImg" src = "images/NewCandidateImage.jpg">
				</div>
				<div class="profile_details">
					<div id="Username" class="candOriginalName"><?php echo $_SESSION['login_username'] ?></div>
					<div id="viewProButton"><a id = "VPT" class="viewProfile auditlogButton thickbox" href=".TB_inline2?height=&amp;width=420&amp;inlineId=hiddenModal2&amp;modal=true" onclick=""/>Profile</a></div>
					
				</div>
                <div class="clear"></div>
                
              </div> 
		</div>
		            <div class="Lft_Section column" id="col1">
                      
					<!--  <div class="components-section"> 
							<div class="component-icon-container calculator-icon-container" title="calculator" onclick="loadCalculator()" style="display:none;"><div align="center"><span class="icon-0"></span></div></div>
							<div class="component-icon-container textarea-icon-container" title="Notepad" style="display:none;"><div align="center"><span class="icon-1"></span></div></div>
							<div class="component-icon-container scratchpad-icon-container" title="Scratchpad" style="display:none;"><div align="center"><span class="icon-2"></span></div></div>
							<div class="component-icon-container ruler-icon-container" title="Ruler" style="display:none;"><div align="center"><span class="icon-3"></span></div></div>
							<div class="component-icon-container protactor-icon-container" title="Protractor" style="display:none;"><div align="center"><span class="icon-4"></span></div></div>
							<div class="component-icon-container zoom-icon-container" title="Zoom" style="display:none;"><div align="center"><span class="icon-5"></span></div></div>
							<div class="component-icon-container zoomin-icon-container" title="ZoomIn" style="display:none;"><div align="center"><span class="icon-6"></span></div></div>
							<div class="component-icon-container zoomout-icon-container" title="ZoomOut" style="display:none;"><div align="center"><span class="icon-9"></span></div></div>
					   </div> -->
                      </div>
					  <div class="section-timepanel">
							<div class="section-details"  id="sectionsField">
								<span class="sect"><b>Sections</b> </span><span id="showOptionalSecSummary" style="display:none;"> [Attempt any <span id="maxOptSec"></span>&nbsp;of the <span id="noOptSec"></span>&nbsp;optional sections] </span>
							</div>

							<div class="time-details">
							<div id="showTime" style="float:right;">
							<?php

							//<!-- timer starts here-->
							$timestamp = time();
                            $rem = $duration;
							$diff = $duration;
							$hours = floor($diff / 3600) . ' : ';
							$diff = $diff % 3600;
							$minutes = floor($diff / 60) . ' : ';
							$diff = $diff % 60;
							$seconds = $diff;
							?>
							<span id="secTest"></span>
							<span id="secHid" style="display: none"></span>
							<div id="strclock" style="font-weight: bold;"></div>
							<script type="text/javascript" runat="server-proxy">
							 /*var hour = <//?php echo floor($hours); ?>;
							 var min = <//?php echo floor($minutes); ?>;
							 var sec = <//?php echo floor($seconds); ?>;*/
                             var secDur = <?php echo $remainingTime;?>;
                            
                            var hour = parseInt( secDur / 3600 ) % 24;
                            var min = parseInt( secDur / 60 ) % 60;
                            var sec = secDur % 60;
                                
                                
							function countdown() {
							 if(sec <= 0 && min > 0) {
							  sec = 59;
							  min -= 1;
							 }
							 else if(min <= 0 && sec <= 0) {
							  min = 0;
							  sec = 0;
							 }
							 else {
							  sec -= 1;
							 }
							 
							 if(min <= 0 && hour > 0) {
							  min = 59;
							  hour -= 1;
							 }
							 
                            var hour = parseInt( secDur / 3600 ) % 24;
                            var min = parseInt( secDur / 60 ) % 60;
                            var sec = secDur % 60;
                                
							 var pat = /^[0-9]{1}$/;
							 sec = (pat.test(sec) == true) ? '0'+sec : sec;
							 min = (pat.test(min) == true) ? '0'+min : min;
							 hour = (pat.test(hour) == true) ? '0'+hour : hour;
                             remTime = hour+":"+min+":"+sec;
                             
                             document.getElementById('secHid').innerHTML = secDur;

                             secDur -= 1;

                             document.getElementById('strclock').innerHTML = "Time Left: " + hour+":"+min+":"+sec;
							 
							
                                
                             /*var xmlhttp = new XMLHttpRequest();
                                xmlhttp.onreadystatechange = function() {
                                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                                        //secDur = xmlhttp.responseText;
                                        
                                        //var formatted = hour+":"+min+":"+sec;
                                        //document.getElementById('strclock').innerHTML = "Time Left: " + hour+":"+min+":"+sec;
                                      // document.getElementById('strclock').innerHTML = "Time Left: " + xmlhttp.responseText;
                                    }
                                };
                                xmlhttp.open("GET", "timerUpdate.php?secRem=" + secDur, true);
                                xmlhttp.send();*/
                             //return secDur;
							 setTimeout("countdown()",1000);
							 }
							 countdown();
							 
							</script>

							</div>
							</div>
					  </div>
                    <div>
     
						 <!-- <div class="subject-arrow-left-disabled"></div> -->
						<!-- <div  id="sections"> -->
						<!-- <form name="questForm" action="<?php //echo htmlspecialchars($_SERVER["login_user"]);?>" method="POST"> -->
						<div id="cbp-fwslider" class="cbp-fwslider" style="margin-left: 35px">
							<ul>
								<?php 
									include_once("generateqnpaper.php");
									setSections();
								 ?>
							</ul>
						</div>
								
								<!-- <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script> -->
								<!-- <script src="js/jquery-3.1.1.min.js"></script>
								<script src="js/jquery.cbpFWSlider.js"></script>

								<script>
									$( function() {
										$( '#cbp-fwslider' ).cbpFWSlider();

									} );
								</script> -->
						<!-- <?php
							// include_once("show_sections.php");
						?> -->
						<!-- </form> -->
					</div>
					<!-- <div class="subject-section-rightarrow">
						<div class="subject-arrow-right-disabled"></div>
					</div> -->
					
                    <div class="clear"></div>
                 
					
            </div>
		</div>
		<!--This is the navigation palette area... -->
        <div class="question_description_number_panel" id="rightDivision" width="273px">
            <div class="Rght_Section column" id="col2">
			  <div class="collapsebel_panel">
				<span class="collapse_icon"></span>
              <div class="diff_type_notation_area_outer">
                    <div class="diff_type_notation_area_inner">
                      <div class="notation_type_description">
                        <div class="notation_typeDiv leftdiv_notation"> <span class="answered" id="answeredCount"></span> <span class="type_title" id="answeredLabel"> Answered </span> </div>
						<div class="notation_typeDiv"> <span class="not_answered" id="notAnsweredCount"></span> <span class="type_title" id="notAnsweredLabel"> Not Answered </span> </div>
					
                        <div class="clear"></div>
						   <div class="notation_typeDiv leftdiv_notation"> <span class="not_visited" id="notVisitedCount"></span> <span class="type_title" id="notVisitedLabel">Not Visited </span> </div>
						    <div class="notation_typeDiv"> <span class="review" id="markedCount"></span> <span class="type_title" id="markedLabel"> Marked for Review</span> </div>
						   
							 <div class="clear"></div>
							    <div class="notation_typeDiv answered_review_container"> <span class="review_marked" id="markedReviewCount"></span> <span class="type_title" id="markedAndAnsweredLabel">Answered & Marked for Review</span> </div>
							<div class="clear"></div>
             </div>
                    </div>
                  </div>
              <div class="rightSectionDiv" id="rightSectionDiv1">
               
                <div class="content">
      
                </div>
              </div>
              <!--Navigation content area..-->
              <div class="rightSectionDiv" id="rightSectionDiv2">
                <div class="header">&nbsp;<span  class="viewSection" id = "currentQtype"></span>
				</div>
                <div class="subheader" id="chooseQuestion">Choose a Question</div>
                <div class="content nano" id="question_area" style="height: 250px;" >
                  <div class="question_area nano-content" ><div id="numberpanelQues" >
                  	
				</div> </div>
                </div>
              </div>
   
              <div class="clear"></div>
			  </div>
            </div>
		</div>
      <!--Center Container Ends-->
	<div class="Questn_Area">  
	 <span class="expand_icon"></span>
	 <div class="Questn_Innr_Div " >
	<div id="questionCont" style="height: 500px;">
				<div id="currentQues" style="height: 460px; overflow: auto;"><!-- <div class="questionTypeCont"><span class="questiontype-details"><span id="questionType">Question Type :</span>Multiple Choice Question</span>
				
				</div> --><div id="Questn_Innr_Div_section" style="height:35px;"><div id="Subjt_Div"></div><div id="Subdetail_Div"><div style="float:right;margin-right:5px;"><div class="chooseLang"> <span id="viewLang">View in :</span><select class="choose_lang auditlogSelect"> <option selected="selected" value="1">English</option><!-- <option value="2">Hindi</option> --></select></div></div></div></div>

				<div class="divHeader"><b><span class="questionNumber" id= "questNo">Question No.</span></b></div><div id="quesAnsContent" class="Ans_Area"><div style="width:100%;font-family:Arial,verdana,helvetica,sans-serif;margin-top:5px;">

				<div id="quesOuterDiv" style="height: 350px; overflow: auto; width:100; overflow-x: hidden;"><div class="leftDiv" style="width: 100%; height: 346px; overflow-x: hidden;">

				
				<div id = "qnArea">
			
				</div>
				</div></div></div></div></div>
				<div class="buttons-div">
								 <div class="Bttn_Area" id="buttonStatic">
				  <div class="finalSubmit" id="submitTD " align="center">
               <input type = "button" class="btn btn-primary-blue auditlogButton" id="finalSubmit" style="width:45%;" onclick="submitTest()" value="Submit" title="Submit" />
              </div>
				 <div class="save_buttoncontainer">
					<span id = "savenextspan" style="float:right;">
					
					</span>

					</div>

					<div class="other_buttoncontainer" style="position:fixed;">
					
					<span id = "review" style="display:inline-block;">
					
					</span>

					<span id = "clearRes">
					
					</span>
					<span id = "test">
						
					</span>
					</div>
					</div>
			  <div class="clear"></div>
				 </div>	
			</div>
			  <div class="clear"></div>
				 </div>	
			</div>
			</div>
    </div>
	
    <!-- Container Ends---->
    <!-- Footer Starts ---->
    <div id="footer">
    <script type="text/javascript">
    	//var = remSec; 
    	
    	/*function setSec(){
    		//while()
    		var remSec = document.getElementById("secHid").innerHTML;
    		setInterval("setSec()",5000);
    		document.getElementById("secTest").innerHTML= remSec;
    	}
    	setSec();*/
    </script>
    <!-- <center>
	<div class="footerCopywright">Copyright &copy; 2015 Tata Consultancy Services | <a href="http://www.tcsion.com/dotcom/TCSSMB/Login/terms_of_use.html" target="_blank">Terms of Use</a> | <a href="http://www.tcsion.com/dotcom/TCSSMB/Login/privacy_policy.html" target="_blank">Privacy Policy</a> | </div>
    <div class="footerTataLogo"><img src="images/tata-logo.png" /></div></center> -->
    <div class="clear"></div>
</div>
    <!-- Footer Ends ---->
  </div>
  <div class="clear"></div>


<div class="portlet" id="hiddenModal1">
  <div class="portlet_topper">
    <div class="popupheader sysInstruLabel">Instruction</div>
    <div  class="arrowplace"><a href=# onclick="tb_remove();">Close</a> </div>
  </div>
  <div class="popup_content" style="height:450px;width:100%;border:1px solid #ccc;font:16px/26px Georgia, Garamond, Serif;overflow:auto;">
    <script src="http://www.w3schools.com/lib/w3data.js"></script>
    <div w3-include-html = "instrContent.html"></div>
	<script>
	w3IncludeHTML();
	</script>
  </div>
</div>
<div class="portlet" id="hiddenModal3" >
  <div class="portlet_topper">
    <div class="popupheader">Question Paper</div>
    <div  class="arrowplace"><a href=# onclick="tb_remove();">Close</a> </div>
  </div>
  <div class="popup_content">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td valign="top"><div class="content" id="QPDiv">
				<div id="viewQPDiv" style="" > 
			</div>
				</div>
		</td>
      </tr>
    </table>
  </div>
</div>
<div class="portlet" id="hiddenModal4" >
  <div class="portlet_topper">
    <div class="popupheader UF">Useful Info</div>
    <div  class="arrowplace"><a href=# onclick="tb_remove();">Close</a> </div>
  </div>
  <div class="popup_content">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td valign="top"><div class="content" id="sectionSummary" >
			</div>
		</td>
      </tr>
    </table>
  </div>
</div>
<div class="portlet" id="hiddenModal2">
  <div class="portlet_topper">
    <div class="popupheader">Profile</div>
    <div  class="arrowplace"><a href=# onclick="tb_remove();">Close</a> </div>
  </div>
  <div class="popup_content">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
         <td valign="top"><div class="userimage"><img width="94" height="101" align="absmiddle" class="candidateImg" src="images/NewCandidateImage.jpg"/></div><div class="content"  id="profileDiv">
				 <table width="200" border="0" cellspacing="0" cellpadding="10" class="candidateDetailstbl">
					 <tbody>
					  <tr>
                <td width="27%" align="right" class="head1" id="loginName"> </td>
                <td align="left"  ><strong> <span id="candId"></span></strong></td>
              </tr>
					 <tr>
                <td width="27%" align="right" class="head1" id="candName">Name  </td>
                <td align="left" ><strong>: <span class="candOriginalName"><?php print_r($_SESSION['login_user']) ; ?></span></strong></td>
              </tr>
					<tr>
                <td align="right" class="head1" id="emailIdText">E-Mail</td>
                <td align="left"><strong>: Your email will be shown here<span id="emailId"></span></strong></td>
              </tr>	
				<tr>
                <td align="right" class="head1" id="contactNoText">Contact No.</td>
                <td align="left"  ><strong>: Your mobile number will be shown here<span id="contactNo"></span></strong></td>
              </tr>	
					<tr id="multilingualDropdown"  style="display:none">
						<td class="cngLang  head1" align="right">Change Language : </td>
							<td><select align="right" id="languageSelect" onchange="" onmousedown="if(this.options.length>8){this.size=8;}"onchange='this.size=0;' onclick="this.size=0;"></select>
						</td>
					</tr>
            </tbody></table>
          </div>
          </td>
      </tr>
    </table>
  </div>
</div>
</body>
</html>
