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
						<div id="bannerText" align="center" style="margin-top:8px; font-weight:bold;"><font size="4" color="#ffffff"></font><img src="logoMain.png" width="100px"></div>
					</td>
				  </tr>
				</tbody>
			  </table>
		</div>
		
    <div class="userInfo">
			<div class="system_info">
				<div class="system_name">
					<div id="sysName" class="name1">System Name :</div>
					<div class="details1"><!--C001--></div>
					<div style="font-size:15px;" class="details3">
						<a onClick="notMySystem();" style="color: white; text-decoration: none; border: 0 none;" id="notMySystem" href="#">Click here if the Name and Photograph<br>shown on the screen is not yours</a>
					</div>
				</div>

				<div class="logoHead" align="center">
					
				</div>

				<div align="center" class="user_pic"><img width="94" height="101" align="absmiddle" class="candidateImg" src="images/NewCandidateImage.jpg"></div>
				<div class="user_name">
					<div id="indexCandName" class="name2">Candidate Name :
					<!--<div class="details2">-->
						<span title="" class="details2" style="font-size:20px;">IES</span>
					<!--</div>-->
                    </div>
					<div style="margin-top:10px;text-align:right"><span class="name2" id="subName">Subject :</span><span style="font-size:15px;" class="details2">Mock Exam</span></div>
				</div>
				<div class="clear"></div>
			</div>
		</div>
		
		 
                <div id="login">
                    <div class="form-header" id="LoginPageHeader">Sign in to Continue</div>
                    <form name='form-login' action = "checklogin.php" method = "POST">

                        <span class="fontawesome-user"></span>
                        <!--                        <input type="text"  placeholder="Username">-->
                        <input type="text" name="uname" class="mandat_input keyboardInput loginText" placeholder = "username" style = "width: 220px" required>
                        <!--                        <span class="fontawesome-keybord"></span> -->

                        <span class="clear"></span>
						<br/>
                        <span class="fontawesome-lock"></span>
                        <input type="password"  value=""  class="mandat_input keyboardInput loginText" name="pass" placeholder = "password" style = "width: 220px" required>                      
                         <!--                      <span class="fontawesome-keybord"></span> -->
                         <span id= "retry"></span>

	  <input type = "submit" id="signInLabel" class="btn btn-primary btn-primary-blue" value = "Sign In" style="width:inherit">
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
<?php
include "checklogin.php";
?>
