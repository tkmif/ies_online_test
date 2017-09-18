<?php
// session_start();
// Report all errors except E_NOTICE
// error_reporting(E_ALL & ~E_NOTICE);

?>

<!DOCTYPE html>
<html>
<head>
<script src="js/jquery-1.8.0.min.js"></script>
<title> IES Online Test </title>
<!--CSS for protactor-->
<link rel="shortcut icon" href="favicon.png">
<link rel="stylesheet" type="text/css" href="css/default.css" />

<!-- exports start -->
<!-- CSS start -->
<link rel="stylesheet" href="css/calc.css" />
<link rel="stylesheet" href="css/screen.css" />
<link rel="stylesheet" href="css/nanoscroller.css" />
<link rel="stylesheet" href="css/style.css" />
<link rel="stylesheet" type="text/css" href="css/component2.css" />
<link rel="stylesheet" href="css/documentation.css" />
<link rel="stylesheet" type="text/css" href="popupTag.css">
<!-- CSS ends -->
<!-- Scripts starts -->
<script src="js/modernizr.custom.js"></script>
<script src="js/jquery.min.js"></script>
        <script src="js/jquery.classyloader.min.js"></script>
<!-- Scripts ends -->
<!-- exports ends -->
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
			background-color: #4a76a6;
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
<!-- <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js"></script> -->
<!-- <script src="http://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.2/modernizr.js"></script> -->
	<script>
		function initialQn() {
			$( "#cbp-fwslider" ).tabs();
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


//paste this code under the head tag or in a separate js file.
	// Wait for window load
	$(window).load(function() {
		// Animate loader off screen
		$(".se-pre-con").fadeOut("slow");;
	});

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
<style type="text/css">
.no-js #loader { display: none;  }
.js #loader { display: block; position: absolute; left: 100px; top: 0; }
.se-pre-con {
	position: fixed;
	left: 0px;
	top: 0px;
	width: 100%;
	height: 100%;
	z-index: 9999;
	background: url(images/Preloader_10.gif) center no-repeat #fff;
}
</style>

</head>
<body onload="initialQn()" onselectstart="return false;" ondragstart="return false;">
<div class="se-pre-con"></div>


 <script type="text/javascript" src="script.js"></script>
<!-- <div class="loader"></div> -->

<div id="wrapper">
  <div id="minwidth">
    <div id="sub-header">
    <div class="exam_name">
    <center>
    <span class="test-header" style="display:block"><?php echo $testName; ?></span>
    <span class="details2">IES Online Exam</span></center>
	</div>
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
				</div>
                <div class="clear"></div>
                
              </div> 
		</div>
		            <div class="Lft_Section column" id="col1">
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
							 setTimeout("countdown()",1000);
							 }
							 countdown();
							</script>
							</div>
							</div>
					  </div>
                    <div>
						<div id="cbp-fwslider" class="cbp-fwslider" style="margin-left: 0px">
							<ul>
								<?php 
									include_once("generateqnpaper.php");
									setSections();
								 ?>
							</ul>
						</div>
								<script src="js/jquery.min.js"></script>
								<script src="js/jquery.cbpFWSlider.js"></script>

								<script>
									$( function() {
										$( '#cbp-fwslider' ).cbpFWSlider();

									} );
								</script>
					</div>
					
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
                <div class="content nano" id="question_area" style="height: 225px;" >
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
	
    <!-- Container Ends-->
    <!-- Footer Starts -->
    <div id="footer">
    <div class="clear"></div>
</div>
    <!-- Footer Ends-->
  </div>
  <div class="clear"></div>
</body>
</html>
