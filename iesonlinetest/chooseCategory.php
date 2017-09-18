<?php 
session_start();
 ?>
<html>
    <head>
    	 <meta http-equiv="X-UA-Compatible" content="IE=8" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
       
        <title>Login</title>
        <link href="css/style-login.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="css/keyboard.css" />
        <link rel="stylesheet" href="css/number_style.css" />
        <link rel="shortcut icon" href="favicon.png">
        <script type="text/javascript" src="js/keyboard.js"></script>
        <script type="text/javascript" src = "code.jquery.com/jquery-3.1.0.min.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        </head>

        <!--<body onload="alignHeight();getCandName();loadIndexLabels()" onselectstart="return false;" ondragstart="return false;">-->
        <body>
        <div id="wrapper">
            <div id="minwidth"> 
                <!--header starts-->
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
		
    <div class="userInfo">
			<div class="system_info">
				<div class="system_name">
					<div id="sysName" class="name1">System Name :</div>
					<div class="details1"><?php echo ucwords($_SESSION['login_user']); ?></div>
					<div style="font-size:15px;" class="details3">
						<a onClick="notMySystem();" style="color: white; text-decoration: none; border: 0 none;" id="notMySystem" href="#">Click here if the Name and Photograph<br>shown on the screen is not yours</a>
					</div>
				</div>
				<div align="center" class="user_pic"><img width="94" height="101" align="absmiddle" class="candidateImg" src="images/NewCandidateImage.jpg"></div>
				<div class="user_name">
					<div id="indexCandName" class="name2">Candidate Name :<span class="details2"  style="font-size:20px;">IES</span></div>
					<div class="details2">
						<span title="" class="candOriginalName"></span>
					</div>
					<div style="margin-top:10px;text-align:right"><span class="name2" id="subName">Subject :</span><span style="font-size:15px;" class="details2">Mock Exam</span></div>
				</div>
				<div class="clear"></div>
			</div>
		</div>
		

		 
                <div id="login">
                    <div class="form-header" id="LoginPageHeader">Please Choose a Test</div>
                    <form name='formTestCat' id='formTestCat' action = "initialiseTest.php" method = "POST" >
                        
<center><table id = "catList" style = "">
                       <tr id="multilingualDropdown">
				<td align="left" style="font-size:13px;padding-right: 20px;">Select&nbsp;Test: </td>
				<td>
					<select id="testSelect" style="width:100%;height:20px;" name = "typeofquest" onchange="checkTest(this.value)" required>
						<option value = "">Please Select</option>
						<?php
							include_once("configQn.php");
							$query = "SELECT testid, name from onlinetestdetails";
              
              $queryTest = "SELECT DISTINCT a.testid, b.name FROM onlinetestdynamicqndetails a, onlinetestdetails b where a.testid = b.testid;";

							$res = pg_query($db_con, $query);
							if(pg_num_rows($res)){
								while($rs = pg_fetch_array($res)){
								
									$id = $rs['testid'];
					                $name = $rs['name']; 

					                echo '<option value="'.$id.'">'.$name.'</option>';
                        

								}
							}
							
						?>
					</select>
				</td>
			</tr></table> <br />
                <span id = "test" class= "warning"></span></center>
      <input type = "submit" id="signInLabel" onclick="startTest()" class="btn btn-primary disabled btn-primary-blue" value = "Continue" style="width:inherit;" disabled="true">
      
      <script type="text/javascript">

      	function checkTest(testId){
      		if(window.XMLHttpRequest){
      			// code for IE7+, Firefox, Chrome, Opera, Safari
      			xmlhttp = new XMLHttpRequest();
      		}else{
      			 // code for IE6, IE5
      			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      		}

      		xmlhttp.onreadystatechange = function(){
      			if(this.readyState == 4 && this.status == 200){
      				if(xmlhttp.responseText == 2){
      					document.getElementById("test").innerHTML = 'Please choose another test';
      					document.getElementById("signInLabel").disabled = "disabled";
      					$("#signInLabel").addClass("disabled");
      					$("#signInLabel").click(function(){});

      				}else{
      					document.getElementById("test").innerHTML = '';
      					document.getElementById("signInLabel").disabled = false;
      					$("#signInLabel").removeClass("disabled");
      					
      				}
      			}
      		};	
      		xmlhttp.open("GET", "checkTestValid.php?testId="+testId, true);
      		xmlhttp.send();
      	}

      	function startTest(){
      		window.open("nxt/instructions.php", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width="+screen.width+",height="+screen.height);
      	}
      </script>
<!--     <script>
	$("#signInLabel").onclick(function(){
		 window.open("nxt/instructions.php", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
	});
</script> -->

  <!--<a href="success_login.php" >-->
  <!--<span id="signInLabel" class="btn btn-primary btn-primary-blue">Sign In</span></a>-->
                    </form>
                </div>

            </div>
			    <div id="footer">
			    <center>
	<div id="VersionNo"> Version 1.0</div></center>
    <div class="clear"></div>
</div>

        </div>
</body>
</html>
