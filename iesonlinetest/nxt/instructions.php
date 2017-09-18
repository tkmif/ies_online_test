<!DOCTYPE html>
<html>
<head>
	<!-- <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=8" /> -->
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
		// document.write('<script type="text/javascript" src="js/bean.js?v='+jsVersion+'"\><\/script>');
		// document.write('<script type="text/javascript" src="js/top.js?v='+jsVersion+'"\><\/script>');
	</script>

</head>

<body onselectstart="return false;" ondragstart="return false;">

<?php 
session_start();
if(!isset($_SESSION['login_user'])){
		header("location:/login.php");
	}
?>
	<div id="container">
		

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
			<div class="titlepath sysInstruLabel" id="instruction">Instruction</div> 
			<div id="commonPageInstruction">
            <div style="height: 490px; overflow: auto;">
				<div id="firstPage" style="overflow:hidden;border:1px #CCC solid;padding:2px">
					<span style="float:right;"><span class="viewIn">View In : </span><select>
                    <option>
                    English
                    </option>
                    </select></span>
                    
                    


                    <?php
					    $myfilename = "instrContent.html";
					    if(file_exists($myfilename)){
					      echo file_get_contents($myfilename);
					    }
					?>
                    
<!--                    <script src="http://www.w3schools.com/lib/w3data.js"></script>
                    <div w3-include-html = "instrContent.html"></div>
					<script>
					w3IncludeHTML();
					</script>
-->
              </div>
                    <br/><br/>
			  </div>
				</div>
				<div id="instPagination" class="btnsection1" align="center" >
				<a  id="instPaginationa" href="instructions2.php"  class="btn btn-primary"><span ><strong><span id="nextTxt" >Next</span></strong><img src="images/Forward-25.png" name="imgdetails" width="25" height="18" id="imgdetails" /></span></a>
				</div>
		</div>
		<div id="mainright" style="border-left:1px #000 solid;width:20%;">
			<div style="position:relative;padding:20px">
				<center><img class="candidateImg" width="38%" src = "images/NewCandidateImage.jpg"> </center>
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