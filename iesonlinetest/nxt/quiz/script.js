	  


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



		function showQuest(qt,qnum,choiceId,count){
			var id = choiceId;
			var xmlhttp = new XMLHttpRequest();
			var num = qnum + 1;
			var answered = 1;
			var markForReview = 2;
			var ansMarkForReview = 3;
			var notAnswered = 4;

			var buttonId = "#navButs"+qnum;
			// $(buttonId).removeClass("navButs");
			// $(buttonId).removeClass("marked4review");
	    	// $(buttonId).removeClass("ansmarked");
			// $(buttonId).removeClass("answered");
			// $(buttonId).removeClass("visited");
            
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


			var next = "<form action='' method = 'POST'><input type='button' style='margin-left: 5px; line-height: 33px;' id='savenext'  class='normalBtn btn btn-primary-save  btnEnabled auditlog' id = but"+ qnum +" name = 'next' value='Save &amp; Next' title='Save &amp; Next' onclick = 'showQuest("+ qt +","+ num +","+ choiceId +","+ count +"); updateStatus("+ qt + "," + qnum + "," + answered + ","+count+");'></form>";

			var review = "<input type='button' onclick='updateReview("+ qt + "," + qnum +","+ count +"); showQuest("+ qt +","+ num +","+ choiceId +","+ count +");' id='underreview' class='normalBtn btn btn-primary auditlog' value='Mark for Review &amp; Next' style='margin-left: 1%;' title='Mark for Review &amp; Next' />";
			
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

		function updateReview(qt, qnum, count){
			var xmlhttp = new XMLHttpRequest();
			var buttonId = "#navButs"+qnum;
            $(buttonId).addClass("visited");
			xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	            	
	            	$(buttonId).removeClass("marked4review");
	            	$(buttonId).removeClass("ansmarked");
	            	$(buttonId).removeClass("answered");
	            	$(buttonId).removeClass("visited");
	              //document.getElementById("qnArea").innerHTML = xmlhttp.responseText;
	             var classAdd = xmlhttp.responseText;
	             $(buttonId).addClass(classAdd);
	             var numOfAns = 0;
            	 var numOfMark = 0;
            	 var totAns = 0;
	             numOfAns = $('.answered').length - 1;
	             numOfMark = $('.ansmarked').length;
	             totAns = numOfAns + numOfMark;
            		//window.alert(totAns);
            		document.getElementById('popCount'+qt).innerHTML = "Total Answered = " + totAns + " / " +count;
	            }
        	};
			xmlhttp.open("GET", "reviewUpdate.php?qt=" + qt + "&qnum=" + qnum, true);
			xmlhttp.send();
		}

		function updateStatus(qt, qnum, status,count){
			var xmlhttp = new XMLHttpRequest();
			var buttonId = "#navButs"+qnum;
			$(buttonId).removeClass("navButs");
            $(buttonId).addClass("visited");
           

			xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	             var classAdd = xmlhttp.responseText;
	            if(status == 1){
	            	$(buttonId).removeClass("navButs");
	            	$(buttonId).removeClass("marked4review");
	            	$(buttonId).removeClass("ansmarked");
	            	$(buttonId).removeClass("answered");
	            	$(buttonId).removeClass("visited");
            		$(buttonId).addClass(classAdd);

            		var numOfAns = 0;
            		var numOfMark = 0;
            		var totAns = 0;
            		
            		var numRem = 0;
            		var numVis = 0;
            		var numMarkRev = 0;
            		var totQ = 0;

            		numVis = $('.visited').length-1;
            		numRem = $('.navButs').length; 
            		numMarkRev = $('.marked4review').length;
            		numOfAns = $('.answered').length - 1;
            		numOfMark = $('.ansmarked').length;

            		totQ = numVis + numRem + numMarkRev + numOfAns + numOfMark;

            		totAns = numOfAns + numOfMark;
            		// window.alert(totAns);
            		document.getElementById('popCount'+qt).innerHTML = "Total Answered = " + totAns + " / " + count;
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
	
