<?php session_start();?>

<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=8" />
	<link rel="shortcut icon" href="favicon.png">
	<title></title>
	<script>
	//var isAuthenticationRequired = true;
		var date = new Date();
		var jsVersion = date.getTime();
		document.write('<link rel="stylesheet" type="text/css" href="css/mock_style.css?v='+jsVersion+'"\/\>');
		document.write('<link rel="stylesheet" type="text/css" href="css/style.css?v='+jsVersion+'"\/\>');
		document.write('<link rel="stylesheet" type="text/css" href="css/keyboard.css?v='+jsVersion+'"\/\>');
		document.write('<link rel="stylesheet" type="text/css" href="css/number_style.css?v='+jsVersion+'"\/\>');
		document.write('<link rel="stylesheet" type="text/css" href="css/aecInstructions.css?v='+jsVersion+'"\/\>');
		document.write('<script type="text/javascript" src="js/jquery-1.8.0.min.js?v='+jsVersion+'"\><\/script>');
		//document.write('<script type="text/javascript" src="js/jquery.js?v='+jsVersion+'"\><\/script>');
		document.write('<script type="text/javascript" src="js/keyboard.js?v='+jsVersion+'"\><\/script>');
		document.write('<script type="text/javascript" src="js/jquery.actual.min.js?v='+jsVersion+'"\><\/script>');
		//document.write('<script type="text/javascript" src="js/bean.js?v='+jsVersion+'"\><\/script>');
		// document.write('<script type="text/javascript" src="js/top.js?v='+jsVersion+'"\><\/script>');
		
    </script>
	<script>
	$(document).ready(function(){
//		disable_scroll();
		/*$('select').css('cursor','url("BLACK.cur")');*/
	});
		

		function check(){
			if(document.getElementById("defaultLanguage1").value == "Select a language"){
				window.alert("Please choose your default language");	
			}
			else if(document.getElementById("disclaimer").checked!=true){
				window.alert("Please accept terms and conditions before proceeding");
			}
			else{
				window.location = "quiz/quiz.php";	
				//window.open('quiz/quiz.php','Test','status=yes,menubar=yes,directories=yes,resizable=yes,scrollbars=yes,fullscreen=yes,width=100%,height=100%');
				//window.open('quiz/quiz.php','Test','type=fullWindow,status=yes,menubar=yes,directories=yes,resizable=yes,scrollbars=yes,fullscreen=yes,width='+ maxw +',height=' + maxh);
			}
		}


		function readyToBegin(){
			if(document.getElementById("defaultLanguage").options.length>2){
				var lang = document.getElementById("defaultLanguage");
				if(lang.value!='0'){
					createDefaultSubject(lang.value);
				}else {
					cnfPop('InfoPopup');
		$("#infoMsg2").html("Please choose your default language.");
					return false;
				}
			}else{
				createDefaultSubject($('#defaultLang').val());
			}
			if(document.getElementById("disclaimer").checked==true){
				document.getElementById("readylink").removeAttribute("disabled",0);
				showId();
			}else {
				cnfPop('InfoPopup');
		$("#infoMsg2").html('Please accept terms and conditions before proceeding.');
				document.getElementById("readylink").disabled="disabled";
				return false;
			}
		}
		
		function linkDisp(){
			if(document.getElementById("disclaimer").checked==true){
				document.getElementById("readylink").removeAttribute("disabled",0);
			}else{
				document.getElementById("readylink").disabled="disabled";
			}
		}		
		
		/*$(window).unload(function(){
			$('.loader').show;
		});*/

/* window.onbeforeunload = function(event) {
var url = document.URL;
if(url.indexOf("instructions.html")>=0 && isAuthenticationRequired)
	authenticationFileDeleted();
};	 */	
		
	</script>

	<style type="text/css">
.loader {
	position: fixed;
	left: 0px;
	top: 0px;
	width: 100%;
	height: 100%;
	z-index: 9999;
	display: none;
	background: url('images/busy4.gif') 50% 50% no-repeat;
}
</style>

</head>

<body onload="" onselectstart="return false;" ondragstart="return false;">
	<div class="loader"></div>
	<div id="container">
		<?php
		if(!isset($_SESSION['login_user'])){
			header("location:index.php");
			}
		?>

		<div id="header">
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
		</div>
		
		<div id="mainleft" style="margin-left:3px;width:79%;">
			<div class="titlepath sysInstruLabel" id="instruction" style="display:none">Other Important Instructions</div> 
			<div id="commonPageInstruction">
				<div id="firstPage" style="overflow: hidden; border: 1px #CCC solid; padding: 2px; height: 150px; display: none;">
					<span style="float:right;"><span class="viewIn" style="display:none">View In : </span><select id="basInst" onchange=""></select></span>
                  
                    <br/>
                  <br/>
				</div>
				<div id="secondPagep1" style="overflow: hidden; border: 1px #CCC solid; height: 365px;">
				<div class="titlepath sysInstruLabel" id="instruction" style="padding-left:20px;"><b>Other Important Instructions</b></div>
				  <span id="secondPageLangView" style="float:right;"><span class="viewIn">View In : </span><select id="cusInst" >
                    <option>
                    English
                    </option>
                   
                    </select></span>
					<br/><br/>
					<span  style="overflow: hidden; height: 500px; padding-left:20px;">This is a Mock test. Question Paper displayed is for practice purpose only. Under no circumstances should this be presumed as a sample paper.</span><br/>
		  </div></div>
				<div id="instPagination" class="btnsection" align="center" >
				<a  id="instPaginationa" style="display:none" onclick="showInstr()" href="#"  class="btn btn-primary"><span ><strong><span id="nextTxt" >Next</span></strong><img id="imgdetails" src="images/Forward-25.png" width="25" height="18" /></span></a>
				</div>
				
				<div id="secondPagep2">
				<div id="defaultDisclaimerDiv" style="overflow:auto;height:120px; padding-left:15px;">
					<div id="defaultLangOptions" >
						<span id="defLang">Choose your default language</span>
						<select id="defaultLanguage1" class="select_style">
                        <option selected="selected">Select a language
                        </option>
                        <option>
                        English
                        </option>
                        </select>
						<br/><span class='highlightText' id="multiLangInstru" style="color:red;">Please note all questions will appear in your default language. This language can be changed for a particular question later on.</span><br/>
					</div>
					
					<br/>
					<span class="highlightText" id='highlightDisclaimer'>
						<table>
							<tr>
							<td style=" vertical-align:top"><div class="checkboxFive"><input type="checkbox" id="disclaimer" name="check" onclick="linkDisp();" style="margin-top:2px;margin-right:10px">  </input><label for="disclaimer"></label></div></td>
							<td><span style="width:100%;float:left;">
                            I have read and understood the instructions. All computer hardware allotted to me are in proper working condition. I declare  that 			I am not in possession of / not wearing / not  carrying any prohibited gadget like mobile phone, bluetooth  devices  etc. /any prohibited material with me into the Examination Hall.
                            </span>
                            <span style="width:100%;float:left;">
                            I agree that in case of not adhering to the instructions, I shall be liable to be debarred from this Test and/or to disciplinary action, which may include ban from future Tests / Examinations.
                            </span></td>
					</tr>
						</table>
					</span>
					<br/>
					</div>
				<div class="btnsection" align="center">
					<a href="instructions.php" class="btn btn-primary"  id="PreviousInst"><strong><img id="imgdetails1" src="images/Backward-25.png" width="25" height="18" /><span id="previousbtn"> Previous</span></strong></a>
					<span><a href="#" id="readylink" alt="" disabled="disabled" onclick="check()" class="btn btn-primary btn-primary-blue"><font size="3">I am ready to begin</font></a></span>
					</div>
				</div>

		</div>
		<div id="mainright" style="border-left:1px #000 solid;width:20%;">
			<div style="position:relative;padding:20px">
				<center><img class="candidateImg" width="38%" src="images/NewCandidateImage.jpg"> </center>
			</div>
			<div id="name" class="candOriginalName" style="font-size: 20px; color: rgb(79, 104, 135); font-weight: bold; text-align: center;"> <?php echo $_SESSION['login_user']; ?> </div>
			<div class="bluebg"></div>
		</div>
	</div>

<div id="footer">
		<center>
            <div id="VersionNo">Version 1.0</div>
            </center>
            <div class="clear"></div>
        </div>
</body>
</html>