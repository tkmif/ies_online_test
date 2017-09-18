$(document).bind("contextmenu",function(e){
	preventDefault(e);
});
var feedbackdata;
var isPageRedirecting = false;
var authenticationKey = "";
var systemConfigurationParameters;
var isfinalSubmit = false;
var isFinalSubmitStarted=false;
var isRotatableLoaded = false;
var navSection=false;
var navGroup=false;
var explicitClose=false;
var toErrorPage=false;
var xmlFilePath = "";
var errorPageContent="";
var AuditJson=new Array();
var QPxml;
var isWindowClosed = false;
var zoomIconClass = "";
var currentChildQuestionsNormal = "";
var remainingInterruptions=0;
var MaxNoOfInterruption=0;
var noOfInterruptions=0;
var allowInterruptions='YES';
var consoleVersion='';
jQuery(document).ready(function(){
var url = document.URL;
if(url.indexOf("quiz.html") >=0){
		errorPageContent = url.split("quiz.html?")[1];
		}
	
var orgId;
var assessmentId;

if(url.indexOf("index.html") >= 0 || url.indexOf("configurationCheck.html") >= 0){
	
var params = "";
if(url.indexOf("index.html") >= 0) {
	params = url.split("index.html?");
	orgId= $.trim(params[1]).split("@@")[0];
 assessmentId= $.trim(params[1]).split("@@")[1];
 } else if(url.indexOf("configurationCheck.html") >= 0){
	 del_Online_Cookie('xmlFilePath');
	params = url.split("configurationCheck.html?");
	if(params[1].split("&")[0].split("=")[0] == "orgId"){
	orgId= params[1].split("&")[0].split("=")[1];
	}
	if(params[1].split("&")[1].split("=")[0] == "AsmntId"){
	assessmentId= params[1].split("&")[1].split("=")[1];
	}
// assessmentId= $.trim(params[1]).split("@@")[1];
}
var mockType = "";	
if(assessmentId.indexOf("M")!=-1){
	assessmentId=assessmentId.split("M")[1];
	mockType = "static";
} else {
	mockType = "assessment";
}	
	
var xmlURL = "/ASM/MockAssessmentAction.do?action=getXMLPath&orgId="+orgId+"&mockId="+assessmentId+"&mockType="+mockType;
  jQuery.ajax({
                url: xmlURL,
                async: false,
                type: 'POST',
                dataType: 'text',
                success: function(data) {
				xmlFilePath = data;
				xmlFilePath=xmlFilePath.replace(/\\/g,"/");
					 document.cookie = "xmlFilePath="+xmlFilePath;
					 getCandIdFromCookie();
					 if(url.indexOf("index.html") >= 0)
						 validateIndexPageURL();
					}
					});
} else {
	getCookie(true);
}
}); 

jQuery(document).ready(function(){
	var url = document.URL;
	var orgId;
	var assessmentId;
	if(url.indexOf("quiz.html")>=0 || url.indexOf("instructions.html")>=0 || url.indexOf("FeedBack.html")>=0 ||url.indexOf("close.html")>=0){
		var params="";
		params = url.split(".html?");
		orgId= $.trim(params[1]).split("@@")[0];
		assessmentId = $.trim(params[1]).split("@@")[1];
		if(assessmentId==null || assessmentId.length==0 || orgId == null || orgId.length==0){
			window.location.href ="error.html";
		}
	}
});

function avoidKeyPressing(event){
	if(event.ctrlKey){
		alert('Open in new Tab is disabled.');
		if(event.preventDefault)
			event.preventDefault();
		return false;
	}else if(event.shiftKey){
		alert('Open in new Window is disabled.');
		if(event.preventDefault)
			event.preventDefault();
		return false;
	}else if(typeof(event.altKey)=='undefined'?event.originalEvent.altKey:event.altKey){
		alert('Saving this link is disabled.');
		if(event.preventDefault)
			event.preventDefault();
		return false;
	}
	return true;
}

function activateAudioPlayer(){
	$(".almAudio .jp-jplayer").each(function(){
		var currentAudioContent = '';
		$($(this).next()).each(function(){
			currentAudioContent = $(this).attr("id");
		});
		$("#"+$(this).attr("id")).jPlayer({
			ready: function () {
				$(this).jPlayer("setMedia", {
					mp3: $(this).attr("title")
				});
			},
			play: function() {
				$(".jp-jplayer").not(this).jPlayer("pause");
			},
			swfPath: "js",
			supplied: "mp3",
			wmode: "window",
			smoothPlayBar: true,
			keyEnabled: true,
			remainingDuration: true,
			toggleDuration: true,
			 cssSelectorAncestor: '#'+currentAudioContent,
			 errorAlerts: false,
			 warningAlerts: false
		});
	});
}

function activateVideoPlayer(){
	$(".almVideo  .jp-jplayer").each(function(){
		$("#"+$(this).attr("id")).jPlayer({
			ready: function () {
				$(this).jPlayer("setMedia", {
					m4v: $(this).parent().parent().attr("name")
				});
			},
		    play: function() {
		        $(".jp-jplayer").not(this).jPlayer("pause");
		    },
			swfPath: "js",
			supplied: "m4v",
			size: {
				width: "640px",
				height: "360px",
				cssClass: "jp-video-360p"
			},
			smoothPlayBar: true,
			keyEnabled: true,
			remainingDuration: true,
			toggleDuration: true,
			cssSelectorAncestor: '#'+$(this).parent().parent().attr("id"),
			errorAlerts: false,
			warningAlerts: false
			
		});	 
	});
}

function editAudioVideoImageFilePath(quesText){
//Need to be change
	if(mockVar.storeCandResponse==1){
	quesText = quesText.replace(/tkcimages/g, xmlFilePath+ mockVar.availableQpId + '/tkcimages');
	}
	else{
		quesText = quesText.replace(/tkcimages/g, xmlFilePath + 'tkcimages');
	}
	return quesText;
}
function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
	e.returnValue = false;  
}

function theMouseWheel(e) {
	preventDefault(e);
}

function disable_scroll() {
	if (window.addEventListener) {
		window.addEventListener('DOMMouseScroll', theMouseWheel, false);
	}
	window.onmousewheel = document.onmousewheel = theMouseWheel;
}
/** *************Disable right click*********************** */
function clickIE() {
	if (document.all) {
		return false;
	}
}

function clickNS(e) {
	if(document.layers||(document.getElementById&&!document.all)) {
		if (e.which==2||e.which==3) {
			return false;
		}
	}
}

if (document.layers){
	document.captureEvents(Event.MOUSEDOWN);document.onmousedown=clickNS;
}
else{
	document.onmouseup=clickNS;document.oncontextmenu=clickIE;
}

var hintDivInnerHtml = '<span id="hintIcon"><img src="images/info.gif" style="-moz-user-select: text; width: 20px" onclick="openHintPopUp(this)"></span><div style="display: none;" class="popUpDiv" id="hintDiv"><div class="popupHeader">Hint<div class="btnclose" style="-moz-user-select: text;" onclick="closeHintPopup()"><img src="images/btn_close.gif" style="-moz-user-select: text;"></div></div><div id="hintText" style="padding: 5px"></div><div class="tip" style="-moz-user-select: text;"><img src="images/tip1.gif" style="-moz-user-select: text;"></div></div>';

Array.prototype.inArray = function(searchFor, property) {
    var retVal = -1;
    $.each(this, function(index, item) {
        if (item.hasOwnProperty(property)) {
            if (item[property].toLowerCase() === searchFor.toLowerCase()) {
                retVal = index;
                return false;
            }
        }
    });
    return retVal;
};

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

/** ****************common functions **************************** */

function restoreFromBackup(QPxml,xml,orgId,mockId,isResumed){
	$.ajaxSetup({
		async: false
	});
	$.getJSON(xmlFilePath+'CandResponse/'+mockVar.candMasterId+'/'+mockVar.attemptId+'/Backup.json', function(data){
		mockVar = data;
		console.log(mockVar);
		readSysInstructionsXMLQuizPage(QPxml,xml,orgId,mockId,isResumed);
		$.ajaxSetup({
			async: true
		});
	});
}
function checkFileExist(filePath){
	var response=true;
	$.ajax({
		type: "POST",
		url: filePath,
		async : false,
		dataType: navigator.userAgent.indexOf('msie')!=-1 ? "text" : "xml",
		success: function(data) {
				if (typeof data == "string") {
					QPxml = new ActiveXObject("Microsoft.XMLDOM");
					QPxml.async = false;
					QPxml.loadXML(data);
				} else {
				   QPxml = data;
				}
			
			},
		error : function(){
			response =  false;
		}
	});
	return response;
}
function readAndReturnXML(filePath){
	var xml="";
	$.ajax({
		type: "POST",
		url: filePath,
		async : false,
		dataType: ($.browser.msie) ? "text" : "xml",
		success: function(data) {
				if (typeof data == "string") {
					xml = new ActiveXObject("Microsoft.XMLDOM");
					xml.async = false;
					xml.loadXML(data);
				} else {
				   xml = data;
				}
			},
		error : function(){
		setTimeout(function(){
			window.location.href="error.html?E404";
		},50);
		}
	});
	return xml;
}
function alignHeight(){
	var height = $(window).height()-($("#header").height()+$("#footer").height());
	$('#mainleft').css({"height":height});
	$('#mainright').css({"height":height});
	$('#feedbackTableDiv').height($('#mainleft').height()-$('#feedBackHeader').outerHeight(true)-$('#submitBtnDiv').outerHeight(true));
	$('#container').css({"height":$('#mainleft').height()+$("#header").height()});
}
function quizPageHeight(){
	var height = $(window).height()-($("#header").height()+$("#footer").height()+$("#sub-header").height());
	$('#questionContent').css({"height":height});
	if(mockVar.curQuesBean.quesType=="TYPING TEST"){
		$('#questionCont').height($('#questionContent').height()-$('.profile-grouping-section').outerHeight(true)-2);
		$('#currentQues').height($('#questionCont').height()-1);
		$('#typingInstDiv').height(jQuery(window).height()-(jQuery("#header").outerHeight(true)+jQuery("#sub-header").outerHeight(true)+jQuery("#User_Hldr").outerHeight(true))-94);
	} else {
		$('#questionCont').height($('#questionContent').height()-($('.profile-grouping-section').outerHeight(true))-2);
		$('#currentQues').css({height:$('#questionCont').height()-$('.buttons-div').outerHeight(true)+1,overflow:'auto'});
	}
	if($('#groups').height()!=0){
		$('#timer').height($('#groups').height()+$('#sectionsField').height());
	}
	$('#sectionSummaryDiv').height($('#questionCont').height()-5);
	$('#QPDiv').height($('#questionCont').height());
	var theDiv = jQuery('#question_area');
			var questionpanelheight = jQuery(window).height()-(jQuery("#header").outerHeight(true)+jQuery("#sub-header").outerHeight(true)+jQuery("#User_Hldr").outerHeight(true)+jQuery(".diff_type_notation_area_outer").outerHeight(true)+jQuery(".header").outerHeight(true)+jQuery(".subheader").outerHeight(true)+55+jQuery("#footer").outerHeight(true)+jQuery(".profile-header-tablet").outerHeight(true)+jQuery(".toolbar-header-tablet").outerHeight(true)+parseInt(jQuery(".collapsebel_panel").css("border-left-width"))+parseInt(jQuery(".collapsebel_panel").css('border-top-width'))+7);
			theDiv.height(questionpanelheight);
			theDiv.nanoScroller();
	//$('.numberpanel').height($('#question_area').height()-5);	
	$('#instructionsDiv').height($('#questionCont').height());
	$('#typingInstDiv').height($('.numberpanel').height()-($('.viewSection').height()+$('#typingSubmit').height()+30));
	$('#breakTimeDiv').height(height);
	$('#scoreCardDiv').height(height);	
	var quesOuterDivHeight = $('#currentQues').height()-$('.questionTypeCont').outerHeight(true)-2;
	if(!(mockVar.showMarks) && $.trim(mockVar.mcQName).length<=0 )
		$('#quesOuterDiv').css({height:($('#currentQues').height()-12),overflow:'auto'});
		else
		$('#quesOuterDiv').css({height:($('#currentQues').height()-$('.questionTypeCont').outerHeight(true)-2)-43,overflow:'auto'});	
		$('.leftDiv').height($('#quesOuterDiv').height()-10);
	$('.rightDiv').height($('#quesOuterDiv').height()-10);
	//$('#quesAnsContent').css({ overflow:'auto'});
	$('#progEditorDisplay').height($('#progRightPart').height()-$('#progDescriptionDiv').outerHeight(true)-2);
    $('#textareaforflip').height($('#progRightPart1').height()-$('#progDescriptionDiv').outerHeight(true)-27);
	$('#breakContentDiv').height($('#breakTimeDiv').height()-$('#brkPrcdBtnDiv').outerHeight(true)-$('#col1').outerHeight(true));
	$('#breakSummaryDiv').height($('#breakContentDiv').height()-$('#breakTimeCountDiv').outerHeight(true));
	$('#break_summary').height($('#breakSummaryDiv').height()-60-$('.examSummaryHeader').outerHeight(true));
	$('#group_summary').height($('#sectionSummaryDiv').height()-$('#confirmation_buttons').outerHeight(true)-$('.examSummaryHeader').outerHeight(true)-80);
}
function quizPageHeight1(){
		$('#textareaforflip').height($('#progRightPart').height()-$('#progDescriptionDiv').outerHeight(true)-27);
}
function parseSysInstructions(page,sysInstrXML,useSystemInstructions,orgId,mockId,isOptionalSectionsAvailable,isMarkedForReviewConsidered,QPxml,xmlForDisclaimer,useDisclaimerInstructions){
	var o,instructionContent,disclaimerContent;
	var xml = readAndReturnXML(xmlFilePath+'/custInstructions.xml');
	$('#defaultLang').val($(xml).find('LANGID').text());
	o = new Option("-- Select --", "0");
	$(o).html("-- Select --");
	$("#defaultLanguage").append(o);
	$(xml).find("INSTRUCTION").each(function(){
		var langName = $(this).find("LANGNAME").text();
		var langId = $(this).find("LANGID").text();
		o = new Option(langName, "cusInstText"+langId);
		$(o).html(langName);
		$("#cusInst").append(o);
		o = new Option(langName, "sysInstText"+langId);
		$(o).html(langName);
		$("#basInst").append(o);
		o = new Option(langName, langId);
		$(o).html(langName);
		$("#defaultLanguage").append(o);
		if($.trim($(this).find("INSTRUCTIONTEXT").text())=="" || $.trim($(this).find("INSTRUCTIONTEXT").text()) == null || $.trim($(this).find("INSTRUCTIONTEXT").text())== " ")
			instructionContent =  "The instructions are not available in the chosen language. ";
		else{
			instructionContent = $.trim($(this).find("INSTRUCTIONTEXT").text());
		}
		if(page=='inst'){
			$('#secondPagep1').append("<div class='cusInstText"+langId+"' style='display:none;height:91%;width:100%;overflow:auto'>"+instructionContent+"</div>");
			$('#firstPage').append("<div class='sysInstText"+langId+"' style='display:none;height:93%;width:100%;overflow:auto'>The instructions are not available in the chosen language.</div>");
			$(xmlForDisclaimer).find("INSTRUCTION").each(function(){
			if(langName.toUpperCase() == $(this).find("LANGNAME").text().toUpperCase()){
						if(mockVar.storeCandResponse==1){
							disclaimerContent = $.trim($(this).find("DISCLAIMERTEXTOA").text());
						}
						else{
							disclaimerContent = $.trim($(this).find("DISCLAIMERTEXT").text());
							}
					if(	disclaimerContent!=null && 	disclaimerContent!=""){
						if(useDisclaimerInstructions=="YES"){	
								$('#agreementMessageDef').append('<span style="width:90%:float:left;display:none;" class="cusInstText'+langId+'">'+disclaimerContent+'</span>');
								$('#agreementMessageDef').show();
								$('#agreementMessageCustom').hide();
								}
						else{
							$('#agreementMessageCustom').append('<span style="width:90%:float:left;display:none;" class="cusInstText'+langId+'">'+disclaimerContent+'</span>');
							$('#agreementMessageCustom').show();
							$('#agreementMessageDef').hide();
							$('#highlightDisclaimer').removeClass('highlightText');
							}
						}
						else
						{
						if(useDisclaimerInstructions=="YES"){
							disclaimerContent= "The instructions are not available in the chosen language. ";
							$('#agreementMessageDef').append('<span style="width:90%:float:left;display:none;" class="cusInstText'+langId+'">'+disclaimerContent+'</span>');
							$('#agreementMessageDef').show();
								$('#agreementMessageCustom').hide();
							}
							else{
							disclaimerContent= "The instructions are not available in the chosen language. ";
							$('#agreementMessageCustom').append('<span style="width:90%:float:left;display:none;" class="cusInstText'+langId+'">'+disclaimerContent+'</span>');
							$('#agreementMessageCustom').show();
							$('#agreementMessageDef').hide();
							$('#highlightDisclaimer').removeClass('highlightText');
							}
						}	
				}
		});
		}else{
			$('#secondPagep1').append("<div class='cusInstText"+langId+"' style='display:none;'>"+instructionContent+"</div>");
			$('#firstPage').append("<div class='sysInstText"+langId+"' style='display:none;'>The instructions are not available in the chosen language.</div>");
		}
		$(sysInstrXML).find("INSTRUCTION").each(function(){
			if(langName.toUpperCase() == $(this).find("LANGNAME").text().toUpperCase()){
				if($.trim($(this).find("INSTRUCTIONTEXT").text())=="" || $.trim($(this).find("INSTRUCTIONTEXT").text()) == null || 
					$.trim($(this).find("INSTRUCTIONTEXT").text())== " " || $.trim($(this).find("INSTRUCTIONTEXT").text())== "<br>" || $.trim($(this).find("INSTRUCTIONTEXT").text()) == "<br/>"){
					instructionContent =  "The instructions are not available in the chosen language. ";
				}
				else{
					instructionContent = $.trim($(this).find("INSTRUCTIONTEXT").text());
				}
				$(".sysInstText"+langId).html(instructionContent);
				if(useSystemInstructions=="YES"){
					if(langName.toUpperCase() == "ENGLISH"){
						if(isMarkedForReviewConsidered == "NO"){
							$(".considerMarkedReview").html("NOT");
						}else if(isMarkedForReviewConsidered == "YES"){
							 $(".considerMarkedReview2").html("or marked for review");
						}
						if(isOptionalSectionsAvailable == "YES"){
							$(".sysInstText"+langId).append($(sysInstrXML).find("OPTIONALTEXTENGLISH").text());
						}
					}else if(langName.toUpperCase() == "HINDI"){
						if(isMarkedForReviewConsidered == "NO"){
							$(".considerMarkedReviewHindi").html("&#2344;&#2361;&#2368;&#2306;");
						}else if(isMarkedForReviewConsidered == "YES"){
							$(".considerMarkedReviewHindi2").html("&#2351;&#2366; &#2346;&#2369;&#2344;&#2352;&#2381;&#2357;&#2367;&#2330;&#2366;&#2352; &#2325;&#2375; &#2354;&#2367;&#2319; &#2330;&#2367;&#2344;&#2381;&#2361;&#2367;&#2340; &#2361;&#2376;");
						}
						if(isOptionalSectionsAvailable == "YES"){
							$(".sysInstText"+langId).append($(sysInstrXML).find("OPTIONALTEXTHINDI").text());
						}
					}
				}
			}
		});	
	});
	$(".completeDuration").html($(QPxml).find('questionPaperXML').attr('questionPaperTotalTime'));
	calcTotalQues(orgId,mockId,QPxml);
}
function changeSysInst(param,value,value2){
		$('*[class^="'+value+'"]').hide();
		$('.'+param).show();
		var digits = param.replace(/\D/g, "");
	    finalVal=value2.concat(digits);
		$('*[class^="'+value2+'"]').hide();
		$('.'+finalVal).show();
		if(value2=="cusInstText"){
		$("#cusInst").val(finalVal);}
		else
		$("#basInst").val(finalVal);
}
function validateExpiry(orgId,mockId){	
	var xml = readAndReturnXML(xmlFilePath+'/confDetails.xml');
	var curDate = new Date();
	if($.trim($(xml).find("AssessmentStartDate").text())!=null && $.trim($(xml).find("AssessmentStartDate").text()) != ""){
		var startDate = new Date(parseInt($.trim($(xml).find("AssessmentStartDate").text())));
		if(curDate <= startDate){
			window.location.href="error.html?E110";
		}
	}
	if($.trim($(xml).find("AssessmentEndDate").text())!=null && $.trim($(xml).find("AssessmentEndDate").text()) != ""){
		var startDate = new Date(parseInt($.trim($(xml).find("AssessmentEndDate").text())));
		if(curDate >= startDate){
			window.location.href="error.html?E105";
		}
	}
	
	return xml;
}

/** ****************index page **************************** */
function validateIndexPageURL(){
	var url = document.URL;
	var params = url.split("index.html?");
	var orgId = $.trim(params[1]).split("@@")[0];
	var mockId = $.trim(params[1]).split("@@")[1];
	if(params.length>1 ){
		if(mockId.indexOf("#")>-1){
			mockId = mockId.substring(0,mockId.indexOf("#"));
		}
		if($.trim(params[1]).length>0){
			var xml=validateExpiry(orgId,mockId);
			basicDetails(xml,false);
			$("#pWait").hide();
		}
	}else{
		window.location.href="error.html";
	}
}
function basicDetails(xml,isExtraJSRequired){
if(document.URL.indexOf("FeedBack")==-1 && document.URL.indexOf("close")==-1){
		if($(xml).find("Allowinterruptions").text()!='' && $(xml).find("Allowinterruptions").text()=='NO'){
			var maxAllowedInterruptions='';
			maxAllowedInterruptions=$(xml).find("NoOfInterruptions").text();
			MaxNoOfInterruption=parseInt(maxAllowedInterruptions);
			allowInterruptions='NO';
			remainingInterruptions=MaxNoOfInterruption-parseInt(noOfInterruptions+"");
			//alert(remainingInterruptions);
		}
		else if($(xml).find("Allowinterruptions").text()==''){
			if($(xml).find("NoOfInterruptions").text()==''){
			MaxNoOfInterruption=50;
			}
			else{
				var maxAllowedInterruptions='';
				maxAllowedInterruptions=$(xml).find("NoOfInterruptions").text();
				MaxNoOfInterruption=parseInt(maxAllowedInterruptions);
			}
				
				allowInterruptions='NO';
				remainingInterruptions=MaxNoOfInterruption-parseInt(noOfInterruptions+"");
				//alert(remainingInterruptions);
			}
		
		else{
			MaxNoOfInterruption=9999;
			//remainingInterruptions=9999-parseInt(noOfInterruptions);
			remainingInterruptions=9999;
		}
	}
	mockVar.candResponseUrl = $(xml).find("CandidateResponseHandlerURL").text();
	mockVar.mockName = $(xml).find("AssessmentName").text();
	$("#mockName").html(mockVar.mockName);
	
	if($(xml).find("LoginIDLabel").length>0 && $.trim($(xml).find("LoginIDLabel").text()).length>0){
		mockVar.loginLabel = $(xml).find("LoginIDLabel").text();
	}else{
		mockVar.loginLabel = "Roll No";
	}
	$("#loginName").prepend(mockVar.loginLabel);
	if($(xml).find("USEDEFAULTCANDIDATEIMG").length>0 && $(xml).find("USEDEFAULTCANDIDATEIMG").text() == "NO"){
		$(".candidateImg").attr("src",$(xml).find("CANDIDATEIMGPATH").text());
	}else{
		$(".candidateImg").attr("src","images/NewCandidateImage.jpg");
	}
	if($(xml).find('ShowViewQPButton').length>0 && $(xml).find('ShowViewQPButton').text() == 'NO'){
		$('#viewQPTD').hide();
		$('#submitTD').removeAttr('width');		
		$('#submitTD').attr('colSpan','2');
	}else{
		$('#viewQPTD').show();
		$('#submitTD').removeAttr('colspan');		
	}
	if($(xml).find('OptionOrientation').length>0 && $(xml).find('OptionOrientation').text() == 'Horizontal'){
		mockVar.showOptionsHorizontally = 1;
	}
	if(isExtraJSRequired && $(xml).find('ShowCalculator').length>0 && ($(xml).find('ShowCalculator').text().toUpperCase() == 'SCIENTIFIC')){
	$("#loadCalc").load("Calculator.html?v='"+jsVersion+"'", function() {
	jQuery("#scientificText").show();
		mockVar.showCalculator = $(xml).find('ShowCalculator').text().toUpperCase();
		$('.calculator-icon-container').show();
		});
	}
	else if(isExtraJSRequired && $(xml).find('ShowCalculator').length>0 && ($(xml).find('ShowCalculator').text().toUpperCase() == 'NORMAL')){
	$("#loadCalc").load("Calculator.html?v='"+jsVersion+"'", function() {
	jQuery("#normalText").show();
		mockVar.showCalculator = $(xml).find('ShowCalculator').text().toUpperCase();
		$('.calculator-icon-container').show();
		});
	}
	else
		mockVar.showCalculator=$(xml).find('ShowCalculator').text();
	if($(xml).find('ShowScoreCard').length>0 && $(xml).find('ShowScoreCard').text() == 'YES'){
		mockVar.displayScoreCard = 1;
	}
	if($(xml).find('ShowPercentageScore').length>0 && $(xml).find('ShowPercentageScore').text() == 'YES'){
		mockVar.displayPercentageScore = 1;
	}
	if($(xml).find('showOptionInViewQP').length>0 && $(xml).find('showOptionInViewQP').text() == 'YES'){
		mockVar.showOptionInViewQP = 1;
	}
	if($(xml).find('StoreCandResponse').length>0 && $(xml).find('StoreCandResponse').text() == 'YES'){
		mockVar.storeCandResponse = 1;
	}
	if(mockVar.storeCandResponse==0){
		if($(xml).find("BannerPath").length>0 && $.trim($(xml).find("BannerPath").text()).length>0){
			$("#bannerImg").html("<img height= '45px' src='"+$(xml).find("BannerPath").text()+"'/>");
		}
		if($(xml).find("BannerText").length>0 && $.trim($(xml).find("BannerText").text()).length>0){
			$("#header").css('background-color', $(xml).find("BannerText").text());
		}
		if($(xml).find("CandidateName").length>0){
		
		mockVar.mockCandidateName = $(xml).find("CandidateName").text();
		$('.candOriginalName').attr('title',mockVar.mockCandidateName);
	}
	else{
	
	mockVar.mockCandidateName = "John Smith";
		$('.candOriginalName').attr('title',mockVar.mockCandidateName);
	
	}
}
else if(mockVar.storeCandResponse==1){
	
	if($(xml).find("ActualBannerPath").length>0 && $.trim($(xml).find("ActualBannerPath").text()).length>0){
		$("#bannerImg").html("<img height= '45px' src='"+$(xml).find("ActualBannerPath").text()+"'/>");
	}
	if($(xml).find("BannerBackGroundColour").length>0 && $.trim($(xml).find("BannerBackGroundColour").text()).length>0){
		$("#header").css('background-color', $(xml).find("BannerBackGroundColour").text());
	}
} 
	if($(xml).find('ShowHint').length>0 && $(xml).find('ShowHint').text() == 'YES'){
		mockVar.ShowHint = 1;
	}
	if($(xml).find('ResponseSaveInterval').length>0 && $.trim($(xml).find('ResponseSaveInterval').text()).length>0){
		mockVar.backupTimeInterval = $(xml).find('ResponseSaveInterval').text()*1000;
	}
	$("#VersionNo").html("Version " +$(xml).find("Version").text());
	if($(xml).find('SoftwareLanguages').length>0 && $.trim($(xml).find('SoftwareLanguages').text()).length>0){
		for(var i=0;i<$(xml).find('SoftwareLanguages').text().split(',').length;i++){
			var value = $(xml).find('SoftwareLanguages').text().split(',')[i];
			$('#languageSelect').append($('<option>').text(value).attr('value',value));
		}
		if($(xml).find('SoftwareLanguages').text().split(',').length>1){
			$('#multilingualDropdown').show();
			} /*else {
		selLang($(xml).find('SoftwareLanguages').text());
	}*/
	}else{
		$('#languageSelect').append($('<option>').text("English").attr('value',"English"));
	}
	if(isExtraJSRequired && $(xml).find('AdditionalTools').length>0 && $.trim($(xml).find('AdditionalTools').text()).length>0){
	//Added by Boddu Rakesh
	//document.write('<script type="text/javascript" src="js/jquery.ui.touch-punch.min.js?v='+jsVersion+'"\><\/script>');

		for(var i=0;i<$(xml).find('AdditionalTools').text().split(',').length;i++){
			var value = $(xml).find('AdditionalTools').text().split(',')[i];
				if(value=="textareaPad"){
						mockVar.textAreaPad=1;
						$('.textarea-icon-container').show();
				}
				else if(value=="ScratchPad"){
				$.getScript("js/sketch.js?v='"+jsVersion+"'")
				.done(function( script, textStatus ) {
				scratchPadiON();
					mockVar.ScratchPad=1;
					$('.scratchpad-icon-container').show();
					});
				}
				else 
					if(value=="Ruler"){
					ionRuler();
					mockVar.ruler=1;
					$('.ruler-icon-container').show();
				}
				else if(value=="Protractor"){
					ionProtractor();
					mockVar.protractor=1;
					$('.protactor-icon-container').show();
				}else if(value=="Zoom"){
					mockVar.zoom=1;
					$('.zoomin-icon-container').show();
					$('.zoomout-icon-container').show();
				}
				
				
				}
				

	}
	if(mockVar.storeCandResponse==1){
		$(".candidateImg").hide();
	}
}
/** ****************instrutions page************************************* */

function getCookie(isMockVarRequired){
	var i,x,y,defLang="",langName="",ARRcookies=document.cookie.split(";");	
	if(ARRcookies != null && ARRcookies != ""){
		for (i=0;i<ARRcookies.length;i++){
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x=="defaultLang"){
				defLang = y;
			}else if (x=="viewLangName"){
				langName = y;
			}else if(x == "xmlFilePath"){
				xmlFilePath = y;
			}
			else if(isMockVarRequired && x == "systemParameters"){
				//mockVar.systemParameters = y;
				systemConfigurationParameters = y;
			}
		}
	}else{
		window.location.href="error.html?E103";
	}
	if(isMockVarRequired && ((defLang != null && defLang != "") || (langName != null || langName != ""))){		
		mockVar.defaultLang = unescape(defLang);
		if(mockVar.langName != null && mockVar.langName != "")
			langName = mockVar.langName;
		mockVar.langName = (langName != null && langName != "")?unescape(langName):"English";
	}else if(isMockVarRequired){		
		window.location.href="error.html?E103";
	}
}

function validateQuizPageUrl(){
	var url = document.URL;
	var params = url.split("quiz.html?");
	var orgId = $.trim(params[1]).split("@@")[0];
	var mockId = $.trim(params[1]).split("@@")[1];
	var attemptId = $.trim(params[1]).split("@@")[2];
	/*if(mockId.indexOf("M") == -1){		
		authenticationKey = $.trim(params[1]).split("@@")[5];		
		if(typeof(authenticationKey)!='undefined' && authenticationKey.indexOf("#")>-1){		
					authenticationKey = authenticationKey.substring(0,authenticationKey.indexOf("#"));		
				}		
				}*/
	var isOnlineAssessment = false;
	var isResumed = 0;
	if(mockId.indexOf("M") == -1){
		isOnlineAssessment = true;
		isResumed = $.trim(params[1]).split("@@")[4];
		if(isResumed.indexOf("#")>0)
			isResumed = isResumed.split("#")[0];
		}
		////console.log(isResumed);
	if(mockId != null && mockId.length>0){
		if(typeof(attemptId)!='undefined' && attemptId.indexOf("#")>-1){
			attemptId = attemptId.substring(0,attemptId.indexOf("#"));
		}
		if(typeof(mockId)!='undefined' && mockId.indexOf("#")>-1){
			mockId = mockId.substring(0,mockId.indexOf("#"));
		}
		if(params.length>1 && $.trim(params[1]).length>0){
			var xml =validateExpiry(orgId,mockId);
			//var xml = readAndReturnXML(xmlFilePath+'/confDetails.xml');
			mockVar.orgId = orgId;
			mockVar.mockId = mockId;
			mockVar.attemptId = attemptId;
			if(iOAP.defaultLang==null || iOAP.defaultLang ==""){
				getCookie(true);
				getCandIdFromCookie();
			}
			basicDetails(xml,true);
			mockVar.isFeedBackRequired = $(xml).find("ShowFeedback").text();
			mockVar.showEmailId = $(xml).find("SHOWEMAILID").text();
			mockVar.showContactNo = $(xml).find("SHOWCONTACTNO").text();
			if($(xml).find("SHOWEMAILID").text() == "YES"){
				var emailId = mockVar.mockCandidateName.replace(/\s+/g, '.');
				$("#emailId").html("<b> : </b>"+emailId+"@gmail.com");
			}
			
			if($(xml).find("SHOWCONTACTNO").text() == "YES"){
				$("#contactNo").html("<b> : </b>9999999999");
			}

		
			////console.log(895);
			//Need to Change
			if(mockVar.qpId!="" && typeof(mockVar.qpId)!='undefined' && checkFileExist(xmlFilePath+mockVar.qpId+'/quiz.xml')){
				mockVar.availableQpId = mockVar.qpId;
				////console.log(898);
			}else{ //Need to change
				if(mockVar.questionType!='QPT'){
					mockVar.availableQpId = '';
					////console.log(902);
					QPxml = readAndReturnXML(xmlFilePath+'/quiz.xml');
				}else{
					window.location.href="error.html";
				}
			}
			
			if(parseInt(isResumed) == 0)
				readSysInstructionsXMLQuizPage(QPxml,xml,orgId,mockId,isResumed);
			else
				restoreFromBackup(QPxml,xml,orgId,mockId,isResumed);
		}
	}else{
		window.location.href="error.html";
	}
}

function restoreMockOnRefresh(){
	try{
		if(window.name!="" && (JSON.parse(window.name)).mockId!="undefined"){
			mockVar = JSON.parse(window.name);
		}
	}catch(exc){
		
	}
}

function readSysInstructionsXMLQuizPage(QPxml,xml,orgId,mockId,isResumed){
	var useSystemInstructions = $(xml).find("UseDefaultSystemInstruction").text();
	var compMockTime=0;
	if(isResumed == 0)
		compMockTime = $(QPxml).find("questionPaperXML").attr('questionPaperTotalTime');
	else 
		compMockTime = mockVar.completeTime;
	mockVar.completeTime = compMockTime;
	var counter =1;
	var langId = 1;
	for(counter=1;counter<=15;counter++){
		$(xml).find("UsefulDataFile"+counter).each(function(){
			if($(this).text()!=null && $.trim($(this).text()) != ""){
				mockVar.helpContent[counter] = $(this).text();
				mockVar.isHelpContentAvailable = true;
			}
		});
	}
	
	//mockVar.minSubmitTime = $(xml).find("COMPULSORYTIME").text();
	var isOptionalSectionsAvailable = $(xml).find("ISOPTIONALSECTIONSAVAILABLE").text();
	var isMarkedForReviewConsidered = $(xml).find("ConsiderMarkForReview").text();
	mockVar.isMarkedForReviewConsidered = isMarkedForReviewConsidered;
	if(mockVar.storeCandResponse==0){
		if($(xml).find("BannerPath").length>0 && $.trim($(xml).find("BannerPath").text()).length>0){
			$("#bannerImg").html("<img height= '45px' src='"+$(xml).find("BannerPath").text()+"'/>");
		}
		if($(xml).find("BannerText").length>0 && $.trim($(xml).find("BannerText").text()).length>0){
			$("#header").css('background-color', $(xml).find("BannerText").text());
		}
}
else if(mockVar.storeCandResponse==1){
	if($(xml).find("ActualBannerPath").length>0 && $.trim($(xml).find("ActualBannerPath").text()).length>0){
		$("#bannerImg").html("<img height= '45px' src='"+$(xml).find("ActualBannerPath").text()+"'/>");
	}
	if($(xml).find("BannerBackGroundColour").length>0 && $.trim($(xml).find("BannerBackGroundColour").text()).length>0){
		$("#header").css('background-color', $(xml).find("BannerBackGroundColour").text());
	}
} 
	$("#footer").html("Version : " +consoleVersion+"</div>");
	if(useSystemInstructions.toUpperCase()=="NO"){
		var xml =readAndReturnXML(xmlFilePath+'/sysInstructions.xml');
		parseSysInstructions('quiz',xml,useSystemInstructions.toUpperCase(),orgId,mockId,isOptionalSectionsAvailable.toUpperCase(),isMarkedForReviewConsidered.toUpperCase(),QPxml);
	}else{
		var xml = readAndReturnXML('sysInstructions.xml');
		parseSysInstructions('quiz',xml,useSystemInstructions.toUpperCase(),orgId,mockId,isOptionalSectionsAvailable.toUpperCase(),isMarkedForReviewConsidered.toUpperCase(),QPxml);
	}

	if(document.getElementById("basInst").options.length>1){
		$('#basInst').parent().show();
		$('#cusInst').parent().show();
	}

	if($('#basInst option:selected').val().indexOf('sysInstText')>-1)
		langId = $('#basInst option:selected').val().split('sysInstText')[1];
	$('.sysInstText'+langId).show();
	$('.cusInstText'+langId).show();
	readXMLQuestionPaper(QPxml,isResumed);
}


function renderQuestions(xml,selectorElement){
	var groupCounter = 0;
	mockVar.difficultyValues = [];
	var values =0;
	//////console.log($(xml).find("difficultyLevelKey"));
	//////console.log($(xml).find("difficultyLevelKey").text()
	if($(xml).find("difficultyLevelKey").length == 0){
		mockVar.difficultyLevelKey = "Difficulty Level";
	}else{
		mockVar.difficultyLevelKey = $(xml).find("difficultyLevelKey").text();
	}
	$(xml).find(selectorElement).each(function(){
		iOAP = new createNewGroupObj();
		getCurrentGrpSecQuestId(false,0);
		typingGrpObj = new typingObject();
		var secCounter = 0;
		$(this).find("section").each(function(){
			var questionArrSection = new Array();
			quesCounter = 0;
			//Added by Boddu Rakesh
			sectionId = $(this).attr("id");
			var secName = $(this).find("sectionDisplayText").text();
			var answered = 0;
			var notanswered = 0;
			var marked = 0;
			var markedAndAnswered = 0;
			var difficultyLevel = [];
			var difficultyLabels = [];
			var count =0;
			var isOptional = $(this).attr("isOptional");
			if(isOptional == 'true'){
				iOAP.noOptSec++;
			}
			var secType = $(this).attr('sectionType')?$(this).attr('sectionType'):"";
			var displayNumberPanel = $(this).attr('displayNumberPanel')?$(this).attr('displayNumberPanel'):"";
			var groupAllQuestions = $(this).attr('groupAllQuestions')?$(this).attr('groupAllQuestions'):"";
			var hasOptionalQuestion = $(this).attr('hasOptionalQuestions')?$(this).attr('hasOptionalQuestions'):"";
			
			if(secType.toUpperCase().indexOf("TYPING")!=-1){
				iOAP.isTypingGroup = true;
			} else if(secType.toUpperCase()=="OFFLINE"){
				iOAP.hasOfflineSect = true;
			}
			$(this).find('subsection').each(function(){
				questionArr = new Array();
				var compreQuestionIdArr = new Array();
				var compreQuestionArr = new Array();
				var compQuesCounter = -1;
				var questionShuffling = $(this).attr('questionShuffling') == 'true'?true:false;
				$(this).find("question").each(function(){
					var comprehensionId = 0, laqId = 0, laqParentId = 0, langId = '';
					var keyboardType = '', typingType = '', answerType = '', isCaseSensitive = false, isEvaluationRequired = false;
					var optId = '', optText = '',sequenceId='', optKeyName = '', optKeyVal = '', inputValues = '', outputValues = '', paragraphDisplay = true , programmingSkeletalCode= '', alphaWordLimit='';
					var quesLangArr = new Array();
					var quesKeyPair = new Array();
					var options = new Array();
					var correctAnswer = new Array();
					var langBeanArr = new Array();
					var testCasePair = new Array();
					var quesLangBeans = new Array();
					var optIdArr = new Array();
					
					
					var quesId = $(this).attr("id");
					var quesType = $(this).attr("type");
					var displayQuestionNo = $(this).attr("displayQuestionNo");
					var singleLineQuestionOption = $(this).attr("singleLineQuestionOption");
					var allottedMarks = eval($(this).attr("allottedMarks"));
					var negMarks = eval($(this).attr("negativeMarks"));
					
					$(this).find('key').each(function(){
						keyName = $(this).attr('name');
						keyVal = $(this).attr('value');
						quesKeyPair.push(new quesKeyBean(keyName,keyVal));
						if(keyName == mockVar.difficultyLevelKey){
							if(keyVal!=null && !(keyVal.toUpperCase() == "")){
								if(difficultyLabels.length == 0){
											difficultyLabels[count++] = keyVal.toUpperCase();
											var obj = { key : keyVal.toUpperCase(),
													quesStatusCount : new quesStatusCount(0,0,0,0,0)};
										difficultyLevel.push(obj);
									}
								else{
									var flag = 0;
									for(var val=0; val<difficultyLabels.length; val++){
										if(typeof(difficultyLabels[val])!='undefined'){
											if(difficultyLabels[val] == keyVal.toUpperCase()){
												flag++;
											}
										}
									}
									if(flag == 0){
										difficultyLabels[count++] = keyVal.toUpperCase();
										var obj = { key : keyVal.toUpperCase(),
												quesStatusCount : new quesStatusCount(0,0,0,0,0)};
										difficultyLevel.push(obj);
									}
								}
								if(mockVar.difficultyValues.length == 0){
									mockVar.difficultyValues[values++] = keyVal.toUpperCase();
								}
								else{
									var flag = 0;
									for(var val=0; val<mockVar.difficultyValues.length; val++){
										if(typeof(mockVar.difficultyValues[val])!='undefined'){
											if(mockVar.difficultyValues[val] == keyVal.toUpperCase()){
												flag++;
											}
										}
									}
									if(flag == 0){
										mockVar.difficultyValues[values++] = keyVal.toUpperCase();
									}
								}
								
							}
							
						}

					});
					if($(this).attr('comprehension')=='true'){
						comprehensionId = $(this).find('comprehensionID').text();
					}
					if($(this).attr('laq')=='true'){
						laqId = $(this).find('laqID').text();
						laqParentId = $(this).find('laqParentID').text();
					}
					if(quesType == "MCQ" || quesType == "MSQ"){
						var languageCounter = 0;
						var sequenceArray;
						$(this).find('languageSpecificData').find('lang').each(function(){
							var optCounter = 0;
							var tempImageTag;
							var tempImageName;
							sequenceArray= new Array();
							var optLangBeans = new Array();
							langId = $(this).attr('id');
							quesText = $(this).find('questionString').text();
							if(quesText.indexOf("tkcimages/")!=-1){
								tempImageTag = quesText.split("tkcimages/");
								for(var k=1;k<tempImageTag.length;k++){
									//console.log(k+" : "+tempImageTag[k]);
								
								var temporaryImageName = "";
									temporaryImageName = tempImageTag[k];
								tempImageName=tempImageTag[k].split(".")[0];
								var temporaryFileName = tempImageTag[k].split(".")[0];
								tempImageName=tempImageName.replace(/\s/g, '_');
								var temporaryFileExtension = tempImageTag[k].split(".")[1].split("\"")[0];
								temporaryFileName = temporaryFileName+"."+temporaryFileExtension;
								tempImageName = tempImageName+"."+temporaryFileExtension;
								quesText = quesText.replace(temporaryFileName,tempImageName);
								//quesText=tempImageTag[0]+"tkcimages/"+tempImageName+temporaryImageName.substring(temporaryImageName.indexOf("."));
								//console.log(quesText);
								}
								
							}
							hint = $(this).find('hint').text();
							$(this).find('allOptions').find('option').each(function(){
								var optKeyPair = new Array();
								optId = $(this).attr('optionID');
								optText = $(this).find('optionText').text();
								sequenceId = $(this).attr('sequenceID');
								$(this).find('optionKey').each(function(){
									optKeyName = $(this).attr('name');
									optKeyVal = $(this).text();
									optKeyPair.push(new optKeyBean(optKeyName, optKeyVal));
								});
								if($(this).attr('correct')=='true' && $.inArray(optId, correctAnswer)==-1){
									correctAnswer.push(optId);
								}
								if(optLangBeans[optCounter]==null){
									optLangBeans[optCounter] = new Array();
								}
								optText = editAudioVideoImageFilePath(optText);
								if(optText.indexOf("tkcimages/")!=-1){
									/*tempImageTag = optText.split("tkcimages/");
									tempImageName=tempImageTag[1].split(".")[0];
									tempImageName=tempImageName.replace(/\s/g, "_");
									optText=tempImageTag[0]+"tkcimages/"+tempImageName+"."+tempImageTag[1].split(".")[1];*/
									tempImageTag = optText.split("tkcimages/");
									for(var k=1;k<tempImageTag.length;k++){
									//console.log(k+" : "+tempImageTag[k]);
								
								var temporaryImageName = "";
									temporaryImageName = tempImageTag[k];
								tempImageName=tempImageTag[k].split(".")[0];
								var temporaryFileName = tempImageTag[k].split(".")[0];
								tempImageName=tempImageName.replace(/\s/g, '_');
								var temporaryFileExtension = tempImageTag[k].split(".")[1].split("\"")[0];
								temporaryFileName = temporaryFileName+"."+temporaryFileExtension;
								tempImageName = tempImageName+"."+temporaryFileExtension;
								optText = optText.replace(temporaryFileName,tempImageName);
								}
									
								}
								optLangBeans[optCounter] = new optLangBean(langId, optText);
								
								
								
								if($.inArray(optId, optIdArr)==-1){
									optIdArr.push(optId);
									options.push(new optionBean(optId, optKeyPair));
								}
								
								options[optCounter].optLangBean[languageCounter] = optLangBeans[optCounter];

								sequenceArray.push(new sequenceBean(sequenceId, options[optCounter]));

								optCounter++;
							});
							quesText = editAudioVideoImageFilePath(quesText);
							quesLangBeans.push(new quesLangBean(langId, quesText));
							languageCounter++;
						});
						
						sequenceArray=sequenceArray.sortBy('seqId');
						options=new Array();
						for(var i=0;i<sequenceArray.length;i++){
						options[i]=sequenceArray[i].optBean;
						}
						
						if($(this).find('optionShuffling').attr('value')=='true'){
							shuffleArray(options);
						}
					
					} else if(quesType.indexOf("SA")>-1){
						keyboardType = $(this).find('keyboardNumericOrAlphaNumeric').text();
						answerType = $(this).find('possibleAnswer').attr('type');
						isCaseSensitive = $(this).find('possibleAnswer').attr('isCaseSensitive')=='true'?true:false;
						isEvaluationRequired = $(this).find('isEvaluationRequired').attr('value')=='true'?true:false;
						alphaWordLimit=$(this).find('alphaWordLimit').attr('alphaWordLimit');
						$(this).find('languageSpecificData').find('lang').each(function(){
							langId = $(this).attr('id');
							quesText = $(this).find('questionString').text();
							hint = $(this).find('hint').text();
							correctAnswer.push($(this).find('answerString').text());
							quesText = editAudioVideoImageFilePath(quesText);
							quesLangBeans.push(new quesLangBean(langId, quesText));
						});
					} 
					else if(quesType == 'TYPING TEST'){
						typingType = $(this).find('typingTestParameter').attr('type');
						if($(this).find('typingTestParameter').attr('paragraphDisplay')=='false'){
							paragraphDisplay = false;
						}
						$(this).find('languageSpecificData').find('lang').each(function(){
							langId = $(this).attr('id');
							quesText = $(this).find('questionString').text();
							hint = $(this).find('hint').text();
							quesText = editAudioVideoImageFilePath(quesText);
							quesLangBeans.push(new quesLangBean(langId, quesText));
						});
					} else if(quesType == 'SUBJECTIVE'){
						$(this).find('languageSpecificData').find('lang').each(function(){
							langId = $(this).attr('id');
							quesText = $(this).find('questionString').text();
							hint = $(this).find('hint').text();
							quesText = editAudioVideoImageFilePath(quesText);
							quesLangBeans.push(new quesLangBean(langId, quesText));
						});
					} else if(quesType == 'PROGRAMMING TEST'){
						programmingSkeletalCode = $(this).find('skeletalCode').text();
						$(this).find('languageSpecificData').find('lang').each(function(){
							langId = $(this).attr('id');
							quesText = $(this).find('questionString').text();
							hint = $(this).find('hint').text();
							$(this).find('testCases').find('testCase').each(function(){
								inputValues = $(this).find('inputValues').text();
								outputValues = $(this).find('outputValues').text();
								testCasePair.push(inputValues, outputValues);
							});
							quesText = editAudioVideoImageFilePath(quesText);
							quesLangBeans.push(new quesLangBean(langId, quesText));
						});
					}
					
					quesParam =  new quesParams(iOAP.defaultLang,'notAttempted',programmingSkeletalCode,'');
					
					if(questionShuffling && (comprehensionId!=0 || laqId!=0)){
						if(comprehensionId!=0){
							if($.inArray(comprehensionId, compreQuestionIdArr)==-1){
								compQuesCounter++;
								questionArr.push(new questions(comprehensionId));
								compreQuestionIdArr.push(comprehensionId);
								compreQuestionArr[compQuesCounter] = new Array();
								compreQuestionArr[compQuesCounter].compreId = comprehensionId;
								compreQuestionArr[compQuesCounter].quesBean = new Array();
							}
							compreQuestionArr[compQuesCounter].quesBean.push(new questions(quesId, quesType, comprehensionId, laqId, laqParentId, correctAnswer, allottedMarks, negMarks, quesKeyPair, keyboardType, typingType, answerType, isCaseSensitive, isEvaluationRequired, quesParam, quesLangBeans, options, hint, testCasePair , paragraphDisplay, programmingSkeletalCode, alphaWordLimit,mockVar.storeCandResponse,displayQuestionNo,singleLineQuestionOption));
						}else if(laqId!=0){
							if($.inArray(laqId, compreQuestionIdArr)==-1){
								compQuesCounter++;
								questionArr.push(new questions(laqId));
								compreQuestionIdArr.push(laqId);
								compreQuestionArr[compQuesCounter] = new Array();
								compreQuestionArr[compQuesCounter].compreId = laqId;
								compreQuestionArr[compQuesCounter].quesBean = new Array();
							}
							compreQuestionArr[compQuesCounter].quesBean.push(new questions(quesId, quesType, comprehensionId, laqId, laqParentId, correctAnswer, allottedMarks, negMarks, quesKeyPair, keyboardType, typingType, answerType, isCaseSensitive, isEvaluationRequired, quesParam, quesLangBeans, options, hint, testCasePair,paragraphDisplay, programmingSkeletalCode, alphaWordLimit,mockVar.storeCandResponse,displayQuestionNo,singleLineQuestionOption));
						}
					}else{
						questionArr.push(new questions(quesId, quesType, comprehensionId, laqId, laqParentId, correctAnswer, allottedMarks, negMarks, quesKeyPair, keyboardType, typingType, answerType, isCaseSensitive, isEvaluationRequired, quesParam, quesLangBeans, options, hint, testCasePair,paragraphDisplay, programmingSkeletalCode, alphaWordLimit,mockVar.storeCandResponse,displayQuestionNo,singleLineQuestionOption));
					}
				});
				if(questionShuffling){
					shuffleArray(questionArr);
					for(var i=0; i<compreQuestionArr.length; i++){
						compreId = compreQuestionArr[i].compreId;
						quesBean = compreQuestionArr[i].quesBean;
						compreQuesIndex = questionArr.inArray(compreId,'quesId');
						//remove the comprehension quesId from quesArr and add the quesBean to it
						questionArr.splice.apply(questionArr,[compreQuesIndex,1].concat(quesBean));
					}
				}
				//merging questions of different subsections
				questionArrSection = questionArrSection.concat(questionArr);
			});
			iOAP.secDetails[secCounter] = new secBean(secName,answered,notanswered,marked,markedAndAnswered,isOptional,secType,questionArrSection, hasOptionalQuestion,sectionId,difficultyLevel,difficultyLabels,displayNumberPanel,groupAllQuestions);
			if($(this).attr("maxQuestionsToBeAttempted")!=null || $(this).attr("maxQuestionsToBeAttempted") != ""){
				iOAP.secDetails[secCounter].maxOptQuesToAns = parseInt($(this).attr("maxQuestionsToBeAttempted"));
			}
			secCounter++;
		});
		mockVar.groups[groupCounter] = iOAP;
		mockVar.typingGroup[groupCounter] = typingGrpObj;
		groupCounter++;
	});
}

function readXMLQuestionPaper(xml,isResumed){
//Need to implement
	
	
	// alert(mockVar.time+":::"+mockVar.minSubmitTime);
	iOAP.maxNoOptSec = $(xml).find("MAXNOOPTSEC").text();
	//console.log("isResumed "+ isResumed);
	if(parseInt(isResumed) == 0){
	mockVar.time = mockVar.time*60;
	var isShowMarks = $(xml).find("questionPaperXML").attr('displayMarks');
	mockVar.showMarks = (isShowMarks=="false")?false:true;
	
	mockVar.mcQName = $.trim($(xml).find("mcqLabel").text());
	mockVar.msQName = $.trim($(xml).find("msqLabel").text());
	mockVar.compQName = $.trim($(xml).find("comprehensionLabel").text());
	mockVar.laQName = $.trim($(xml).find("laqLabel").text());
	mockVar.subjQName = $.trim($(xml).find("subjectiveLabel").text());
	mockVar.saQName = $.trim($(xml).find("saLabel").text());
	mockVar.typingQName = $.trim($(xml).find("typingTestLabel").text());
	mockVar.programingQName = $.trim($(xml).find("programmingTestLabel").text());
	
	
	$(xml).find('language').each(function(){
		mockVar.langCount++;
		langCounter = $(this).attr("id");
		mockVar.languages[langCounter] = $(this).attr("name");
	});
	
	var compreId = '',laqId = '',langId = '',quesText = '',groupComprehensionQuestions='',groupLAQQuestions='';
	$(xml).find('comprehensions').find('comprehension').each(function(){
		compreId = $(this).attr('id');
		groupComprehensionQuestions = $(this).attr('groupComprehensionQuestions');
		langBeanArr = new Array();
		$(this).find('lang').each(function(){
			langId = $(this).attr('id');
			quesText = $(this).text();
			quesText = editAudioVideoImageFilePath(quesText);
			langBeanArr.push(new quesLangBean(langId,quesText));
		});
		mockVar.compreLaqQues.push(new compreLaqQuesBean(compreId,langBeanArr,groupComprehensionQuestions));
	});
	$(xml).find('laqs').find('laq').each(function(){
		laqId = $(this).attr('id');
		groupLAQQuestions = $(this).attr('groupLAQQuestions');
		langBeanArr = new Array();
		$(this).find('lang').each(function(){
			langId = $(this).attr('id');
			quesText = $(this).text();
			quesText = editAudioVideoImageFilePath(quesText);
			langBeanArr.push(new quesLangBean(langId,quesText));
		});
		mockVar.compreLaqQues.push(new compreLaqQuesBean(laqId,langBeanArr,groupLAQQuestions));
	});

	// To handle older mock which do not contain <GROUP> tag in the XML.
	// Backward compatibility
	mockVar.nonTimeBoundTime = 0;
	// Convert total time to seconds
	mockVar.completeTime = mockVar.completeTime*60;
	mockVar.minSubmitTime = mockVar.completeTime*mockVar.minSubmitTime/100;
	// alert();
	if($(xml).find("group").length>0){
		renderQuestions(xml,"group");
		var counter = 0;
		var totTimeBoundTime = 0;
		var firstNonTimeBoundGrp = true;
		$(xml).find("group").each(function(){
		//Added by Boddu Rakesh
		mockVar.groups[counter].groupId = parseInt($(this).attr("id"));
		//Completed
			mockVar.groups[counter].maxTime = parseInt($(this).attr("maxDuration")) *60;
			if($(this).attr("maxDuration") >0){
				totTimeBoundTime += parseInt($(this).attr("maxDuration"))*60;
			}else if( firstNonTimeBoundGrp && $(this).attr("maxDuration")==0){
				mockVar.groups[counter].firstNonTimeBoundGrp = true;
				firstNonTimeBoundGrp = false;
			}
			mockVar.groups[counter].minTime = parseInt($(this).attr("minDuration"))*60;
			mockVar.groups[counter].breakTime = parseInt($(this).attr("breakTime"))*60;
			mockVar.groups[counter].isViewable = $(this).attr("revisitAllowedForView");
			mockVar.groups[counter].isEditable = $(this).attr("revisitAllowedForEdit");
			mockVar.groups[counter].groupName = $(this).find("groupDisplayText").text();
			mockVar.groups[counter].maxNoOptSec = eval($(this).attr("groupMaxOptionalSections"));
			mockVar.groups[counter].mandatoryBreak = $(this).attr("breakTimeSkip");
			
			counter++;
		});
		mockVar.nonTimeBoundTime = mockVar.completeTime - totTimeBoundTime;
	}else{
		renderQuestions(xml,"SECTIONDETAILS");
		mockVar.groups[0].maxNoOptSec = $(xml).find("MAXNOOPTSEC").text();
		mockVar.groups[0].minTime = mockVar.minSubmitTime;
		mockVar.groups[0].maxTime = mockVar.completeTime;
	}

	mockVar.currentGrp = 0;
	mockVar.MaxGrpEnabled=0;
	mockVar.groups[mockVar.currentGrp].isDisabled = false;
	if(mockVar.groups[mockVar.currentGrp].maxTime>0){
		mockVar.time = mockVar.groups[mockVar.currentGrp].maxTime;
	}else if(mockVar.groups.length>1 && mockVar.groups[mockVar.currentGrp].maxTime ==0){
		mockVar.time = mockVar.nonTimeBoundTime;
	}else{
		mockVar.time = mockVar.completeTime;
	}
	mockVar.minSubmitTime = mockVar.groups[mockVar.currentGrp].minTime;
	//getCandIdFromCookie();
	arrangeMockVar();
	//restoreFromBackup();
	} else {
		arrangeMockVar();
	}
	
}

function arrangeMockVar(){
	loadLabel();
	iOAP = mockVar.groups[mockVar.currentGrp];
	timer();
	numPanelSec();
	getQuestion(mockVar.defaultLang);
	fillSections();
	fillNumberPanel();
	if(iOAP.noOptSec>0){
		$('#showOptionalSecSummary').show();
		$('#noOptSec').html(iOAP.noOptSec);
		$('#maxOptSec').html(iOAP.maxNoOptSec);
	}
	
	$("#pWait").hide();

	$('#viewQPButton').removeAttr("disabled"); // View QP button is getting disabled after refresh because of numpad_keyboard.js. Wierd behaviour
	$('#viewProButton').removeAttr("disabled");// View Profile button is getting disabled after refresh because of numpad_keyboard.js. Wierd behaviour
	$('#viewInstructionsButton').removeAttr("disabled");
	quizPageHeight();
	if(mockVar.backupTimeInterval>0){
		//////console.log(1406);
		if(!isFinalSubmitStarted){
		//console.log(1238);
		saveBackUp();
		}
	}
	if(mockVar.isBreakPage){
	
	checkGroupBreakTime();
	removeActiveLinks();
	}
}

/*function getQuestion(langId){
	mockVar.curQuesBean = iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues];
	if(mockVar.curQuesBean.quesParam.status == "notAttempted"){
		mockVar.curQuesBean.quesParam.status = "notanswered";
		iOAP.secDetails[iOAP.curSection].notanswered++;
	}
	fillSections();
	mockVar.langIndex = mockVar.curQuesBean.quesLangBeans.inArray(langId,'langId');
	checkQuesAvailable();
	
	  /*if(iOAP.curQues>11){ var el = document.getElementById(iOAP.curQues);
	  el.scrollIntoView(true); }*/
/*	enableOptButtons();
	chkIfMaxQuesCrossed();
	quizPageHeight();
}*/

function getQuestion(langId){
	mockVar.curQuesBean = iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues];
	mockVar.curSectionQuestions = iOAP.secDetails[iOAP.curSection].questions;
	var compreLaqCount = 0;
	var compreLaqID = 0;
	if(typeof(iOAP.secDetails[iOAP.curSection].groupAllQuestions) == "undefined" || iOAP.secDetails[iOAP.curSection].groupAllQuestions == "" || iOAP.secDetails[iOAP.curSection].groupAllQuestions == "false"  ){
		
		for(var j=0;j<mockVar.curSectionQuestions.length;j++){
				if(mockVar.curQuesBean.comprehensionId!=0){
				if(mockVar.curQuesBean.comprehensionId == mockVar.curSectionQuestions[j].comprehensionId){
							compreLaqCount++;
					}
				}else if(mockVar.curQuesBean.laqId!=0){
					if(mockVar.curQuesBean.laqId == mockVar.curSectionQuestions[j].laqId){
							compreLaqCount++;
					}
				}
		}
		for(var k=0;k<mockVar.compreLaqQues.length;k++){
				if(mockVar.curQuesBean.comprehensionId == mockVar.compreLaqQues[k].quesId){
								compreLaqID = k;
								break;
				}else if(mockVar.curQuesBean.laqId == mockVar.compreLaqQues[k].quesId){
								compreLaqID = k;
								break;
						}
				}
			//	alert(compreLaqID);
		if(typeof(mockVar.compreLaqQues[compreLaqID])!= "undefined"){
			
			if( typeof(mockVar.compreLaqQues[compreLaqID].groupComprehensionLaqQuestions) != "undefined" && mockVar.compreLaqQues[compreLaqID].groupComprehensionLaqQuestions != "" && ((mockVar.compreLaqQues[compreLaqID].groupComprehensionLaqQuestions == "true") && (mockVar.compreLaqQues[compreLaqID].quesId == mockVar.curQuesBean.laqId  || mockVar.compreLaqQues[compreLaqID].quesId == mockVar.curQuesBean.comprehensionId)) ){
					var curGroupCompreQues = iOAP.curQues;
					var notAnswered='notAttempted';
					 for(var l=0;l<compreLaqCount;l++){
					 
						if(iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesParam.status == notAnswered){
						//alert(iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesParam.status);
						 iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesParam.status = "notanswered";
							iOAP.secDetails[iOAP.curSection].notanswered=iOAP.secDetails[iOAP.curSection].notanswered+1;
					}
				curGroupCompreQues=curGroupCompreQues + 1;
		      }	
			
			}else{
			
					if(mockVar.curQuesBean.quesParam.status == "notAttempted"){
						mockVar.curQuesBean.quesParam.status = "notanswered";
						iOAP.secDetails[iOAP.curSection].notanswered++;
				}
			
			
		}
			}else{
			
					if(mockVar.curQuesBean.quesParam.status == "notAttempted"){
						mockVar.curQuesBean.quesParam.status = "notanswered";
						iOAP.secDetails[iOAP.curSection].notanswered++;
				}
			
			
		}
	}else{
		
		for(var i=0;i<mockVar.curSectionQuestions.length;i++){
	if(mockVar.curSectionQuestions[i].quesParam.status == "notAttempted"){
		mockVar.curSectionQuestions[i].quesParam.status = "notanswered";
		iOAP.secDetails[iOAP.curSection].notanswered++;
		}
	  }
	}
	fillSections();
	mockVar.langIndex = mockVar.curQuesBean.quesLangBeans.inArray(langId,'langId');
	checkQuesAvailable();
	
	  /*if(iOAP.curQues>11){ var el = document.getElementById(iOAP.curQues);
	  el.scrollIntoView(true); }*/
	enableOptButtons();
	chkIfMaxQuesCrossed();
	quizPageHeight();

}

function checkQuesAvailable(){
	if(mockVar.langIndex == -1){
		mockVar.langIndex = 0;
		checkQuesAvailable();
	}else{
		fillQuesContent();
	}
}

function fillQuesContent(){
	if(mockVar.storeCandResponse == 0){
	if(jQuery(".Ans_Area").hasClass("ZeroLevelZoom"))
				{
					zoomIconClass = "ZeroLevelZoom";
				}
				else if(jQuery(".Ans_Area").hasClass("FirstLevelZoom"))
				{
					zoomIconClass = "FirstLevelZoom";
				}
					else if(jQuery(".Ans_Area").hasClass("SecondLevelZoom"))
				{
					zoomIconClass = "SecondLevelZoom";
				}
				else if(jQuery(".Ans_Area").hasClass("ThirdLevelZoom"))
				{
					zoomIconClass = "ThirdLevelZoom";
				}
				else if(jQuery(".Ans_Area").hasClass("FourthLevelZoom"))
				{
					zoomIconClass = "FourthLevelZoom";
				}
		}
		
	mockVar.curSectionQuestions =  iOAP.secDetails[iOAP.curSection].questions;
	if(typeof(iOAP.secDetails[iOAP.curSection].displayNumberPanel) == "undefined" || iOAP.secDetails[iOAP.curSection].displayNumberPanel == "" || iOAP.secDetails[iOAP.curSection].displayNumberPanel == "true"){
		$('#currentQues').html(quesContent(mockVar.curQuesBean));
			$('.normalBtn').show();
			$('.groupBtn').hide();
			$('#clearResponse').show();
			$('#underreview').show();
	}else{
		if(iOAP.secDetails[iOAP.curSection].groupAllQuestions == "false"){
			$('.normalBtn').show();
			$('.groupBtn').hide();
			$('#clearResponse').show();
			$('#underreview').show();
			$('#currentQues').html(quesContent(mockVar.curQuesBean));
			
		}
		else{
			$('#currentQues').html(quesGroupContent(mockVar.curSectionQuestions));
			$('.normalBtn').hide();
			$('.groupBtn').show();
		}
	}
	
	$('#sectionsField').show();
	$('#actionButton').show();
	$('.progrmngBtn').hide();
	
	$('#legend').show();
	$('#quesPallet').show();
	$('#numberpanelQues').show();
	$('.questionTypeCont .marking-details').show();
	$('.buttons-div').show();
	$('.subject-selection').show();
	$('.subject-section-rightarrow').show();
	$('.diff_type_notation_area_outer').show();
	$('#rightSectionDiv2').show();
	$('.sect').show();
	$('#typingSubmit').hide();
	$('#typingInstDiv').hide();
	if(mockVar.showCalculator=="SCIENTIFIC"||mockVar.showCalculator=="NORMAL")
		$('.calculator-icon-container').show();
	if(mockVar.textAreaPad)
		$('.textarea-icon-container').show();
		if(mockVar.ScratchPad)
		$('.scratchpad-icon-container').show();
		if(mockVar.ruler)
		$('.ruler-icon-container').show();
		if(mockVar.protractor)
		$('.protactor-icon-container').show();
		if(mockVar.zoom){
		$('.zoomin-icon-container').show();
					$('.zoomout-icon-container').show();
					}
		
		
	if(mockVar.isHelpContentAvailable){
		
			$('#usefulDataDiv').show();
		
	}
	if($.trim(mockVar.curQuesBean.hint).length>0){
		$('#hintText').html(mockVar.curQuesBean.hint);
		$('#hintIcon').show();
	}
	if(typeof(iOAP.secDetails[iOAP.curSection].groupAllQuestions) == "undefined" || iOAP.secDetails[iOAP.curSection].groupAllQuestions == "" || iOAP.secDetails[iOAP.curSection].groupAllQuestions == "false"  ){
		
		if(mockVar.curQuesBean.quesType == "SA" || mockVar.curQuesBean.quesType == "LA@@SA" || mockVar.curQuesBean.quesType == "COMPREHENSION@@SA"){
		// numeric keyboard
		if(mockVar.curQuesBean.keyboardType == 'Numeric'){
			//$('#numericKeyBoardDiv').remove();
			$('#answerArea').after("<div style='padding-left: 4%;' id='numericKeyBoardDiv'><input type='text' id='answer' class='keyboardInput answer' value='"+mockVar.curQuesBean.quesParam.answer+"'/></div>");
			triggerKeyboard(1);
			if(iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
				$('#answer').attr('disabled','disabled');
				$('#vKeyboard').remove();
			}
		}
		// alphanumeric textarea
		else if(mockVar.curQuesBean.keyboardType == 'Alphanumeric'){
			$('#answerArea').after('<div style="padding-left: 4%;" id="alpha"> <span id="noOfWords" name="noOfWords" style="font-size: 12px;color:#2F72B7;font-weight: bold;">'+mockVar.curQuesBean.typedWord+'</span><span id="maxalert" name="maxalert"  style="font-size: 10px;color:#FF1919;font-weight: bold;"></span><div> <textarea rows="7" cols="75" name="option"  autocomplete="off" id="answer" class="answer SAAnswer" onpaste="return false"; ondrop="return false;" onkeydown="disableTab(event); allowSAInputsForMultiLang(event); alphaWordLimit(event); " onkeyup="word_count();alphaWordLimit(event);">'+mockVar.curQuesBean.quesParam.answer+'</textarea></div></div>');
			wordCountCheck();
			setCursorPos(document.getElementById("answer"), $('#answer').val().length);
			$('#clearResponse').hide();
			if(iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
				$('#answer').attr('disabled','disabled');
			}else{
				focusOnDiv();
			}
		}
	} else if(mockVar.curQuesBean.quesType == "PROGRAMMING TEST"){
		if(chkIfMaxQuesCrossed() || iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
			editor = CodeMirror.fromTextArea(document.getElementById("code"), {
				lineNumbers: true,
				matchBrackets: true,
				readOnly : 'nocursor'
			});
		}else{
			
			editor = CodeMirror.fromTextArea(document.getElementById("code"), {
				lineNumbers: true,
				styleActiveLine: true,
				matchBrackets: true
			});
		}
		$('.progrmngBtn').show();
		$('.normalBtn').hide();
		if(mockVar.curQuesBean.programingStatus == 'CompiledSuccess'){
			compileSuccessMsg();
		}else if(mockVar.curQuesBean.programingStatus == 'ExecutedSuccess'){
			executionSuccessMsg();
		}
	}else if(mockVar.curQuesBean.quesType == "TYPING TEST"){
		focusOnDiv();
		$("#row1 span:first").addClass('highlight');
		
		$('.questionTypeCont .marking-details').hide();
		$('.buttons-div').hide();
		$('.subject-selection').hide();
		$('.subject-section-rightarrow').hide();
		$('.diff_type_notation_area_outer').hide();
		$('#rightSectionDiv2').hide();
		$('#quesPallet').hide();
		$('.sect').hide();
		$('#numberpanelQues').hide();
		$('.helpinstruction_div').show();
		$('#viewQPTD').hide();
		if(mockVar.storeCandResponse==0)
		$('#viewProButton').show();
		$('#typingSubmit').show();
		$('#typingInstDiv').show();
		$('#showCalc').hide();
		if(mockVar.curQuesBean.typingType.toLowerCase() === 'restricted'){
			$('#errorCount').show();
			$('#restrictedInstr').show();
			$('#unrestrictedInstr').hide();
			$('#stanographyInstr').hide();
		}else if(mockVar.curQuesBean.typingType.toLowerCase() === 'unrestricted'){
			$('#errorCount').hide();
			$('#restrictedInstr').hide();
			$('#unrestrictedInstr').hide();
			$('#stanographyInstr').hide();
			if(!mockVar.curQuesBean.paragraphDisplay){
				$('#stanographyInstr').show();
				$('#row1').hide();
				$('#typedAnswer').css('height','300px');
			}else{
				$('#unrestrictedInstr').show();
			}
		}
	}else if(mockVar.curQuesBean.quesType == "MCQ"){
		if(iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
			$(".MCQanswer").attr('disabled', true);
		}else{
			$(".MCQanswer").attr('disabled', false);
		}
	}else if(mockVar.curQuesBean.quesType == "MSQ"){
		if(iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
			$(".MSQanswer").attr('disabled', true);
		}else{
			$(".MSQanswer").attr('disabled', false);
		}
	}
	
	if(mockVar.curQuesBean.comprehensionId != 0 || mockVar.curQuesBean.laqId != 0){
	var compreLaqCount= 0;
	var compreLaqID = 0;
		
			//	alert(compreLaqID);
		if(typeof(mockVar.compreLaqQues[compreLaqID])!= "undefined"){
		for(var j=0;j<mockVar.curSectionQuestions.length;j++){
				if(mockVar.curQuesBean.comprehensionId!=0){
				if(mockVar.curQuesBean.comprehensionId == mockVar.curSectionQuestions[j].comprehensionId){
							compreLaqCount++;
					}
				}else if(mockVar.curQuesBean.laqId!=0){
					if(mockVar.curQuesBean.laqId == mockVar.curSectionQuestions[j].laqId){
							compreLaqCount++;
					}
				}
		}
		for(var k=0;k<mockVar.compreLaqQues.length;k++){
				if(mockVar.curQuesBean.comprehensionId == mockVar.compreLaqQues[k].quesId){
								compreLaqID = k;
								break;
				}else if(mockVar.curQuesBean.laqId == mockVar.compreLaqQues[k].quesId){
								compreLaqID = k;
								break;
						}
				}
			
			if( typeof(mockVar.compreLaqQues[compreLaqID].groupComprehensionLaqQuestions) != "undefined" && mockVar.compreLaqQues[compreLaqID].groupComprehensionLaqQuestions != "" && ((mockVar.compreLaqQues[compreLaqID].groupComprehensionLaqQuestions == "true") && (mockVar.compreLaqQues[compreLaqID].quesId == mockVar.curQuesBean.laqId  || mockVar.compreLaqQues[compreLaqID].quesId == mockVar.curQuesBean.comprehensionId)) ){
					var curGroupCompreQues = iOAP.curQues;
					 for(var l=0;l<compreLaqCount;l++){
						if(iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
						if(iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesType == "MCQ")
							$(".MSQanswer").attr('disabled', true);
							else if(iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesType == "MSQ")
							$(".MCQanswer").attr('disabled', true);
							else if(iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesType == "SA"){
							if(iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].keyboardType == 'Alphanumeric'){
								wordCountCheckGroup("",iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId);
								$("#alpha").remove();
								}
								else{
									$('#numericKeyBoardDiv'+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId).remove();
									$('#answerArea'+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId).after("<div style='padding-left: 4%;' id='numericKeyBoardDiv"+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId+"'><input type='text' id='answer"+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId+"' class='keyboardInput answer' value='"+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesParam.answer+"' onclick='validateKeyboardNumeric(id)' /></div>");
									//triggerKeyboardGroup(1,iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId);
								}
							$('#answer'+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId).attr('disabled','disabled');
							}
						}else{
						if(iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesType == "MCQ")
							$(".MSQanswer").attr('disabled', false);
							else if(iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesType == "MSQ")
							$(".MCQanswer").attr('disabled', false);
							else if(iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesType == "SA"){
								if(iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].keyboardType == 'Alphanumeric'){
								wordCountCheckGroup("",iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId);
								$("#alpha").remove();
								}
								else{
									$('#numericKeyBoardDiv'+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId).remove();
									$('#answerArea'+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId).after("<div style='padding-left: 4%;' id='numericKeyBoardDiv"+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId+"'><input type='text' id='answer"+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId+"' class='keyboardInput answer' value='"+iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesParam.answer+"' onclick='validateKeyboardNumeric(id)' /></div>");
									triggerKeyboardGroup(1,iOAP.secDetails[iOAP.curSection].questions[curGroupCompreQues].quesId);
								}
							}
						//	$('#answer'+mockVar.curQuesBean.quesId).attr('disabled','disabled');
						}
						curGroupCompreQues=curGroupCompreQues + 1;
					}
				
		      }	
			
			}
	}
	}else{
		for(var k=0;k<mockVar.curSectionQuestions.length;k++){
		if(mockVar.curSectionQuestions[k].quesType == "SA" || mockVar.curSectionQuestions[k].quesType == "LA@@SA" || mockVar.curSectionQuestions[k].quesType == "COMPREHENSION@@SA"){
					if(mockVar.curSectionQuestions[k].keyboardType == 'Numeric'){
			$('#numericKeyBoardDiv'+mockVar.curSectionQuestions[k].quesId).remove();
			$('#answerArea'+mockVar.curSectionQuestions[k].quesId).after("<div style='padding-left: 4%;' id='numericKeyBoardDiv"+mockVar.curSectionQuestions[k].quesId+"'><input type='text' id='answer"+mockVar.curSectionQuestions[k].quesId+"' class='keyboardInput answer' value='"+mockVar.curSectionQuestions[k].quesParam.answer+"' onclick='validateKeyboardNumeric(id)' /></div>");
			triggerKeyboardGroup(1,mockVar.curSectionQuestions[k].quesId);
					if(iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
								$("#answer"+mockVar.curSectionQuestions[k].quesId).attr('disabled','disabled');
								$("#vKeyboard"+mockVar.curSectionQuestions[k].quesId).remove();
						}else{
							$("#vKeyboard"+mockVar.curSectionQuestions[k].quesId).show();
						}
				}else if(mockVar.curSectionQuestions[k].keyboardType == 'Alphanumeric'){
					wordCountCheckGroup("",mockVar.curSectionQuestions[k].quesId);
					word_countGroup(mockVar.curSectionQuestions[k].quesId);
					if(iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
								$('#answer'+mockVar.curSectionQuestions[k].quesId).attr('disabled','disabled');
						}
				}
		}else if(mockVar.curSectionQuestions[k].quesType == "MCQ"){
		if(iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
			$(".MCQanswer").attr('disabled', true);
		}else{
			$(".MCQanswer").attr('disabled', false);
		}
	}else if(mockVar.curSectionQuestions[k].quesType == "MSQ"){
		if(iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
			$(".MSQanswer").attr('disabled', true);
		}else{
			$(".MSQanswer").attr('disabled', false);
		}
	}
	}
	
	}
	activateAudioPlayer();
	activateVideoPlayer();
}

function scrollIntoView(element, container) {
	try{
	// var containerTop = $(container).scrollTop();
	// var containerBottom = containerTop + $(container).height();
	  var elemTop = element.offsetTop;
	  $(container).scrollTop(elemTop - $(element).height());
	}catch(err){

	}
}

function isScrolledIntoView(elem){
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

/*function chkIfMaxQuesCrossed(){
	var proceed = false;
	//var ques=iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID][iOAP.curQues];
//	for(var i=0;i<mockVar.curSectionQuestions;i++){
	var questionStatus = mockVar.curQuesBean.quesParam.status ;
	var quesAnswer = mockVar.curQuesBean.quesParam.answer ;
	var section = iOAP.secDetails[iOAP.curSection];
	var quesToBeConsidered = parseInt(section.answered);
	var hasOptionalQuestion = section.hasOptionalQuestion;
	if(section.maxOptQuesToAns != "" && section.maxOptQuesToAns!=iOAP.secDetails[iOAP.curSection].questions.length){
		if(mockVar.isMarkedForReviewConsidered == "YES"){
			var counter = 0;
			for(i=0;i<iOAP.secDetails[iOAP.curSection].questions.length;i++){
				var quesStatus=iOAP.secDetails[iOAP.curSection].questions[i].quesParam.status ;
				var answer = iOAP.secDetails[iOAP.curSection].questions[i].quesParam.answer;
				if(quesStatus=="markedAndAnswered" && !(answer == null || answer == '')){
					counter++;
				}
			}
			quesToBeConsidered += counter;
		}
		var markedAnsQuesStatus = mockVar.isMarkedForReviewConsidered == "YES" && questionStatus=="markedAndAnswered" && !(quesAnswer == null || quesAnswer == '');
		if(hasOptionalQuestion=='true' && quesToBeConsidered==section.maxOptQuesToAns && !(questionStatus=="answered" || markedAnsQuesStatus)){
			fillMaxOptQuesCrossed(quesToBeConsidered,iOAP.secDetails[iOAP.curSection].questions.length);
			proceed = true;
		}
	}
	return proceed;
	//}
}*/

function chkIfMaxQuesCrossed(){
	var proceed = false;
	//var ques=iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID][iOAP.curQues];
//	for(var i=0;i<mockVar.curSectionQuestions;i++){
	var questionStatus = mockVar.curQuesBean.quesParam.status ;
	var quesAnswer = mockVar.curQuesBean.quesParam.answer ;
	var section = iOAP.secDetails[iOAP.curSection];
	var quesToBeConsidered = parseInt(section.answered);
	var hasOptionalQuestion = section.hasOptionalQuestion;
	if(section.maxOptQuesToAns != "" && section.maxOptQuesToAns!=iOAP.secDetails[iOAP.curSection].questions.length){
		if(mockVar.isMarkedForReviewConsidered == "YES"){
			var counter = 0;
			for(i=0;i<iOAP.secDetails[iOAP.curSection].questions.length;i++){
				var quesStatus=iOAP.secDetails[iOAP.curSection].questions[i].quesParam.status ;
				var answer = iOAP.secDetails[iOAP.curSection].questions[i].quesParam.answer;
				if(quesStatus=="markedAndAnswered" && !(answer == null || answer == '')){
					counter++;
				}
			}
			quesToBeConsidered += counter;
		}
		var markedAnsQuesStatus = mockVar.isMarkedForReviewConsidered == "YES" && questionStatus=="markedAndAnswered" && !(quesAnswer == null || quesAnswer == '');
		if(iOAP.secDetails[iOAP.curSection].groupAllQuestions != "undefined" && iOAP.secDetails[iOAP.curSection].groupAllQuestions != "" && iOAP.secDetails[iOAP.curSection].groupAllQuestions == "true" ){
		if(hasOptionalQuestion=='true' && quesToBeConsidered==section.maxOptQuesToAns){
			fillMaxOptQuesCrossedGroup(quesToBeConsidered,iOAP.secDetails[iOAP.curSection].questions.length);
			proceed = true;
			}
		}else{
				if(hasOptionalQuestion=='true' && quesToBeConsidered==section.maxOptQuesToAns && !(questionStatus=="answered" || markedAnsQuesStatus)){
			fillMaxOptQuesCrossed(quesToBeConsidered,iOAP.secDetails[iOAP.curSection].questions.length);
			proceed = true;
		}
		}
	}
	return proceed;
	//}
}

function bindCharCode(){
	$('input').bind('keydown',function(event){
		var code = (event.keyCode ? event.keyCode : event.which); 
		if(code == 8){
			$(this).val($(this).val().substring(0,$(this).val().length -1));
		}else if(!((code > 44 && code < 58) || (code > 64 && code < 91) || (code>94 && code<123) || code==43 || code == 16 || code == 32)){
			return false;
		}
	});
}

function applyKeyboard(){
	var div = document.getElementById('currentQues');
	var input = div.getElementsByTagName('input');
	if (input.length) {
		VKI_attach(input[0]);
	}
}

function fillMCQQuesGroup(quesTxt,quesOpts,answer,curQuestion,qNo){
	
	var str = "<div id='quesAnsContent"+curQuestion.quesId+"' class='Ans_Area' style='clear:both;'>";
	if(typeof(curQuestion.singleLineQuestionOption) == "undefined" || curQuestion.singleLineQuestionOption == "" || curQuestion.singleLineQuestionOption == "false" ){
	str += "<div style='width:98%;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif;padding-bottom:10px;padding-top:10px;'>";
	if(typeof(curQuestion.displayQuestionNo) == "undefined" || curQuestion.displayQuestionNo == "" ||  curQuestion.displayQuestionNo == "true" )
	str +="<span>"+(qNo+1)+"</span>.";
	str += quesTxt+ "</div>";
	str += "<div style='width:100%;font-family:Arial,verdana,helvetica,sans-serif;margin-top:5px;'><div>";
	var answers = answer.split(",");
	if(mockVar.showOptionsHorizontally)
		str+= '<div style="padding:2px 10px;white-space:nowrap">';
	for(var i=0;i<quesOpts.length;i++){
		if(!mockVar.showOptionsHorizontally)
			str+= '<label>';
		str += "<span><input type='radio' onMouseDown='this.check = this.checked'  onclick='if (this.check) this.checked = false' class='answer MCQanswer' name='answers"+curQuestion.quesId+"' value='"+quesOpts[i].optId+"' ";
		for(var j=0;j<answers.length;j++){
			if(answers[j]!="" && quesOpts[i].optId==answers[j])
				str += "checked";
		}
		str +="/> </span><span style='font-family:Arial,verdana,helvetica,sans-serif;width:95%;'>"+quesOpts[i].optLangBean[mockVar.langIndex].optText+" </span>";
		if(!mockVar.showOptionsHorizontally)
			str+= '</label>';
	}
	if(!mockVar.showOptionsHorizontally)
		str+= '</div>';
	str += "</div>"
	}else{
		str += "<div style='width:98%;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif;padding-bottom:10px;padding-top:10px;white-space:nowrap;'>";
		if(curQuestion.displayQuestionNo == "true" || curQuestion.displayQuestionNo == "" || typeof(curQuestion.displayQuestionNo) == "undefined")
		str +="<span>"+(qNo+1)+"</span>."
		str +=quesTxt;
		var answers = answer.split(",");
		str+= ' <span>';
		for(var i=0;i<quesOpts.length;i++){
		
		str += "<label style='float:none;display:inline'><span><input type='radio' onMouseDown='this.check = this.checked'  onclick='if (this.check) this.checked = false' class='answer MCQanswer' name='answers"+curQuestion.quesId+"' value='"+quesOpts[i].optId+"' ";
		for(var j=0;j<answers.length;j++){
			if(answers[j]!="" && quesOpts[i].optId==answers[j])
				str += "checked";
		}
		str +="/> </span><span style='font-family:Arial,verdana,helvetica,sans-serif;width:95%;'>"+quesOpts[i].optLangBean[mockVar.langIndex].optText+" </span></label>";
		}
		str += "</span></div>";
	}
	str +="</div>";
	return str;
	
}

function fillMCQQues(quesTxt,quesOpts,answer){
	var str = "<div id='quesAnsContent' class='Ans_Area'>";
	if(mockVar.curQuesBean.singleLineQuestionOption == "false" || mockVar.curQuesBean.singleLineQuestionOption == "" || typeof(mockVar.curQuesBean.singleLineQuestionOption) == "undefined"){
	str += "<div style='width:98%;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif;padding-bottom:10px;padding-top:10px;'> "+quesTxt+ "</div>";
	str += "<div style='width:100%;font-family:Arial,verdana,helvetica,sans-serif;margin-top:5px;'><div>";
	var answers = answer.split(",");
	if(mockVar.showOptionsHorizontally)
		str+= '<div style="padding:2px 10px;white-space:nowrap">';
	for(var i=0;i<quesOpts.length;i++){
		if(!mockVar.showOptionsHorizontally)
			str+= '<label>';
		str += "<span><input type='radio' onMouseDown='this.check = this.checked'  onclick='if (this.check) this.checked = false' class='answer MCQanswer' name='answers' value='"+quesOpts[i].optId+"' ";
		for(var j=0;j<answers.length;j++){
			if(answers[j]!="" && quesOpts[i].optId==answers[j])
				str += "checked";
		}
		str +="/> </span><span style='font-family:Arial,verdana,helvetica,sans-serif;width:95%;'>"+quesOpts[i].optLangBean[mockVar.langIndex].optText+" </span>";
		if(!mockVar.showOptionsHorizontally)
			str+= '</label>';
	}
	if(!mockVar.showOptionsHorizontally)
		str+= '</div>';
	str += "</div></div>";
	//$(".leftDiv").css("white-space","");
	}else{
		str += "<div style='width:98%;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif;padding-bottom:10px;padding-top:10px;white-space:nowrap'> "+quesTxt;
		var answers = answer.split(",");
		str+= ' <span>';
		for(var i=0;i<quesOpts.length;i++){
			str += "<label style='float:none;display:inline'><span><input type='radio' onMouseDown='this.check = this.checked'  onclick='if (this.check) this.checked = false' class='answer MCQanswer' name='answers' value='"+quesOpts[i].optId+"' ";
		for(var j=0;j<answers.length;j++){
			if(answers[j]!="" && quesOpts[i].optId==answers[j])
				str += "checked";
		}
		str +="/> </span><span style='font-family:Arial,verdana,helvetica,sans-serif;width:95%;'>"+quesOpts[i].optLangBean[mockVar.langIndex].optText+" </span></label>";
		}
		str += "</span></div>";
	//	$(".leftDiv").css("white-space","nowrap");
	}
	str +="</div>";
	return str;
	
}

function fillMSQQuesGroup(quesTxt,quesOpts,answer,curQuestion,qNo){
	var answers = answer.split(",");
	var str = "<div id='quesAnsContent"+curQuestion.quesId+"' class='Ans_Area' style='clear:both;'>";
	if(curQuestion.singleLineQuestionOption == "false" || curQuestion.singleLineQuestionOption == "" || typeof(curQuestion.singleLineQuestionOption) == "undefined"){
	str += "<div style='width:98%;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif;padding-bottom:10px;'>";
	if(curQuestion.displayQuestionNo == "true" || curQuestion.displayQuestionNo == "" || typeof(curQuestion.displayQuestionNo) == "undefined")
	str +="<span>"+(qNo+1)+"</span>.";
	str += quesTxt+ "</div>";
	str += "<div style='width:100%;font-family:Arial,verdana,helvetica,sans-serif;margin-top:5px;'><div>";
	if(mockVar.showOptionsHorizontally)
		str += '<div style="padding:2px 10px;white-space:nowrap">';
	for(var i=0;i<quesOpts.length;i++){
		if(!mockVar.showOptionsHorizontally)
			str += '<label>';
		str += "<span><input type='checkbox' class='answer MSQanswer' name='answers"+curQuestion.quesId+"' value='"+quesOpts[i].optId+"' ";
		for(var j=0;j<answers.length;j++){
			if(answers[j]!="" && quesOpts[i].optId==answers[j])
				str += "checked";
		}
		str += "/> </span><span style='font-family:Arial,verdana,helvetica,sans-serif;width:95%;'>"+quesOpts[i].optLangBean[mockVar.langIndex].optText+" </span>";
		if(!mockVar.showOptionsHorizontally)
			str+= '</label>';
	}
	if(!mockVar.showOptionsHorizontally)
		str+= '</div>';
	str += "</div>";
	}else {
	str += "<div style='width:98%;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif;padding-bottom:10px;white-space:nowrap'>";
	if(curQuestion.displayQuestionNo == "true" || curQuestion.displayQuestionNo == "" || typeof(curQuestion.displayQuestionNo) == "undefined")
	str +="<span>"+(qNo+1)+"</span>."
	str +=quesTxt;
	str += ' <span>';
		for(var i=0;i<quesOpts.length;i++){
	str += "<label style='float:none;display:inline'><span><input type='checkbox' class='answer MSQanswer' name='answers"+curQuestion.quesId+"' value='"+quesOpts[i].optId+"' ";
		for(var j=0;j<answers.length;j++){
			if(answers[j]!="" && quesOpts[i].optId==answers[j])
				str += "checked";
		}
		str += "/> </span><span style='font-family:Arial,verdana,helvetica,sans-serif;width:95%;'>"+quesOpts[i].optLangBean[mockVar.langIndex].optText+" </span></label>";
		}
		str+= '</span></div>';
	}
	str +="</div>";
	return str;
	
}
function fillMSQQues (quesTxt,quesOpts,answer){
	var answers = answer.split(",");
	var str = "<div id='quesAnsContent' class='Ans_Area' >";
	if(mockVar.curQuesBean.singleLineQuestionOption == "false" || mockVar.curQuesBean.singleLineQuestionOption == "" || typeof(mockVar.curQuesBean.singleLineQuestionOption) == "undefined"){
	str += "<div style='width:98%;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif;padding-bottom:10px;'> "+quesTxt+ "</div>";
	str += "<div style='width:100%;font-family:Arial,verdana,helvetica,sans-serif;margin-top:5px;'><div>";
	if(mockVar.showOptionsHorizontally)
		str += '<div style="padding:2px 10px;white-space:nowrap">';
	for(var i=0;i<quesOpts.length;i++){
		if(!mockVar.showOptionsHorizontally)
			str += '<label>';
		str += "<span><input type='checkbox' class='answer MSQanswer' name='answers' value='"+quesOpts[i].optId+"' ";
		for(var j=0;j<answers.length;j++){
			if(answers[j]!="" && quesOpts[i].optId==answers[j])
				str += "checked";
		}
		str += "/> </span><span style='font-family:Arial,verdana,helvetica,sans-serif;width:95%;'>"+quesOpts[i].optLangBean[mockVar.langIndex].optText+" </span>";
		if(!mockVar.showOptionsHorizontally)
			str+= '</label>';
	}
	if(!mockVar.showOptionsHorizontally)
		str+= '</div>';
	str += "</div></div>";
	//$(".leftDiv").css("white-space","");
	}else{
	str += "<div style='width:98%;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif;padding-bottom:10px;white-space:nowrap'> "+quesTxt;
	str += ' <span>';
	for(var i=0;i<quesOpts.length;i++){
		str += "<label style='float:none;display:inline'><span><input type='checkbox' class='answer MSQanswer' name='answers' value='"+quesOpts[i].optId+"' ";
		for(var j=0;j<answers.length;j++){
			if(answers[j]!="" && quesOpts[i].optId==answers[j])
				str += "checked";
		}
		str += "/> </span><span style='font-family:Arial,verdana,helvetica,sans-serif;width:95%;'>"+quesOpts[i].optLangBean[mockVar.langIndex].optText+" </span></label>";
	
	}
	str+= '</span></div>';
	//$(".leftDiv").css("white-space","nowrap");
	}
	str +="</div>";
	return str;
	
}

function fillSAQuesGroup(quesTxt,answer,curQuestion,qNo){
	
	var str = "<div id='quesAnsContent"+curQuestion.quesId+"' class='Ans_Area' style='clear:both;'>";
	str += "<div style='width:98%;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif;padding-bottom:10px;'>";
	if(curQuestion.displayQuestionNo == "true" || curQuestion.displayQuestionNo == "" || typeof(curQuestion.displayQuestionNo) == "undefined")
	str +="	<span>"+(qNo+1)+"</span>.";
	str +=quesTxt+ "</div>";
	if(curQuestion.keyboardType == 'Numeric'){
		str += "<div id='answerArea"+curQuestion.quesId+"' style='width:100%;font-family:Arial,verdana,helvetica,sans-serif;margin-top:5px;'><br/><br/></div></div>";
			/*$('#numericKeyBoardDiv'+curQuestion.quesId).remove();
			str += "<div style='padding-left: 4%;' id='numericKeyBoardDiv"+curQuestion.quesId+"'><input type='text' id='answerNum"+curQuestion.quesId+"' class='keyboardInput answer' value='"+curQuestion.quesParam.answer+"'/></div>";
			triggerKeyboard(1,"answerNum"+curQuestion.quesId);*/
		}else{
		str += "<div id='answerArea' style='width:100%;font-family:Arial,verdana,helvetica,sans-serif;margin-top:5px;'><br/><br/></div>";
	str += '<div style="padding-left: 4%;"> <span id="noOfWords'+curQuestion.quesId+'" name="noOfWords" style="font-size: 12px;color:#2F72B7;font-weight: bold;">'+curQuestion.typedWord+'</span><span id="maxalert'+curQuestion.quesId+'" name="maxalert"  style="font-size: 10px;color:#FF1919;font-weight: bold;"></span><div> <textarea rows="7" cols="75" name="option"  autocomplete="off" id="answer'+curQuestion.quesId+'" class="answer SAAnswer" onpaste="return false"; ondrop="return false;" onkeydown="disableTab(event); allowSAInputsForMultiLang(event); alphaWordLimitGroup(event,'+curQuestion.quesId+'); " onkeyup="word_countGroup('+curQuestion.quesId+');alphaWordLimitGroup(event,'+curQuestion.quesId+');">'+curQuestion.quesParam.answer+'</textarea></div></div></div>';}
	return str;
}
function fillSAQues(quesTxt,answer){
	var str = "<div id='quesAnsContent' class='Ans_Area'>";
	str += "<div style='width:98%;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif;padding-bottom:10px;'> "+quesTxt+ "</div>";
	str += "<div id='answerArea' style='width:100%;font-family:Arial,verdana,helvetica,sans-serif;margin-top:5px;'><br/><br/></div></div>";
	return str;
}

function fillRestrictedTypingQues(quesTxt){
	$('#dataDisplayDiv').html(quesTxt.replace(/\&/g,'&amp;').replace(/\</g,'&lt;').replace(/\>/g,'&gt;'));
	mockVar.typingGroup[mockVar.currentGrp].textForRestrictedTyping = $('#dataDisplayDiv').text();
	var str = loadTypingContentRestricted();		// in restrictedTyping.js
	return str;
}

function fillUnrestrictedTypingQues(quesTxt){
	$('#dataDisplayDiv').html(quesTxt.replace(/\&/g,'&amp;').replace(/\</g,'&lt;').replace(/\>/g,'&gt;'));
	mockVar.typingGroup[mockVar.currentGrp].word_string = $('#dataDisplayDiv').text();
	var str = loadTypingContentUnrestricted();
	return str;
}

function fillProgramingQues(ques){
	var str ='<div style="width:100%;height:100%;">';
	str += '<div id="compreText" class="leftDiv">';
	str +="<div class='divHeader'>";
	if(ques.displayQuestionNo == "true" || ques.displayQuestionNo == "" || typeof(ques.displayQuestionNo) == "undefined")
	str +="<b><span class='questionNumber'>"+mockLabels.questionNo+"</span>. "+eval(iOAP.curQues+1)+"</b>";
	str +="</div>";
	str += '<div id="quesAnsContent" class="Ans_Area">'+ques.quesLangBeans[mockVar.langIndex].quesText + ' </div>';
	str += '<div id="progStatusDisplay" style="margin: auto;display:none;margin-bottom:0.1%;height:40%;border-top:1px solid">';
	str += '<div style="text-align:left;float:left;color:green;font-weight:bold;width:99.5%">';
	str += '<span id="statusText"></span>';
	str += '<div id="maximizeIcon" style="float: right;display:blcok;"><img src="images/icon_maximum.png" id="maximg" style="cursor:pointer;" title="Maximize" onclick="showMaxVersion();"></div>';
	str += '</div><br/>This section displays the result of public test cases';
	str += '<div id="TestCaseReport" style="display:none;border-top:1px solid"><table id="testCaseDisplayTable" width="99.5%" border="1" cellSpacing="0" style="border-color:#2F72B7;" class="testCaseTable"><thead><tr style="background:#2F72B7;color:white"><th style="width:10%;">TestCase No</th><th style="width:40%;">Inputs</th><th style="width:25%;">Expected output</th><th style="width:25%;">Result</th></tr></thead><tbody><tr><td>1</td><td>Inputs for TestCase 1</td><td>Output</td><td style="font-weight: bold;"><span style="color:green;font-weight: bold;">Pass</span> / <span style="color:red;font-weight: bold;">Fail</span></td></tr><tr><td>2</td><td>Inputs for TestCase 2</td><td>Output</td><td style="font-weight: bold;"><span style="color:green;font-weight: bold;">Pass</span> / <span style="color:red;font-weight: bold;">Fail</span></td></tr></tbody></table></div>';
	str += '</div></div>';
	str += "<div id='programingAnsContent' class='rightDiv' style='height:100%;overflow:hidden;'>";
	str += '<div id="progRightPart"><div id="progDescriptionDiv">'+mockLabels.typeCodeMsg+'</div>';
	str +='<div style="float:right;margin-top:-26px;margin-right:12px;"><img alt="" src="images/ChangeEditor.png" onclick="changeEditor();" style="cursor:pointer;width:20px;" title="Change the Editor" class="progImg"></div>';
	str += '<div id="progEditorDisplay" style="overflow : auto;">';
	str += '<div id="progEditorDisplayDiv" style="margin:auto;height:97%"><textarea style="display: none;" id="code" name="code">'+ques.quesParam.answer+'</textarea></div></div></div>';
	str +='<div id="progRightPart1" style="display:none;"><div id="progDescriptionDiv1"><strong>'+mockLabels.typeCodeMsg+'</strong></div>';;
	str +='<div style="float:right;margin-top:-26px;margin-right:12px;"><img alt="" src="images/ChangeTextArea.png" onclick="changeTextArea();" style="cursor:pointer;width:20px;" title="Change the Textarea" class="progImg"></div>';
	str += '<div id="progEditorDisplay1" style="overflow : auto;">';
	str += '<div id="progEditorDisplayDiv1" style="margin:auto;height:97%">';
	str +='<textarea id="textareaforflip" name="textareaforflip" wrap="off" autocapitalize="off" onselect="return false;" onkeydown="programmingTxtCode(event);";autocorrect="off" spellcheck="false"overflow:scroll;  style="width: 100%;resize:none"></textarea></div></div></div>';
	str +='<div id="maxMinTestCases1" style="margin: auto;display: none;"><img src="images/icon_minimum.png" id="minimg" style="cursor:pointer;display:inline;" title="Minimize" onclick="maxToMin()"><table id="testCaseDisplayTable" width="99.5%" border="1" cellSpacing="0" style="border-color:#2F72B7;" class="testCaseTable"><thead><tr style="background:#2F72B7;color:white"><th style="width:10%;">TestCase No</th><th style="width:40%;">Inputs</th><th style="width:25%;">Expected output</th><th style="width:25%;">Result</th></tr></thead><tbody><tr><td>1</td><td>Inputs for TestCase 1</td><td>Output</td><td style="font-weight: bold;"><span style="color:green;font-weight: bold;">Pass</span> / <span style="color:red;font-weight: bold;">Fail</span></td></tr><tr><td>2</td><td>Inputs for TestCase 2</td><td>Output</td><td style="font-weight: bold;"><span style="color:green;font-weight: bold;">Pass</span> / <span style="color:red;font-weight: bold;">Fail</span></td></tr></tbody></table></div>';
	return str;
}

function showMaxVersion(){
//isfinalSubmit = true;
	var url =".TB_inline2?height=auto&max-height=100%&min-height=100&width=400&inlineId=maxMinTestCases1&modal=true";
	tb_show("Server URL", url);
	$('#maxMinTestCases1').css("z-index","150000");	
	$('#minimg').css("margin-left","95%");	
}

function maxToMin() {
	tb_remove();	
}

function changeEditor()
{
	
	quizPageHeight1();
	$('#progRightPart1').show();
	$('#progRightPart').hide();
	$firstTextArea=editor.getValue();
	$('#textareaforflip').val($firstTextArea);
	$('#textareaforflip').focus();
}

function changeTextArea()
{	$('progEditorDisplayDiv1').html("");
	$("#progRightPart").show();
	$("#progRightPart1").hide();
	$secondTextArea=$("#textareaforflip").val();
	editor.setValue($secondTextArea);
	quizPageHeight();
	//align_page();
}

function programmingTxtCode(event){
//document.getElementById("textareaforflip").onkeydown = function(e) {
								if ( event.keyCode == 9)
								{
									event.returnValue = false;
									insertAtCursor(document.getElementById("textareaforflip"), "    ");
								}
								else if(event.keyCode == 9)
									{
										    event.preventDefault();
										    insertAtCursor(document.getElementById("textareaforflip"), "    ");
									}

						//	};
}
function insertAtCursor(myField, myValue) {
										  //this is for IE Support
								 if (document.selection) {
										  var temp;
										  myField.focus();
										    sel = document.selection.createRange();
										    temp = sel.text.length;
										    sel.text = myValue;
										    if (myValue.length == 0) {
										      sel.moveStart('character', myValue.length);
										      sel.moveEnd('character', myValue.length);
										    } else {
										      sel.moveStart('character', -myValue.length + temp);
										    }
										    sel.select();
										  }
										  //this is for Mozilla and Chrome 
										  else if (myField.selectionStart || myField.selectionStart =='0'){
										    var startPos = myField.selectionStart;
										    var endPos = myField.selectionEnd;
					myField.value = myField.value.substring(0,startPos)+myValue+myField.value.substring(endPos, myField.value.length);
					myField.focus();
										    myField.selectionStart = startPos + myValue.length;
										    myField.selectionEnd = startPos + myValue.length;
										  } else {
										   myField.value += myValue;
										   myField.focus();
										 }
										}
										




	

function fillCompQues(ques){
	var str ='<div id="quesOuterDiv" style="clear:both">';
	if(iOAP.secDetails[iOAP.curSection].groupAllQuestions == "false" || typeof(iOAP.secDetails[iOAP.curSection].groupAllQuestions) == "undefined" || iOAP.secDetails[iOAP.curSection].groupAllQuestions == ""){
		str +='<div id="compreText" class="leftDiv">';
		str += (mockVar.compQName.length>0)?('<table width="100%"><tr><td><div style="border-bottom:1px solid #dbdbdb;height:26px"><b>'+mockVar.compQName+'</b></div></td></tr></table><div id="warning"></div>') : "";
		str += '<div id="warning"></div>';
	}else{
		str +='<div id="compreText">';
		str += (mockVar.compQName.length>0)?('<table width="100%"><tr><td><div style="border-bottom:1px solid #dbdbdb;height:26px"><b>'+mockVar.compQName+'</b></div></td></tr></table><div id="warning"></div>') : "";
		str += '<div id="warning"></div>';
	}
	
	str += ques.langData[mockVar.langIndex].quesText+' </div>';
	return str;
}

function fillLAQues(laQues, parentQuesIndex){
	var str ='<div id="quesOuterDiv" style="clear:both">';
	if(iOAP.secDetails[iOAP.curSection].groupAllQuestions == "false" || typeof(iOAP.secDetails[iOAP.curSection].groupAllQuestions) == "undefined" || iOAP.secDetails[iOAP.curSection].groupAllQuestions == ""){
	str += '<div class="leftDiv">';
	str += (mockVar.laQName.length>0)?('<table width="100%"><tr><td><div  style="border-bottom:1px solid #dbdbdb;height:26px"><b>'+mockVar.laQName+'</b></div></td></tr></table>'):'';
	str +='<div id="warning"></div>';
	}else{
		str +='<div>';
		str += (mockVar.laQName.length>0)?('<table width="100%"><tr><td><div  style="border-bottom:1px solid #dbdbdb;height:26px"><b>'+mockVar.laQName+'</b></div></td></tr></table>'):'';
		str +='<div id="warning"></div>';
	}
	
	str += laQues.langData[mockVar.langIndex].quesText ;
	if(parentQuesIndex != -1){
		parentQues = iOAP.secDetails[iOAP.curSection].questions[parentQuesIndex];
		if($.trim(parentQues.quesParam.answer) != ""){
			str += "<p><i>Selected answer(s) of the previous question is :";
			if(parentQues.quesType.indexOf("SA") ==-1){
				var answers = parentQues.quesParam.selectedOptId.split(",");
				var quesLangIndex = parentQues.quesLangBeans.inArray(parentQues.quesParam.langID,'langId');
				var optIndex = -1;
				for(var j=0;j<answers.length;j++){
					optIndex = parentQues.options.inArray(answers[answers.length-j-1],'optId');
					str += parentQues.options[optIndex].optLangBean[quesLangIndex].optText + ",";
				}
				str = str.substring(0,str.length-1);
			}else{
				str += parentQues.quesParam.answer;
			}

			str += "</i></p>";
		}
	}
	str += ' </div>';
	return str;
}

function fillSubjectiveQues(quesTxt){
	var str = "<div id='quesAnsContent' class='Ans_Area' style='width:98%; margin-left:5px; font-family:Arial,verdana,helvetica,sans-serif;'> "+quesTxt + "</div>";
	return str;
}

var allowedChars = new Array("+","-");

function numPadValidate(text) {
	var proceed = true;
	for(var i=0;i<allowedChars.length;i++){
		if(text.indexOf(allowedChars[i])>0){
			proceed=false;
		}
		if(text.split(allowedChars[i]).length>2){
			proceed = false;
		}
	}
	if(text.indexOf('.') > -1){
		var afterDot = text.split(".");
		if(afterDot.length==2){
			if(afterDot[1].length>2)
				proceed=false;
		}else if(afterDot.length>2){
			proceed=false;
		}
	}
	return proceed;
}

function fillQuesNumber(ques){
	var str = '<div id="Questn_Innr_Div_section"><div id="Subjt_Div"></div><div id="Subdetail_Div"><div style="float:right;margin-right:5px;">';
	if(ques.quesType != 'PROGRAMMING TEST' && mockVar.langCount>1){
		str += "<div class='chooseLang'> <span id='viewLang'>"+mockLabels.viewIn+"</span><select class='choose_lang auditlogSelect' onchange='changeLang(this.value)'> ";
		for(var i=0;i<mockVar.languages.length;i++){
			if(mockVar.languages[i]!=null && typeof(mockVar.languages[i])!='undefined'){
				str +="<option";
				if(i==mockVar.curQuesBean.quesLangBeans[mockVar.langIndex].langId)
					str += " selected='selected'";
				str +=  " value='"+i+"'>"+mockVar.languages[i]+"</option>";
			}
		}
		str +="</select></div>";
	}
	str += '</div></div></div>';
	return str;
}

function fillLAQuesNumber(ques){
	var str = '<div id="Questn_Innr_Div_section"><div id="Subjt_Div"><b>';
	if(ques.displayQuestionNo == "true" || ques.displayQuestionNo == "" || typeof(ques.displayQuestionNo) == "undefined")
	str += '<span class="questionNumber">'+mockLabels.questionNo+'</span>. '+eval(iOAP.curQues+1);
	str +=  ($.trim(ques.quesText.split("@@&&")[0]).length <= 0 && mockVar.laQName.length >0 )?(" ("+mockVar.laQName+")"):"";
	str +='</b></div><div id="Subdetail_Div"><div style="float:right;margin-right:5px;">';
	if(mockVar.langCount>1){
		str += "<div class='chooseLang'><span id='viewLang'> "+mockLabels.viewIn+"<select class='choose_lang auditlogSelect' onchange='changeLang(this.value)'> ";
		for(var i=0;i<mockVar.languages.length;i++){
			if(mockVar.languages[i]!=null && typeof(mockVar.languages[i])!='undefined'){
				str +="<option";
				if(i==mockVar.curQuesBean.quesLangBeans[mockVar.langIndex].langId)
					str += " selected='selected'";
					str +=  " value='"+i+"'>"+mockVar.languages[i]+"</option>";
			}
		}
		str +="</select></div>";
	}
	str += '</div></div></div>';
	return str;
}

function changeLang(langID){
	// iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID = langID;
	var laungName = jQuery(".auditlogSelect option:selected").text();
	var auditDesc = "Default launguage changes to "+laungName;
	
	var currentSectionDetails = mockVar.groups[currentGroupIndex].secDetails[currentSectionIndex];
	var currentQuestionDetails = currentSectionDetails.questions[currentQuestionIndex];
		var optionSequence = "";
		var AuditJsonObject = new Object();
		AuditJsonObject.ActionName = "Launguage Change";
		AuditJsonObject.ActionDesc = auditDesc;
		AuditJsonObject.GroupId = mockVar.groups[currentGroupIndex].groupId;
		AuditJsonObject.SectionId = currentSectionDetails.secId;
		AuditJsonObject.QuestionId = currentQuestionDetails.quesId;
		
		
		var currentDate = new Date();
		AuditJsonObject.Time = currentDate.yyyymmddHHmmss();
	if(currentQuestionDetails.quesType == "MCQ" || currentQuestionDetails.quesType == "MSQ" ){
			var length = currentQuestionDetails.options.length;
			for(var i=0;i<length;i++){
			k = i + 1;
				optionSequence = optionSequence + k + ")"+ currentQuestionDetails.options[i].optId+" ";
				AuditJsonObject.OptionSequence = optionSequence;
			}
		}
		
		
		if(currentQuestionDetails.quesParam.status != "notanswered"){
			//////console.log("Answer: "+currentQuestionDetails.quesParam.selectedOptId);
			AuditJsonObject.SelectedOptionId = currentQuestionDetails.quesParam.selectedOptId.replace(/,/g , "@_@");
		
		} else {
			AuditJsonObject.SelectedOptionId = "NA";
		}
		AuditJson.push(AuditJsonObject);
	var quesLangIndex = mockVar.curQuesBean.quesLangBeans.inArray(langID.toString(),"langId");
	if(quesLangIndex == -1){
	isfinalSubmit = true;
		cnfPop('InfoPopup');
		$("#infoMsg2").html(mockLabels.quesNotAvailable.replace('@@langName@@',mockVar.languages[langID]));
		fillQuesContent();
	//	chkIfMaxQuesCrossed();
	//	quizPageHeight();
	}
	else{
		mockVar.langIndex = quesLangIndex;
		getQuestion(langID);
		fillNumberPanel();
	}
}

function fillQuesDetailsCont(ques){
	var str = "";
	if(iOAP.showQType){
		str +="<span class='questiontype-details'>";
		if(ques.quesType=="MCQ" && $.trim(mockVar.mcQName).length>0){
			str +='<span id="questionType">'+mockLabels.questionType+'</span>' +mockVar.mcQName;
		}else if(ques.quesType=="MSQ" && $.trim(mockVar.msQName).length>0){
			str +='<span id="questionType">'+mockLabels.questionType+'</span>' +mockVar.msQName;
		}else if(ques.quesType=="SA" && $.trim(mockVar.saQName).length>0){
			str +='<span id="questionType">'+mockLabels.questionType+'</span>' +mockVar.saQName;
		}else if(ques.quesType == "SUBJECTIVE" && $.trim(mockVar.subjQName).length>0){
			str +='<span id="questionType">'+mockLabels.questionType+'</span>' +mockVar.subjQName;
		}else if(ques.quesType == "COMPREHENSION@@MCQ" && $.trim(mockVar.mcQName).length>0){
			str +='<span id="questionType">'+mockLabels.questionType+'</span>' +mockVar.mcQName;
		}else if(ques.quesType == "COMPREHENSION@@MSQ" && $.trim(mockVar.msQName).length>0){
			str +='<span id="questionType">'+mockLabels.questionType+'</span>' +mockVar.msQName;
		}else if(ques.quesType == "COMPREHENSION@@SA" && $.trim(mockVar.saQName).length>0){
			str +='<span id="questionType">'+mockLabels.questionType+'</span>' +mockVar.saQName;
		}else if(ques.quesType == "LA@@MCQ" && $.trim(mockVar.mcQName).length>0){
			str +='<span id="questionType">'+mockLabels.questionType+'</span>' +mockVar.mcQName;
		}else if(ques.quesType == "LA@@MSQ" && $.trim(mockVar.msQName).length>0){
			str +='<span id="questionType">'+mockLabels.questionType+'</span>' +mockVar.msQName;
		}else if(ques.quesType == "LA@@SA" && $.trim(mockVar.saQName).length>0){
			str +='<span id="questionType">'+mockLabels.questionType+'</span>' +mockVar.saQName;
		}else if(ques.quesType == "TYPING TEST" && $.trim(mockVar.saQName).length>0){
			str +='<span id="questionType">'+mockLabels.questionType+'</span>' +mockVar.typingQName;
		}else if(ques.quesType == "PROGRAMMING TEST" && $.trim(mockVar.saQName).length>0){
			str +='<span id="questionType">'+mockLabels.questionType+'</span>' +mockVar.programingQName;
		}
			if(mockVar.ShowHint==1){
				str += hintDivInnerHtml;
			}
		str	+= "</span>";
	}
	if(mockVar.showMarks){
		str +="<span class='questiontype-markpanel'>";
		str += "<span class='marking-details'><span id='correctAnswer'>"+mockLabels.correctAnswerMarks+"</span>	<font style='color:green'>"+ques.allottedMarks+"</font>";
		str += " |<span id='negativeMarks'> "+mockLabels.negativeMarks+" </span><font style='color:red'>"+ques.negMarks+"</font></span></span>";
	}
	return str;
}

function quesContent(ques){
	var str='' ;
	$("#savenext").val(mockLabels.savenext) ;
	if(mockVar.showMarks || iOAP.showQType){
// ////console.log("in");
		
		if(ques.quesType=="MCQ" && ($.trim(mockVar.mcQName).length>0 || mockVar.showMarks)){
			str = "<div class='questionTypeCont'>";
			str += fillQuesDetailsCont(ques);
			str += "</div>";
			str += fillQuesNumber(ques);
		}else if(ques.quesType=="MSQ" && ($.trim(mockVar.msQName).length>0 || mockVar.showMarks)){
			str = "<div class='questionTypeCont'>";
			str += fillQuesDetailsCont(ques);
			str += "</div>";
			str += fillQuesNumber(ques);
		}else if(ques.quesType=="SA" && ($.trim(mockVar.saQName).length>0 || mockVar.showMarks)){
			str = "<div class='questionTypeCont'>";
			str += fillQuesDetailsCont(ques);
			str += "</div>";
			str += fillQuesNumber(ques);
		}else if(ques.quesType == "SUBJECTIVE" && ($.trim(mockVar.subjQName).length>0 || mockVar.showMarks)){
			str = "<div class='questionTypeCont'>";
			str += fillQuesDetailsCont(ques);
			str += "</div>";
			str += fillQuesNumber(ques);
		}else if(ques.quesType == "COMPREHENSION@@MCQ" && ($.trim(mockVar.mcQName).length>0 || mockVar.showMarks)){
			str = "<div class='questionTypeCont'>";
			str += fillQuesDetailsCont(ques);
			str += "</div>";
			str += fillQuesNumber(ques);
		}else if(ques.quesType == "COMPREHENSION@@MSQ" && ($.trim(mockVar.msQName).length>0 || mockVar.showMarks)){
			str = "<div class='questionTypeCont'>";
			str += fillQuesDetailsCont(ques);
			str += "</div>";
		}else if(ques.quesType == "COMPREHENSION@@SA" && ($.trim(mockVar.saQName).length>0 || mockVar.showMarks)){
			str = "<div class='questionTypeCont'>";
			str += fillQuesDetailsCont(ques);
			str += "</div>";
			str += fillQuesNumber(ques);
		}else if(ques.quesType == "LA@@MCQ" && ($.trim(mockVar.mcQName).length>0 || mockVar.showMarks)){
			str = "<div class='questionTypeCont'>";
			str += fillQuesDetailsCont(ques);
			str += "</div>";
			str += fillQuesNumber(ques);
		}else if(ques.quesType == "LA@@MSQ" && ($.trim(mockVar.msQName).length>0 || mockVar.showMarks)){
			str = "<div class='questionTypeCont'>";
			str += fillQuesDetailsCont(ques);
			str += "</div>";
			str += fillQuesNumber(ques);
		}else if(ques.quesType == "LA@@SA" && ($.trim(mockVar.saQName).length>0 || mockVar.showMarks)){
			str = "<div class='questionTypeCont'>";
			str += fillQuesDetailsCont(ques);
			str += "</div>";
			str += fillQuesNumber(ques);
		}else if(ques.quesType == "TYPING TEST" && $.trim(mockVar.typingQName).length>0){
			str = "<div class='questionTypeCont'>";
			str += fillQuesDetailsCont(ques);
			str += "</div>";
		}else if(ques.quesType == "PROGRAMMING TEST" && $.trim(mockVar.programingQName).length>0){
			str = "<div class='questionTypeCont'>";
			str += fillQuesDetailsCont(ques);
			str += "</div>";
			str += fillQuesNumber(ques);
		}
	}

	if(ques.quesType == "MCQ" && ques.comprehensionId == 0 && ques.laqId == 0){
	
		str += "<div  id='quesOuterDiv'>";
		str += "<div  class='leftDiv' style='width:99.6%'>";
		str += '<div class="divHeader">';
		if(ques.displayQuestionNo == "true" || ques.displayQuestionNo == "" || typeof(ques.displayQuestionNo) == "undefined")
		str +='<b><span class="questionNumber">'+mockLabels.questionNo+'</span>. '+eval(iOAP.curQues+1)+'</b>';
		str +='</div>';
		str += fillMCQQues(ques.quesLangBeans[mockVar.langIndex].quesText,ques.options,ques.quesParam.selectedOptId);
		str += "</div></div>";
		
	}else if(ques.quesType == "MSQ" && ques.comprehensionId == 0 && ques.laqId == 0){
		
			str += "<div id='quesOuterDiv'>";
			str += "<div  class='leftDiv' style='width:99.6%'>";
			str +="<div class='divHeader'>";
			if(ques.displayQuestionNo == "true" || ques.displayQuestionNo == "" || typeof(ques.displayQuestionNo) == "undefined")
			str +="<b><span class='questionNumber'>"+mockLabels.questionNo+"</span>. "+eval(iOAP.curQues+1)+"</b>"
			str +="</div>";
			str += fillMSQQues(ques.quesLangBeans[mockVar.langIndex].quesText,ques.options,ques.quesParam.selectedOptId);
			str += "</div></div>";
	
	}else if(ques.quesType == "SA" && ques.comprehensionId == 0 && ques.laqId == 0){
		
		str += "<div id='quesOuterDiv'>";
		str += "<div  class='leftDiv' style='width:99.6%'>";
		str +="<div class='divHeader'>";
		if(ques.displayQuestionNo == "true" || ques.displayQuestionNo == "" || typeof(ques.displayQuestionNo) == "undefined")
		str +="<b><span class='questionNumber'>"+mockLabels.questionNo+"</span>. "+eval(iOAP.curQues+1)+"</b>"
		str +="</div>";
		str += fillSAQues(ques.quesLangBeans[mockVar.langIndex].quesText,ques.quesParam.answer);
		str += "</div></div>";
	
	}else if(ques.quesType == "SUBJECTIVE"){
		$("#savenext").val(mockLabels.markAsAnswered) ;
		str += "<div style='height:92%;' id='quesOuterDiv'>";
	//	str += fillQuesNumber(ques);
		str += "<div  class='leftDiv' style='width:99.6%'>";
		str +="<div class='divHeader'>";
		if(ques.displayQuestionNo == "true" || ques.displayQuestionNo == "" || typeof(ques.displayQuestionNo) == "undefined")
		str +="<b><span class='questionNumber'>"+mockLabels.questionNo+"</span>. "+eval(iOAP.curQues+1)+"</b>";
		str +="</div>";
		str += fillSubjectiveQues(ques.quesLangBeans[mockVar.langIndex].quesText);
		str += "</div></div>";
	}else if(ques.quesType == "TYPING TEST"){
		str += "<div style='height:92%;' id='quesOuterDiv'>";
		// str += fillQuesNumber(ques);
		if(ques.typingType.toLowerCase() === 'restricted'){		// for Restricted Typing
			str += fillRestrictedTypingQues(ques.quesLangBeans[mockVar.langIndex].quesText);
		}else if(ques.typingType.toLowerCase() === 'unrestricted'){		// for Unrestricted typing
			str += fillUnrestrictedTypingQues(ques.quesLangBeans[mockVar.langIndex].quesText);
		}
		str += "</div>";
	}else if(ques.quesType == "PROGRAMMING TEST"){
		str += "<div style='height:92%;' id='quesOuterDiv'>";
		//str += fillQuesNumber(ques);
		str += fillProgramingQues(ques);
		str += "</div>";
	}else if(ques.comprehensionId != 0){
			compreQuesIndex = mockVar.compreLaqQues.inArray(ques.comprehensionId, 'quesId');
			var compreQues = mockVar.compreLaqQues[compreQuesIndex];
			
			var groupComprehensionLaqQuestions = '';
			groupComprehensionQuestions = mockVar.compreLaqQues[compreQuesIndex].groupComprehensionLaqQuestions;
			for(var k=0;k<mockVar.curSectionQuestions.length;k++){
				if(mockVar.curSectionQuestions[k].comprehensionId ==  mockVar.compreLaqQues[compreQuesIndex].quesId){
					currentChildQuestionsNormal++;
				}
			}
			
			str += fillCompQues(compreQues);
			str += '<div id="compreQuesText" class="rightDiv">';
			str +="<div class='divHeader'>";
			if(ques.displayQuestionNo == "true" || ques.displayQuestionNo == "" || typeof(ques.displayQuestionNo) == "undefined")
			str +="<b><span class='questionNumber'>"+mockLabels.questionNo+"</span>. "+eval(iOAP.curQues+1)+"</b>";
			str +="</div>";
			str += "<div id='quesOuterDiv'>";
			
			if(groupComprehensionQuestions == "false" || groupComprehensionQuestions == "" || typeof(groupComprehensionQuestions) == "undefined"){
			if(ques.quesType == "MCQ"){
			str += fillMCQQues(ques.quesLangBeans[mockVar.langIndex].quesText,ques.options,ques.quesParam.selectedOptId);
			}else if(ques.quesType == "MSQ"){
			str += fillMSQQues(ques.quesLangBeans[mockVar.langIndex].quesText,ques.options,ques.quesParam.selectedOptId);
			}else if(ques.quesType == "SA"){
			str += fillSAQues(ques.quesLangBeans[mockVar.langIndex].quesText,ques.quesParam.answer);
			}
			}else{
				//for(var l=0;l<currentChildQuestions;l++){
						for(var m=0;m<mockVar.curSectionQuestions.length;m++){
						if(mockVar.curSectionQuestions[m].comprehensionId ==  mockVar.compreLaqQues[compreQuesIndex].quesId){
						
							if(mockVar.curSectionQuestions[m].quesType == "MCQ"){
								str += fillMCQQuesGroup(mockVar.curSectionQuestions[m].quesLangBeans[mockVar.langIndex].quesText,mockVar.curSectionQuestions[m].options,mockVar.curSectionQuestions[m].quesParam.selectedOptId,mockVar.curSectionQuestions[m],m);
							}else if(mockVar.curSectionQuestions[m].quesType == "MSQ"){
								str += fillMSQQuesGroup(mockVar.curSectionQuestions[m].quesLangBeans[mockVar.langIndex].quesText,mockVar.curSectionQuestions[m].options,mockVar.curSectionQuestions[m].quesParam.selectedOptId,mockVar.curSectionQuestions[m],m);
							}else if(mockVar.curSectionQuestions[m].quesType == "SA"){
								str += fillSAQuesGroup(mockVar.curSectionQuestions[m].quesLangBeans[mockVar.langIndex].quesText,mockVar.curSectionQuestions[m].quesParam.answer,mockVar.curSectionQuestions[m],m);
							}
							
						}
					}
					
				$('.normalBtn').hide();
				$('.groupBtn').show();
				$('#underreview').hide();
				$('#clearResponse').hide();
		
		
			//	}
			}
			
			str += "</div>";
		}else if(ques.laqId != 0){
			compreQuesIndex = mockVar.compreLaqQues.inArray(ques.laqId, 'quesId');
			parentQuesIndex = iOAP.secDetails[iOAP.curSection].questions.inArray(ques.laqParentId, 'quesId');
			var laqQues = mockVar.compreLaqQues[compreQuesIndex];
			var groupLaqQuestions = '';
			groupLaqQuestions = mockVar.compreLaqQues[compreQuesIndex].groupComprehensionLaqQuestions;
			
		/*	for(var k=0;k<mockVar.curSectionQuestions.length;k++){
				if(mockVar.curSectionQuestions[k].laqId ==  mockVar.compreLaqQues[compreQuesIndex].quesId){
					currentChildQuestions++;
				}
			}*/
			if($.trim(laqQues.langData[mockVar.langIndex].quesText).length >0){
				str += fillLAQues(laqQues, parentQuesIndex);
				str += '<div id="LAQuesText" class="rightDiv">';
				str +="<div class='divHeader'>";
				if(ques.displayQuestionNo == "true" || ques.displayQuestionNo == "" || typeof(ques.displayQuestionNo) == "undefined")
				str +="<b><span class='questionNumber'>"+mockLabels.questionNo+"</span>. "+eval(iOAP.curQues+1)+"</b>";
				str +="</div>";
				str += "<div id='quesOuterDiv'>";
				if(groupLaqQuestions == "false" || groupLaqQuestions == "" || typeof(groupLaqQuestions) == "undefined"){
				if(ques.quesType == "MCQ"){
				str += fillMCQQues(ques.quesLangBeans[mockVar.langIndex].quesText,ques.options,ques.quesParam.selectedOptId);
				}else if(ques.quesType == "MSQ"){
				str += fillMSQQues(ques.quesLangBeans[mockVar.langIndex].quesText,ques.options,ques.quesParam.selectedOptId);
				}else if(ques.quesType == "SA"){
				str += fillSAQues(ques.quesLangBeans[mockVar.langIndex].quesText,ques.quesParam.answer);
				}
				}else{
							//for(var l=0;l<currentChildQuestions;l++){
						for(var m=0;m<mockVar.curSectionQuestions.length;m++){
						if(mockVar.curSectionQuestions[m].laqId ==  mockVar.compreLaqQues[compreQuesIndex].quesId){
						
							if(mockVar.curSectionQuestions[m].quesType == "MCQ"){
								str += fillMCQQuesGroup(mockVar.curSectionQuestions[m].quesLangBeans[mockVar.langIndex].quesText,mockVar.curSectionQuestions[m].options,mockVar.curSectionQuestions[m].quesParam.selectedOptId,mockVar.curSectionQuestions[m],m);
							}else if(mockVar.curSectionQuestions[m].quesType == "MSQ"){
								str += fillMSQQuesGroup(mockVar.curSectionQuestions[m].quesLangBeans[mockVar.langIndex].quesText,mockVar.curSectionQuestions[m].options,mockVar.curSectionQuestions[m].quesParam.selectedOptId,mockVar.curSectionQuestions[m],m);
							}else if(mockVar.curSectionQuestions[m].quesType == "SA"){
								str += fillSAQuesGroup(mockVar.curSectionQuestions[m].quesLangBeans[mockVar.langIndex].quesText,mockVar.curSectionQuestions[m].quesParam.answer,mockVar.curSectionQuestions[m],m);
							}
							
						}
					}
					$('.normalBtn').hide();
				$('.groupBtn').show();
				$('#underreview').hide();
				$('#clearResponse').hide();
				}
				str += "</div>";
			}else{
				str += "<div id='LAQuesText' class='rightDiv'>";
				str +="<div class='divHeader'>";
				if(ques.displayQuestionNo == "true" || ques.displayQuestionNo == "" || typeof(ques.displayQuestionNo) == "undefined")
				str +="<b><span class='questionNumber'>"+mockLabels.questionNo+"</span>. "+eval(iOAP.curQues+1)+"</b>"
				str +="</div>";
				str += "<div id='quesOuterDiv'>";
				if(groupLaqQuestions == false || groupLaqQuestions == "" || typeof(groupLaqQuestions) == "undefined" ){
				if(ques.quesType == "MCQ"){
				str += fillMCQQues(ques.quesLangBeans[mockVar.langIndex].quesText,ques.options,ques.quesParam.selectedOptId);
				}else if(ques.quesType == "MSQ"){
				str += fillMSQQues(ques.quesLangBeans[mockVar.langIndex].quesText,ques.options,ques.quesParam.selectedOptId);
				}else if(ques.quesType == "SA"){
				str += fillSAQues(ques.quesLangBeans[mockVar.langIndex].quesText,ques.quesParam.answer);
				}
				}else{
							for(var l=0;l<currentChildQuestions;l++){
						for(var m=0;m<mockVar.curSectionQuestions.length;m++){
						if(mockVar.curSectionQuestions[m].laqId ==  mockVar.compreLaqQues[compreQuesIndex].quesId){
						
							if(mockVar.curSectionQuestions[m].quesType == "MCQ"){
								str += fillMCQQuesGroup(mockVar.curSectionQuestions[m].quesLangBeans[mockVar.langIndex].quesText,mockVar.curSectionQuestions[m].options,mockVar.curSectionQuestions[m].quesParam.selectedOptId,mockVar.curSectionQuestions[m],l);
							}else if(mockVar.curSectionQuestions[m].quesType == "MSQ"){
								str += fillMSQQuesGroup(mockVar.curSectionQuestions[m].quesLangBeans[mockVar.langIndex].quesText,mockVar.curSectionQuestions[m].options,mockVar.curSectionQuestions[m].quesParam.selectedOptId,mockVar.curSectionQuestions[m],l);
							}else if(mockVar.curSectionQuestions[m].quesType == "SA"){
								str += fillSAQuesGroup(mockVar.curSectionQuestions[m].quesLangBeans[mockVar.langIndex].quesText,mockVar.curSectionQuestions[m].quesParam.answer,mockVar.curSectionQuestions[m],l);
							}
							
						}
					}
				}
				$('.normalBtn').hide();
				$('.groupBtn').show();
				$('#underreview').hide();
				$('#clearResponse').hide();
				}
				str += "</div>";
			}
		}
		
	return str;
}

function quesGroupContent(ques){
	var str='' ;
	str += "<div class='questionTypeCont'></div>";
	str += '<div id="Questn_Innr_Div_section"><div id="Subjt_Div"></div><div id="Subdetail_Div"><div style="float:right;margin-right:5px;">';
	if(ques.quesType != 'PROGRAMMING TEST' && mockVar.langCount>1){
		str += "<div class='chooseLang'> <span id='viewLang'>"+mockLabels.viewIn+"</span><select class='choose_lang auditlogSelect' onchange='changeLang(this.value)'> ";
		for(var i=0;i<mockVar.languages.length;i++){
			if(mockVar.languages[i]!=null && typeof(mockVar.languages[i])!='undefined'){
				str +="<option";
				if(i==mockVar.curQuesBean.quesLangBeans[mockVar.langIndex].langId)
					str += " selected='selected'";
				str +=  " value='"+i+"'>"+mockVar.languages[i]+"</option>";
			}
		}
		str +="</select></div>";
	}
	str += '</div></div></div>';
	str += "<div  id='quesOuterDiv' style='margin:2px 2px 2px 2px;border:1px solid #dbdbdb'>";
	str +="<div id='groupWarning' style='display:none'></div>";
	$("#savenext").val(mockLabels.savenext) ;
	for(i=0;i<ques.length;i++)	{
	if(ques[i].quesType == "MCQ" && ques[i].comprehensionId == 0 && ques[i].laqId == 0){
	
		str += fillMCQQuesGroup(ques[i].quesLangBeans[mockVar.langIndex].quesText,ques[i].options,ques[i].quesParam.selectedOptId,ques[i],i);
		
		}else if(ques[i].quesType == "MSQ" && ques[i].comprehensionId == 0 && ques[i].laqId == 0){
		
			str += fillMSQQuesGroup(ques[i].quesLangBeans[mockVar.langIndex].quesText,ques[i].options,ques[i].quesParam.selectedOptId,ques[i],i);
		
	}else if(ques[i].quesType == "SA" && ques[i].comprehensionId == 0 && ques[i].laqId == 0){
		
		
		str += fillSAQuesGroup(ques[i].quesLangBeans[mockVar.langIndex].quesText,ques[i].quesParam.answer,ques[i],i);
		
		
	
	}else if( ques[i].comprehensionId != 0){
		compreQuesIndex = mockVar.compreLaqQues.inArray(ques[i].comprehensionId, 'quesId');
			var compreQues = mockVar.compreLaqQues[compreQuesIndex];
			var currentChildQuestions = 0;
			for(var k=0;k<ques.length;k++){
		//	for(var j=0;j<mockVar.compreLaqQues.length;j++){
				
				if(ques[k].comprehensionId ==  mockVar.compreLaqQues[compreQuesIndex].quesId)
					currentChildQuestions++;
				
		//	}
			}
		
			str += fillCompQues(compreQues);
			str += '<div id="compreQuesText" >';
			str += "<div  id='quesOuterDiv'>";
			for(var l=0;l<currentChildQuestions;l++){
			if(ques[i].quesType == "MCQ")
			str += fillMCQQuesGroup(ques[i].quesLangBeans[mockVar.langIndex].quesText,ques[i].options,ques[i].quesParam.selectedOptId,ques[i],i);
			else if(ques[i].quesType == "MSQ")
			str += fillMSQQuesGroup(ques[i].quesLangBeans[mockVar.langIndex].quesText,ques[i].options,ques[i].quesParam.selectedOptId,ques[i],i);
			else if(ques[i].quesType == "SA")
			str += fillSAQuesGroup(ques[i].quesLangBeans[mockVar.langIndex].quesText,ques[i].quesParam.answer,ques[i],i);
			if(l!=currentChildQuestions-1)
			i++;
			}
			
			str += "</div></div></div>";
	
	}else if(ques[i].laqId != 0){
			compreQuesIndex = mockVar.compreLaqQues.inArray(ques[i].laqId, 'quesId');
			parentQuesIndex = iOAP.secDetails[iOAP.curSection].questions.inArray(ques[i].laqParentId, 'quesId');
			var laqQues = mockVar.compreLaqQues[compreQuesIndex];
			var currentChildQuestions = 0;
			var groupLaqQuestions = '';
			groupLaqQuestions = mockVar.compreLaqQues[compreQuesIndex].groupComprehensionLaqQuestions;
			for(var k=0;k<ques.length;k++){
		//	for(var j=0;j<mockVar.compreLaqQues.length;j++){
				
				if(ques[k].laqId == mockVar.compreLaqQues[compreQuesIndex].quesId)
					currentChildQuestions++;
				
		//	}
			}
			if($.trim(laqQues.langData[mockVar.langIndex].quesText).length >0){
			str += fillLAQues(laqQues, parentQuesIndex);
			str += '<div id="LAQuesText">';
			str += "<div  id='quesOuterDiv'>";
			for(var l=0;l<currentChildQuestions;l++){
			if(ques[i].quesType == "MCQ")
			str += fillMCQQuesGroup(ques[i].quesLangBeans[mockVar.langIndex].quesText,ques[i].options,ques[i].quesParam.selectedOptId,ques[i],i);
			else if(ques[i].quesType == "MSQ")
			str += fillMSQQuesGroup(ques[i].quesLangBeans[mockVar.langIndex].quesText,ques[i].options,ques[i].quesParam.selectedOptId,ques[i],i);
			else if(ques[i].quesType == "SA")
			str += fillSAQuesGroup(ques[i].quesLangBeans[mockVar.langIndex].quesText,ques[i].quesParam.answer,ques[i],i);
			if(l!=currentChildQuestions-1)
			i++;
			}
			
			str += "</div></div></div>";}
			else{
			str += '<div id="LAQuesText">';
			str += "<div  id='quesOuterDiv'>";
			for(var l=0;l<currentChildQuestions;l++){
			if(ques[i].quesType == "MCQ")
			str += fillMCQQuesGroup(ques[i].quesLangBeans[mockVar.langIndex].quesText,ques[i].options,ques[i].quesParam.selectedOptId,ques[i],i);
			else if(ques[i].quesType == "MSQ")
			str += fillMSQQuesGroup(ques[i].quesLangBeans[mockVar.langIndex].quesText,ques[i].options,ques[i].quesParam.selectedOptId,ques[i],i);
			else if(ques[i].quesType == "SA")
			str += fillSAQuesGroup(ques[i].quesLangBeans[mockVar.langIndex].quesText,ques[i].quesParam.answer,ques[i],i);
			if(l!=currentChildQuestions-1)
			i++;
			}
			
			str += "</div></div></div>";
			}
	
		}
	}
	str +='</div>';
	return str;
}


function changeHelpLang(langId){
	var str = "<div style='width:100%;height:100%;overflow:auto;'>";
	if(mockVar.langCount>1){
		str += "<div style='width:100%'>";
		str += "<span style='float:right'> "+mockLabels.viewIn+" <select onchange='changeHelpLang(this.value)'> ";
		for(var i=0;i<mockVar.languages.length;i++){
			if(mockVar.languages[i]!=null && typeof(mockVar.languages[i])!='undefined'){
				str +="<option";
				if(i==langId)
					str += " selected='selected'";
				str +=  " value='"+i+"'>"+mockVar.languages[i]+"</option>";
			}
		}
		str +="</select></span></div>";
		
	}
	if(mockVar.helpContent[langId]!= null && $.trim(mockVar.helpContent[langId]) != ""){
		var strng;
		strng=mockVar.helpContent[langId];
		 
		 if(strng.indexOf(".pdf")==-1)
		 {
		 str += "<img src='"+mockVar.helpContent[langId]+"' width=100% />";
		 }
		 else{
		 str +="<embed src='"+mockVar.helpContent[langId]+"'  height=100% width=100% ></embed>";
		 }
	}else{
		str += "Help content is not available in the language selected";
	}
	str += "</div>";
	str +="<div style='overflow : hidden;'><table align='center'>";
	
	str +='</table></div>';
	$('#sectionSummary').html(str);
	showModule('sectionSummary');
}

function showHelpContent(event){
////console.log("DF");
	if(avoidKeyPressing(event)){
		var str = '<div style="overflow : auto; height : 100%;">';
		if(mockVar.langCount>1){
			str += "<div style='float:right'> "+mockLabels.viewIn+" <select onchange='changeHelpLang(this.value)'> ";
			for(var i=0;i<mockVar.languages.length;i++){
				if(mockVar.languages[i]!=null && typeof(mockVar.languages[i])!='undefined'){
					str +="<option";
					if(i==mockVar.defaultLang)
						str += " selected='selected'";
					str +=  " value='"+i+"'>"+mockVar.languages[i]+"</option>";
				}
			}
			str +="</select></div>";
		}
		if(mockVar.helpContent[mockVar.defaultLang]!= null && $.trim(mockVar.helpContent[mockVar.defaultLang]) != ""){
			var strng;
		 strng=mockVar.helpContent[mockVar.defaultLang];
			 if(strng.indexOf(".pdf")==-1)
		 {
		 str += "<img src='"+mockVar.helpContent[mockVar.defaultLang]+"' width=100% />";
		 }
		 else {
		 str +="<embed src='"+mockVar.helpContent[mockVar.defaultLang]+"'  height=100% width=100% ></embed>";
		 }
		}else{
			str += "Help content is not available in the language selected";
		}
		str += "</div>";
		str +="<div style='overflow : hidden;'><table align='center'>";
		
		str +='</table></div>';
		$('#sectionSummary').html(str);
		showModule('sectionSummary');
	}
}

function fillGroups(){
	iOAP=mockVar.groups[mockVar.currentGrp];
	$("#groups").empty();
	var tempstr= "" ;
	$("#groups").html(tempstr);
	if(mockVar.groups.length>0){
		
		str="<div>";
		var tempiOAP ;
		for(var i=0;i< mockVar.groups.length ;i++){
			tempiOAP = mockVar.groups[i];
			var answeredQuestions = 0; 
			var notAnsweredQuestions =0;
			var markedQuestions =0;
			var noOfQuestions =0;
			var notAttemptedQuestions = 0;
			var grossKeyStrokesCount = 0;
		//	var backSpaceCount = 0;
			var markedAndAnsweredQuestions=0;
			if(tempiOAP.secDetails[0].secType == 'Typing Test'){
				grossKeyStrokesCount = mockVar.typingGroup[i].keyStrokesCount;
		//		backSpaceCount = mockVar.typingGroup[i].backSpaceCount;
				ellapsedTime = mockVar.typingGroup[i].ellapsedTime;
			}
			for(var j=0;j<tempiOAP.secDetails.length;j++){
				answeredQuestions += tempiOAP.secDetails[j].answered;
				notAnsweredQuestions += tempiOAP.secDetails[j].notanswered;
				markedQuestions += tempiOAP.secDetails[j].marked;
				markedAndAnsweredQuestions += tempiOAP.secDetails[j].markedAndAnswered;
				noOfQuestions += tempiOAP.secDetails[j].questions.length;
				notAttemptedQuestions += tempiOAP.secDetails[j].questions.length - tempiOAP.secDetails[j].marked - tempiOAP.secDetails[j].notanswered - tempiOAP.secDetails[j].answered- tempiOAP.secDetails[j].markedAndAnswered;
			}
			str+='<div class="allSections" id="g'+i+'" title="'+mockVar.groups[i].groupName+'">';
			if(mockVar.groups[i].groupName.length>20)
		str += mockVar.groups[i].groupName.substring(0,20)+"...";
		else
		str += mockVar.groups[i].groupName;
			str+='<a href="#" class="tooltip1';
			if(mockVar.groups[i].isDisabled){
				str += " disabled ";
			}
			
			str+='">';
			if(!mockVar.groups[i].isTypingGroup){
			str+=' <div class="subject_instruction_icon1">';
			
			str += '</div>';}
			if(!mockVar.groups[i].isDisabled){
				if(!(i==mockVar.MaxGrpEnabled  && mockVar.groups[i].isTypingGroup)){
					str += '<span class="subject_information_div1"><table class="subject_name" style="text-align:left" >';
					if(mockVar.groups[i].groupName.length>25)
					groupNameIcon = mockVar.groups[i].groupName.substring(0,25)+"...";
					else
					groupNameIcon = mockVar.groups[i].groupName;
					str += '<tr><td><b>'+groupNameIcon+'</b></td></tr>';
					str += '</table>';
					
					if(mockVar.groups[i].isTypingGroup){
						str += '<table class="notation_type_description diff_type_notation_area_inner" >';
						str += '<tr><td style="text-align:left;padding-top:10px" width="80%">'+mockLabels.keyStrokesCount+': </td><td valign="top">'+grossKeyStrokesCount+'</td></tr>';
						//str += '<tr><td style="text-align:left;padding-top:10px" width="80%">'+mockLabels.backspaceCount+': </td><td valign="top">'+backSpaceCount+'</td></tr>';
						//str += '<tr><td style="text-align:left;padding-top:10px" width="80%">'+mockLabels.elapsedTime+': </td><td valign="top">'+(ellapsedTime/60).toFixed(2)+'</td></tr>';
						str += '</table></center></span>';
					}else{
						str += '<table class="notation_type_description diff_type_notation_area_inner" style="background:#e5f6fc none repeat scroll 0 0" >';
						str += '<tr class="notation_typeDiv"><td><span class="answered">'+answeredQuestions+'</span></td><td id="grpAnswered" class="type_title" style="text-align:left">'+mockLabels.answered+'</td></tr>';
						str += '<tr class="notation_typeDiv"><td><span  class="not_answered">'+notAnsweredQuestions+'</span></td><td class="type_title" id="grpNotAnswered" style="text-align:left">'+mockLabels.notAnswered+'</td></tr>';
						str += '<tr class="notation_typeDiv"><td><span class="not_visited">'+notAttemptedQuestions+'</span></td><td class="type_title" style="text-align:left" id="grpNotAttempted">'+mockLabels.notAttempted+'</td></tr>';
						str += '<tr class="notation_typeDiv"><td><span class="review">'+markedQuestions+'</span></td><td class="type_title" style="text-align:left" id="grpMarkReview">'+mockLabels.markReview+'</td></tr>';
						str += '<tr class="notation_typeDiv"><td ><span class="review_marked">'+markedAndAnsweredQuestions+'</span></td><td  class=\"type_title\" style="text-align:left"  id="grpMarkedAndAnswered">'+mockLabels.markAnsTitle+'</td></tr>';
						str += '</table></span>';
					}
				}
			}
			str += '</a></div>';
		}
		str +="</div></div>";
		
		$('#groups').html(str);
		// align
		
		$("#g"+mockVar.currentGrp).addClass("currentSectionSelected");
		if(!mockVar.groups[mockVar.MaxGrpEnabled].isTypingGroup){
			$("#g"+mockVar.currentGrp+" a").addClass("tooltipSelected");
		} else{
			$("#g"+mockVar.currentGrp+" a").addClass("tooltipSelected");
		}
		
		$("#groups .allSections").click(function (event){
			if(event.target.type!="checkbox"){
			//Added by Boddu Rakesh
		//	////console.log("previous: "+mockVar.currentGrp);
			var groupIndex = this.id.split("g")[1];
		//	////console.log("current Group:  "+groupIndex);
				changeGroup(this.id.split("g")[1]);
			}
		});
		if(jQuery(window).width()>768)
		{	
		var calculategroupwidth = jQuery("#col1").outerWidth()-(jQuery("#col2").outerWidth(true)+jQuery(".nav-container .components-section").outerWidth(true)+95);
		jQuery(".group-panel").css("width",calculategroupwidth);
		var calculateinnerwidth=0;
		if(navGroup==false){
		jQuery("#groups .allSections").each(function(){
			calculateinnerwidth = calculateinnerwidth + jQuery(this).outerWidth(true) + 6;
			if(calculateinnerwidth>calculategroupwidth)
			{
			jQuery(this).hide();
			 jQuery(this).nextAll().hide();
			 jQuery(".components-section .group-arrow-right-disabled").attr("class","group-arrow-right");
			 }
		});
		}else{
				jQuery("#groups .allSections").each(function(){
			calculateinnerwidth = calculateinnerwidth + jQuery(this).outerWidth(true) + 6;
			if(calculateinnerwidth<calculategroupwidth)
			{
			jQuery(this).hide();
			 //jQuery(this).nextAll().hide();
			 
			 }else{jQuery(this).show();
			 jQuery(".group-arrow-right").attr("class","group-arrow-right-disabled");
			  jQuery(".group-arrow-left-disabled").attr("class","group-arrow-left");}
		});
		
		}
		}
			else
			{
			
				var calculategroupwidth = jQuery(".nav-container").width()-180;
			jQuery(".group-panel").css("width","50%");
			var calculateinnerwidth=30;
			jQuery("#groups .allSections").each(function(){
				calculateinnerwidth = calculateinnerwidth + jQuery(this).outerWidth(true);
				if(calculateinnerwidth>calculategroupwidth)
				{
				jQuery(this).hide();
				 jQuery(this).nextAll().hide();
				 jQuery(".group-arrow-right-disabled").attr("class","group-arrow-right");
				 }
			});
			}
	}
}		
function checkGroupBreakTime(){

		
	if(mockVar.currentGrp < mockVar.groups.length-1){
		if(!(mockVar.groups[mockVar.currentGrp].breakTime == 0)){
			mockVar.isBreakPage=1;
			
			if(mockVar.storeCandResponse){
			//////console.log(2454);
				if(!isFinalSubmitStarted){
		//console.log(2285);
				saveBackUp();
				}
				}
			clearTimeout(mockVar.timeCounter);
			mockVar.timeCounter = mockVar.groups[mockVar.currentGrp].breakTime;
			if(mockVar.remainingBreakTime>0 && mockVar.resumedFromBreakPage==1 && mockVar.groupAtInterruption==mockVar.currentGrp ){
			breakTimeCounter(mockVar.remainingBreakTime);
			submitConfirmation('break');
			}
			else if(mockVar.remainingBreakTime<=0  && mockVar.resumedFromBreakPage==1 && mockVar.groupAtInterruption==mockVar.currentGrp){
			saveQuestionAutomatically();
			submitGroup();
			}
			else if(mockVar.resumedFromBreakPage==1 && mockVar.groupAtInterruption!=mockVar.currentGrp){
				//alert('Interrupted in break but current group is not the same');
			}
			else{
			breakTimeCounter(mockVar.timeCounter);
			submitConfirmation('break');
			}
		}else{
			saveQuestionAutomatically();
			submitGroup();
		}
	}else{
		submitMock("");
	}
}

function submitGroup(){
	//alert('Group Submit');
	mockVar.isBreakPage=0;
	mockVar.remainingBreakTime=0;
	mockVar.resumedFromBreakPage=0;
	
	
// if(mockVar.currentGrp)
	
// if(mockVar.currentGrp < mockVar.groups.length-1){
	if(document.getElementById('typedAnswer')){
		fnSubmit('NEXT');
		//$('#typedAnswer').attr('disabled',true);
		$('#finalTypingSub').attr('disabled',true);
		$('#finalTypingSub').removeClass().addClass('typingTestButtonDisabled btn btn-primary-blue');
	}
	navSection =false;
	if(jQuery(".group-panel").find(".allSections:visible:last").hasClass('currentSectionSelected')){
		navGroup=true;
	}
	$('#breakTimeDiv').hide();
	$('#questionContent').show();
	$('.collapsebel_panel').show();
	$('.helpinstruction_div').show();
	$('.nav-container').show();
	$('.section-timepanel').show();
	$('.subject-selection').show();
	$('.viewProfile').show();
	jQuery(".subject-arrow-right").attr("class","subject-arrow-right-disabled");
	jQuery(".subject-arrow-left").attr("class","subject-arrow-left-disabled");
	
	$('.subject-section-rightarrow').show();
	
	if(mockVar.groups[mockVar.currentGrp].maxTime == 0){
		mockVar.nonTimeBoundTime = mockVar.time ;
	}
	mockVar.currentGrp++;
	mockVar.MaxGrpEnabled=mockVar.currentGrp;
	if(mockVar.groups[mockVar.currentGrp].maxTime > 0){
		mockVar.time = mockVar.groups[mockVar.currentGrp].maxTime;
	}else{
		mockVar.time = mockVar.nonTimeBoundTime;
	}
	mockVar.groups[mockVar.currentGrp].isDisabled = false;
	mockVar.minSubmitTime = mockVar.groups[mockVar.currentGrp].minTime;
	showModule("questionCont");
	fillGroups();
	getQuestion(mockVar.defaultLang);
	numPanelSec();
	fillSections();
	enableOptButtons();
	fillNumberPanel();
	clearTimeout(mockVar.timeCounter);
	mockVar.timeCounter = setTimeout(function(){startCounter(mockVar.time-1);},1000);
	
/*
* }else{ submitMock(); //submit exam }
*/	if(iOAP.noOptSec>0){
	$('#noOptSec').html(iOAP.noOptSec);
	$('#maxOptSec').html(iOAP.maxNoOptSec);
	$("#showOptionalSecSummary").show();
}else{
	$("#showOptionalSecSummary").hide();
}
	quizPageHeight();
	if(mockVar.storeCandResponse){
	//////console.log(2531);
		if(!isFinalSubmitStarted){
		//console.log(2366);
		saveBackUp();
		}
		
		}
}

function changeGroup(id){
	if(mockVar.MaxGrpEnabled >= id && !mockVar.groups[mockVar.MaxGrpEnabled].isTypingGroup){
		if((!mockVar.groups[id].isDisabled && mockVar.groups[id].isViewable=="true")||mockVar.MaxGrpEnabled == id){
			mockVar.currentGrp = id;
			saveQuestionAutomatically();
			fillGroups();
			var quesLangId = iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues].quesParam.langID==""?mockVar.defaultLang:iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues].quesParam.langID;
			getQuestion(quesLangId);
			if($('#typedAnswer')){
				$('#typedAnswer').attr('disabled',true);
				$('#finalTypingSub').attr('disabled',true);
				$('#finalTypingSub').removeClass().addClass('typingTestButtonDisabled btn btn-primary-blue');
			}
			doCalculations(0,0);
			numPanelSec();
			fillSections();
			enableOptButtons();
			fillNumberPanel();
			if(iOAP.noOptSec>0){
				$('#noOptSec').html(iOAP.noOptSec);
				$('#maxOptSec').html(iOAP.maxNoOptSec);
				$("#showOptionalSecSummary").show();
			}else{
				$("#showOptionalSecSummary").hide();
			}
			removeActiveLinks();
			showModule('questionCont');
			quizPageHeight();
		}else{
			var str = "<br/><center>You have already attempted "+mockVar.groups[id].groupName+" group. Viewing or editing this group is not allowed</center>";
			str += "<table class='bordertable' cellspacing=0 width='80%' align='center' style='margin-top:10px'>";
			str += "<tr><th>Section Name</th><th>No. of Questions</th><th>Answered</th><th>Not Answered</th><th>Marked for Review</th><th>Not Visited</th></tr>";
			var temp_iOAP = mockVar.groups[id];
			var noOfAns = 0,noOfNtAns=0,noOfReview=0,totalQues=0,noOfNtAttemp=0;
			for(var i=0;i<temp_iOAP.secDetails.length;i++){
				if(temp_iOAP.secDetails[i].isOptional=='false'){
					str += "<tr><td>"+temp_iOAP.secDetails[i].secName+"</td><td>"+(temp_iOAP.secDetails[i].questions.length)+"</td><td>"+temp_iOAP.secDetails[i].answered+"</td><td>"+temp_iOAP.secDetails[i].notanswered+"</td><td>"+temp_iOAP.secDetails[i].marked+"</td><td>"+(temp_iOAP.secDetails[i].questions.length-temp_iOAP.secDetails[i].answered-temp_iOAP.secDetails[i].notanswered-temp_iOAP.secDetails[i].marked)+"</td></tr>";
					noOfAns = noOfAns + temp_iOAP.secDetails[i].answered;
					noOfNtAns = noOfNtAns + temp_iOAP.secDetails[i].notanswered;
					noOfReview = noOfReview + temp_iOAP.secDetails[i].marked;
					totalQues = totalQues + temp_iOAP.secDetails[i].questions.length;
					noOfNtAttemp = noOfNtAttemp + temp_iOAP.secDetails[i].questions.length.length-temp_iOAP.secDetails[i].answered-temp_iOAP.secDetails[i].notanswered-temp_iOAP.secDetails[i].marked;
				}else if(temp_iOAP.secDetails[i].isOptional=='false' && temp_iOAP.secDetails[i].isSelected){
					noOfAns = noOfAns + temp_iOAP.secDetails[i].answered;
					noOfNtAns = noOfNtAns + temp_iOAP.secDetails[i].notanswered;
					noOfReview = noOfReview + temp_iOAP.secDetails[i].marked;
					totalQues = totalQues + temp_iOAP.secDetails[i].questions.length;
					noOfNtAttemp = noOfNtAttemp + temp_iOAP.secDetails[i].questions.length.length-temp_iOAP.secDetails[i].answered-temp_iOAP.secDetails[i].notanswered-temp_iOAP.secDetails[i].marked;
					str += "<tr><td>"+temp_iOAP.secDetails[i].secName+"</td><td>"+(temp_iOAP.secDetails[i].questions.length)+"</td><td>"+temp_iOAP.secDetails[i].answered+"</td><td>"+temp_iOAP.secDetails[i].notanswered+"</td><td>"+temp_iOAP.secDetails[i].marked+"</td><td>"+(temp_iOAP.secDetails[i].questions.length.length-temp_iOAP.secDetails[i].answered-temp_iOAP.secDetails[i].notanswered-temp_iOAP.secDetails[i].marked)+"</td></tr>";
				}
			}
			str += "</table>";
			$("#viewQPDiv").html(str);
			showModule('QPDiv'); 
			// alert("BMJ");
		}
	}
}


var incr=0;
function fillSections(){
	if($('.collapsebel_panel').css('display') != 'none')
	{
			jQuery(".expand_icon").css("display","none");
	}
	if(iOAP.secDetails[iOAP.curSection].displayNumberPanel == "false"){
		$(".collapsebel_panel").hide();
	}else{
		$(".collapsebel_panel").show();
	}
	fillGroups();
	
	var str="";
	for(var i=0;i<iOAP.secDetails.length ;i++){
		var answeredQuestions = iOAP.secDetails[i].answered;
		var notAnsweredQuestions = iOAP.secDetails[i].notanswered;
		var markedQuestions = iOAP.secDetails[i].marked;
		var noOfQuestions = iOAP.secDetails[i].questions.length;
		var markedAndAnsweredQuestions= iOAP.secDetails[i].markedAndAnswered;
		var notAttemptedQuestions = noOfQuestions  - notAnsweredQuestions - answeredQuestions - markedQuestions - markedAndAnsweredQuestions;
	
        str+='<div class="subject-name" id="s'+i+'" title="'+iOAP.secDetails[i].secName+'">';
		
		if(iOAP.secDetails[i].isOptional == 'true'){
			str += '<input name="optSec" id="opt'+i+'"';
			if(iOAP.secDetails[i].isSelected == true){
				str += ' checked ';
			}
			if(mockVar.currentGrp != mockVar.MaxGrpEnabled && mockVar.groups[mockVar.currentGrp].isEditable == "false"){
				str += " disabled ";
			}
			str += 'type="checkbox"></input>';
		}
		if(iOAP.secDetails[i].secName.length>20)
		str += iOAP.secDetails[i].secName.substring(0,20)+"...";
		else
		str += iOAP.secDetails[i].secName;
		
		str += '<a href="#" class="tooltip1"> <div class="subject_instruction_icon1" id="icon'+i+'" ></div>';
		//str +='</div>';
		
		str += '<span class="subject_information_div1" ><table>';
		str += '<div class="subject_name" style="text-align:left">'+iOAP.secDetails[i].secName+'</div>';
		str += '</table>';
		str += '<table class="notation_type_description diff_type_notation_area_inner" style="background:#e5f6fc none repeat scroll 0 0" >';
		str += '<tr class="notation_typeDiv"><td><span class="answered">'+answeredQuestions+'</span></td><td><span class=\"type_title\" style="text-align:left">'+mockLabels.answered+'</span></td></tr>';
		str += '<tr class="notation_typeDiv"><td><span  class="not_answered">'+notAnsweredQuestions+'</span></td><td><span class=\"type_title\" style="text-align:left">'+mockLabels.notAnswered+'</span></td></tr>';
		str += '<tr class="notation_typeDiv"><td><span class="review">'+markedQuestions+'</span></td><td><span class=\"type_title\" style="text-align:left">'+mockLabels.markReview+'</span> </td></tr>';
		str += '<tr class="notation_typeDiv"><td ><span class="not_visited">'+notAttemptedQuestions+'</span></td><td><span class=\"type_title\" style="text-align:left">'+mockLabels.notAttempted+'</span></td></tr>';
		str += '<tr class="notation_typeDiv"><td ><span class="review_marked">'+markedAndAnsweredQuestions+'</span></td><td><span class=\"type_title\" style="text-align:left">'+mockLabels.markAnsTitle+' </span></td></tr>';
		str += '</table></span>';
		//document.getElementById('id'+i).style='block';
		
		
		
		$('#answeredCount').text(iOAP.secDetails[iOAP.curSection].answered);
		$('#notAnsweredCount').text(iOAP.secDetails[iOAP.curSection].notanswered);
		$('#markedCount').text(iOAP.secDetails[iOAP.curSection].marked);
		$('#markedReviewCount').text(iOAP.secDetails[iOAP.curSection].markedAndAnswered);
		var noOfQuestions1 = iOAP.secDetails[iOAP.curSection].questions.length;
		var notAttemptedQuestions1 = noOfQuestions1  - iOAP.secDetails[iOAP.curSection].answered - iOAP.secDetails[iOAP.curSection].notanswered - iOAP.secDetails[iOAP.curSection].marked - iOAP.secDetails[iOAP.curSection].markedAndAnswered;
		$('#notVisitedCount').text(notAttemptedQuestions1);
		str +='</a></div>';
		
				
		
}
		//str +="</div>";
		$('#sections').html(str);
		
	
				
	$("#s"+iOAP.curSection).addClass("selectedsubject");
	$("#s"+iOAP.curSection+" a").addClass("tooltipSelected1");
	/*if($(".subject-name").hasClass("selectedsubject")){
		$('#icon'+iOAP.curSection).hide();
		}*/
	/*if( iOAP.secDetails.length>4 && ($.browser.msie) ){
		for(var i=4;i<iOAP.secDetails.length;i=i+5){
			$('  .tooltip").hover(
				function(){ $(this).find(".classic").css({"margin-left":"-60px"});}
				, function(){$(this).find(".classic").css({"margin-left":"-999px"});});
		}
	}*/
	//document.getElementById('id'+i).style='block';
	
	$("#sections .subject-name input").click(function(event){
		if(this.checked){
			optSecCheck(this.id.split("opt")[1],event);
		}
		else{
			optSecUncheck(this.id.split("opt")[1],event);
		}
	});
	$("#sections .subject-name").click(function (event){
		if(event.target.type!="checkbox"){
			changeSection(this.id.split("s")[1]);
		}
	});
	
	/*	var getoffsetpos = jQuery("#s"+iOAP.curSection).offset();
		var gettopsubject= getoffsetpos.top+jQuery("#s"+iOAP.curSection).height();
				$(".subject_information_div").css({"margin-left":getoffsetpos.left,"top":gettopsubject});	*/
			
		sectionWidthCalculate();	
		
		$("#sections .allSections input").click(function(event){
			//Added by Boddu Rakesh
			var previousSection = iOAP.curSection;
			var previousSectionId = mockVar.groups[currentGroupIndex].secDetails[previousSection].secId;
			var currentSection = this.id.split("opt")[1];
			var currentSectionId = mockVar.groups[mockVar.currentGrp].secDetails[currentSection].secId;
			//////console.log("Current Section: "+currentSecId);
			var actionDesc = "";
			if(previousSectionId == currentSectionId){
				if(this.checked){
					actionDesc = "Optional section "+currentSectionId+" selected";
				}
				else{
					actionDesc = "Optional section "+currentSectionId+" discarded";
				}
			} else {
				actionDesc = "Optional section "+previousSectionId+" changes to "+currentSectionId;
			}
			
			var AuditJsonObject = new Object();
			AuditJsonObject.ActionName = "Section Tab";
			AuditJsonObject.ActionDesc = actionDesc;
			AuditJsonObject.GroupId = "NA";
			AuditJsonObject.SectionId = "NA";
			AuditJsonObject.QuestionId = "NA";
			AuditJsonObject.SelectedOptionId = "NA";
			AuditJsonObject.OptionSequence = "NA";
			var currentDate = new Date();
			AuditJsonObject.Time = currentDate.yyyymmddHHmmss();
			AuditJson.push(AuditJsonObject);
				if(this.checked){
					optSecCheck(this.id.split("opt")[1],event);
				}
				else{
					optSecUncheck(this.id.split("opt")[1],event);
				}
			});
			$("#sections .allSections").click(function (event){
			//Added by Boddu Rakesh
			var previousSection = iOAP.curSection;
			var previousSectionId = mockVar.groups[currentGroupIndex].secDetails[previousSection].secId;
			var currentSecId = this.id.split("s")[1];
			//var currentSectionId = this.id.split("opt")[1];
			var currentSectionId = mockVar.groups[mockVar.currentGrp].secDetails[currentSecId].secId;
			var actionDesc = "";
			if(currentSecId == previousSectionId){
				actionDesc = "Section "+currentSectionId+" selected";
			} else {
				actionDesc = "Section "+previousSectionId+" changes to "+currentSectionId;
			
			}
				if(event.target.type!="checkbox"){
				//Added by Boddu Rakesh
					var AuditJsonObject = new Object();
					AuditJsonObject.ActionName = "Section Tab";
					AuditJsonObject.ActionDesc = actionDesc;
					AuditJsonObject.GroupId = "NA";
					AuditJsonObject.SectionId = "NA";
					AuditJsonObject.QuestionId = "NA";
					AuditJsonObject.SelectedOptionId = "NA";
					AuditJsonObject.OptionSequence = "NA";
					var currentDate = new Date();
					AuditJsonObject.Time = currentDate.yyyymmddHHmmss();
					AuditJson.push(AuditJsonObject);
				//Completed
				
					changeSection(this.id.split("s")[1]);
				}
			});
	
}
/*function a(id)
{
	//alert(id);
	idGbl='';
	//document.getElementById('id'+id).style='block';
	incr=incr+1;
	idGbl="id"+id;
}*/

function sectionWidthCalculate()
{
            if(jQuery(window).width()>768)
			var calculatesubjectwidth = jQuery("#col1").outerWidth(true)-(jQuery("#col2").outerWidth(true)+30);
			else
			var calculatesubjectwidth = jQuery("#col1").outerWidth(true)-30;
			jQuery(".subject-selection").css("width",calculatesubjectwidth-4);
			var calculatesubjectinnerwidth=0;
			jQuery("#sections .subject-name").each(function(){
				calculatesubjectinnerwidth = calculatesubjectinnerwidth + jQuery(this).outerWidth(true);
				if(calculatesubjectinnerwidth>=calculatesubjectwidth && navSection==false)
				{
				jQuery(this).hide();
				 jQuery(this).nextAll().hide();
				 jQuery(".subject-arrow-right-disabled").attr("class","subject-arrow-right");
				 }
				 else
				 {		
					 if(navSection==true ){
						if($(this).css('display') != 'none' && calculatesubjectinnerwidth<calculatesubjectwidth){
								$(this).hide();
						}
						else{
								$(this).show();
						}
				 	}
				 }
			});
}


function optSecCheck(secId,event){
	var counter = 0;
	for(var i=0;i<iOAP.secDetails.length;i++){
		if(iOAP.secDetails[i].isSelected){
			counter++;
		}
	}
	counter++;
	if(counter>iOAP.maxNoOptSec){
		event.preventDefault();
		if(event.stopPropagation){
			event.stopPropagation();
		}else
			event.returnValue=false;
		secChangeConfirmation();
	}else{
		iOAP.secDetails[secId].isSelected = true;
		enableOptButtons();
		changeSection(secId);
	}
}

function optSecUncheck(secId,event){
	event.preventDefault();
	if(event.stopPropagation){
		event.stopPropagation();
	}else{
		event.returnValue=false;
	}
	var str= "";
	str ="<center><p style='margin-top:5%'><i>"+mockLabels.deselectOptSect+"</i></p><br/>";
	str +="<table align='center' style='margin-top:5%'>";
	str +='<tr><td style="text-align:right;padding-right:2px"><input onclick="resetSection('+secId+');afterResetSection();" type="button" class="btn btn-primary btn-primary-blue" style="margin-right:20px" title="'+mockLabels.reset+'" value="'+mockLabels.reset+'"/></td><td  style="text-align:left;padding-left:2px"><input onclick="showModule(';
	str +="'questionCont'";
	str +=')" type="button" class="btn btn-primary btn-primary-blue" style="margin-left:20px" title="'+mockLabels.back+'" value="'+mockLabels.back+'"/></td></tr></table></center>';
	$("#sectionSummaryDiv").html(str);
	showModule('sectionSummaryDiv');
}

function resetSection(secId){
	var counter = 0, langIdCount=0;
	/*for(var langId=0;langId<mockVar.languages.length;langId++){
		if(mockVar.languages[langId]!=null && typeof(mockVar.languages[langId])!='undefined'){
			langIdCount++;*/
			for(var j=0;j<iOAP.secDetails[secId].questions.length;j++){
				iOAP.secDetails[secId].questions[j].quesParam.answer = '';
				iOAP.secDetails[secId].questions[j].quesParam.selectedOptId = '';
				iOAP.secDetails[secId].questions[j].typedWord = '';
				if(iOAP.secDetails[secId].questions[j].quesParam.status != 'notAttempted'){
					iOAP.secDetails[secId].questions[j].quesParam.status="notanswered";
					counter++;
				}
			}
		/*}
	}*/
	$('#code').val('');
	$('#answer').val('');
	$("#noOfWords").text('');
	iOAP.secDetails[secId].answered = 0;
	// we are dividing here because the counter counts in all the languages.
	iOAP.secDetails[secId].notanswered = counter; 
	iOAP.secDetails[secId].marked = 0;
	iOAP.secDetails[secId].markedAndAnswered= 0;
	iOAP.secDetails[secId].isSelected = false;
}

function afterResetSection(){
	showModule('questionCont');
	getQuestion(mockVar.defaultLang);
	fillSections();
	enableOptButtons();
	fillNumberPanel();
}

function enableOptButtons(){
	if((iOAP.secDetails.length == 1 && iOAP.secDetails[iOAP.curSection].questions.length == 1) || ((iOAP.secDetails[iOAP.curSection].groupAllQuestions != "undefined" && iOAP.secDetails[iOAP.curSection].groupAllQuestions != "" && iOAP.secDetails[iOAP.curSection].groupAllQuestions == "true") && iOAP.secDetails.length == 1)){
		$("#underreview").attr("title",mockLabels.btnMarkForReview);
		$("#savenext").attr("title",mockLabels.btnSave);
		$("#savenextGroup").attr("title",mockLabels.btnSave);
		$('#savenextGroup').val(mockLabels.btnSave);
	}
else{
		$("#underreview").attr("title",mockLabels.btnMarkForReviewAndNext);
		$("#savenext").attr("title",mockLabels.btnSaveNext);
		$("#savenextGroup").attr("title",mockLabels.btnSaveNext);
		$('#savenextGroup').val(mockLabels.btnSaveNext);
		}
$("#clearResponse").attr("title",mockLabels.btnClearResponse);
$("#clearResponseGroup").attr("title",mockLabels.btnClearResponse);
	$("#compileCodeBtn").removeAttr("disabled");
	$("#saveProgram").removeAttr("disabled");
	$("#submitCodeBtn").removeAttr("disabled");
	$("#savenext").removeAttr("disabled");
	$("#previousBtn").removeAttr("disabled");
	$("#underreview").removeAttr("disabled");
	$("#clearResponse").removeAttr("disabled");
	$("#savenextGroup").removeAttr("disabled");
	$("#clearResponseGroup").removeAttr("disabled");
	if(mockVar.currentGrp == mockVar.MaxGrpEnabled){
		if(iOAP.secDetails[iOAP.curSection].isOptional == 'true' && !iOAP.secDetails[iOAP.curSection].isSelected){
			$("#savenext").attr("title",mockLabels.optSectTitle);
			$("#previousBtn").attr("title",mockLabels.optSectTitle);
			$("#underreview").attr("title",mockLabels.optSectTitle);
			$("#clearResponse").attr("title",mockLabels.optSectTitle);
			$("#clearResponseGroup").attr("title",mockLabels.optSectTitle);
			$("#savenextGroup").attr("title",mockLabels.optSectTitle);
			$("#compileCodeBtn").attr("disabled","disabled");
			$("#saveProgram").attr("disabled","disabled");
			$("#savenext").attr("disabled","disabled");
			$("#previousBtn").attr("disabled","disabled");
			$("#submitCodeBtn").attr("disabled","disabled");
			$("#underreview").attr("disabled","disabled");
			$("#clearResponse").attr("disabled","disabled");
			$("#clearResponseGroup").attr("disabled","disabled");
			$("#savenextGroup").attr("disabled","disabled");
		}
	}else if(mockVar.groups[mockVar.currentGrp].isEditable == "false"){
		$("#savenext").attr("title",mockLabels.grpEditNotAllowedTitle);
		$("#previousBtn").attr("title",mockLabels.grpEditNotAllowedTitle);
		$("#underreview").attr("title",mockLabels.grpEditNotAllowedTitle);
		$("#clearResponse").attr("title",mockLabels.grpEditNotAllowedTitle);
		$("#clearResponseGroup").attr("title",mockLabels.grpEditNotAllowedTitle);
		$("#savenextGroup").attr("title",mockLabels.grpEditNotAllowedTitle);
		$("#compileCodeBtn").attr("disabled","disabled");
		$("#saveProgram").attr("disabled","disabled");
		$("#savenext").attr("disabled","disabled");
		$("#previousBtn").attr("disabled","disabled");
		$("#submitCodeBtn").attr("disabled","disabled");
		$("#underreview").attr("disabled","disabled");
		$("#clearResponse").attr("disabled","disabled");
		$('#answer').attr('disabled','disabled');
		$("#clearResponseGroup").attr("disabled","disabled");
		$("#savenextGroup").attr("disabled","disabled");
	}
	if($("#savenext").attr('disabled') || $("#submitCodeBtn").attr('disabled') || $("#previousBtn").attr('disabled') || $("#savenextGroup").attr('disabled')){
		$("#savenext").removeClass('btnEnabled').addClass('btnDisabled');
		$("#savenextGroup").removeClass('btnEnabled').addClass('btnDisabled');
		$("#previousBtn").removeClass('btnEnabled').addClass('btnDisabled');
		$("#submitCodeBtn").removeClass('btnEnabled').addClass('btnDisabled');
	}else{
		$("#savenext").removeClass('btnDisabled').addClass('btnEnabled');
		$("#savenextGroup").removeClass('btnDisabled').addClass('btnEnabled');
		$("#submitCodeBtn").removeClass('btnDisabled').addClass('btnEnabled');
		$("#previousBtn").removeClass('btnDisabled').addClass('btnEnabled');
	}
}

function secChangeConfirmation(){
	var langId=0, str= "";
	/*for(var k=1;k<mockVar.languages.length;k++){
		if(mockVar.languages[k]!=null && typeof(mockVar.languages[k])!='undefined'){
			langId=k;
			break;
		}
	}*/
	str +="<center><p style='margin-top:5em;width:75%;text-align:left'><font color='red'>"+mockLabels.optSectResetMsg;
	str += "</p><center><b>"+mockLabels.optSectSummary+"</b></center>";
	str += "<table class='score_card_table' cellspacing=0 width='60%' align='center' >";
	str += "<thead><tr><th>"+mockLabels.optSectName+"</th><th>"+mockLabels.noOfQues+"</th><th>"+mockLabels.answered+"</th><th>"+mockLabels.notAnswered+"</th><th>"+mockLabels.markReview+"</th><th>"+mockLabels.notAttempted+"</th><th>"+mockLabels.reset+"</th></tr></thead>";
	for(var i=0;i<iOAP.secDetails.length;i++){
		if(iOAP.secDetails[i].isOptional=='true'){
			if(iOAP.secDetails[i].isSelected){
				str += "<tbody><tr><td>"+iOAP.secDetails[i].secName+"</td><td>"+(iOAP.secDetails[i].questions.length)+"</td><td>"+iOAP.secDetails[i].answered+"</td><td>"+iOAP.secDetails[i].notanswered+"</td><td>"+(iOAP.secDetails[i].marked + iOAP.secDetails[i].markedAndAnswered) +"</td><td>"+(iOAP.secDetails[i].questions.length-iOAP.secDetails[i].answered-iOAP.secDetails[i].notanswered-iOAP.secDetails[i].marked-iOAP.secDetails[i].markedAndAnswered)+"</td><td><input type='checkbox' ";
				str += " value="+i+" name='confSec'/></td></tr></tbody>";
			}
		}
	}
	str += "</table></center>";
	str +="<center><div align='center' style='margin-top:1em' ><span id='errorMsg'>&nbsp;</span></div>";
	str +='<div><span style="text-align:right;padding-right:2px"><input onclick="confirmChangeSec()" style="margin-right:20px" type="button" class="btn btn-primary btn-primary-blue" title="'+mockLabels.reset+'" value="'+mockLabels.reset+'"/></span><span  style="text-align:left;padding-left:2px;"><input onclick="showModule(';
	str +="'questionCont'";
	str +=')" type="button" class="btn btn-primary btn-primary-blue" style="margin-left:20px" title="'+mockLabels.back+'" value="'+mockLabels.back+'"/></span></div></center>';
	$("#sectionSummaryDiv").html(str);
	showModule('sectionSummaryDiv');
}

function finalSecChangeConf(secIds){
	if($.trim(secIds) != ""){
		var sections = secIds.split(",");
		for(var i = 0;i<sections.length-1;i++){
				resetSection(sections[i]);
		}
	}
	afterResetSection();
}

function confirmChangeSec(){
	var allCheckedSections = document.getElementsByName("confSec");
	var secIds = "";
	for(var i = 0;i<allCheckedSections.length;i++){
		if(allCheckedSections[i].checked)
			secIds += allCheckedSections[i].value+",";
	}
	var sections = secIds.split(',');
	var AuditJsonObject = new Object();
	AuditJsonObject.ActionName = "Section Reset";
	AuditJsonObject.ActionDesc = "Section Reset button clicked";
	AuditJsonObject.GroupId = mockVar.groups[currentGroupIndex].groupId;
	var secId = "";
	if(sections.length>1){
		for(var i =0 ; i<sections.length-1 ; i++){
			if(i !=0)
				secId = secId + ",";
			secId = secId+mockVar.groups[currentGroupIndex].secDetails[currentSectionIndex].secId;
			AuditJsonObject.SectionId = secId;
		}
	} else {
		AuditJsonObject.SectionId = "NA";
	}
	
	
	AuditJsonObject.QuestionId = "NA";
	AuditJsonObject.SelectedOptionId = "NA";
	AuditJsonObject.OptionSequence = "NA";
	var currentDate = new Date();
	AuditJsonObject.Time = currentDate.yyyymmddHHmmss();
	AuditJson.push(AuditJsonObject);
	if(sections.length>1){
		var str = "", innerHtml = "";
		str = "<center><table cellspacing=0 width='60%' align='center' style='margin-top:5em'>";
		str += "<tr><td colspan=2 style='text-align:center'>"+mockLabels.resetSect;
		for(var i =0 ; i<sections.length-1 ; i++){
			// ////console.log(sections[i]);
			if(i>0)
				innerHtml += " , ";
			innerHtml += iOAP.secDetails[sections[i]].secName;
		}
		str  = str.substring(0,str.length-2);
		str += "</td></tr><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2>&nbsp;</td></tr>";
		str +='<tr><td style="text-align:right;padding-right:2px"><input onclick="finalSecChangeConf(';
		str += "'"+secIds+"'";
		str += ')" type="button" style="margin-right:20px" class="btn btn-primary btn-primary-blue" title="'+mockLabels.reset+'" value="'+mockLabels.reset+'"/></td><td  style="text-align:left;padding-left:2px"><input onclick="showModule(';
		str +="'questionCont'";
		str +=')" type="button" style="margin-left:20px" class="btn btn-primary btn-primary-blue" title="'+mockLabels.back+'" value="'+mockLabels.back+'"/></td></tr></table></center>';
		$("#sectionSummaryDiv").html(str);
		$('#resetSections').html(innerHtml);
	}else{
		$('#errorMsg').html('<center><font style="color:red;font-weight:bold">'+mockLabels.selSectToReset+'</font></center>');
	}
}

function changeSection (sectionID){
	saveQuestionAutomatically();
	if(sectionID!=iOAP.curSection){
		iOAP.secDetails[iOAP.curSection].curQues = iOAP.curQues;
		iOAP.curQues = iOAP.secDetails[sectionID].curQues;
		iOAP.curSection = sectionID;
	}
	enableOptButtons();
	var quesLangId = iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues].quesParam.langID==""?mockVar.defaultLang:iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues].quesParam.langID;
	getQuestion(quesLangId);
	changeQues(iOAP.curQues);
	numPanelSec();
	fillNumberPanel();
}

function fillNumberPanel(){
	var quesStatus;
	if(iOAP.secDetails[iOAP.curSection].groupAllQuestions == "false" || iOAP.secDetails[iOAP.curSection].groupAllQuestions == "" || typeof(iOAP.secDetails[iOAP.curSection].groupAllQuestions) == "undefined"){
	
	$('#underreview').val(mockLabels.markForReviewNext);
	}else{
		$('#underreview').hide();
		$('#underreview').val(mockLabels.markForReviewNext);
	}
	var str = '<center><div style="margin-top:-2%;" cellspacing="0" class="question_area " cellpadding="0" border="0" valign="top"><div>';
	for(var i=0;i<iOAP.secDetails[iOAP.curSection].questions.length;i++){
		if((i+1)%4==1){
			str+='</div>';
			str+='<div>';
		}
		quesStatus = iOAP.secDetails[iOAP.curSection].questions[i].quesParam.status ;
		quesAnswer = iOAP.secDetails[iOAP.curSection].questions[i].quesParam.answer ;
		if(quesStatus=="answered"){
			str+='<div id="qtd'+i+'"><span title ="'+mockLabels.answered+'" class="answered auditlog" id="'+i+'" onclick="javascript:changeQues('+i+');"> '+(i+1)+'</span></div>';
		}else if(quesStatus=="notanswered"){
			str+='<div id="qtd'+i+'"><span title ="'+mockLabels.notAnswered+'" class="not_answered auditlog" id="'+i+'" onclick="javascript:changeQues('+i+');"> '+(i+1)+'</span></div>';
		}else if(quesStatus=="marked"){
			
				str+='<div id="qtd'+i+'"><span title ="'+mockLabels.markNotAnsTitle+'" class="review auditlog" id="'+i+'" onclick="javascript:changeQues('+i+');"> '+(i+1)+'</span></div>';
			}else if(quesStatus=="markedAndAnswered"){
				str+='<div id="qtd'+i+'"><span title ="'+mockLabels.markAnsTitle+'" class="review_marked auditlog" id="'+i+'" onclick="javascript:changeQues('+i+');"> '+(i+1)+'</span></div>';
			}			
		
		else{
			str+='<div id="qtd'+i+'"><span title ="'+mockLabels.notAttempted+'" class="not_visited auditlog" id="'+i+'" onclick="javascript:changeQues('+i+');"> '+(i+1)+'</span></div>';
		}
	}
	str+='</div></div></center>';
	$('#numberpanelQues').html(str);
	//var ques = iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID][iOAP.curQues]
	if(iOAP.secDetails.length == 1 && iOAP.secDetails[iOAP.curSection].questions.length == 1){
		$('#underreview').val(mockLabels.markForReview);
		if(mockVar.curQuesBean.quesType != 'SUBJECTIVE'){
			$('#savenext').val(mockLabels.save);
		}
	}
	if(mockVar.curQuesBean.quesType=='PROGRAMMING TEST'){
		$('#underreview').hide();
		$('#saveProgram').val(mockLabels.nextQ);
	}
	if(iOAP.curSection == 0 && iOAP.curQues == 0){
		$('#previousBtn').hide();
		}else{
		$('#previousBtn').show();
		}
	$('.ruler-div').hide();
	$('#loadCalc').hide();
	$('.protactor-div').hide();
	$('.scratch-pad-container').hide();
	$('.textarea-div').hide();
	if(mockVar.storeCandResponse == 0){
	jQuery(".Ans_Area").addClass(zoomIconClass);
	if(jQuery(".Ans_Area").hasClass("ZeroLevelZoom"))
				{
					jQuery(".leftDiv").css("font-size","1.2em");
					jQuery(".rightDiv").css("font-size","1.2em");
					setTimeout(function(){
					$(".leftDiv img").each(function(){
						$(this).css("width",$(this).width());
					});
					$(".rightDiv img").each(function(){
						$(this).css("width",$(this).width());
					});
					$(".progImg").css("width",20);
					},500);
					//jQuery(".leftDiv img").css("width",$(".leftDiv img").width());
					//jQuery(".rightDiv img").css("width",$(".rightDiv img").width());
					if(typeof(iOAP.secDetails[iOAP.curSection].groupAllQuestions) != "undefined" && iOAP.secDetails[iOAP.curSection].groupAllQuestions != "" && iOAP.secDetails[iOAP.curSection].groupAllQuestions == "true"  ){
					//jQuery(".zoomout-icon-container").show();
						jQuery("#quesOuterDiv").css("font-size","1.2em");
						$("#quesOuterDiv img").each(function(){
						$(this).css("width",$(this).width());
					});
					//	jQuery("#quesOuterDiv").css("width",$("#quesOuterDiv img").width());
					}
				}
				else if(jQuery(".Ans_Area").hasClass("FirstLevelZoom"))
				{
					jQuery(".leftDiv").css("font-size","1.4em");
					jQuery(".rightDiv").css("font-size","1.4em");
					//jQuery(".leftDiv img").css("width",$(".leftDiv img").width() +10);
					//jQuery(".rightDiv img").css("width",$(".rightDiv img").width() +10);
					setTimeout(function(){
					$(".leftDiv img").each(function(){
						$(this).css("width",$(this).width() + 10);
					});
					$(".rightDiv img").each(function(){
						$(this).css("width",$(this).width() + 10);
					});
					$(".progImg").css("width",20);
					},500);
					
					if(typeof(iOAP.secDetails[iOAP.curSection].groupAllQuestions) != "undefined" && iOAP.secDetails[iOAP.curSection].groupAllQuestions != "" && iOAP.secDetails[iOAP.curSection].groupAllQuestions == "true"  ){
					//jQuery(".zoomout-icon-container").show();
						jQuery("#quesOuterDiv").css("font-size","1.4em");
						$("#quesOuterDiv img").each(function(){
						$(this).css("width",$(this).width() + 10);
					});
					//	jQuery("#quesOuterDiv").css("width",$("#quesOuterDiv img").width() + 10);
					}
				}
					else if(jQuery(".Ans_Area").hasClass("SecondLevelZoom"))
				{
					jQuery(".leftDiv").css("font-size","1.5em");
					jQuery(".rightDiv").css("font-size","1.5em");
					//jQuery(".leftDiv img").css("width",$(".leftDiv img").width() +20);
					//jQuery(".rightDiv img").css("width",$(".rightDiv img").width() +20);
					setTimeout(function(){
					$(".leftDiv img").each(function(){
						$(this).css("width",$(this).width() + 20);
					});
					$(".rightDiv img").each(function(){
						$(this).css("width",$(this).width() + 20);
					});
					$(".progImg").css("width",20);
					},500);
					
					if(typeof(iOAP.secDetails[iOAP.curSection].groupAllQuestions) != "undefined" && iOAP.secDetails[iOAP.curSection].groupAllQuestions != "" && iOAP.secDetails[iOAP.curSection].groupAllQuestions == "true"  ){
					//jQuery(".zoomout-icon-container").show();
						jQuery("#quesOuterDiv").css("font-size","1.5em");
						$("#quesOuterDiv img").each(function(){
						$(this).css("width",$(this).width() + 20);
					});
					//	jQuery("#quesOuterDiv").css("width",$("#quesOuterDiv img").width() + 20);
					}
				}
					else if(jQuery(".Ans_Area").hasClass("ThirdLevelZoom"))
				{
					jQuery(".leftDiv").css("font-size","1.6em");
					jQuery(".rightDiv").css("font-size","1.6em");
					//jQuery(".leftDiv img").css("width",$(".leftDiv img").width() +30);
					//jQuery(".rightDiv img").css("width",$(".rightDiv img").width() +30);
					setTimeout(function(){
					$(".leftDiv img").each(function(){
						$(this).css("width",$(this).width() + 30);
					});
					$(".rightDiv img").each(function(){
						$(this).css("width",$(this).width() + 30);
					});
					$(".progImg").css("width",20);
					},500);
					
					if(typeof(iOAP.secDetails[iOAP.curSection].groupAllQuestions) != "undefined" && iOAP.secDetails[iOAP.curSection].groupAllQuestions != "" && iOAP.secDetails[iOAP.curSection].groupAllQuestions == "true"  ){
					//jQuery(".zoomout-icon-container").show();
						jQuery("#quesOuterDiv").css("font-size","1.6em");
						$("#quesOuterDiv img").each(function(){
						$(this).css("width",$(this).width() + 30);
					});
					//	jQuery("#quesOuterDiv").css("width",$("#quesOuterDiv img").width() + 30);
					}
				}
				}
	scrollIntoView(document.getElementById(iOAP.curQues),document.querySelectorAll('.nano-content')); 
	quizPageHeight();
}

function changeQues(quesNo){
getCurrentGrpSecQuestId(true,quesNo);
	saveQuestionAutomatically();
	removeActiveLinks();
	iOAP.curQues = quesNo;
	showModule("questionCont");
	var quesLangId = iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues].quesParam.langID==""?mockVar.defaultLang:iOAP.secDetails[iOAP.curSection].questions[iOAP.curQues].quesParam.langID;
	getQuestion(quesLangId);
	if($('#typedAnswer')){
		//$('#typedAnswer').attr('disabled',true);
		$('#finalTypingSub').attr('disabled',true);
		$('#finalTypingSub').removeClass().addClass('typingTestButtonDisabled btn btn-primary-blue');
	}
	doCalculations(0,0);
	fillNumberPanel();
}

function showModule(moduleName){
	for(var i=0;i<mockVar.modules.length;i++){
		if(mockVar.modules[i]==moduleName){
			$("#"+mockVar.modules[i]).show();
		}else{
			$("#"+mockVar.modules[i]).hide();
		}
		if(moduleName=='profileDiv'||moduleName=='instructionsDiv'||moduleName=='QPDiv'||moduleName=='sectionSummary'){
			$('#questionCont').show();
		}
		if(moduleName=='questionCont')
		{
				$('.helpinstruction_div').show();
		$('.nav-container').show();
		$('.section-timepanel').show();
		$('.subject-selection').show();
		$('.viewProfile').show();
		$('.subject-section-rightarrow').show();
		if(iOAP.secDetails[iOAP.curSection].displayNumberPanel == "true" || iOAP.secDetails[iOAP.curSection].displayNumberPanel == "" || typeof(iOAP.secDetails[iOAP.curSection].displayNumberPanel) == "undefined"){
			$('.collapsebel_panel').show();
		}else{
			$('.collapsebel_panel').hide();
		}
		quizPageHeight();
		}
	}
	focusOnDiv();
}

function numPanelSec(){
	var str="";
	if(iOAP.secDetails[iOAP.curSection].secName.length>27)
		str += iOAP.secDetails[iOAP.curSection].secName.substring(0,27)+"...";
		else
		str += iOAP.secDetails[iOAP.curSection].secName;
	$('.viewSection b').html(str);
	$('.viewSection b').attr('title',iOAP.secDetails[iOAP.curSection].secName);
}

function resetOption(){
	mockVar.curQuesBean.quesParam.answer = '';
	mockVar.curQuesBean.quesParam.selectedOptId = '';
	if(mockVar.curQuesBean.quesType =="SA" || mockVar.curQuesBean.quesType =="COMPREHENSION@@SA" || mockVar.curQuesBean.quesType =="LA@@SA" ){
		$('#answer').val('');
		$("#noOfWords").text('');
	}else{
		var answers = document.getElementsByName('answers');
		for(var i=0;i<answers.length;i++)
		{
			if(answers[i].checked==true)
				answers[i].checked=false;
		}
	}
	fnSubmit('RESET');
}
function resetOptionGroup(){
	for(var i=0;i<mockVar.curSectionQuestions.length;i++){
	mockVar.curSectionQuestions[i].quesParam.answer = '';
	mockVar.curSectionQuestions[i].quesParam.selectedOptId = '';
	if(mockVar.curSectionQuestions[i].quesType =="SA" || mockVar.curSectionQuestions[i].quesType =="COMPREHENSION@@SA" || mockVar.curSectionQuestions[i].quesType =="LA@@SA" ){
		$('#answer'+mockVar.curSectionQuestions[i].quesId).val('');
		$("#noOfWords"+mockVar.curSectionQuestions[i].quesId).text('');
	}else{
		var answers = document.getElementsByName('answers'+mockVar.curSectionQuestions[i].quesId);
		for(var j=0;j<answers.length;j++)
		{
			if(answers[j].checked==true)
				answers[j].checked=false;
		}
	}
	}
	fnsubmitGroupQuestion('RESET');
}
function resetProgramming(){
	var programmingSkeletalCode=mockVar.curQuesBean.programmingSkeletalCode;
	mockVar.curQuesBean.quesParam.answer=programmingSkeletalCode;
	mockVar.curQuesBean.quesParam.status = 'notanswered';
	editor.setValue(mockVar.curQuesBean.quesParam.answer);
	$('#textareaforflip').val(mockVar.curQuesBean.quesParam.answer);
}

function saveQuestionAutomatically(){
	if(iOAP.secDetails[iOAP.curSection].groupAllQuestions == "true" ){
		for(var i=0;i<mockVar.curSectionQuestions.length;i++){
		if((mockVar.curSectionQuestions[i].quesType =="SA" || mockVar.curSectionQuestions[i].quesType =="COMPREHENSION@@SA" || mockVar.curSectionQuestions[i].quesType =="LA@@SA") && mockVar.curSectionQuestions[i].keyboardType == 'Alphanumeric'){
		fnsubmitGroupQuestion('saveSA');
		}
		}
	}else{
		if((mockVar.curQuesBean.quesType =="SA" || mockVar.curQuesBean.quesType =="COMPREHENSION@@SA" || mockVar.curQuesBean.quesType =="LA@@SA") && mockVar.curQuesBean.keyboardType == 'Alphanumeric'){
		
		if(mockVar.curQuesBean.comprehensionId != 0 || mockVar.curQuesBean.laqId != 0){
	var compreLaqCount= 0;
	var compreLaqID = 0;
		
			//	alert(compreLaqID);
		if(typeof(mockVar.compreLaqQues[compreLaqID])!= "undefined"){
		/*for(var j=0;j<mockVar.curSectionQuestions.length;j++){
				if(mockVar.curQuesBean.comprehensionId!=0){
				if(mockVar.curQuesBean.comprehensionId == mockVar.curSectionQuestions[j].comprehensionId){
							compreLaqCount++;
					}
				}else if(mockVar.curQuesBean.laqId!=0){
					if(mockVar.curQuesBean.laqId == mockVar.curSectionQuestions[j].laqId){
							compreLaqCount++;
					}
				}
		}*/
		for(var k=0;k<mockVar.compreLaqQues.length;k++){
				if(mockVar.curQuesBean.comprehensionId == mockVar.compreLaqQues[k].quesId){
								compreLaqID = k;
								break;
				}else if(mockVar.curQuesBean.laqId == mockVar.compreLaqQues[k].quesId){
								compreLaqID = k;
								break;
						}
				}
			
			if( typeof(mockVar.compreLaqQues[compreLaqID].groupComprehensionLaqQuestions) != "undefined" && mockVar.compreLaqQues[compreLaqID].groupComprehensionLaqQuestions != "" && ((mockVar.compreLaqQues[compreLaqID].groupComprehensionLaqQuestions == "true") && (mockVar.compreLaqQues[compreLaqID].quesId == mockVar.curQuesBean.laqId  || mockVar.compreLaqQues[compreLaqID].quesId == mockVar.curQuesBean.comprehensionId)) ){
				//fnsubmitGroupQuestion('saveSA');
			
			}
		//fnSubmit('saveSA');
	else{
	
		fnSubmit('saveSA');
	}
	}
	}else{
		fnSubmit('saveSA');
	
	}
	}else if(mockVar.curQuesBean.quesType =="PROGRAMMING TEST"){
		fnSubmit('savePrograming');
	}
	
	}
}

function submitConfirmation(param){var ques = mockVar.curQuesBean;
var noOfAns=0,noOfNtAns=0,noOfReview=0,noOfNtAttemp=0,totalQues=0;
var wrongCharCount = 0, ellapsedTime = 0;
var str= "", timeOutStr = "", typingStr = "";
saveQuestionAutomatically();
str = "<div class='examSummaryHeader titlepath' style='background:none'><span class='header'>"+mockLabels.examSummary+"</span></div>";
if(param == "break"){
	str += "<div id='break_summary' style='overflow:auto;text-align:center;padding:20px;'>";
}else if(param=='submit'){
	str += "<div id='group_summary' style='overflow:auto;text-align:center;padding:20px;border-bottom:1px solid #c3c3c1'>";
} else if(param=='timeout'){
	timeOutStr = "<div class='examSummaryHeader titlepath'><span class='header'>"+mockLabels.examSummary+"</span></div>";
	timeOutStr += "<div id='group_summary' style='overflow:auto;text-align:center;padding:20px;border-bottom:1px solid #c3c3c1'>";
}
if(mockVar.groups.length==1){
	timeOutStr += "<table class='score_card_table' cellspacing=0 width='80%' align='center' style='margin-top:5%'>";
	if(iOAP.secDetails[0].secType.toUpperCase().indexOf("TYPING")!=-1){
		timeOutStr += "<thead><tr><th>"+mockLabels.secName+"</th><th>"+mockLabels.keyStrokesCount+"</th><th>"+mockLabels.elapsedTime+"</th></tr><thead>";
	}else{
		timeOutStr += "<thead><tr><th>"+mockLabels.secName+"</th><th>"+mockLabels.noOfQues+"</th><th>"+mockLabels.answered+"</th><th>"+mockLabels.notAnswered+"</th><th>"+mockLabels.markReview+"</th><th>"+mockLabels.notAttempted+"</th></tr><thead>";
	}
	for(var i=0;i<iOAP.secDetails.length;i++){
		if(iOAP.secDetails[i].secType.toUpperCase().indexOf("TYPING")!=-1){
			wrongCharCount = (ques.typingType.toLowerCase()==='restricted')?0:getWrongCharCount();
			ellapsedTime = mockVar.typingGroup[0].ellapsedTime;
			timeOutStr += "<tbody><tr><td width='25%'>"+iOAP.secDetails[i].secName+"</td><td width='25%'>"+mockVar.typingGroup[mockVar.currentGrp].keyStrokesCount+"</td><td width='25%'>"+(ellapsedTime/60).toFixed(2)+"</td></tr><tbody>";
			mockVar.typingGroup[0].wrongCharCount = wrongCharCount;
		}else{
			if(iOAP.secDetails[i].isOptional=='false'){
				timeOutStr += "<tbody><tr><td width='25%'>"+iOAP.secDetails[i].secName+"</td><td width='15%'>"+(iOAP.secDetails[i].questions.length)+"</td><td width='15%'>"+iOAP.secDetails[i].answered+"</td><td width='15%'>"+iOAP.secDetails[i].notanswered+"</td><td width='15%'>"+(iOAP.secDetails[i].marked + iOAP.secDetails[i].markedAndAnswered)+"</td><td width='15%'>"+(iOAP.secDetails[i].questions.length-iOAP.secDetails[i].answered-iOAP.secDetails[i].notanswered-iOAP.secDetails[i].marked - iOAP.secDetails[i].markedAndAnswered )+"</td></tr><tbody>";
				noOfAns = noOfAns + iOAP.secDetails[i].answered;
				noOfNtAns = noOfNtAns + iOAP.secDetails[i].notanswered;
				noOfReview = noOfReview + iOAP.secDetails[i].marked + iOAP.secDetails[i].markedAndAnswered;
				totalQues = totalQues + iOAP.secDetails[i].questions.length;
				noOfNtAttemp = noOfNtAttemp + iOAP.secDetails[i].questions.length-iOAP.secDetails[i].answered-iOAP.secDetails[i].notanswered-iOAP.secDetails[i].marked - iOAP.secDetails[i].markedAndAnswered;
			}else if(iOAP.secDetails[i].isOptional=='true' && iOAP.secDetails[i].isSelected){
				noOfAns = noOfAns + iOAP.secDetails[i].answered;
				noOfNtAns = noOfNtAns + iOAP.secDetails[i].notanswered;
				noOfReview = noOfReview + iOAP.secDetails[i].marked + iOAP.secDetails[i].markedAndAnswered;
				totalQues = totalQues + iOAP.secDetails[i].questions.length;
				noOfNtAttemp = noOfNtAttemp + iOAP.secDetails[i].questions.length-iOAP.secDetails[i].answered-iOAP.secDetails[i].notanswered-iOAP.secDetails[i].marked - iOAP.secDetails[i].markedAndAnswered;
				timeOutStr += "<thead><tr><td>"+iOAP.secDetails[i].secName+"</td><td>"+(iOAP.secDetails[i].questions.length)+"</td><td>"+iOAP.secDetails[i].answered+"</td><td>"+iOAP.secDetails[i].notanswered+"</td><td>"+(iOAP.secDetails[i].marked + iOAP.secDetails[i].markedAndAnswered)+"</td><td>"+(iOAP.secDetails[i].questions.length-iOAP.secDetails[i].answered-iOAP.secDetails[i].notanswered-iOAP.secDetails[i].marked - iOAP.secDetails[i].markedAndAnswered)+"</td></tr><thead>";
			}
		}
	}
	/*if(iOAP.secDetails.length>0){
		timeOutStr +="<tbody><tr><td><b>Total</b></td><td><b>"+totalQues+"</b></td><td><b>"+noOfAns+"</b></td><td><b>"+noOfNtAns+"</b></td><td><b>"+noOfReview+"</b></td><td><b>"+noOfNtAttemp+"</b></td></tr><tbody>";
	}*/
	timeOutStr += "</table></div>";
}else{
	str += "<div style='text-align:left'><b>"+mockVar.groups[mockVar.currentGrp].groupName+"</b>"+mockLabels.curGrp+"</div>";
	str += "<table class='score_card_table' cellspacing=0 width='80%' align='center'>";
	if(iOAP.secDetails[0].secType.toUpperCase().indexOf("TYPING")!=-1){
		str += "<thead><tr><th>"+mockLabels.secName+"</th><th>"+mockLabels.keyStrokesCount+"</th><th>"+mockLabels.elapsedTime+"</th></tr><thead>";
	}else{
		str += "<thead><tr><th>"+mockLabels.secName+"</th><th>"+mockLabels.noOfQues+"</th><th>"+mockLabels.answered+"</th><th>"+mockLabels.notAnswered+"</th><th>"+mockLabels.markReview+"</th><th>"+mockLabels.notAttempted+"</th></tr><thead>";
	}
	for(var i=0;i<iOAP.secDetails.length;i++){
		if(iOAP.secDetails[i].secType.toUpperCase().indexOf("TYPING")!=-1){
			wrongCharCount = (ques.typingType.toLowerCase()==='restricted')?0:getWrongCharCount();
			ellapsedTime = mockVar.typingGroup[mockVar.currentGrp].ellapsedTime;
			str += "<tbody><tr><td width='25%'>"+iOAP.secDetails[i].secName+"</td><td width='25%'>"+mockVar.typingGroup[mockVar.currentGrp].keyStrokesCount+"</td><td width='25%'>"+(ellapsedTime/60).toFixed(2)+"</td></tr><tbody>";
			mockVar.typingGroup[mockVar.currentGrp].wrongCharCount = wrongCharCount;
		}else{
			if(iOAP.secDetails[i].isOptional=='false'){
				str += "<tbody><tr><td width='25%'>"+iOAP.secDetails[i].secName+"</td><td width='15%'>"+(iOAP.secDetails[i].questions.length)+"</td><td width='15%'>"+iOAP.secDetails[i].answered+"</td><td width='15%'>"+iOAP.secDetails[i].notanswered+"</td><td width='15%'>"+(iOAP.secDetails[i].marked + iOAP.secDetails[i].markedAndAnswered)+"</td><td width='15%'>"+(iOAP.secDetails[i].questions.length-iOAP.secDetails[i].answered-iOAP.secDetails[i].notanswered-iOAP.secDetails[i].marked - iOAP.secDetails[i].markedAndAnswered)+"</td></tr><tbody>";
				noOfAns = noOfAns + iOAP.secDetails[i].answered;
				noOfNtAns = noOfNtAns + iOAP.secDetails[i].notanswered;
				noOfReview = noOfReview + iOAP.secDetails[i].marked + iOAP.secDetails[i].markedAndAnswered;
				totalQues = totalQues + iOAP.secDetails[i].questions.length;
				noOfNtAttemp = noOfNtAttemp + iOAP.secDetails[i].questions.length-iOAP.secDetails[i].answered-iOAP.secDetails[i].notanswered-iOAP.secDetails[i].marked - iOAP.secDetails[i].markedAndAnswered;
			}else if(iOAP.secDetails[i].isOptional=='true' && iOAP.secDetails[i].isSelected){
				noOfAns = noOfAns + iOAP.secDetails[i].answered;
				noOfNtAns = noOfNtAns + iOAP.secDetails[i].notanswered;
				noOfReview = noOfReview + iOAP.secDetails[i].marked + iOAP.secDetails[i].markedAndAnswered;
				totalQues = totalQues + iOAP.secDetails[i].questions.length;
				noOfNtAttemp = noOfNtAttemp + iOAP.secDetails[i].questions.length-iOAP.secDetails[i].answered-iOAP.secDetails[i].notanswered-iOAP.secDetails[i].marked - iOAP.secDetails[i].markedAndAnswered ;
				str += "<tbody><tr><td width='25%'>"+iOAP.secDetails[i].secName+"</td><td width='15%'>"+(iOAP.secDetails[i].questions.length)+"</td><td width='15%'>"+iOAP.secDetails[i].answered+"</td><td width='15%'>"+iOAP.secDetails[i].notanswered+"</td><td width='15%'>"+(iOAP.secDetails[i].marked + iOAP.secDetails[i].markedAndAnswered)+"</td><td width='15%'>"+(iOAP.secDetails[i].questions.length-iOAP.secDetails[i].answered-iOAP.secDetails[i].notanswered-iOAP.secDetails[i].marked - iOAP.secDetails[i].markedAndAnswered)+"</td></tr><tbody>";
			}
		}
	}
	str += "</table>";
	for(var j=0;j<mockVar.groups.length;j++){
		var temp_iOAP = mockVar.groups[j];
		if(mockVar.currentGrp >j || param == "timeout"){
			if(temp_iOAP.secDetails[0].secType.toUpperCase().indexOf("TYPING")!=-1){
				typingStr += "<br/><div style='text-align:left''><b>"+mockVar.groups[j].groupName+"</b> :</div>";
				typingStr += "<table class='score_card_table' cellspacing=0 width='80%' align='center'>";
				typingStr += "<thead><tr><th>"+mockLabels.secName+"</th><th>"+mockLabels.keyStrokesCount+"</th><th>"+mockLabels.elapsedTime+"</th></tr><thead>";
			}else{
				if(param == "timeout"){
					timeOutStr +=  "<br/><div style='text-align:left'><b>"+mockVar.groups[j].groupName+"</b> :</div>";
				}else{
					timeOutStr +=  "<br/><div style='text-align:left'><b>"+mockVar.groups[j].groupName+"</b> : ( "+mockLabels.attemptedGrp;
					if(mockVar.groups[j].isViewable=="true"){
						timeOutStr += mockLabels.canView;
					}else{
						timeOutStr += mockLabels.canNotView;
					}
					if(mockVar.groups[j].isEditable=="true"){
						timeOutStr += mockLabels.canEdit;
					}else{
						timeOutStr += mockLabels.canNotEdit;
					}
					timeOutStr += ")</div>";
				}
				timeOutStr += "<table class='score_card_table' cellspacing=0 width='80%' align='center'>";
				timeOutStr += "<thead><tr><th>"+mockLabels.secName+"</th><th>"+mockLabels.noOfQues+"</th><th>"+mockLabels.answered+"</th><th>"+mockLabels.notAnswered+"</th><th>"+mockLabels.markReview+"</th><th>"+mockLabels.notAttempted+"</th></tr><thead>";
			}
			for(var i=0;i<temp_iOAP.secDetails.length;i++){
				
				if(temp_iOAP.secDetails[i].secType.toUpperCase().indexOf("TYPING")!=-1){
					typingStr += "<tbody><tr><td width='25%'>"+temp_iOAP.secDetails[i].secName+"</td><td width='25%'>"+mockVar.typingGroup[j].keyStrokesCount+"</td><td width='25%'>"+(mockVar.typingGroup[j].ellapsedTime/60).toFixed(2)+"</td></tr><tbody>";
				}else{
					if(temp_iOAP.secDetails[i].isOptional=='false'){
						timeOutStr += "<tbody><tr><td width='25%'>"+temp_iOAP.secDetails[i].secName+"</td><td width='15%'>"+(temp_iOAP.secDetails[i].questions.length)+"</td><td width='15%'>"+temp_iOAP.secDetails[i].answered+"</td><td width='15%'>"+temp_iOAP.secDetails[i].notanswered+"</td><td width='15%'>"+(temp_iOAP.secDetails[i].marked + temp_iOAP.secDetails[i].markedAndAnswered)+"</td><td width='15%'>"+(temp_iOAP.secDetails[i].questions.length-temp_iOAP.secDetails[i].answered-temp_iOAP.secDetails[i].notanswered-temp_iOAP.secDetails[i].marked -temp_iOAP.secDetails[i].markedAndAnswered)+"</td></tr><tbody>";
						noOfAns = noOfAns + temp_iOAP.secDetails[i].answered;
						noOfNtAns = noOfNtAns + temp_iOAP.secDetails[i].notanswered;
						noOfReview = noOfReview + temp_iOAP.secDetails[i].marked + temp_iOAP.secDetails[i].markedAndAnswered;
						totalQues = totalQues + temp_iOAP.secDetails[i].questions.length;
						noOfNtAttemp = noOfNtAttemp + temp_iOAP.secDetails[i].questions.length-temp_iOAP.secDetails[i].answered-temp_iOAP.secDetails[i].notanswered-temp_iOAP.secDetails[i].marked - temp_iOAP.secDetails[i].markedAndAnswered;
					}else if(temp_iOAP.secDetails[i].isOptional=='true' && temp_iOAP.secDetails[i].isSelected){
						noOfAns = noOfAns + temp_iOAP.secDetails[i].answered;
						noOfNtAns = noOfNtAns + temp_iOAP.secDetails[i].notanswered;
						noOfReview = noOfReview + temp_iOAP.secDetails[i].marked + temp_iOAP.secDetails[i].markedAndAnswered;
						totalQues = totalQues + temp_iOAP.secDetails[i].questions.length;
						noOfNtAttemp = noOfNtAttemp + temp_iOAP.secDetails[i].questions.length-temp_iOAP.secDetails[i].answered-temp_iOAP.secDetails[i].notanswered-temp_iOAP.secDetails[i].marked - temp_iOAP.secDetails[i].markedAndAnswered;
						timeOutStr += "<tbody><tr><td width='25%'>"+temp_iOAP.secDetails[i].secName+"</td><td width='15%'>"+(temp_iOAP.secDetails[i].questions.length)+"</td><td width='15%'>"+temp_iOAP.secDetails[i].answered+"</td><td width='15%'>"+temp_iOAP.secDetails[i].notanswered+"</td><td width='15%'>"+(temp_iOAP.secDetails[i].marked + temp_iOAP.secDetails[i].markedAndAnswered)+"</td><td width='15%'>"+(temp_iOAP.secDetails[i].questions.length-temp_iOAP.secDetails[i].answered-temp_iOAP.secDetails[i].notanswered-temp_iOAP.secDetails[i].marked - temp_iOAP.secDetails[i].markedAndAnswered)+"</td></tr><tbody>";
					}
				}
			}
			typingStr += "</table>";
			timeOutStr += "</table>";
		}else if(mockVar.currentGrp<j){
			timeOutStr +=  "<br/><div style='text-align:left'><b>"+mockVar.groups[j].groupName+"</b>"+mockLabels.yetToAttempt+"</div>";
		}
	}
	/*
	 * if(iOAP.secDetails.length>2){ str +="<tr><td><b>Total</b></td><td><b>"+totalQues+"</b></td><td><b>"+noOfAns+"</b></td><td><b>"+noOfNtAns+"</b></td><td><b>"+noOfReview+"</b></td><td><b>"+noOfNtAttemp+"</b></td></tr>"; }
	 */
	timeOutStr += typingStr;
	timeOutStr += "</div>";
}
str += timeOutStr;
if(param == 'submit'){
	
	str +="<div id='confirmation_buttons' class='btnsection'><table align='center'><tr align='center'><td colspan='2' style='font-size:13px'>";
		str += mockLabels.submitGrp;
	str +=' </td></tr><tr><td style="text-align:right;width:50%"><input onclick="finalSubmit(';
	str += "'group'";
	str +=')" type="button" id="#yesbtn" class="btn btn-primary" style="margin-right:10px;"  value="'+mockLabels.yes+'"/></td><td  style="text-align:left;"><input onclick="showModule(';
	str +="'questionCont'";
	str +=');doCalculations(0,0);removeActiveLinks();" type="button" id="#nobtn" class="btn btn-primary"  value="'+mockLabels.no+'"/></td></tr></table><div>';
	$("#sectionSummaryDiv").html(str);
	$('.collapsebel_panel').hide();
	$('.expand_icon').hide();
	$('.helpinstruction_div').hide();
	$('.nav-container').hide();
	$('.section-timepanel').hide();
	$('.subject-selection').hide();
	$('.viewProfile').hide();
	$('.ruler-div').hide();
	$('#loadCalc').hide();
	$('.protactor-div').hide();
	$('.scratch-pad-container').hide();
	$('.textarea-div').hide();
	$('.subject-section-rightarrow').hide();
	$('#curGrpName').html(mockVar.groups[mockVar.currentGrp].groupName);
	showModule('sectionSummaryDiv');
	
}else if(param == 'timeout'){
	timeOutStr += "<div class='btnsection' align='center'>"
	timeOutStr +="<div  onclick='submitMock()' type='button' class='btn btn-primary nextbtn'><span><span id='timeoutSummaryNextBtnDiv '><strong>Next</span><img id='forwordImage' src='images/Forward-25.png' width='25' height='25' /></strong></span></div></div>";
	return timeOutStr;
}else if(param == 'break'){
//for(var j=0;j<mockVar.groups.length;j++)
	if(mockVar.groups[mockVar.currentGrp].mandatoryBreak == "true")
	{
		$('#brkPrcdBtnDiv').hide();
	}
	else
		$('#brkPrcdBtnDiv').show();
		$('#questionContent').show();
		$('#questionCont').hide();
		$("#sectionSummaryDiv").hide();
		$('.helpinstruction_div').hide();
		$('.nav-container').hide();
		$('.section-timepanel').hide();
		$('.subject-selection').hide();
		$('.viewProfile').hide();
		$('.collapsebel_panel').hide();
		$('.expand_icon').hide();
		$('.subject-section-rightarrow').hide();
		$("#breakSummaryDiv").html(str);
		$('#breakTimeDiv').show();
		$('#loadCalc').hide();
		$('.protactor-div').hide();
		$('.scratch-pad-container').hide();
		$('.textarea-div').hide();
		$('.subject-section-rightarrow').hide();
		tb_remove();
	
	$('#breakContentDiv').height($('#breakTimeDiv').height()-$('#brkPrcdBtnDiv').outerHeight(true)-$('#col1').outerHeight(true));
	$('#breakSummaryDiv').height($('#breakContentDiv').height()-$('#breakTimeCountDiv').outerHeight(true));
	$('#break_summary').height($('#breakSummaryDiv').height()-60-$('.examSummaryHeader').outerHeight(true));
}



$('#group_summary').height($('#sectionSummaryDiv').height()-$('#confirmation_buttons').outerHeight(true)-$('.examSummaryHeader').outerHeight(true)-80);
//$("#group_summary").css({"height":($(document).height()*.40)+"px"});

}

function submitMock(action){
	if(mockVar.storeCandResponse == 1){
		saveCandResponse(action);
	}else{
		mockScoreCalc();
		moveToScoreCardDisplay();
	}
}

function moveToScoreCardDisplay(){
	if(typeof(mockVar.displayScoreCard)!='undefined' && mockVar.displayScoreCard == 1){
		showScoreCard();
	}else{
		moveToFeedback();
	}
}

function moveToFeedback(){
	setCookie(mockVar.langName);
	if(mockVar.isFeedBackRequired == "NO"){
		window.location.href = "close.html?"+mockVar.orgId +"@@"+mockVar.mockId+"@@"+mockVar.subscribedFor+"#";
	}else{
		window.location.href = "FeedBack.html?"+mockVar.orgId +"@@"+mockVar.mockId+"@@"+mockVar.subscribedFor+"@@"+mockVar.candMasterId+"@@"+mockVar.attemptId+"#";
	}
}

function finalSubmit(type){
	var str ="<table style='margin-top:5%; text-align:center'><tr><td colspan='2' style='font-size:14px'>";
	if(mockVar.storeCandResponse==1){
	if(mockVar.groups.length<=(parseInt(mockVar.currentGrp)+1)){
			str += mockLabels.SubmitGroupFinal;
			
		str +='</td></tr><tr><td style="text-align:right;width:50%"><input onclick="this.disabled=true;';
		if(type=="submit"){
			str += 'fnSubmit(';
			str += "'SUBMIT'";
			str += ')"';
		}else{
			str +="checkGroupBreakTime();removeActiveLinks();";
		}
		str	+= '" type="button" id="#nobtn" class="btn btn-primary" style="margin-right:10px;width:13%;"  value="'+mockLabels.ok+'"/></td><td  style="text-align:left"><input onclick="showModule(';
		str +="'questionCont'";
		str +=');doCalculations(0,0);removeActiveLinks();" type="button" id="#nobtn" style="margin-left:10px;" class="btn btn-primary" value="'+mockLabels.cancel+'" /></td></tr></table>';
		$("#sectionSummaryDiv").html(str);
		$('#curGrpName').html(mockVar.groups[mockVar.currentGrp].groupName);
		}
		else{
				if(type=="submit"){
			fnSubmit('SUBMIT');
		}else{
			checkGroupBreakTime();removeActiveLinks();
		}
			
			}
	}
	else{
	
				
		
		
		
		
		
			if(mockVar.groups.length<=(parseInt(mockVar.currentGrp)+1)){
			str += "Thank you,your exam is about to be submitted.Click OK to proceed.<br>Are you sure of submitting the exam?";;
			
		str +='</td></tr><tr><td style="text-align:right;width:50%"><input onclick="this.disabled=true;';
		if(type=="submit"){
			str += 'fnSubmit(';
			str += "'SUBMIT'";
			str += ')"';
		}else{
			str +="checkGroupBreakTime();removeActiveLinks();";
		}
		str	+= '" type="button" id="#nobtn" class="btn btn-primary" style="margin-right:10px;width:13%;"  value="'+mockLabels.ok+'"/></td><td  style="text-align:left"><input onclick="showModule(';
		str +="'questionCont'";
		str +=');doCalculations(0,0);removeActiveLinks();" type="button" id="#nobtn" style="margin-left:10px;" class="btn btn-primary" value="'+mockLabels.cancel+'" /></td></tr></table>';
		$("#sectionSummaryDiv").html(str);
		$('#curGrpName').html(mockVar.groups[mockVar.currentGrp].groupName);
		}
		else{
				str += mockLabels.submitExam;
		str +='</td></tr><tr><td style="text-align:right;width:50%"><input onclick="';
		if(type=="submit"){
			str += 'fnSubmit(';
			str += "'SUBMIT'";
			str += ')"';
		}else{
			str +="checkGroupBreakTime();removeActiveLinks();";
		}
		str	+= '" type="button" id="#nobtn" class="btn btn-primary" style="margin-right:10px;"  value="'+mockLabels.yes+'"/></td><td  style="text-align:left"><input onclick="showModule(';
		str +="'questionCont'";
		str +=');doCalculations(0,0);removeActiveLinks();" type="button" id="#nobtn" style="margin-left:10px;" class="btn btn-primary" value="'+mockLabels.no+'" /></td></tr></table>';
		$("#sectionSummaryDiv").html(str);
		$('#curGrpName').html(mockVar.groups[mockVar.currentGrp].groupName);
		
			
			}
	}
		
}
function fnsubmitGroupQuestion(action){

	getCurrentGrpSecQuestId(false,0);
	var selectedAnswer="";
	var wordCountForSA = "";
	var proceed = true;
	var section = iOAP.secDetails[iOAP.curSection];
	var hasOptionalQuestion = section.hasOptionalQuestion;
	var quesToBeConsidered = 0;
	var selectedOptId = '';
	//var counter = 0;
	if(iOAP.secDetails[iOAP.curSection].groupAllQuestions == "true"){
		if(action != "SKIP"){ 
			for(var i=0;i<section.questions.length;i++){

				if(section.questions[i].quesType =="SA" || section.questions[i].quesType =="COMPREHENSION@@SA" || section.questions[i].quesType =="LA@@SA"){
					selectedAnswer = document.getElementById('answer'+section.questions[i].quesId).value;
					mockVar.curSectionQuestions[i].quesParam.answer = selectedAnswer;
					mockVar.curSectionQuestions[i].quesParam.langID = mockVar.curSectionQuestions[i].quesLangBeans[mockVar.langIndex].langId;

					//	selectedAnswer.push(new answerKeyBean(keyName,keyVal));
					wordCountForSA = $("#noOfWords"+section.questions[i].quesId).text();
					mockVar.curSectionQuestions[i].typedWord = $('#noOfWords'+section.questions[i].quesId).html();
				}
				else if(section.questions[i].quesType =="MCQ" || section.questions[i].quesType =="COMPREHENSION@@MCQ" || section.questions[i].quesType =="LA@@MCQ" || section.questions[i].quesType =="MSQ" || section.questions[i].quesType =="COMPREHENSION@@MSQ" || section.questions[i].quesType =="LA@@MSQ"){
					selectedAnswer = "";
					selectedOptId ="";
					var answers = document.getElementsByName('answers'+section.questions[i].quesId);
					//keyName =section.questions[i].quesId;
					for(var j=0;j<answers.length;j++)	
					{
						if(answers[j].checked==true)
						{
							selectedAnswer = ($(answers[j]).parent().next('span').text()) + "<ANS_SEP>" + selectedAnswer;
							selectedOptId = (answers[j].value) + "," + selectedOptId;
						}
					}
					if(selectedAnswer !="")
						selectedAnswer = selectedAnswer.substring(0,selectedAnswer.length-9);
					if(selectedOptId!='')
						selectedOptId = selectedOptId.substring(0,selectedOptId.length-1);
					mockVar.curSectionQuestions[i].quesParam.answer = selectedAnswer;
					mockVar.curSectionQuestions[i].quesParam.selectedOptId = selectedOptId;
					mockVar.curSectionQuestions[i].quesParam.langID = mockVar.curSectionQuestions[i].quesLangBeans[mockVar.langIndex].langId;
				}
				/*	if(selectedAnswer!=null && selectedAnswer!=""){
				counter++;
			}*/
			}


		}
	}else{
		var compreLaqID = '';
		var	compreQuesIndex = '';
		var	laqQuesIndex = '';
		//var laqQues ;
		var compreQues ;
		if(mockVar.curQuesBean.comprehensionId !=0){
			compreQuesIndex = mockVar.compreLaqQues.inArray(section.questions[iOAP.curQues].comprehensionId, 'quesId');
			compreQues = mockVar.compreLaqQues[compreQuesIndex].quesId;
			}
		else if(mockVar.curQuesBean.laqId !=0){
			laqQuesIndex = mockVar.compreLaqQues.inArray(section.questions[iOAP.curQues].laqId, 'quesId');
			compreQues = mockVar.compreLaqQues[laqQuesIndex].quesId;
			}
		
		for(var i=0;i<section.questions.length;i++){
			if(section.questions[i].comprehensionId==compreQues || section.questions[i].laqId==compreQues ){
				if(section.questions[i].quesType =="SA" || section.questions[i].quesType =="COMPREHENSION@@SA" || section.questions[i].quesType =="LA@@SA"){
					selectedAnswer = document.getElementById('answer'+section.questions[i].quesId).value;
					mockVar.curSectionQuestions[i].quesParam.answer = selectedAnswer;
					mockVar.curSectionQuestions[i].quesParam.langID = mockVar.curSectionQuestions[i].quesLangBeans[mockVar.langIndex].langId;
					wordCountForSA = $("#noOfWords"+section.questions[i].quesId).text();
					mockVar.curSectionQuestions[i].typedWord = $('#noOfWords'+section.questions[i].quesId).html();
				}else if(section.questions[i].quesType =="MCQ" || section.questions[i].quesType =="COMPREHENSION@@MCQ" || section.questions[i].quesType =="LA@@MCQ" || section.questions[i].quesType =="MSQ" || section.questions[i].quesType =="COMPREHENSION@@MSQ" || section.questions[i].quesType =="LA@@MSQ"){
					selectedAnswer = "";
					selectedOptId ="";
					var answers = document.getElementsByName('answers'+section.questions[i].quesId);
					for(var j=0;j<answers.length;j++)	
					{
						if(answers[j].checked==true)
						{
							selectedAnswer = ($(answers[j]).parent().next('span').text()) + "<ANS_SEP>" + selectedAnswer;
							selectedOptId = (answers[j].value) + "," + selectedOptId;
						}
					}
					if(selectedAnswer !="")
						selectedAnswer = selectedAnswer.substring(0,selectedAnswer.length-9);
					if(selectedOptId!='')
						selectedOptId = selectedOptId.substring(0,selectedOptId.length-1);
					mockVar.curSectionQuestions[i].quesParam.answer = selectedAnswer;
					mockVar.curSectionQuestions[i].quesParam.selectedOptId = selectedOptId;
					mockVar.curSectionQuestions[i].quesParam.langID = mockVar.curSectionQuestions[i].quesLangBeans[mockVar.langIndex].langId;
				}
			}	

		}


	}
	/*if(section.maxOptQuesToAns != ""){
		if(hasOptionalQuestion=='true' && counter > section.maxOptQuesToAns){
		proceed = false;
		alert("No of questions answered are more than maximum questions to be answered");
		}
	}*/
	if(section.maxOptQuesToAns != ""){
		//if(mockVar.isMarkedForReviewConsidered == "YES"){
			var counter = 0;
			for(var i=0;i<iOAP.secDetails[iOAP.curSection].questions.length;i++){
				var quesStatus = iOAP.secDetails[iOAP.curSection].questions[i].quesParam.status ;
				if(iOAP.secDetails[iOAP.curSection].questions[i].quesType!= "PROGRAMMING TEST"){
				if( !(iOAP.secDetails[iOAP.curSection].questions[i].quesParam.answer == null 
						||  iOAP.secDetails[iOAP.curSection].questions[i].quesParam.answer == '' )){
					counter++;
				}
				}
			}
			quesToBeConsidered += counter;
	//	}

		if(hasOptionalQuestion=='true' && quesToBeConsidered>section.maxOptQuesToAns ){
			proceed = false;
			cnfPop('InfoPopup');
			$("#infoMsg2").html("You have attempted "+quesToBeConsidered+" question, which is more than the  maximum limit ("+section.maxOptQuesToAns+") of this section.  Please reset the questions which are already answered");
			//alert();
		}
	}


	if(proceed){		

		if(action!='SUBMIT') {
			saveGroup(selectedAnswer, action,mockVar.curQuesBean.quesType);
		}
		else {
			submitMock("");
		}
	}

}
function fnSubmit(action){
	//var ques=iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID][iOAP.curQues];
	if(action == "MARK" || action == "NEXT"){
		if(jQuery(".subject-selection").find(".subject-name:visible:last").hasClass('selectedsubject') && jQuery(".subject-arrow-right").is(":visible")){
			navSection=true;
			jQuery(".subject-arrow-right").attr("class","subject-arrow-right-disabled");
			jQuery(".subject-arrow-left-disabled").attr("class","subject-arrow-left");
		}
		else if(jQuery(".subject-selection").find(".subject-name:visible:last").hasClass('selectedsubject') && jQuery(".subject-arrow-left").is(":visible")){
			navSection=false;
			jQuery(".subject-arrow-left").attr("class","subject-arrow-left-disabled");
		}
	}
	getCurrentGrpSecQuestId(false,0);
	var selectedAnswer="";
	var wordCountForSA = "";
	var proceed = true;
	var section = iOAP.secDetails[iOAP.curSection];
	var hasOptionalQuestion = section.hasOptionalQuestion;
	var quesToBeConsidered = parseInt(section.answered);
	var selectedOptId = '';
	if(action != "SKIP"){
		if(mockVar.curQuesBean.quesType =="SA" || mockVar.curQuesBean.quesType =="COMPREHENSION@@SA" || mockVar.curQuesBean.quesType =="LA@@SA"){
			selectedAnswer = document.getElementById('answer').value;
			wordCountForSA = $("#noOfWords").text();
		}else if(mockVar.curQuesBean.quesType =="TYPING TEST"){
			selectedAnswer = document.getElementById('typedAnswer').value;
		}else if(mockVar.curQuesBean.quesType =="PROGRAMMING TEST"){
		selectedAnswer2 = editor.getValue();
		selectedAnswer1 = document.getElementById('textareaforflip').value;
		if(selectedAnswer2.length>selectedAnswer1.length){
			if(selectedAnswer != mockVar.curQuesBean.programmingSkeletalCode ){
				mockVar.curQuesBean.programingStatus = 'saveProgram';
				selectedAnswer = editor.getValue();
			}}
			else{
			if(selectedAnswer1 != mockVar.curQuesBean.programmingSkeletalCode ){
				mockVar.curQuesBean.programingStatus = 'saveProgram';
				editor.setValue(selectedAnswer1);
				selectedAnswer=selectedAnswer1;
				
			}
		}}else if(mockVar.curQuesBean.quesType != "SUBJECTIVE"){
			var answers = document.getElementsByName('answers');
			for(var i=0;i<answers.length;i++)	
			{
				if(answers[i].checked==true)
				{
					selectedAnswer = ($(answers[i]).parent().next('span').text()) + "<ANS_SEP>" + selectedAnswer;
					selectedOptId = (answers[i].value) + "," + selectedOptId;
				}
			}
			if(selectedAnswer !="")
				selectedAnswer = selectedAnswer.substring(0,selectedAnswer.length-9);
			if(selectedOptId!='')
				selectedOptId = selectedOptId.substring(0,selectedOptId.length-1);
		}
	}
	if(section.maxOptQuesToAns != ""){
		if(mockVar.isMarkedForReviewConsidered == "YES"){
			var counter = 0;
			for(i=0;i<iOAP.secDetails[iOAP.curSection].length;i++){
				var quesStatus = iOAP.secDetails[iOAP.curSection].questions[i].status ;
				if(quesStatus=="marked" && !(iOAP.secDetails[iOAP.curSection].questions[i].quesParam.answer == null 
					||  iOAP.secDetails[iOAP.curSection].questions[i].quesParam.answer == '')){
					counter++;
				}
			}
			quesToBeConsidered += counter;
		}
		var curQuesStatus = mockVar.curQuesBean.quesParam.status;
		if(!(action=="SKIP" || action=="RESET" || action=="SUBMIT") &&
				!(curQuesStatus=="answered" || (curQuesStatus == "marked" && 
					mockVar.curQuesBean.quesParam.answer!=""))){
			if(hasOptionalQuestion=='true' && quesToBeConsidered==section.maxOptQuesToAns && selectedAnswer!="" ){
			if(mockVar.curQuesBean.quesType != "PROGRAMMING TEST")
				proceed = false;
				else{
					if(mockVar.curQuesBean.quesParam.status == "answered")
					proceed = false;
				}
				
			}
		}
	}
	if(proceed){		
		mockVar.curQuesBean.quesParam.answer = selectedAnswer;
		mockVar.curQuesBean.quesParam.selectedOptId = selectedOptId;
		mockVar.curQuesBean.quesParam.langID = mockVar.curQuesBean.quesLangBeans[mockVar.langIndex].langId;
		mockVar.curQuesBean.typedWord = $('#noOfWords').html();
		if(action!='SUBMIT') {
			save(selectedAnswer, action,mockVar.curQuesBean.quesType);
		}
		else {
			submitMock("");
		}
	}

}

function fillMaxOptQuesCrossed(quesToBeConsidered,totalQuestions){
	var str= "",alertMsg = "";
	if(mockVar.isMarkedForReviewConsidered == "YES"){
		alertMsg = mockLabels.maxQuesCrossedWithMarkReview;
	}else{
		alertMsg = mockLabels.maxQuesCrossedWithoutMarkReview;
	}
	str = '<div id="warningMsgDiv" style="background-color:#F5F6CE; border:1px solid #FE9A2E; padding: 1%; margin: 1%; font-size: 12px">';
	str += '<table><tr><td style="vertical-align:middle"><img src="images/warning-icon.png" /></td>';
	str += '<td style="text-align: justify;"><div style="margin-left:10px"><b>Note : </b>';
	str += alertMsg.replace('@@quesToBeConsidered@@',quesToBeConsidered).replace('@@totalQuestions@@',totalQuestions);
	str += '</div></td></tr></table></div>';
	$('#warningMsgDiv').remove();
	if( mockVar.curQuesBean.comprehensionId != 0 ||mockVar.curQuesBean.laqId != 0){
		$("#warning").prepend(str);
	}
	else
	$("#quesAnsContent").prepend(str);
	$('.answer').attr('disabled','disabled');
	$('.vKeyboard').remove();
}
function fillMaxOptQuesCrossedGroup(quesToBeConsidered,totalQuestions){
	var str= "",alertMsg = "";
	if(mockVar.isMarkedForReviewConsidered == "YES"){
		alertMsg = mockLabels.maxQuesCrossedWithMarkReview;
	}else{
		alertMsg = mockLabels.maxQuesCrossedWithoutMarkReview;
	}
	str = '<div id="warningMsgDiv" style="background-color:#F5F6CE; border:1px solid #FE9A2E; padding: 1%; margin: 1%; font-size: 12px">';
	str += '<table><tr><td style="vertical-align:middle"><img src="images/warning-icon.png" /></td>';
	str += '<td style="text-align: justify;"><div style="margin-left:10px"><b>Note : </b>';
	str += alertMsg.replace('@@quesToBeConsidered@@',quesToBeConsidered).replace('@@totalQuestions@@',totalQuestions);
	str += '</div></td></tr></table></div>';
	$('#warningMsgDiv').remove();
	/*if( mockVar.curQuesBean.comprehensionId != 0 ||mockVar.curQuesBean.laqId != 0){
		$("#warning").prepend(str);
	}
	else
	$("#quesAnsContent").prepend(str);*/
	$("#groupWarning").append(str);
	$("#groupWarning").show();
	$('.answer').attr('disabled','disabled');
	$('.vKeyboard').remove();
}

function save(ansID, action,quesType){

	var quesStatus = mockVar.curQuesBean.quesParam.status;
	var quesAnswer = mockVar.curQuesBean.quesParam.answer;
	var isMarked=mockVar.curQuesBean.quesParam.isMarked;
	if(ansID == "" && quesType != "SUBJECTIVE")
		ansID = null;
	if(action=="MARK"){
		if(quesStatus=="answered"){
			iOAP.secDetails[iOAP.curSection].answered--;					
		}else if(quesStatus=="notanswered"){
			iOAP.secDetails[iOAP.curSection].notanswered--;
		}
		if(quesStatus!="marked" && quesStatus!="markedAndAnswered"){
		if(quesAnswer == null || quesAnswer == ''){
			iOAP.secDetails[iOAP.curSection].marked++;
			mockVar.curQuesBean.quesParam.status="marked";
			mockVar.curQuesBean.quesParam.isMarked=1;
		}
		else{
			iOAP.secDetails[iOAP.curSection].markedAndAnswered++;
			mockVar.curQuesBean.quesParam.status="markedAndAnswered";
			}
		}
		if(quesStatus=="marked" && (!(quesAnswer == null || quesAnswer == '')))
		{
			mockVar.curQuesBean.quesParam.status="markedAndAnswered";
			mockVar.curQuesBean.quesParam.isMarked=1;
		}
		if(mockVar.curQuesBean.quesParam.status=="markedAndAnswered" && mockVar.curQuesBean.quesParam.isMarked==1)
		{
				iOAP.secDetails[iOAP.curSection].marked--;
				iOAP.secDetails[iOAP.curSection].markedAndAnswered++;
		}
		mockVar.curQuesBean.quesParam.isMarked=0;
		
		
	
	}else if(action=="RESET"){
		if(quesStatus=="marked"){
			iOAP.secDetails[iOAP.curSection].marked--;
			iOAP.secDetails[iOAP.curSection].notanswered++;
		}
		else if(quesStatus=="markedAndAnswered"){
			iOAP.secDetails[iOAP.curSection].markedAndAnswered--;
			iOAP.secDetails[iOAP.curSection].notanswered++;
		}
			
			
		else if(quesStatus=="answered"){
			iOAP.secDetails[iOAP.curSection].answered--;
			iOAP.secDetails[iOAP.curSection].notanswered++;
		}
		mockVar.curQuesBean.quesParam.status="notanswered";
	}else if((action=="NEXT" && quesType != "PROGRAMMING TEST") || action == "saveSA" || action == "submitPrograming"){
		if(ansID==null){
			if(quesStatus=="answered"){
				iOAP.secDetails[iOAP.curSection].notanswered++;
				iOAP.secDetails[iOAP.curSection].answered--;
			}else if(quesStatus=="marked"){
				iOAP.secDetails[iOAP.curSection].notanswered++;
				iOAP.secDetails[iOAP.curSection].marked--;
			}else if(quesStatus=="markedAndAnswered"){
				iOAP.secDetails[iOAP.curSection].notanswered++;
				iOAP.secDetails[iOAP.curSection].markedAndAnswered--;
				}
			mockVar.curQuesBean.quesParam.status="notanswered";
		}else{
			if(quesStatus!="answered"){
				if(quesStatus=="marked"){
					iOAP.secDetails[iOAP.curSection].marked--;
					}
			if(quesStatus=="markedAndAnswered"){
					iOAP.secDetails[iOAP.curSection].markedAndAnswered--;
					}
		
				if(quesStatus=="notanswered")
					iOAP.secDetails[iOAP.curSection].notanswered--;
				iOAP.secDetails[iOAP.curSection].answered++;
			}
			mockVar.curQuesBean.quesParam.status="answered";
		}
	}
	
	if(action=="NEXT" || action=="MARK" || action=="SKIP"){
		var secQuesLength= iOAP.secDetails[iOAP.curSection].questions.length ;     	
		if(iOAP.curQues<secQuesLength-1){
			iOAP.curQues = iOAP.curQues + 1;
			iOAP.secDetails[iOAP.curSection].curQues = iOAP.curQues;
			getQuestion(mockVar.defaultLang);
			numPanelSec();
			fillNumberPanel();
		}
		else{
			if(iOAP.curSection==iOAP.secDetails.length-1){
				iOAP.curSection = 0;
			}else{
				iOAP.curSection++;
			}
			iOAP.curQues = 0;
			getQuestion(mockVar.defaultLang);
			numPanelSec();
			fillNumberPanel();
		}
	}else if(action=="PREVIOUS"){
		//var secQuesLength= iOAP.secDetails[iOAP.curSection].questions.length ;     	
		if(iOAP.curQues>0){
			iOAP.curQues = iOAP.curQues - 1;
			iOAP.secDetails[iOAP.curSection].curQues = iOAP.curQues;
			getQuestion(mockVar.defaultLang);
			numPanelSec();
			fillNumberPanel();
		}
		else{
			if(iOAP.curSection==0){
				iOAP.curSection = iOAP.secDetails.length-1;
				
			}else{
				iOAP.curSection--;
			}
			iOAP.curQues = iOAP.secDetails[iOAP.curSection].questions.length - 1;
			getQuestion(mockVar.defaultLang);
			numPanelSec();
			fillNumberPanel();
		}
	}else{
		getQuestion(mockVar.defaultLang);
		numPanelSec();
		fillNumberPanel();
	}
	
}

function saveGroup(ansID, action,quesType){
	var compreLaqCount = 0;
	for(var i=0;i<mockVar.curSectionQuestions.length;i++){

		var quesStatus = mockVar.curSectionQuestions[i].quesParam.status;
		var quesAnswer = mockVar.curSectionQuestions[i].quesParam.answer;

		if(quesAnswer == "" && mockVar.curSectionQuestions[i].quesId != "SUBJECTIVE")
			quesAnswer = null;
		if(action=="RESET"){

			if(quesStatus=="answered"){
				iOAP.secDetails[iOAP.curSection].answered--;
				iOAP.secDetails[iOAP.curSection].notanswered++;
			}
			mockVar.curSectionQuestions[i].quesParam.status="notanswered";
		}else if((action=="NEXT" && mockVar.curSectionQuestions[i].quesType != "PROGRAMMING TEST") || action == "saveSA" || action == "SAVE"){
			if(iOAP.secDetails[iOAP.curSection].groupAllQuestions == "true"){
				if(quesAnswer==null){
					if(quesStatus=="answered"){
						iOAP.secDetails[iOAP.curSection].notanswered++;
						iOAP.secDetails[iOAP.curSection].answered--;
					}
					mockVar.curSectionQuestions[i].quesParam.status="notanswered";
				}else{
					if(quesStatus!="answered"){

						if(quesStatus=="notanswered")
							iOAP.secDetails[iOAP.curSection].notanswered--;
						iOAP.secDetails[iOAP.curSection].answered++;
					}
					mockVar.curSectionQuestions[i].quesParam.status="answered";
				}
			}
		}
	}
	if(iOAP.secDetails[iOAP.curSection].groupAllQuestions == "false"){
		if(action=="NEXT" || action=="MARK" || action=="SKIP"){
			var secQuesLength= iOAP.secDetails[iOAP.curSection].questions.length ;

			for(var i=0;i<mockVar.curSectionQuestions.length;i++){

				var quesStatus = mockVar.curSectionQuestions[i].quesParam.status;
				var quesAnswer = mockVar.curSectionQuestions[i].quesParam.answer;

				if(quesAnswer == "" && mockVar.curSectionQuestions[i].quesId != "SUBJECTIVE")
					quesAnswer = null;
				if(mockVar.curQuesBean.comprehensionId !=0){
					if(mockVar.curQuesBean.comprehensionId == mockVar.curSectionQuestions[i].comprehensionId){
						compreLaqCount++;
						if(quesAnswer==null){
							if(quesStatus=="answered"){
								iOAP.secDetails[iOAP.curSection].notanswered++;
								iOAP.secDetails[iOAP.curSection].answered--;
							}
							mockVar.curSectionQuestions[i].quesParam.status="notanswered";
						}else{
							if(quesStatus!="answered"){

								if(quesStatus=="notanswered")
									iOAP.secDetails[iOAP.curSection].notanswered--;
								iOAP.secDetails[iOAP.curSection].answered++;
							}
							mockVar.curSectionQuestions[i].quesParam.status="answered";
						}
					}
				}else if(mockVar.curQuesBean.laqId !=0){
					if(mockVar.curQuesBean.laqId == mockVar.curSectionQuestions[i].laqId){
						compreLaqCount++;
						if(quesAnswer==null){
							if(quesStatus=="answered"){
								iOAP.secDetails[iOAP.curSection].notanswered++;
								iOAP.secDetails[iOAP.curSection].answered--;
							}
							mockVar.curSectionQuestions[i].quesParam.status="notanswered";
						}else{
							if(quesStatus!="answered"){

								if(quesStatus=="notanswered")
									iOAP.secDetails[iOAP.curSection].notanswered--;
								iOAP.secDetails[iOAP.curSection].answered++;
							}
							mockVar.curSectionQuestions[i].quesParam.status="answered";
						}
					}
				}	

			}

			iOAP.curQues = iOAP.curQues + (compreLaqCount-1);

			if(iOAP.curQues<secQuesLength-1){
				iOAP.curQues = iOAP.curQues + 1;
				iOAP.secDetails[iOAP.curSection].curQues = iOAP.curQues;

			}
			else{
				if(iOAP.curSection==iOAP.secDetails.length-1){
					iOAP.curSection = 0;
				}else{
					iOAP.curSection++;
				}
				iOAP.curQues = 0;

			}
		}
		getQuestion(mockVar.defaultLang);
		numPanelSec();
		fillNumberPanel();

	}else{
		if(action=="NEXT" || action=="MARK" || action=="SKIP"){
			if(iOAP.curSection==iOAP.secDetails.length-1){
				iOAP.curSection = 0;
			}else{
				iOAP.curSection++;
			}
			iOAP.curQues = 0;
		}
		var LangId = mockVar.curQuesBean.quesParam.langID;
		getQuestion(LangId);
		//getQuestion(mockVar.defaultLang);
		numPanelSec();
		fillNumberPanel();
	}
		
}
function bConfirm(){
	$('#pWait').css({"background":"none","opacity":"1","width":"99%","height":"98%"});
	var str = '<div style="top:40%;left:30%;width:400px;position:relative;background:white;border:2px solid #000"><h1 id="popup_title" class="confirm"></h1>';
	str += '<div id="popup_content" class="confirm">'+
		'<div id="popup_message">You have reached the last question of the exam.Do you want to go to the first question again?</div>'+
		'<div id="popup_panel">'+
			'<input type="image" id="popup_ok" value="&nbsp;OK&nbsp;" onclick="bConfirmOK()" src="images/ok_new.gif">'+
			'<input type="image" id="popup_cancel" value="&nbsp;Cancel&nbsp;" onclick="bConfirmCancel()" src="images/cancel_new.gif">'+
		'</div>'+
	'</div></div>';
	$('#pWait').html(str);
	$('#pWait').show();
}

function bConfirmOK(){
	iOAP.curSection = 0;
	iOAP.curQues = 0;
	getQuestion(mockVar.defaultLang);
	numPanelSec();
	fillNumberPanel();
	$("#pWait").hide();
}

function bConfirmCancel(){
	getQuestion(mockVar.defaultLang);
	numPanelSec();
	fillNumberPanel();
	$("#pWait").hide();
}

function timer(){
	if(iOAP.secWiseTimer==0){
		startCounter(mockVar.time);
	}
}

function startCounter(time){
	$("#showTime").html( "<b>"+mockLabels.timeLeft+"<span id='timeInMins'>"+convertTime(time)+"</span></b>");
	if(mockVar.groups[mockVar.currentGrp].maxTime>0){
		if(mockVar.groups[mockVar.currentGrp].maxTime - time >= mockVar.minSubmitTime && mockVar.currentGrp == mockVar.MaxGrpEnabled){
			$("#finalSubmit").removeAttr("disabled");
		}else{
			$("#finalSubmit").attr("disabled","true");
		}
	}else{
		if(mockVar.nonTimeBoundTime - time >= mockVar.minSubmitTime && mockVar.currentGrp == mockVar.MaxGrpEnabled){
			$("#finalSubmit").removeAttr("disabled");
		}else{
			$("#finalSubmit").attr("disabled","true");
		}
	}
	mockVar.time = time-1;
	if(time<=300){
		$('#timeInMins').css('color','red');
	}
	if(time>0){
		mockVar.timeCounter = setTimeout(function(){startCounter(time-1);},1000);
		mockVar.timeLeft = mockVar.time - mockVar.timeCounter;
		window.name = JSON.stringify(mockVar);
	}else{
		mockVar.typingGroup[mockVar.currentGrp].ellapsedTime = mockVar.groups[mockVar.currentGrp].maxTime;	// required
																											// for
																											// typing
																											// group
		if(mockVar.currentGrp < mockVar.groups.length-1 ){
			checkGroupBreakTime();
			// changeGroup(mockVar.currentGrp);
		}else{
			// window.location.href="FeedBack.html";
			timeOutSubmit();
		}
	}
}

function breakTimeCounter(time){
	mockVar.remainingBreakTime=time;
	$("#breakTimeCounter").html( "<b>"+mockLabels.breakTimeLeft+convertTime(time)+"</b>");
	if(time>0){
		mockVar.timeCounter = setTimeout(function(){breakTimeCounter(time-1);},1000);
		
	}else{
		submitGroup();
	}
}

function timeOutSubmit(){
	var str = submitConfirmation('timeout');
	$("#pWait").hide();
	/*$("#sectionSummaryDiv").css({"height":"80%","border":"1px #fff solid"});
	$("#groups").html('');
	$('#groups').css({"border":"1px #fff solid"});
	$('#sectionsField').html('');
	$('#sectionsField').css({"border":"1px #fff solid"});
	// $('#assessmentname').html('');
	$('#timer').html('');
	$('.numberpanel').html('');*/
	//$("#groups").hide();
	//$("#sectionsField").hide();
	$("#col1").hide();
	$("#User_Hldr").hide();
	$("#sectionSummaryDiv").hide();
	$("#sub-header").hide();
	$('.Questn_Area').html(str);
	$("#rightDivision").hide();
	//$('#rightDivision').css({"background":"#fff","border-left":"1px #000 solid","height":"100%"});
	$('#group_summary').height($('#sectionSummaryDiv').height()-$('#confirmation_buttons').outerHeight(true)-$('.examSummaryHeader').outerHeight(true)-80);
	//$("#group_summary").css({"height":($(document).height()*.60)+"px"});
	//$('#rightDivision').html('<div style="top:25%;position:relative"><img src="images/NewCandidateImage.jpg"  /></div>');
	isfinalSubmit = true;
	if(mockVar.storeCandResponse == 1){
	//alert("Time out submit");
		submitMock('Time out !!!');
	}else{
		cnfPop('SubmitPopup');
		$("#submitMsg").html(mockLabels.timeOutSubmitMsg);
		//submitMock("");
	}
}

function convertTime(time){
	return showMin(time)+":"+showSec(time);
}


function showMin(time){
	var min = 0;
// time = time%3600;
	min = parseInt(time/60);
	return min;
}

function showSec(time){
	var sec="";
	if((time%60)>9)
		sec = time%60;
	else
		sec = "0"+time%60;
	return sec;	
}

function convertInterruptionTime(time){
	return showInterruptionSec(time);
}
function showInterruptionSec(time){
	var sec="";
	sec = time%60;
return sec;	
}


/*
 * Time in hours function convertTime(time){ return
 * showHr(time)+":"+showMin(time)+":"+showSec(time); }
 * 
 * function showHr(time){ return "0"+parseInt(time/3600); }
 * 
 * function showMin(time){ var min = ""; time = time%3600; if((time/60)>9) min =
 * parseInt(time/60); else min = "0"+parseInt(time/60); return min; }
 * 
 * function showSec(time){ var sec=""; if((time%60)>9) sec = time%60; else sec =
 * "0"+time%60; return sec; }
 */
function imgMagnifyInc( img,percentage){	
	var width = img.width;
	var height = img.height;
	height= height + height*percentage/100;
	width = width+ width*percentage/100;
	var zindex=1;
	if(percentage>0)
		zindex = 999;
	$(img).css({"height":height,"width":width,"z-index":zindex,"position":"relative"});	
}

function showQP(){
	var i,j;
	var str = "";
	var noOfQues = new Array();
	var quesCounter=0;
	var counter =0;
	var addQuesGroupCounter = false;
	for(i=0;i<iOAP.secDetails.length;i++){
		for(j=0;j<iOAP.secDetails[i].questions.length;j++){
			ques = iOAP.secDetails[i].questions[j];
			if(ques.quesType.indexOf("@@") !=-1 ){
				if(ques.isParent){
					if(!addQuesGroupCounter){
						addQuesGroupCounter = true;
					}else{
						noOfQues[quesCounter]= counter;
						quesCounter++;
					}
					counter=1;
				}else{
					counter++;
				}
			}else{
				if(counter>1){
					noOfQues[quesCounter]= counter;
					quesCounter++;
				}
				counter=1;
			}
		}
	}
	quesCounter=0;
	if(mockVar.groups.length>1){
		str+=str +="<h2><font color='#2F72B7'> "+mockVar.groups[mockVar.currentGrp].groupName+"</font></h2>" ;
	}
	for(i=0;i<iOAP.secDetails.length;i++){
		str +="<h2><font color='#2F72B7'>"+iOAP.secDetails[i].secName+"</font></h2>" ;
		for(j=0;j<iOAP.secDetails[i].questions.length;j++){
			ques = iOAP.secDetails[i].questions[j];
			if(ques.quesType.indexOf("@@") !=-1 ){
				str += "<p style='padding-left:5px'>";
				if(ques.isParent){
					if(ques.quesType.split("@@")[0] == "COMPREHENSION" ){
						str += "<b>"+mockVar.compQName ;
					}
					else if(ques.quesType.split("@@")[0] == "LA"){
						str += "<b>"+mockVar.laQName ;
					}
					str += "(Question Number "+j+" to "+(j+noOfQues[quesCounter]-1)+") :</b> <br/> "+ques.quesLangBeans[mockVar.langIndex].quesText.split("@@&&")[0] + "<br/>";
					quesCounter++;
				}
				str += "<table><tr><td style='vertical-align:top'>Q."+(j+1)+") </td><td>"+ ques.quesLangBeans[mockVar.langIndex].quesText.split("@@&&")[1]+"</td>";
			}else{
				if(typeof(ques.quesLangBeans[mockVar.langIndex])!='undefined')
				str += "<p style='padding-left:5px'><table><tr><td style='vertical-align:top'>Q."+(j+1)+") </td><td>"+ ques.quesLangBeans[mockVar.langIndex].quesText.replace(/JPlayerques/g, 'QPJPlayerques').replace(/Containerques/g, 'QPContainerques')+"</td></tr>";
			}
			//str += "<tr><td width='50px'></td><td><i style='font-size:1em;'>";
			if(ques.quesType.indexOf("MCQ")>-1){
				str += "<tr><td width='50px'></td><td><i style='font-size:1em;'>";
					if(mockVar.mcQName.length>0){
						str += mockLabels.questionType+" <b> ";
						str += mockVar.mcQName;
						str += "</b>  ";
					}
					if(mockVar.showMarks && mockVar.mcQName.length>0){
					str += "; "+mockLabels.correctAnswerMarks+" <font color='green'><b> "+ ques.allottedMarks +"</b></font>";
					str += " ;  "+mockLabels.negativeMarks+" </span><font color='red'><b> "+ ques.negMarks +"</b></font>";
					str += "</b>   ";
					}
					else if(mockVar.showMarks && !mockVar.mcQName.length>0){
					str += mockLabels.correctAnswerMarks+" <font color='green'><b> "+ ques.allottedMarks +"</b></font>";
					str += " ;  "+mockLabels.negativeMarks+" </span><font color='red'><b> "+ ques.negMarks +"</b></font>";
					str += "</b>   ";
					}
					
				if(mockVar.showOptionInViewQP==1){
					for(var k=0;k<ques.options.length;k++){
						str += "<tr><td><span style='font-weight:bold'>";
						str += (k+1)+'</td>';
						//str +=+(k+1)+":";
						str +='<td>'+ques.options[k].optLangBean[mockVar.langIndex].optText.replace(/JPlayeropt/g, 'QPJPlayeropt').replace(/Containeropt/g, 'QPContaineropt');
						
						str += "</td></tr>";
					} 
				}
				str += "</i><td></tr>";
			}
			else if(ques.quesType.indexOf("MSQ")>-1){
				str += "<tr><td width='50px'></td><td><i style='font-size:1em;'>";
				if( mockVar.msQName.length > 0){
					str += mockLabels.questionType+"<b>";
					str += mockVar.msQName;
					str += "</b>  ";
					}
					
					if(mockVar.showMarks && mockVar.msQName.length > 0){
					str += "; "+mockLabels.correctAnswerMarks+" <font color='green'><b> "+ ques.allottedMarks +"</b></font>";
					str += " ;  "+mockLabels.negativeMarks+" </span><font color='red'><b> "+ ques.negMarks +"</b></font>";
					str += "</b> ";
				}
				else if(mockVar.showMarks && !mockVar.msQName.length > 0){
					str += mockLabels.correctAnswerMarks+" <font color='green'><b> "+ ques.allottedMarks +"</b></font>";
					str += " ;  "+mockLabels.negativeMarks+" </span><font color='red'><b> "+ ques.negMarks +"</b></font>";
					str += "</b> ";
					}
				if(mockVar.showOptionInViewQP==1){
					for(var k=0;k<ques.options.length;k++){
						str += "<tr><td><span style='font-weight:bold'>";
						str += (k+1)+'</td>';
						//str +=+(k+1)+":";
						str +='<td>'+ques.options[k].optLangBean[mockVar.langIndex].optText.replace(/JPlayeropt/g, 'QPJPlayeropt').replace(/Containeropt/g, 'QPContaineropt');
						
						str += "</td></tr>";
					} 
				}
				str += "</i><td></tr>";				
			}else if(ques.quesType.indexOf("SA")>-1){
				str += "<tr><td width='50px'></td><td><i style='font-size:1em;'>";
					if(mockVar.saQName.length>0){
						str += mockLabels.questionType+"<b>";
						str += mockVar.saQName;
						str += "</b>  ";
					}
					if(mockVar.showMarks && mockVar.saQName.length>0){
					str += "; "+mockLabels.correctAnswerMarks+" <font color='green'><b> "+ ques.allottedMarks +"</b></font>";
					str += " ;  "+mockLabels.negativeMarks+" </span><font color='red'><b> "+ ques.negMarks +"</b></font>";
					str += "</b> ";
				}
				else if(mockVar.showMarks && !mockVar.saQName.length>0){
					str += mockLabels.correctAnswerMarks+" <font color='green'><b> "+ ques.allottedMarks +"</b></font>";
					str += " ;  "+mockLabels.negativeMarks+" </span><font color='red'><b> "+ ques.negMarks +"</b></font>";
					str += "</b> ";
				}	
				str += "</i><td></tr>";
				
				
			}else if(ques.quesType.indexOf("SUBJECTIVE")>-1){
				str += "<tr><td width='50px'></td><td><i style='font-size:1em;'>";
					if(mockVar.subjQName.length>0){
						str += mockLabels.questionType+"<b>";
						str += mockVar.subjQName;
						str += "</b>";
					}
					if(mockVar.showMarks && mockVar.subjQName.length>0){
					str += "; "+mockLabels.correctAnswerMarks+" <font color='green'><b> "+ ques.allottedMarks +"</b></font>";
					str += " ;  "+mockLabels.negativeMarks+" </span><font color='red'><b> "+ ques.negMarks +"</b></font>";
					str += "</b> ; ";
				}		
            else if(mockVar.showMarks && mockVar.subjQName.length>0){
					str += mockLabels.correctAnswerMarks+" <font color='green'><b> "+ ques.allottedMarks +"</b></font>";
					str += " ;  "+mockLabels.negativeMarks+" </span><font color='red'><b> "+ ques.negMarks +"</b></font>";
					str += "</b>";
				}					
				str += "</i><td></tr>";
			}
			
			
			
		//	str += "</i><td></tr>";
			str += "</table></p><hr style='color:#ccc'/>";
		}
		str +="<br/>";
	}
	$("#viewQPDiv").html(str);
	activateAudioPlayer();
	activateVideoPlayer();
	showModule('QPDiv');
}

function multiLangInstru(){
	$("#basInst option[value='instEnglish']").attr("selected", "selected");
	if(document.getElementById("multiLangDD")!=null){
		$("#multiLangDD option").each(function(){
			if($(this).text().toUpperCase() == 'HINDI'){
				$('#basInst').parent().show();
			}
		});
		$("#multiLangDD").change(function (){ 
			var select = this.value;
			$("#multiLangDD option").each(function(){
				
				if(select == this.value){
					$("#instLang" + select).show();
				}else{
					$("#instLang" + this.value).hide();
				}
			});
		});
	}
}


/** *************************************FeedBack page ******************** */




/** *************************************close page ******************** */

function activeLink(linkId){
	for(var i=0;i<mockVar.activeLinkList.length;i++){
		if(mockVar.activeLinkList[i]==linkId){
			//$("#"+mockVar.activeLinkList[i]).css("background","#2F72B7");
			$("#"+mockVar.activeLinkList[i]).css("color","white");
		}else{
			$("#"+mockVar.activeLinkList[i]).removeAttr('style');
		}
	}
}

function removeActiveLinks(){
	for(var i=0;i<mockVar.activeLinkList.length;i++){
		$("#"+mockVar.activeLinkList[i]).removeAttr('style');
	}
}

function calcTotalQues(orgId,mockId,QPxml){
	var quesCount = 0;
	var langArr = new Array();
	// $(QPxml).find('LANGID').each(function(){
		// if($.inArray($(this).text(), langArr)==-1){
			// langArr.push($(this).text());
		// }
	// })
	$(QPxml).find('question').each(function(){
		quesCount++;
	});
	$(".totalNoOfQues").html(quesCount);
}

function loadCalculator(){
	

	if(mockVar.showCalculator=="NORMAL"){
		$('#keyPad a').css('margin-right','3px');
		$('.degree_radian').css('display','none');
		 $('.keyPad_TextBox').attr('style', 'width: 188px !important;');
		 $('.keyPad_TextBox1').attr('style', 'width: 188px !important;');
		 $('.keyPad_TextBox').css("font-size", "17px");
		 $('.keyPad_TextBox1').css("font-size", "17px");   
		jQuery('.memoryhide').css('right','192px');
		$('#Pi').hide();
    	$('#dr').removeClass('degree_radian');
	    $('.degree_radian').hide(); 
		$('.keyPad_btnConst').hide();
		$('.keyPad_btnConst').hide();
		$('#keyPad_btnMod').hide();
		$('#keyPad_btnFact').hide();
		$('#keyPad_btnSinH').hide();
		$('#keyPad_btnCosinH').hide();
		$('#keyPad_btnTgH').hide();
		$('#keyPad_EXP').hide();
		$('#keyPad_btnOpen').hide();
		$('#keyPad_btnClose').hide();
		$('#keyPad_btnAsinH').hide();
		$('#keyPad_btnAcosH').hide();
		$('#keyPad_btnAtanH').hide();
		$('#keyPad_btnLogBase2').hide();
		$('#keyPad_btnLn').hide();
		$('#keyPad_btnLg').hide();
		$('#keyPad_btnExp').hide();
		$('#keyPad_btnYlogX').hide();	
		$('#keyPad_btn10X').hide();
		$('#keyPad_btnSin').hide();
		$('#keyPad_btnCosin').hide();
		$('#keyPad_btnTg').hide();
		$('#keyPad_btnYpowX').hide();
		$('#keyPad_btnCube').hide();
		$('#keyPad_btnSquare').hide();
		$('#keyPad_btnAsin').hide();
		$('#keyPad_btnAcos').hide();
		$('#keyPad_btnAtan').hide();
		$('#keyPad_btnYrootX').hide();
		$('#keyPad_btnCubeRoot').hide();
		$('#keyPad_btnAbs').css('display','none');
		if(checkIEVersion()&&!(!!navigator.userAgent.match(/Trident\/7\./))){
			$('#keyPad_btnEnter').addClass('importantRule');
			$('#keyPad_btnEnter').attr('style', 'height: 53px !important;');
			$('#memory').addClass('importantRuleMemory');
			jQuery('.calc_container').css('width','214px');
		}
		else
			{
			$('#keyPad_btnEnter').addClass('importantRule1');
			$('#keyPad_btnEnter').attr('style', 'height: 53px !important;');
			$('#memory').addClass('importantRuleMemory1');
			$('#keyPad_btn0').attr('style', 'width: 72px !important;');
			$('#keyPad_btnBack').attr('style', 'width: 72px !important;');
			jQuery('.calc_container').css('width','214px');
			}
	    $('#keyPad_btn0').attr('style', 'width: 72px !important;');
		$('#keyPad_btnBack').attr('style', 'width: 72px !important;');
		jQuery("#keyPad").css("top",0).css("left",0);
		$('#keyPad_Help').hide();
		 $('#normalText').show();
	
	}
	if(mockVar.showCalculator=="SCIENTIFIC"){
		$('#memory').addClass('importantRuleMemoryScientific');
		 $('.keyPad_TextBox').attr('style', 'width: 434px !important;');
		 $('.keyPad_TextBox1').attr('style', 'width: 434px !important;');
		 $('#keyPad_btn0').attr('style', 'width: 76px !important;');
		 $('.degree_radian').attr('style', 'width: 80px !important;');
		  $('#scientificText').show();
		
	}
	 jQuery("#loadCalc").css("top",121).css("left","65%");
	$('#loadCalc').show();
	
}

function getIEVersion() {
	try{
	var rv = -1;
	if (navigator.appName == 'Microsoft Internet Explorer') {
		var MSIEOffset = window.navigator.userAgent.indexOf("MSIE ");
		if (MSIEOffset == -1) {
			rv = -1;
        } else {
            rv = parseFloat(window.navigator.userAgent.substring(MSIEOffset + 5, window.navigator.userAgent.indexOf(";", MSIEOffset)));
        }
	}
	return rv;
	 }catch(e) {
	    	return false;
	    }
}

//This function is used to check Browser is Compatible or not for Candidate Machine.
function checkIEVersion(){
	try{
	var currentIEVersion = getIEVersion();
	if((currentIEVersion >=7 && currentIEVersion != -1) || (($.browser.msie || navigator.userAgent.indexOf("Trident")!=-1) && $.browser.version>=7)) {
		return true;
	}else {
		return false;
	}
	 }catch(e) {
	    	return false;
	    }
}

/*function alphaWordLimit(event){
	//$("textarea").keydown(function(e) {
	var number = 0;
	var matches = $("#answer").val().match(/\S+/g);
	
	if(matches) {
		number = matches.length;
	}
	
        if (number > mockVar.curQuesBean.alphaWordLimit) {
            // Split the string on first 200 words and rejoin on spaces
            var trimmed = $("#answer").val().split(/\s+/, mockVar.curQuesBean.alphaWordLimit).join(" ");
            // Add a space at the end to keep new typing making new words
            $("#answer").val(trimmed);
			}
	//var key_code = (window.event) ? event.keyCode : event.which; 
	//if(mockVar.curQuesBean.alphaWordLimit==number && (key_code==32||key_code==13)){
	//	event.preventDefault();
	//}
	//});
}*/
function wordCountCheckGroup(e,questionID)
{
	var questionID = questionID;
	var number = 0;
	var matches = $('#answer'+questionID).val().match(/\S+/g);
	var curSectionQuesNo = 0;
	if(matches) {
		number = matches.length;
	}
	for(i=0;i<mockVar.curSectionQuestions.length;i++){
	if(mockVar.curSectionQuestions[i].quesId ==  questionID){
			curSectionQuesNo = i;
	}
	
	}
	 if (number+1 > mockVar.curSectionQuestions[curSectionQuesNo].alphaWordLimit ){
		 if(!(mockVar.curSectionQuestions[curSectionQuesNo].alphaWordLimit==0 && mockVar.curSectionQuestions[curSectionQuesNo].isEvaluationRequired==true)){
		$("#maxalert"+questionID).text("maximum word limit reached");
		$('#answer'+questionID).keypress(function(e){
		if (e.keyCode != 8){
			e.preventDefault();
		}
	});
	}
	}
	 else
	 {
			$('#answer'+questionID).unbind('keypress');
			$("#maxalert"+questionID).text("");
	 }

}

function wordCountCheck(e)
{
	var questionID = questionID;
	var number = 0;
	var matches = $('#answer').val().match(/\S+/g);
	
	if(matches) {
		number = matches.length;
	}
	 if (number+1 > mockVar.curQuesBean.alphaWordLimit ){
		 if(!(mockVar.curQuesBean.alphaWordLimit==0 && mockVar.curQuesBean.isEvaluationRequired==true)){
		$("#maxalert").text("maximum word limit reached");
		$('#answer').keypress(function(e){
		if (e.keyCode != 8){
			e.preventDefault();
		}
	});
	}
	}
	 else
	 {
			$('#answer').unbind('keypress');
			$("#maxalert").text("");
	 }

}

function alphaWordLimitGroup(e,questionID){
			//alert(questionID);
			 if(e.keyCode == 32|| e.keyCode==8 ||e.keyCode== 13){
			 wordCountCheckGroup(e,questionID);
			}
			
		
}
function alphaWordLimit(e){
			//alert(questionID);
			 if(e.keyCode == 32|| e.keyCode==8 ||e.keyCode== 13){
			 wordCountCheck(e);
			}
			
		
}

function disableTab(event){
	$("textarea").keydown(function(e) {
		var key_code = (window.event) ? event.keyCode : e.which; 
		if(key_code==9){
			e.preventDefault();
		}
	});
}

function allowSAInputsForMultiLang(event){
	var key_code = (window.event)? event.keyCode : event.which;
	if(key_code==27 || key_code==17 || key_code==19 || key_code == 9 || (key_code>=91 && key_code<=93) || (key_code>=33 && key_code<=36) || key_code==38 || key_code==40 || key_code==45 || (key_code>=112 && key_code<=123) || key_code==145){
		return false;
	}else{
		return true;
	}
}

function validateKeyBoardInputAlphaNumeric(evt, textAreaObj){
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if(!(evt.ctrlKey||evt.altKey) && ((charCode>=97 && charCode<=122) 
			||(charCode>=65 && charCode<=90) || (charCode>=48 && charCode<=57) 
			|| (charCode==43)|| (charCode==44) || (charCode==45) || (charCode==46) || (charCode==32) 
			|| (charCode==59)|| (charCode==42)|| (charCode==13)|| (charCode==33)|| (charCode==64)
			|| (charCode==35)|| (charCode==36)|| (charCode==37) || (charCode==94) || (charCode==38) 
			|| (charCode==42)|| (charCode==40)|| (charCode==41)|| (charCode==95)|| (charCode==61) 
			|| (charCode==20)|| (charCode==123)|| (charCode==125)|| (charCode==91)|| (charCode==93) 
			|| (charCode==124)|| (charCode==92)|| (charCode==126)|| (charCode==96)
			|| (charCode==58)|| (charCode==34)|| (charCode==39)|| (charCode==60)|| (charCode==62) 
			|| (charCode==63)|| (charCode==47)|| (charCode==106)|| (charCode==111)|| (charCode==12)
			|| (charCode==8)|| (charCode==190)|| (charCode==191)|| (charCode==188)|| (charCode==222))){ 
		return true;
    }else{
		return false;
	}  
}

function word_countGroup(a) {
	var number = 0;
	var matches = $("#answer"+a).val().match(/\S+/g);
	if(matches) {
		number = matches.length;
	}
	$("#noOfWords"+a).text(number+' word'+(number > 1 ? 's' : '')+' typed');
	
}
function word_count() {
	var number = 0;
	var matches = $("#answer").val().match(/\S+/g);
	if(matches) {
		number = matches.length;
	}
	$("#noOfWords").text(number+' word'+(number > 1 ? 's' : '')+' typed');
	
}

function calculateEllapsedTime(){
	var ellapsedTime = mockVar.groups[mockVar.currentGrp].maxTime - mockVar.time;
	mockVar.typingGroup[mockVar.currentGrp].ellapsedTime = ellapsedTime;
}
function focusOnDiv(){}
function focusOnDiv1(){
	var divId="";
	if(document.getElementById('typedAnswer'))
		divId = 'typedAnswer';
	else if(document.getElementById('answer'))
		divId = 'answer';
	setTimeout(function() {
		if(typeof(iOAP.secDetails[iOAP.curSection].groupAllQuestions) == "undefined" || iOAP.secDetails[iOAP.curSection].groupAllQuestions == "" || iOAP.secDetails[iOAP.curSection].groupAllQuestions == "false")
		$('#'+divId).focus();
	}, 0);
	$('#'+divId).bind("blur", function() {
		setTimeout(function() {
			$('#'+divId).focus();
		}, 0);
	});
}

$(document).click(function(e) {

    var target = $(e.target), article;

    if(!target.is('select')) {
       focusOnDiv1();
    }
});

function mockScoreCalc(){
	var totalQues = 0, ques = '', isParentLAQCorrect = false;
	for(var groupNo=0;groupNo<mockVar.groups.length;groupNo++){
		var temp_iOAP = mockVar.groups[groupNo], grpSectCounter = 0;
		for(var i=0;i<temp_iOAP.secDetails.length;i++){
			if(temp_iOAP.secDetails[i].isOptional == 'false' || (temp_iOAP.secDetails[i].isOptional == 'true' && temp_iOAP.secDetails[i].isSelected)){
				grpSectCounter++;
				var sectionScore=0,evaluatedQues=0,correctCount=0,totalSecMarks=0;
				totalQues = temp_iOAP.secDetails[i].questions.length;
				hasOptionalQuestion = temp_iOAP.secDetails[i].hasOptionalQuestion;
				for(var j=0;j<totalQues;j++){
					var questionStatus = temp_iOAP.secDetails[i].questions[j].quesParam.status;
					var quesLangId = temp_iOAP.secDetails[i].questions[j].quesParam.langID;
					ques = temp_iOAP.secDetails[i].questions[j];
					if(j==0 && hasOptionalQuestion=='true' && temp_iOAP.secDetails[i].maxOptQuesToAns<totalQues){
						totalSecMarks += eval(ques.allottedMarks*temp_iOAP.secDetails[i].maxOptQuesToAns);
					}else if(!(hasOptionalQuestion=='true' && temp_iOAP.secDetails[i].maxOptQuesToAns<totalQues)){
						totalSecMarks += eval(ques.allottedMarks);
					}
					if(questionStatus=="answered" || (questionStatus == "marked" && ques.quesParam.answer!="" && mockVar.isMarkedForReviewConsidered=="YES")){
						if(ques.quesType =="SA" || ques.quesType =="COMPREHENSION@@SA" || ques.quesType =="LA@@SA"){
							evaluateSAQues(ques);
						}else if(ques.quesType =="TYPING TEST"){
							evaluateTypingQues(ques,groupNo);
						}else if(ques.quesType != "SUBJECTIVE"){
							if(ques.quesType.indexOf("@@") !=-1 ){
								if(ques.quesType.split('@@')[0]=='LA'){
									if(ques.isParent){
										evaluateLAnCompreQues(ques);
										isParentLAQCorrect = ques.isCorrect;
									}
									if(isParentLAQCorrect)
										evaluateLAnCompreQues(ques);
								}else if(ques.quesType.split('@@')[0]=='COMPREHENSION'){
									evaluateLAnCompreQues(ques);
								}
							}else if(ques.quesType == 'MCQ'){
								evaluateMCQ(ques);
							}else if(ques.quesType == 'MSQ'){
								evaluateMSQ(ques);
							}
						}
						sectionScore +=  eval(calculateScore(ques,questionStatus));
						if(ques.isEvaluated){
							evaluatedQues++;
						}else{
							ques.quesAnsStatus = 'Not Evaluated';
						}
						if(ques.isCorrect){
							correctCount++;
							ques.quesAnsStatus = 'Correct';
						}else{
							if(ques.isEvaluated){
								ques.quesAnsStatus = 'Incorrect';
							}
						}
					}
				}
				if(!temp_iOAP.isTypingGroup){
					temp_iOAP.secDetails[i].totalSecMarks = totalSecMarks;
					temp_iOAP.secDetails[i].sectionScore = sectionScore;
					temp_iOAP.secDetails[i].totalEvaluatedQues = evaluatedQues;
					temp_iOAP.secDetails[i].totalCorrectQues = correctCount;
					
				}
			}
		}
	}
}

function showScoreCard(){
	$('.overlay').hide();
	$('.confrmPopup').hide();
	var str = "<div class='examSummaryHeader' id='scoreCardHeader'><div class='header titlepath'>"+mockVar.mockName+"</div>", typingStr = '';
	str += "<table align='center' style='font-size:14px;' class='grayBand'><tr><td style='text-align:left'><b>"+mockLabels.candName+"</b>&nbsp;"+mockLabels.candidate+"</td><td style='text-align:right'><b>"+mockVar.loginLabel+" : </b>"+mockVar.candId+"</td></tr></table></div>";
	str += "<div id='sc_group_summary' style='padding:20px;overflow:auto;text-align:left;font-size:14px;'>";
	for(var groupNo=0;groupNo<mockVar.groups.length;groupNo++){
		var totalGrpQues = 0, totalGrpAttempted = 0, totalGrpCorrect = 0, totalGrpIncorrect = 0, totalGrpScore = 0, totalGrpNotEvaluated = 0, totalGrpMarks = 0, grpSectCounter = 0;
		var temp_iOAP = mockVar.groups[groupNo], typing_iOAP = mockVar.typingGroup[groupNo];
		if(temp_iOAP.isTypingGroup){
			if(mockVar.groups.length>1)
				typingStr += "<br><span style='margin-left:50%'><b>"+mockVar.groups[groupNo].groupName+"</b></span>";
			typingStr += "<table class='score_card_table' cellspacing=0 width='80%' align='center'>";
			typingStr += "<thead><tr><th width='20%'>"+mockLabels.secName+"</th><th width='10%'>"+mockLabels.keyStrokesCount+"</th><th width='10%'>"+mockLabels.elapsedTime+"</th><th width='10%'>"+mockLabels.gwpm+"</th><th width='10%'>"+mockLabels.nwpm+"</th><th width='10%'>"+mockLabels.accuracy+"</th></tr></thead>";
		}else{
			if(mockVar.groups.length>1)
				str += "<br><span style='margin-left:50%'><b>"+mockVar.groups[groupNo].groupName+"</b></span>";
			str += "<table class='score_card_table' cellspacing=0 width='80%' align='center'>";
			str += "<thead><tr><th width='20%'>"+mockLabels.secName+"</th><th width='10%'>"+mockLabels.noOfQues+"</th><th width='10%'>"+mockLabels.attempted+"</th><th width='10%'>"+mockLabels.correct+"</th><th width='10%'>"+mockLabels.incorrect+"</th>";
			if(temp_iOAP.hasOfflineSect)
				str += "<th width='10%'>"+mockLabels.notEvaluated+"</th>";
			str += "<th width='10%'>"+mockLabels.secScore+"</th>";
			if(typeof(mockVar.displayPercentageScore)!='undefined' && mockVar.displayPercentageScore)
				str += "<th width='10%'>"+mockLabels.secPercent+"</th>";
			str += "</tr></thead>";
		}
		for(var i=0;i<temp_iOAP.secDetails.length;i++){
			if(temp_iOAP.secDetails[i].isOptional == 'false' || (temp_iOAP.secDetails[i].isOptional == 'true' && temp_iOAP.secDetails[i].isSelected)){
				grpSectCounter++;
				if(temp_iOAP.isTypingGroup){
					typingStr += "<tbody><tr><td width='20%'>"+temp_iOAP.secDetails[i].secName+"</td><td width='10%'>"+typing_iOAP.keyStrokesCount+"</td><td width='10%'>"+(typing_iOAP.ellapsedTime/60).toFixed(2)+"</td><td width='10%'>"+typing_iOAP.GWPM+"</td><td width='10%'>"+typing_iOAP.NWPM+"</td><td width='10%'>"+typing_iOAP.accuracy+"</td></tr></tbody>";
				}else{
					str += "<tbody><tr><td width='20%'>"+temp_iOAP.secDetails[i].secName+"</td><td width='10%'>"+(temp_iOAP.secDetails[i].questions.length)+"</td><td width='10%'>"+temp_iOAP.secDetails[i].answered+"</td><td width='10%'>"+temp_iOAP.secDetails[i].totalCorrectQues+"</td><td width='10%'>"+(temp_iOAP.secDetails[i].totalEvaluatedQues-temp_iOAP.secDetails[i].totalCorrectQues)+"</td>";
					if(temp_iOAP.hasOfflineSect)
						str += "<td width='10%'>"+(temp_iOAP.secDetails[i].answered-temp_iOAP.secDetails[i].totalEvaluatedQues)+"</td>";
					str += "<td width='10%'>"+temp_iOAP.secDetails[i].sectionScore+"/"+temp_iOAP.secDetails[i].totalSecMarks+"</td>";
					if(typeof(mockVar.displayPercentageScore)!='undefined' && mockVar.displayPercentageScore)
						str += "<td width='10%'>"+((temp_iOAP.secDetails[i].sectionScore/temp_iOAP.secDetails[i].totalSecMarks)*100).toFixed(2)+"</td>";
					str += "</tr></tbody>";
					totalGrpQues += temp_iOAP.secDetails[i].questions.length;
					totalGrpAttempted += temp_iOAP.secDetails[i].answered;
					totalGrpCorrect += temp_iOAP.secDetails[i].totalCorrectQues;
					totalGrpIncorrect += temp_iOAP.secDetails[i].totalEvaluatedQues-temp_iOAP.secDetails[i].totalCorrectQues;
					totalGrpNotEvaluated += temp_iOAP.secDetails[i].answered-temp_iOAP.secDetails[i].totalEvaluatedQues;
					totalGrpScore += temp_iOAP.secDetails[i].sectionScore;
					totalGrpMarks += temp_iOAP.secDetails[i].totalSecMarks;
				}
			}
		}
		//if(grpSectCounter>1){
		if(!temp_iOAP.isTypingGroup){
			str += "<tbody><tr><td width='20%'>Total</td><td width='10%'>"+totalGrpQues+"</td><td width='10%'>"+totalGrpAttempted+"</td><td width='10%'>"+totalGrpCorrect+"</td><td width='10%'>"+totalGrpIncorrect+"</td>";
			if(temp_iOAP.hasOfflineSect)
				str += "<td width='10%'>"+totalGrpNotEvaluated+"</td>";
			str += "<td wiave" +
					"dth='10%'>"+totalGrpScore+"/"+totalGrpMarks+"</td>";
			if(typeof(mockVar.displayPercentageScore)!='undefined' && mockVar.displayPercentageScore)
				str += "<td width='10%'>"+((totalGrpScore/totalGrpMarks)*100).toFixed(2)+"</td>";
			str += "</tr></tbody>";
	//	}
	}
		str += "</table>";
		typingStr += "</table>";
	}
	str = str + typingStr + "</div></center>";
	$('#questionContent').hide();
	$('#sub-header').hide();
	$("#scoreSummaryDiv").html(str);
	$('#scoreCardDiv').show();
	$('#scoreCardPrcdBtn').val(mockLabels.proceedBtnLabel);
	
	$('#sc_group_summary').height($('#scoreCardDiv').outerHeight(true)-70-$('#scoreCardBtnDiv').outerHeight(true)-$('#scoreCardHeader').outerHeight(true));
}


function showScoreCardForOnlineAssessment(scoreCardJson,cutOffMarks,totalMarks){
	var totalObtainedMarks=0;
	var result;
	var groups = scoreCardJson.Groups;
	$('.overlay').hide();
	$('.confrmPopup').hide();
	var str = "<div class='examSummaryHeader' id='scoreCardHeader'><div class='header titlepath'>"+mockVar.mockName+"</div>";
var	typingStr = '';
	str += "<table align='center' style='font-size:14px;' class='grayBand'><tr><td style='text-align:left'><b>"+mockLabels.candName+"</b>&nbsp;"+mockLabels.candidate+"</td><td style='text-align:right'><b>"+mockVar.loginLabel+" : </b>"+mockVar.candId+"</td></tr><tr><td style='text-align:left'><b>SCORE:</b>&nbsp;<span id='totalScore'></span></td><td style='text-align:right'><b>RESULT : </b><span id='Result'></span></td></tr></table></div>";
	str += "<div id='sc_group_summary' style='padding:20px;overflow:auto;text-align:left;font-size:14px;'>";
	
	jQuery(groups).each(function(){
			
			
			var totalGrpQues = 0, totalGrpAttempted = 0, totalGrpCorrect = 0, totalGrpIncorrect = 0, totalGrpScore = 0, totalGrpNotEvaluated = 0, totalGrpMarks = 0, grpSectCounter = 0;
		var temp_iOAP = this;
		if(this.isTypingGroup==1){
			//if(groups.length>1)
				typingStr += "<br><span style=''><b>"+this.GroupName+"</b></span>";
			typingStr += "<table class='score_card_table' cellspacing=0 width='80%' align='center'>";
			typingStr += "<thead><tr><th width='20%'>"+mockLabels.secName+"</th><th width='10%'>"+mockLabels.keyStrokesCount+"</th><th width='10%'>"+mockLabels.elapsedTime+"</th><th width='10%'>"+mockLabels.gwpm+"</th><th width='10%'>"+mockLabels.nwpm+"</th><th width='10%'>"+mockLabels.accuracy+"</th></tr></thead>";
			
			
			
		}else{
			//if(groups.length>1)
				str += "<br><span style=''><b>"+this.GroupName+"</b></span>";
			str += "<table class='score_card_table' cellspacing=0 width='80%' align='center'>";
			str += "<thead><tr><th width='20%'>"+mockLabels.secName+"</th><th width='10%'>"+mockLabels.noOfQues+"</th><th width='10%'>"+mockLabels.attempted+"</th><th width='10%'>"+mockLabels.correct+"</th><th width='10%'>"+mockLabels.incorrect+"</th>";
			//if(temp_iOAP.hasOfflineSect)
				//str += "<th width='10%'>"+mockLabels.notEvaluated+"</th>";
			str += "<th width='10%'>"+mockLabels.secScore+"</th>";
			if(typeof(mockVar.displayPercentageScore)!='undefined' && mockVar.displayPercentageScore)
				str += "<th width='10%'>"+mockLabels.secPercent+"</th>";
			str += "</tr></thead><tbody>";
		}
		var sections = this.Sections;
	
	
	
		jQuery(sections).each(function(){
			//if(temp_iOAP.secDetails[i].isOptional == 'false' || (temp_iOAP.secDetails[i].isOptional == 'true' && temp_iOAP.secDetails[i].isSelected)){
				grpSectCounter++;
				if(temp_iOAP.isTypingGroup == 1){
					typingStr += "<tbody><tr><td width='20%'>"+this.SectionName+"</td><td width='10%' align='right'>"+temp_iOAP.keyStrokesCount+"</td><td width='10%' align='right'>"+(temp_iOAP.ElapsedTime/60).toFixed(2)+"</td><td width='10%'>"+temp_iOAP.GWPM+"</td><td width='10%' align='right'>"+temp_iOAP.NWPM+"</td><td width='10%' align='right'>"+temp_iOAP.Accuracy+"</td></tr></tbody>";
					typingStr += "</table>";
				}else{
					str += "<tr><td width='20%'>"+this.SectionName+"</td><td width='10%' align='right'>"+(this.SectionTotalQuestions)+"</td><td width='10%' align='right'>"+this.TotalQuestionAttempted+"</td><td width='10%' align='right'>"+this.CorrectQuestions+"</td><td width='10%' align='right'>"+this.inCorrectQuestions+"</td>";
					//if(temp_iOAP.hasOfflineSect)
						//str += "<td width='10%'>"+(temp_iOAP.secDetails[i].answered-temp_iOAP.secDetails[i].totalEvaluatedQues)+"</td>";
					if(this.ObtainedMarks=='NA' && this.SectionMaxScore=='NA'){
						
						str += "<td width='10%' align='right'>NA</td>";
					}
					else{
						str += "<td width='10%' align='right'>"+this.ObtainedMarks+"/"+this.SectionMaxScore+"</td>";
					}
					if(typeof(mockVar.displayPercentageScore)!='undefined' && mockVar.displayPercentageScore){
						if(this.ObtainedMarks=='NA' && this.SectionMaxScore=='NA'){
						str += "<td width='10%' align='right'>NA</td>";
						}
						else{
							if(this.SectionMaxScore!=0){
								var percentage=((this.ObtainedMarks/this.SectionMaxScore)*100).toFixed(2);
								if(percentage>=0)
							str += "<td width='10%' align='right'>"+((this.ObtainedMarks/this.SectionMaxScore)*100).toFixed(2)+"</td>";
								else
									str += "<td width='10%' align='right'>NA</td>";
							}
							else{
								str += "<td width='10%' align='right'>NA</td>";
							}
						}
					}
					str += "</tr>";
					if(this.SectionTotalQuestions!='NA'){
					totalGrpQues += this.SectionTotalQuestions;
					}
					if(this.TotalQuestionAttempted!='NA'){
						totalGrpAttempted += this.TotalQuestionAttempted;
					}
					if(this.CorrectQuestions!='NA'){
						totalGrpCorrect += this.CorrectQuestions;
					}
					if(this.inCorrectQuestions!='NA'){
						totalGrpIncorrect += this.inCorrectQuestions;
					}
					if(this.TotalQuestionAttempted!='NA' && this.evaluatedQuestions!='NA'){
						totalGrpNotEvaluated += this.TotalQuestionAttempted-this.evaluatedQuestions;
					}
					if(this.ObtainedMarks!='NA'){
						totalGrpScore += this.ObtainedMarks;
						totalObtainedMarks=totalObtainedMarks+this.ObtainedMarks;
					}
					if(this.SectionMaxScore!='NA'){
						totalGrpMarks += this.SectionMaxScore;
					}
					
				}
			//}
		});
		
		if(grpSectCounter!=0 && this.isTypingGroup!=1){
			str += "<tr><td width='20%'>Total</td><td width='10%' align='right'>"+totalGrpQues+"</td><td width='10%' align='right'>"+totalGrpAttempted+"</td><td width='10%' align='right'>"+totalGrpCorrect+"</td><td width='10%' align='right'>"+totalGrpIncorrect+"</td>";
			//if(temp_iOAP.hasOfflineSect)
				//str += "<td width='10%'>"+totalGrpNotEvaluated+"</td>";
			str += "<td width='10%' align='right'>"+totalGrpScore+"/"+totalGrpMarks+"</td>";
			if(typeof(mockVar.displayPercentageScore)!='undefined' && mockVar.displayPercentageScore){
				if(totalGrpMarks!=0){
					var percent=((totalGrpScore/totalGrpMarks)*100).toFixed(2);
					if(percent>=0)
				str += "<td width='10%' align='right'>"+percent+"</td>";
					else
						str += "<td width='10%' align='right'>NA</td>";
				
				}
				else{
					str += "<td width='10%'>NA</td>";
				}
				
			}
			str += "</tr>";
			
		}
		str += "</tbody></table>";
		//typingStr += "</table>";
		
	
	
	});
	
	
	
	str = str + typingStr + "</div></center>";
	//console.log(str);	
	$('#questionContent').hide();
	$('#sub-header').hide();
	$("#scoreSummaryDiv").html(str);
	$('#scoreCardDiv').show();
	$('#scoreCardPrcdBtn').val(mockLabels.proceedBtnLabel);
	
	setTimeout(function(){
	$('#totalScore').html(totalObtainedMarks+"/"+totalMarks);
	
	if(cutOffMarks<=totalObtainedMarks){
		result ="PASS";
		$('#Result').html('<font size="4" color="green">'+'PASS</font>');
	}
	else{
		result="FAIL";
		$('#Result').html('<font size="4" color="red">'+'FAIL</font>');
	}
	},2000);
	$('#sc_group_summary').height($('#scoreCardDiv').outerHeight(true)-70-$('#scoreCardBtnDiv').outerHeight(true)-$('#scoreCardHeader').outerHeight(true));
}

function evaluateSAQues(ques){
	var possibleAnswers = new Array();
	var lowerLimit = 0,upperLimit = 0,splitedAnswer = '', proceed = true;
	if(ques.quesParam.answer.indexOf('.')!=-1){
		if(ques.quesParam.answer.split('.').length>2)
			proceed = false;
	}
	if(ques.answerType.toUpperCase() == 'SET' || ques.answerType.toUpperCase() == 'EQUALS'){
		possibleAnswers = ques.correctAnswer[0].split('<sa_ans_sep>');
	}else if(ques.answerType.toUpperCase() == 'RANGE'){
		splitedAnswer = ques.correctAnswer[0].split('<sa_ans_sep>');
		lowerLimit = splitedAnswer[0]<splitedAnswer[1]?splitedAnswer[0]:splitedAnswer[1];
		upperLimit = splitedAnswer[0]<splitedAnswer[1]?splitedAnswer[1]:splitedAnswer[0];
	}
	// numeric keyboard
	if(ques.keyboardType.toUpperCase() == 'NUMERIC'){
		ques.isEvaluated = true;
		if(ques.answerType.toUpperCase() == 'RANGE'){
			if(proceed && ques.quesParam.answer>lowerLimit && ques.quesParam.answer<upperLimit){
				ques.isCorrect = true;
			}
		}else{
			for(var i=0;i<possibleAnswers.length;i++){
				if(ques.answerType.toUpperCase() == 'EQUALS'){
					if(parseFloat(ques.quesParam.answer) == parseFloat(possibleAnswers[i])){
						ques.isCorrect = true;
					}
				}else if(ques.answerType.toUpperCase() == 'SET'){
					if(proceed && parseFloat(ques.quesParam.answer) == parseFloat(possibleAnswers[i])){
						ques.isCorrect = true;
						break;
					}
				}
			}
		}
	}
	// alphanumeric keyboard
	if(ques.isEvaluationRequired && ques.keyboardType.toUpperCase() == 'ALPHANUMERIC'){
		ques.isEvaluated = true;
		for(var i=0;i<possibleAnswers.length;i++){
			if(ques.answerType.toUpperCase() == 'EQUALS'){
				if(ques.isCaseSensitive && ques.correctAnswer[0] == ques.quesParam.answer){
					ques.isCorrect = true;
				}else if(!ques.isCaseSensitive && ques.correctAnswer[0].toUpperCase() == ques.quesParam.answer.toUpperCase()){
					ques.isCorrect = true;
				}
			}else if(ques.answerType.toUpperCase() == 'SET'){
				if(proceed && ques.isCaseSensitive && ques.quesParam.answer == possibleAnswers[i]){
					ques.isCorrect = true;
					break;
				}else 
				if(proceed && !ques.isCaseSensitive && ques.quesParam.answer.toUpperCase() == possibleAnswers[i].toUpperCase()){
					ques.isCorrect = true;
					break;
				}
			}
		}
	}
}

function evaluateLAnCompreQues(ques){
	if(ques.quesType.split('@@')[1]=='SA')
		evaluateSAQues(ques);
	if(ques.quesType.split('@@')[1]=='MSQ')
		evaluateMSQ(ques);
	if(ques.quesType.split('@@')[1]=='MCQ')
		evaluateMCQ(ques);	
}

function evaluateMCQ(ques){
	ques.isEvaluated = true;
	if(ques.correctAnswer == ques.quesParam.selectedOptId)
		ques.isCorrect = true;
}

function evaluateMSQ(ques){
	ques.isEvaluated = true;
	var proceed = true;
	var MSQAnswers = ques.correctAnswer;
	var givenMSQAnswers = ques.quesParam.selectedOptId.split(',');
	proceed = checkMSQ(givenMSQAnswers,MSQAnswers);
	if(proceed){
		proceed = checkMSQ(MSQAnswers,givenMSQAnswers);
	}
	if(proceed){
		ques.isCorrect = true;
	}
}

function checkMSQ(array1,array2){
	var proceed = true;
	for(var i=0; i<array1.length;i++){
		if($.inArray(array1[i], array2)==-1){
			proceed = false;
			break;
		}
	}
	return proceed;
}

function calculateScore(ques,questionStatus){
	var score = 0;
	if(ques.isCorrect){
		score += ques.allottedMarks;
	}else if(ques.isEvaluated){
		score -= ques.negMarks;
	}
	return score;
}

function evaluateTypingQues(ques, groupId){

	var grossWords=0, netWords=0, elapsedTime;
	temp_iOAP = mockVar.typingGroup[groupId];
	elapsedTime = temp_iOAP.ellapsedTime;
	// restricted typing
	if(ques.typingType.toLowerCase() === 'restricted'){
		grossWords = (temp_iOAP.keyStrokesCount + temp_iOAP.restrictedErrors)/5;
		netWords = temp_iOAP.keyStrokesCount/5;
	} // unrestricted typing
	else if(ques.typingType.toLowerCase() === 'unrestricted'){
		grossWords = temp_iOAP.typedWordCount;
		netWords = (temp_iOAP.typedWordCount) - (temp_iOAP.wrongCharCount);
	}
	temp_iOAP.GWPM = ((grossWords/elapsedTime)*60).toFixed(2);
	temp_iOAP.NWPM = ((netWords/elapsedTime)*60).toFixed(2);
	temp_iOAP.accuracy = ((temp_iOAP.NWPM/temp_iOAP.GWPM)*100).toFixed(2);
}


function loadLabel(){
	var xmlFileName="",xml;
	$('#languageSelect').val(mockVar.langName);
	xmlFileName = mockVar.langName;
	xml = readAndReturnXML('LangXML/'+xmlFileName+'.xml');
	$('#showOptionalSecSummary').html($(xml).find('OptionSectionInfo').text());
	if(iOAP.noOptSec>0){
		$('#noOptSec').html(iOAP.noOptSec);
		$('#maxOptSec').html(iOAP.maxNoOptSec);
		$("#showOptionalSecSummary").show();
	}else{
		$("#showOptionalSecSummary").hide();
	}
	mockLabels.nextQ = $(xml).find('Next').text();
	$('#saveProgram').attr('title',$(xml).find('Next').text());
	$('#saveProgram').val(mockLabels.nextQ);
	$('.UF').text($(xml).find('UsefulData').text());
	$('.UF').attr('title',$(xml).find('UsefulData').text());
	mockLabels.timeLeft = $(xml).find('TimeLeft').text();
	//$('#candidateName').text($(xml).find('Candidate').text());
	if(mockVar.storeCandResponse==1){
		$('.candOriginalName').html(mockVar.candName);
		//$('#candOriginalName').html(mockVar.candName);
		$('.candOriginalName').attr('title',mockVar.candName);
			mockLabels.candidate = mockVar.candName;
			mockLabels.SubmitGroupFinal = $(xml).find('SubmitGroupFinalOA').text();
			document.title = 'Assessment Center';
			}
		else{
			if(mockVar.mockCandidateName.length<12){
		$('.candOriginalName').html(mockVar.mockCandidateName);
		
		$('.candOriginalName').attr('title',mockVar.mockCandidateName);
		}
		else{
			var mockCandName = mockVar.mockCandidateName.substring(0,11)+'...';
			$('.candOriginalName').html(mockCandName);
			$('.candOriginalName').attr('title',mockVar.mockCandidateName);
		}
			mockLabels.candidate = mockVar.mockCandidateName;
		//	$('#candOriginalName').html(mockVar.mockCandidateName);
			mockLabels.SubmitGroupFinal = $(xml).find('SubmitGroupFinal').text();
			document.title = 'Assessment Examination Center';
		
			}
	$('.instruction_div').attr('title',$(xml).find('InstructionHover').text());
	$('#candId').html(mockVar.candId);
	$('.sect').text($(xml).find('Section').text());
	mockLabels.usefulData = $(xml).find('UsefulData').text();
	mockLabels.correctAnswerMarks = $(xml).find('MarksForCorrectAnswer').text();
	mockLabels.negativeMarks = $(xml).find('NegativeMarks').text();
	$('#correctAnswer').text(mockLabels.correctAnswerMarks);
	$('#negativeMarks').text(mockLabels.negativeMarks);
	mockLabels.questionType = $(xml).find('QuestionType').text();
	$('#questionType').text(mockLabels.questionType);
	mockLabels.questionNo = $(xml).find('QuestionNum').text();
	$('.questionNumber').text(mockLabels.questionNo);
	mockLabels.viewIn = $(xml).find('ViewIn').text();
	$('.viewIn').text($(xml).find('ViewIn').text());
	mockLabels.markForReview = $(xml).find('MarkForReview').text();
	
	$('#clearResponse').val($(xml).find('ClearResponse').text());
	$('#clearResponseGroup').val($(xml).find('ClearResponse').text());
	if($(xml).find('SaveAndNext').text().length<14){
	mockLabels.savenext = $(xml).find('SaveAndNext').text();
	mockLabels.markForReviewNext = $(xml).find('MarkForReviewNext').text();
	}
	else{
	mockLabels.savenext = $(xml).find('SaveAndNext').text().substring(0,14)+'..';
	mockLabels.markForReviewNext = $(xml).find('MarkForReviewNext').text().substring(0,14)+'..';
	}
	mockLabels.save = $(xml).find('Save').text();
	mockLabels.markAsAnswered=$(xml).find('MarkAsAnswered').text();
	$('#viewingSect').html($(xml).find('YouAreViewing').text());
	$('#quesPallet').text($(xml).find('QuestionPalette').text());
	$('#legendLabel').text($(xml).find('Legend').text());
	$('#answeredLabel').text($(xml).find('Answered').text());
	$('#notAnsweredLabel').text($(xml).find('NotAnswered').text());
	$('#markedLabel').text($(xml).find('Marked').text());
	$('#markedAndAnsweredLabel').text($(xml).find('MarkedAndAnswered').text());
	$('#notVisitedLabel').text($(xml).find('NotVisited').text());
	$('.viewProfile').text($(xml).find('Profile').text());
	$('#VI').text($(xml).find('Instructions').text());
	$('#viewQPButton').text($(xml).find('QuestionPaper').text());
	if($(xml).find('Submit').text().length<7)
	$('#finalSubmit').val($(xml).find('Submit').text());
	else
	$('#finalSubmit').val($(xml).find('Submit').text().substring(0,7)+'..');
	$('#finalTypingSub').val($(xml).find('Submit').text());
	$('#submitCodeBtn').val($(xml).find('SubmitCode').text());
	$('#submitCodeBtn').attr('title',$(xml).find('SubmitCode').text());
	$('#compileCodeBtn').val($(xml).find('Compile').text());
	$('#compileCodeBtn').attr('title',$(xml).find('Compile').text());
	
		$('#underreview').val(mockLabels.markForReviewNext);
		$('#savenext').val(mockLabels.savenext);
		//$('#savenextGroup').val(mockLabels.savenext);
		$("#underreview").attr("title",$(xml).find('MarkForReviewNext').text());
		$("#savenext").attr("title",$(xml).find('SaveAndNext').text());
		//$("#savenextGroup").attr("title",$(xml).find('SaveAndNext').text());
	
	$("#clearResponse").attr("title",$(xml).find('ClearResponse').text());
	$("#clearResponseGroup").attr("title",$(xml).find('ClearResponse').text());
	$('#viewLang').text(mockLabels.viewIn);
	mockLabels.yes = $(xml).find('Yes').text();
	mockLabels.no = $(xml).find('No').text();
	mockLabels.ok = $(xml).find('Ok').text();
	mockLabels.cancel = $(xml).find('Cancel').text();
	mockLabels.back = $(xml).find('Back').text();
	mockLabels.reset = $(xml).find('Reset').text();
	$('#reset').val($(xml).find('Reset').text());
	$('#reset').attr('title',$(xml).find('Reset').text());
	mockLabels.resetSect = $(xml).find('ResettingMessage1').text();
	mockLabels.submitGrp = $(xml).find('SubmitGroup').text();
	mockLabels.submitExam = $(xml).find('SubmitExam').text();
	$('.back').text($(xml).find('Back').text());
	$('#keyStrokesCountTd').html($(xml).find('KeyStrokesCount').text());
//	$('#backspaceCountTd').html($(xml).find('BackSpaceCount').text());
	$('#errorCountTd').html($(xml).find('ErrorCount').text());
	$('#totalWordCount').html($(xml).find('TotalWordCount').text());
	$('#typedWordCount').html($(xml).find('TypedWordCount').text());
	$('#remainingWordCount').html($(xml).find('PendingWordCount').text());
	$('#typingInstruSpan b').html($(xml).find('Instructions').text());
	$('#resInstru1').html($(xml).find('TypingInstructionRestricted1').text());
	$('#resInstru2').html($(xml).find('TypingInstructionRestricted2').text());
	$('#resInstru3').html($(xml).find('TypingInstructionCommon1').text());
	$('#resInstru4').html($(xml).find('TypingInstructionCommon2').text());
	$('#unresInstru1').html($(xml).find('TypingInstructionUnrestricted1').text());
	$('#unresInstru2').html($(xml).find('TypingInstructionUnrestricted2').text());
	$('#unresInstru3').html($(xml).find('TypingInstructionUnrestricted3').text());
	$('#unresInstru4').html($(xml).find('TypingInstructionCommon1').text());
	$('#unresInstru5').html($(xml).find('TypingInstructionCommon2').text());
	$('#stanographyInstr1').html($(xml).find('TypingInstructionUnrestricted2').text());
	$('#stanographyInstr2').html($(xml).find('TypingInstructionCommon1').text());
	$('#stanographyInstr3').html($(xml).find('TypingInstructionCommon2').text());
	mockLabels.optSectResetMsg = $(xml).find('OptionalSectionWarningMessage').text();
	mockLabels.selSectToReset = $(xml).find('SectionSelectionToReset').text();
	$(xml).find('OptionalSectionSummary').each(function(){
		mockLabels.optSectSummary = $(this).text();
		mockLabels.optSectName = $(this).attr('OptionalSectionName');
		mockLabels.secName = $(this).attr('SectionName');
		mockLabels.noOfQues = $(this).attr('NoOfQuestions');
		mockLabels.answered = $(this).attr('Answered');
		mockLabels.notAnswered = $(this).attr('NotAnswered');
		mockLabels.markReview = $(this).attr('MarkForReview');
		mockLabels.notAttempted = $(this).attr('NotVisited');
	});
	$(xml).find('ExamSummary').each(function(){
	if(mockVar.storeCandResponse==0)
		mockLabels.examSummary = $(this).text();
	else
		mockLabels.examSummary =$(xml).find('OASummary').text();
		mockLabels.curGrp = $(this).attr('CurrentGroup');
		mockLabels.keyStrokesCount = $(this).attr('GrossKeyStrokesCount');
	//	mockLabels.backspaceCount = $(this).attr('BackSpaceCount');
		mockLabels.elapsedTime = $(this).attr('ElapsedTime');
		mockLabels.yetToAttempt = $(this).attr('YetToAttempt');
		mockLabels.attemptedGrp = $(this).attr('AttemptedGroup');
		mockLabels.canView = $(this).attr('ViewAllowed');
		mockLabels.canNotView = $(this).attr('ViewNotAllowed');
		mockLabels.canEdit = $(this).attr('EditAllowed');
		mockLabels.canNotEdit = $(this).attr('EditNotAllowed');
	});
	mockLabels.deselectOptSect = $(xml).find('DeselectingMessage').text();
	mockLabels.breakTimeLeft = $(xml).find('BreakTimeLeft').text();
	mockLabels.markAnsTitle = $(xml).find('MarkedAndAnswered').text();
	mockLabels.markNotAnsTitle = $(xml).find('MarkedAndNotAnswered').text();
	mockLabels.optSectTitle = $(xml).find('ActionButtonHoverMessage2').text();
	mockLabels.grpEditNotAllowedTitle = $(xml).find('ActionButtonHoverMessage1').text();
	mockLabels.maxQuesCrossedWithMarkReview = $(xml).find('QuestionLimitMessageWithMarkedForReview').text();
	mockLabels.maxQuesCrossedWithoutMarkReview = $(xml).find('QuestionLimitMessageOnlyAnswered').text();
	mockLabels.btnSaveNext= $(xml).find('SaveAndNext').text();
	mockLabels.btnSave= $(xml).find('Save').text();
	mockLabels.btnMarkForReviewAndNext= $(xml).find('MarkForReviewNext').text();
	mockLabels.btnMarkForReview= $(xml).find('MarkForReview').text();
	mockLabels.btnClearResponse= $(xml).find('ClearResponse').text();
	$(xml).find('ScoreCard').each(function(){
		mockLabels.candName = $(this).attr('CandidateName');
		mockLabels.secScore = $(this).attr('SectionScore');
		mockLabels.secPercent = $(this).attr('SectionPercentage');
		mockLabels.gwpm = $(this).attr('GrossWPM');
		mockLabels.nwpm = $(this).attr('NetWPM');
		mockLabels.accuracy = $(this).attr('Accuracy');
		mockLabels.attempted = $(this).attr('Attempted');
		mockLabels.correct = $(this).attr('Correct');
		mockLabels.incorrect = $(this).attr('Incorrect');
		mockLabels.notEvaluated = $(this).attr('NotEvaluated');
		mockLabels.proceedBtnLabel = $(this).attr('Proceed');
	});
	$('#proceedToNextGrp').val($(xml).find('ProceedToNextGroup').text());
	$('.sysInstruLabel').html($(xml).find('Instructions').text());
	$('.otherInstruLabel').html($(xml).find('OtherImportantInstructions').text());
	$('#profileDetails').html($(xml).find('CandidateDetails').text());
	$('#candName').html($(xml).find('CandidateName').text());
	$('.cngLang').html($(xml).find('ChangeLanguage').text());
	$('#candDateOfBirth').html($(xml).find('CandDateOfBirth').text());
	if(mockVar.showEmailId == 'YES'){
		$("#emailIdText").html($(xml).find('CandidateEmailId').text());
	}
	if(mockVar.showContactNo == 'YES'){
		$("#contactNoText").html($(xml).find('CandidateMobileNo').text());
	}
	$('#viewProButton').attr('title',$(xml).find('ProfileHover').text());
	$('#viewQPButton').attr('title',$(xml).find('QuestionPaperHover').text());
	$('#finalSubmit').attr('title',$(xml).find('GroupSubmitTitle1').text());
	$('#finalTypingSub').attr('title',$(xml).find('GroupSubmitTitle1').text());
	mockLabels.quesNotAvailable = $(xml).find('AnswerSubmissionRequest6').text();
	mockLabels.timeOutSubmitMsg = $(xml).find('SummaryAlert1').text();
	mockLabels.typeCodeMsg = $(xml).find('CodeTypeMsg').text();
	$('#progDescriptionDiv').text(mockLabels.typeCodeMsg);
	mockLabels.compileAlertMsg = $(xml).find('CompileAlertMsg').text();
	mockLabels.executionAlertMsg = $(xml).find('ExecutionAlertMsg').text();
	mockLabels.compileSuccess = $(xml).find('CompileSuccessStatus').text();
	mockLabels.executionSuccess = $(xml).find('ExecutionSuccessStatus').text();
	$('#grpAnswered').text(mockLabels.answered);
	$('#grpNotAnswered').text(mockLabels.notAnswered);
	$('#grpMarkReview').text(mockLabels.markReview);
	$('#grpNotAttempted').text(mockLabels.notAttempted);
	$('#grpMarkedAndAnswered').text(mockLabels.markAnsTitle);
}

function loadIndexLabels(){
	var xmlFileName = 'English';
	if($('#languageSelect').val()!=null)
		xmlFileName = $('#languageSelect').val();
	xml = readAndReturnXML('LangXML/'+xmlFileName+'.xml');
	mockLabels.notMySystem = $(xml).find('NotMySystem').text();
	$('#LoginPageHeader').html($(xml).find('TestExpire3').text());
	$('#passwordLabel').html($(xml).find('GuestMode2').text());
	$('#changeLang').html($(xml).find('ChangeLanguage').text());
	$('#signInLabel').html($(xml).find('LoginPage4').text());
	$('#notMySystem').html($(xml).find('NameNotYours').text());
	$('#sysName').html($(xml).find('SystemName').text());
	$('#indexCandName').html($(xml).find('CandName').text());
	$('#subName').html($(xml).find('Subject').text());
	
	if(mockVar.storeCandResponse==1){	
		$('.candOriginalName').html(mockVar.candName);
		$('.candOriginalName').attr('title',mockVar.candName);
	}else{ 
		$('.candOriginalName').html(mockVar.mockCandidateName);
		$('.candOriginalName').attr('title',mockVar.mockCandidateName);
		
		}
}

function loadInstruLabels(){
	getCookie(true);
	if(document.URL.split("instructions.html?")[1].split("@@")[1].indexOf("M") == -1)
		getCandIdFromCookie();
	var xmlFileName="",xml;
	$('#languageSelect').val(mockVar.langName);
	xmlFileName = mockVar.langName;
	xml = readAndReturnXML('LangXML/'+xmlFileName+'.xml');
	$('#nextTxt').text($(xml).find('Next').text());
	mockLabels.next = $(xml).find('Next').text();
	mockLabels.previous = $(xml).find('Previous').text();
	$('#readylink font').text($(xml).find('ReadyToBegin').text());
	$('#defLang').text($(xml).find('ChooseYourDefaultLanguage').text());
	$('#multiLangInstru').text($(xml).find('DefaultLanguageMessage').text());
	$('.viewIn').html($(xml).find('ViewIn').text());
	$('.sysInstruLabel').html($(xml).find('Instructions').text());
	$('.otherInstruLabel').html($(xml).find('OtherImportantInstructions').text());
	$("#footer").html("Version : " +consoleVersion+"</div>");
	if(document.URL.split("instructions.html?")[1].split("@@")[1].indexOf("M") == -1){
		$('.candOriginalName').html(mockVar.candName);
		document.title = 'Instructions - Assessment Center';
	}
		else{
			document.title = 'Instructions - Assessment Examination Center';
			
		}
}

function feedbackPageLabel(){
	getCookie(true);
	var xmlFileName="",xml;
	$('#languageSelect').val(mockVar.langName);
	xmlFileName = mockVar.langName;
	xml = readAndReturnXML('LangXML/'+xmlFileName+'.xml');
	$('#feedbackDiv h2 u').html($(xml).find('CandidateFeedbackForm').attr('Header'));
	$('#feedbackText').html($(xml).find('CandidateFeedbackForm').text());
	$('#header1').html($(xml).find('CandidateFeedbackForm').attr('TableHeader1'));
	$('#header2').html($(xml).find('CandidateFeedbackForm').attr('TableHeader2'));
	$('#header3').html($(xml).find('CandidateFeedbackForm').attr('TableHeader3'));
	$('#ques1').html($(xml).find('CandidateFeedbackQuestion1').text());
	$('#ques2').html($(xml).find('CandidateFeedbackQuestion2').text());
	$('#ques3').html($(xml).find('CandidateFeedbackQuestion3').text());
	$('#ques31').html($(xml).find('CandidateFeedbackQuestion3a').text());
	$('#ques32').html($(xml).find('CandidateFeedbackQuestion3b').text());
	$('#ques33').html($(xml).find('CandidateFeedbackQuestion3c').text());
	$('#ques34').html($(xml).find('CandidateFeedbackQuestion3d').text());
	$('#ques35').html($(xml).find('CandidateFeedbackQuestion3e').text());
	$('#ques36').html($(xml).find('CandidateFeedbackQuestion3f').text());
	$('#ques4').html($(xml).find('CandidateFeedbackQuestion4').text());
	$('.exceedExpect').text($(xml).find('CandidateFeedBackOptions').attr('CandidateFeedBackOption1'));
	$('.metExpect').text($(xml).find('CandidateFeedBackOptions').attr('CandidateFeedBackOption2'));
	$('.needImprove').text($(xml).find('CandidateFeedBackOptions').attr('CandidateFeedBackOption3'));
	$('.failedExpect').text($(xml).find('CandidateFeedBackOptions').attr('CandidateFeedBackOption4'));
	$('#submit').text($(xml).find('Submit').text());
	if(mockVar.storeCandResponse==1){
		$('.candOriginalName').html(mockVar.candName);
		$('.candOriginalName').attr('title',mockVar.candName);
		document.title = 'Feed Back - Assessment Center';
	}
		else{
			$('.candOriginalName').html(mockVar.mockCandidateName);
			document.title = 'Feed Back - Assessment Examination Center';
			}
}

function loadClosePageLabel(){
	getCookie(true);
	var xmlFileName="",xml;
	$('#languageSelect').val(mockVar.langName);
	xmlFileName = mockVar.langName;
	xml = readAndReturnXML('LangXML/'+xmlFileName+'.xml');
	if(mockVar.storeCandResponse==0){
	$('#closeMsg').html($(xml).find('ClosePageMessage').text());
	$('#closeBtn').val($(xml).find('ClosePageMessage').attr('CloseBtnText'));
	$("#closeBtn").attr("title",$(xml).find('ClosePageMessage').attr('CloseBtnText'));
	document.title = 'Exit Page - Assessment Examination Center';
	}
	else{
		document.title = 'Exit Page - Assessment Center';
	$('#closeMsg').html($(xml).find('ClosePageMessageOA').text());
	$('#closeBtn').val($(xml).find('ClosePageMessageOA').attr('CloseBtnText'));
	$("#closeBtn").attr("title",$(xml).find('ClosePageMessageOA').attr('CloseBtnText'));
	}
}

function selLang(langVal){
	mockVar.langName = langVal;
	loadIndexLabels();
	loadLabel();
	if((iOAP.secDetails.length == 1 && iOAP.secDetails[iOAP.curSection].questions.length == 1) || ((iOAP.secDetails[iOAP.curSection].groupAllQuestions != "undefined" && iOAP.secDetails[iOAP.curSection].groupAllQuestions != "" && iOAP.secDetails[iOAP.curSection].groupAllQuestions == "true") && iOAP.secDetails.length == 1)){
		$("#underreview").attr("title",mockLabels.btnMarkForReview);
		$("#savenext").attr("title",mockLabels.btnSave);
		$("#savenextGroup").attr("title",mockLabels.btnSave);
		$('#savenextGroup').val(mockLabels.btnSave);
	}
else{
		$("#underreview").attr("title",mockLabels.btnMarkForReviewAndNext);
		$("#savenext").attr("title",mockLabels.btnSaveNext);
		$("#savenextGroup").attr("title",mockLabels.btnSaveNext);
		$('#savenextGroup').val(mockLabels.btnSaveNext);
		}
	showModule('profileDiv');
	activeLink('viewProButton');
	quizPageHeight();
}

function selViewLang(langVal){
	/*////console.log("selViewLang "+langVal);*/
	mockVar.langName = langVal;
}

function setCookie(viewInLang){
	var date = new Date();
	date.setTime(date.getTime()+(5*60*1000));
	var expires = "; expires="+date.toGMTString();
	document.cookie = "viewLangName="+viewInLang+expires+"; path=/";
}

function setCandCookie(){
	var entityId = "1";
	var candId = "123456";
	var checkSum = "password";
	var candName = "Candidate Name";
	document.cookie = "entityId="+entityId;
	document.cookie = "app_seq_no="+candId;
	document.cookie = "checksum="+checkSum;
	document.cookie = "username="+candName;
	document.cookie = "path=/";
}

function getCandIdFromCookie(){
	//setCandCookie();
	var i,x,y,defLang="",langName="",candId="11111",candMasterId="",qpId="",candName = " ",candidate_Id="",subscribedFor = '',questionType = "",ARRcookies=document.cookie;
//alert((ARRcookies != null) +" and "+ (ARRcookies!=""));	
	if(ARRcookies != null && ARRcookies!=""){
	ARRcookies = ARRcookies.split(";");
		for (i=0;i<ARRcookies.length;i++){
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x=="defaultLang"){
				defLang = y;
			}else if (x=="viewLangName"){
				langName = y;
			}else if (x=="app_seq_no"){
				candId = y;
			}else if (x=="cand_master_id"){
				candMasterId = y;
			}else if (x=="qp_id"){
				qpId = y;
			}else if (x=="username"){
				candName = y;
			}else if (x=="subscribed_for"){
				subscribedFor = y;
			}  else if(x == "xmlFilePath"){
				xmlFilePath = y;
			}
			else if (x=="candidate_Id"){
				candidate_Id = y;
			}
			else if (x=="consoleVersion"){
				consoleVersion = y;
			}else if (x=="noOfInterruptions"){
				noOfInterruptions = y;
			}else if (x=="questionType"){
				questionType = y;
			}
		}
	}else{
	//alert("Else part");
		window.location.href="error.html?E103";
	}
	if((defLang != null && defLang != "") || (langName != null || langName != "") || (candId != null || candId != "")){
		delete_cookie('qp_id');
		iOAP.defaultLang = unescape(defLang);
		//////console.log("4786 "+langName);
		mockVar.langName = (langName != null && langName != "")?unescape(langName):"English";
		mockVar.candId = unescape(candId);
		mockVar.candidate_Id=unescape(candidate_Id);
		mockVar.version=consoleVersion;
		mockVar.candMasterId = unescape(candMasterId);
		mockVar.qpId = unescape(qpId);
		mockVar.candName = (unescape(candName).replace(/\"/g, ''));
		mockVar.subscribedFor = typeof(subscribedFor)=='undefined'?"":unescape(subscribedFor);
		mockVar.questionType = unescape(questionType);
	}else{		
		window.location.href="error.html?E103";
	}
	if(mockVar.storeCandResponse==1 && (typeof(mockVar.qpId)=='undefined' || mockVar.qpId=='')){
		window.location.href="error.html?E103";
	}
}

var delete_cookie = function(name) {
	var date = new Date();
	date.setTime(date.getTime()+(5*60*1000));
    document.cookie = name + '=;expires='+date+';';
};

function getCandName(){
	//setCandCookie();
	var i,x,y,defLang="",langName="",candId="",candName = "",ARRcookies=document.cookie;
	if(ARRcookies != null && ARRcookies!=""){
		ARRcookies = ARRcookies.split(";");
		for (i=0;i<ARRcookies.length;i++){
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x=="username" && y!=null && y!=""){
				candName = y;
			}
		}
	}
	mockVar.candName = unescape(candName);
	//if(mockVar.storeCandResponse == 1 && (mockVar.candName == null || mockVar.candName == "" || mockVar.candName == "John Smith")){		
	//	window.location.href="error.html?E111";
	//}
}

function saveCandResponse(action){
	var defaultLanguage = '';
	for(var i=0;i<mockVar.languages.length;i++){
		if(mockVar.languages[i]!=null && typeof(mockVar.languages[i])!='undefined'){
			defaultLanguage = i;
			break;
		}
	}
	result.mockId = mockVar.mockId;
	result.orgId = mockVar.orgId;
	result.candidateId = mockVar.candMasterId;
	result.candMasterId = mockVar.candMasterId;
	result.qpId = mockVar.qpId;
	result.attemptId = mockVar.attemptId;
	result.useDefaultReportFormat=mockVar.useDefaultReportFormat;
	result.mockName=mockVar.mockName;
	result.subscribedFor = mockVar.subscribedFor;
	result.isMarkedForReviewConsidered=mockVar.isMarkedForReviewConsidered;
	//result.systemParameters=mockVar.systemParameters;
	var quesLangId=0,totalQues = 0,currentGroup=0,queno=0,obtainedMarks=0;
	var ques = "", quesStatus = "", GWPM = 0, NWPM = 0, accuracy = 0;
	for(var groupNo=0;groupNo<mockVar.groups.length;groupNo++){
		GWPM = 0, NWPM = 0, accuracy = 0;
		currentGroup = mockVar.groups[groupNo];
		if(currentGroup.isTypingGroup){
			typingGrpObj = mockVar.typingGroup[groupNo];
			GWPM = typingGrpObj.GWPM;
			NWPM = typingGrpObj.NWPM;
			accuracy = typingGrpObj.accuracy;
		}
		for(var i=0;i<currentGroup.secDetails.length;i++){
			totalQues = currentGroup.secDetails[i].questions.length;
			for(var j=0;j<totalQues;j++){
				ques = currentGroup.secDetails[i].questions[j];
				quesLangId = typeof(eval(ques.quesParam.langID))=='undefined' ? defaultLanguage : eval(ques.quesParam.langID);
				//alert(quesLangId);
				obtainedMarks = eval(calculateScore(ques,ques.quesParam.status));
				result.questions.push(new QuestionResultBean(ques.quesId,ques.quesType,quesLangId,ques.quesParam.selectedOptId,ques.quesParam.answer,obtainedMarks,ques.quesAnsStatus,GWPM,NWPM,accuracy));
			}
			result.secDetails.push(currentGroup.secDetails[i]);
		}
		result.groups.push(currentGroup);
		if(groupNo + 1 == mockVar.groups.length){
			sendResponseToServlet(action);
			}
	}
	
}

/*function sendResponseToServlet(){
	var jsonString = JSON.stringify(result);
	$('#pWait').show();
	$.post(
		mockVar.candResponseUrl,
		{para : "storeMockResult@#param_sep#@"+jsonString},
		function(data) {
			alert(data.ERROR);
			$('#pWait').hide();
			if(data.ERROR.toString().indexOf('Exam has been submitted successfully.')!=-1){
				moveToScoreCardDisplay();
			}else{
				window.close();
			}
		}
	,"json");
}*/
var DataError;
function sendResponseToServlet(action){
	//var jsonString = JSON.stringify(result);
	isfinalSubmit = true;
	isFinalSubmitStarted=true;
	isPageRedirecting = true;
	var jsonString = JSON.stringify(mockVar);
	$('#pWait').show();
	$.post(
		mockVar.candResponseUrl,
		/*{para : "storeBackup@#param_sep#@"+jsonString+"@#param_sep#@"+"true@#param_sep#@"+authenticationKey},*/
		{para : "storeBackup@#param_sep#@"+jsonString+"@#param_sep#@true"},
		function(data) {
		isfinalSubmit = true;
		DataError = data;
		cnfPop('submitOnlineAssessment');
		$("#submitOnlineMsg").html(action+" "+DataError.ERROR);
		}
	,"json");
}

function submitOnlineAssessment(){

	$('#pWait').hide();
	
	if(DataError.ERROR.indexOf('Assessment has been submitted successfully.')!=-1){
		if(mockVar.displayScoreCard){
			
			showScoreCardForOnlineAssessment(DataError.scoreCardJson, DataError.CutOFFMarks, DataError.TotalMarks);
		}
		else{
			moveToFeedback();	
		}
	}else{
		window.close();
	}
	DataError="";


}

var missedCount = 0;
function saveBackUp(){
	var jsonString = JSON.stringify(mockVar);
	//$('#pWait').show();
	if(!isFinalSubmitStarted){
	$.post(
		mockVar.candResponseUrl,
		//{para : "storeBackup@#param_sep#@"+jsonString+"@#param_sep#@"+"false@#param_sep#@"+authenticationKey},
		{para : "storeBackup@#param_sep#@"+jsonString+"@#param_sep#@"+"false"},
		function(data) {
		if(data != null && data.ERROR != null){
		isfinalSubmit = true;
		cnfPop('backupAlerts');
		$("#backupAlertMsg").html(data.ERROR);
			}
		else if(data!=null && data.Fail != null && data.Fail != '') {
		missedCount++;
		}
		else{
		missedCount = 0;
		}
		}
	,"json")
		.fail(function(){
			missedCount++;
		})
	if(missedCount==2){
		isfinalSubmit = true;
		cnfPop('backupAlerts');
		$("#backupAlertMsg").html("Could not connect to server. Please check your internet connectivity and try again");
	}
	
	if(mockVar.backupTimeInterval>0){
		setTimeout(function(){//////console.log(5124);
		if(!isFinalSubmitStarted)
		saveBackUp();},mockVar.backupTimeInterval);
	}
	}
}

function compileCode(){
	if($.trim(editor.getValue()).length!=0){
	//isfinalSubmit = true;
	cnfPop('InfoPopup');
	$("#infoMsg2").html(mockLabels.compileAlertMsg);
		mockVar.curQuesBean.programingStatus = 'CompiledSuccess';
		compileSuccessMsg();
		quizPageHeight();
	}
}

function executeCode(){
	if($.trim(editor.getValue()).length!=0){
//	isfinalSubmit = true;
	cnfPop('InfoPopup');
	$("#infoMsg2").html(mockLabels.executionAlertMsg);
		fnSubmit('submitPrograming');
		mockVar.curQuesBean.programingStatus = 'ExecutedSuccess';
		executionSuccessMsg();
		quizPageHeight();
	}
}

function executionSuccessMsg(){
	$("#progStatusDisplay").show();
	$("#statusText").html(mockLabels.executionSuccess);
	$("#TestCaseReport").show();
	$("#maximg").show();
	
}
function compileSuccessMsg(){
	$("#progStatusDisplay").show();
	$("#statusText").html(mockLabels.compileSuccess);
	$("#maximg").hide();
}

function openHintPopUp(obj){
	$('#hintDiv').css('left', $(obj).position().left-5);
	$('#hintDiv').css('top', $(obj).position().top+32);
	$('#hintDiv').show();
}

function closeHintPopup(){
	$('#hintDiv').hide();
}
//** Audit Log **//
var currentGroupIndex = 0;
var currentSectionIndex = 0;
var currentQuestionIndex = 0;

function getCurrentGrpSecQuestId(isAudilogRequired,quesNo){
//////console.log("getCurrentGrpSecQuestId");
var auditDesc = "";
	currentGroupIndex = mockVar.currentGrp
	
	//////console.log(mockVar.groups.indexOf())
//	////console.log("currentGroupId "+currentGroupIndex);
	currentSectionIndex = iOAP.curSection;
//	////console.log("currentSectionId "+currentSectionIndex);
	currentQuestionIndex = iOAP.curQues;
	//////console.log("currentQuestionId "+currentQuestionIndex);
	if(isAudilogRequired){
	auditDesc = "Question "+(quesNo + 1)+" visited from question pallete";
	currentQuestionIndex = quesNo;
	auditlogCreation("Question Pallete",auditDesc);
	}
}

jQuery(document).ready(function(){
	jQuery(".auditlog").click(function(event) {
		//////console.log(event.target.id);
		var id = event.target.id;
		var value = jQuery("#"+id).val();
		auditlogCreation(value,"");
	
});	

jQuery(".auditlogButton").click(function(event){
	var id = event.target.id;
	var value = jQuery("#"+id).text();
	if(value == "")
		value = jQuery("#"+id).val();
	var AuditJsonObject = new Object();
	var orgId = 0;
	var attemptId = 0;
	var mockId = 0;
	var candMasterId = 0;
	var buttonStatus = false;
		AuditJsonObject.ActionName = value;
		if(id == "submit"){
		var url = document.URL;
			AuditJsonObject.ActionDesc = "Feedback submit button clicked";
				var params = url.split("FeedBack.html?");
				orgId = $.trim(params[1]).split("@@")[0];
				mockId = $.trim(params[1]).split("@@")[1];
				candMasterId = $.trim(params[1]).split("@@")[2];
				attemptId = $.trim(params[1]).split("@@")[3];
				if(attemptId.indexOf("#") > 0 )
					attemptId = attemptId.substring(0,attemptId.indexOf("#"));
				buttonStatus = true;
			}
		else {
			AuditJsonObject.ActionDesc = value+" button clicked";
				orgId = mockVar.orgId;
				mockId = mockVar.mockId;
				candMasterId =mockVar.candMasterId;
				attemptId = mockVar.attemptId;
				buttonStatus = false;
			}
		if(value == "Submit")
			AuditJsonObject.GroupId = mockVar.groups[mockVar.currentGrp].groupId;
		else
			AuditJsonObject.GroupId = "NA";
		AuditJsonObject.SectionId = "NA";
		AuditJsonObject.QuestionId = "NA";
		AuditJsonObject.SelectedOptionId = "NA";
		AuditJsonObject.OptionSequence = "NA";
		var currentDate = new Date();
		AuditJsonObject.Time = currentDate.yyyymmddHHmmss();
		AuditJson.push(AuditJsonObject);
		if(id == "submit" || value == "Submit"){
			buttonStatus = true;
			auditLogBackUp(buttonStatus,candMasterId,attemptId,mockId,orgId);
			}
		
});




	/*jQuery(".allSections").click(function(event){
	
	});*/

		});

function auditlogCreation(id,auditDesc){
	//////console.log(id);
	var k = 0;
	
	if(auditDesc == ""){
		auditDesc = id+" button clicked";
	} else {
	
	}
	
	var currentSectionDetails = mockVar.groups[currentGroupIndex].secDetails[currentSectionIndex];
	var currentQuestionDetails = currentSectionDetails.questions[currentQuestionIndex];
		var optionSequence = "";
		var AuditJsonObject = new Object();
		AuditJsonObject.ActionName = id;
		AuditJsonObject.ActionDesc = auditDesc;
		AuditJsonObject.GroupId = mockVar.groups[currentGroupIndex].groupId;
		AuditJsonObject.SectionId = currentSectionDetails.secId;
		AuditJsonObject.QuestionId = currentQuestionDetails.quesId;
		
		
		var currentDate = new Date();
		AuditJsonObject.Time = currentDate.yyyymmddHHmmss();
		
		
		if(currentQuestionDetails.quesType == "MCQ" || currentQuestionDetails.quesType == "MSQ" ){
			var length = currentQuestionDetails.options.length;
			for(var i=0;i<length;i++){
			k = i + 1;
				optionSequence = optionSequence + k + ")"+ currentQuestionDetails.options[i].optId+" ";
				AuditJsonObject.OptionSequence = optionSequence;
			}
		}  else {
			AuditJsonObject.OptionSequence = "NA";
		
		}/*else if(currentQuestionDetails.quesType == "MSQ" ){
			var length = currentQuestionDetails.options.length;
			for(var i=0;i<length;i++){
			k = i + 1;
				optionSequence = optionSequence + k + ")"+ currentQuestionDetails.options[i].optId;
			}
		}*/
		if(currentQuestionDetails.quesParam.status != "notanswered"){
	//		////console.log("Answer: "+currentQuestionDetails.quesParam.selectedOptId);
			AuditJsonObject.SelectedOptionId = currentQuestionDetails.quesParam.selectedOptId.replace(/,/g , "@_@");
		
		} else {
			AuditJsonObject.SelectedOptionId = "NA";
		}
		AuditJson.push(AuditJsonObject);
}			


Date.prototype.yyyymmddHHmmss = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); 
   var dd  = this.getDate().toString();
   var timeValue = this.getHours() +":"+this.getMinutes()+":"+this.getSeconds();
   return yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0])+" "+timeValue; // padding
  };			

jQuery(document).ready(function(){
if(document.URL.indexOf("quiz.html") > 0){ 
setTimeout(function(){
auditLogBackUp(false,mockVar.candMasterId,mockVar.attemptId,mockVar.mockId,mockVar.orgId);
},5000)
}
});
function auditLogBackUp(isFinal,candMasterId,attemptId,mockId,orgId){
//alert(isFinal);
var timeout = 0;
if(!isFinal){
timeout = 30000;
} 

if(candMasterId == ""){


}
setTimeout(function(){
dummyAuditJson = AuditJson;

//////console.log("AuditJSON "+JSON.stringify(AuditJson));
AuditJson = null;
AuditJson = new Array();
//////console.log(mockVar.storeCandResponse);
	if(dummyAuditJson.length > 0 && mockVar.storeCandResponse == 1 ){
		//////console.log("DummyAuditJSON "+JSON.stringify(dummyAuditJson));
		var paramsvalue = {};
		getCookie(true);
		paramsvalue["auditJson"] = JSON.stringify(dummyAuditJson);
		paramsvalue["candMasterId"] = candMasterId;
		paramsvalue["attemptNo"] = attemptId;
		paramsvalue["orgId"] = orgId ;
		paramsvalue["mockId"] = mockId;
		paramsvalue["xmlFilePath"] = xmlFilePath;
			var URL = "/ASM/MockAssessmentAction.do?action=saveAuditLog";
  jQuery.ajax({
                url: URL,
                async: true,
                type: 'POST',
				data: paramsvalue,
                dataType: 'text',
                success: function(data) {
                	//	////console.log(data);			 
					 }
					 });
	} else {
		dummyAuditJson = null;
	}
			if(timeout != 0){
				auditLogBackUp(false,candMasterId,attemptId,mockId,orgId);
				}
		},timeout);
}


function maintainReadyAudit(){
var url = document.URL;
//////console.log("Ready to begin");
		var AuditJsonObject = new Object();
		AuditJsonObject.ActionName = "I am ready to begin";
		AuditJsonObject.ActionDesc = "Selected "+jQuery("#defaultLanguage option:selected").text()+" as default launguage";
		AuditJsonObject.GroupId = "NA";
		AuditJsonObject.SectionId = "NA";
		AuditJsonObject.QuestionId = "NA";
		AuditJsonObject.SelectedOptionId = "NA";
		AuditJsonObject.OptionSequence = "NA";
		var currentDate = new Date();
		AuditJsonObject.Time = currentDate.yyyymmddHHmmss();
		AuditJson.push(AuditJsonObject);
		
				var params = url.split("instructions.html?");
				var orgId = $.trim(params[1]).split("@@")[0];
				var mockId = $.trim(params[1]).split("@@")[1];
				var attemptId = $.trim(params[1]).split("@@")[2];
				var candMasterId = $.trim(params[1]).split("@@")[3];
				if(candMasterId.indexOf("#") > 0)
				 candMasterId = candMasterId.substring(0,candMasterId.indexOf("#"));
		auditLogBackUp(true,candMasterId,attemptId,mockId,orgId);
		
		//////console.log(mockVar.candMasterId+" "+mockVar.attemptId+" "+mockVar.orgId+" "+mockVar.mockId);
		//alert("Ra");
		
		
		
}


function saveSysConfig(orgId,mockId,candMasterId,attemptNo){
	var systemParameters = systemConfigurationParameters;
	var URL = "/ASM/MockAssessmentAction.do?action=saveSysConfig";
	var paramsvalue = {};
	paramsvalue["candMasterId"] = candMasterId;
	paramsvalue["attemptNo"] = attemptNo;
	paramsvalue["orgId"] = orgId ;
	paramsvalue["mockId"] = mockId;
	
	var systemConfigParameters = systemParameters;
	
	var x,y;
			var cookieValues = document.cookie.split(";");	
	if(cookieValues != null && cookieValues != ""){
		for (i=0;i<cookieValues.length;i++){
			x=cookieValues[i].substr(0,cookieValues[i].indexOf("="));
			y=cookieValues[i].substr(cookieValues[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x=="StateName"){
				systemConfigParameters.StateName = y;
			}else if (x=="StateShortName"){
				systemConfigParameters.StateShortName =  y;
			}else if (x=="CountryName"){
				systemConfigParameters.CountryName = y;
			}else if (x=="CountryShortName"){
				systemConfigParameters.CountryShortName =  y;
			}else if (x=="CityName"){
				systemConfigParameters.CityName = y;
			}else if (x=="CityShortName"){
				systemConfigParameters.CityShortName =  y;
			}
		}
	}
	
	//////console.log(systemConfigParameters);
	//systemConfigParameters.ipAddress = ipAddress;
	paramsvalue["systemParameters"] = systemConfigParameters;
	  jQuery.ajax({
	                url: URL,
	                async: true,
	                type: 'POST',
					data: paramsvalue,
	                dataType: 'text',
	                success: function(data) {
	                	//	////console.log(data);			 
						 }
						 });

} 

var isOkClicked = false;
var focused = true;
var interruptionTimer = 10;
 window.onblur = function(e) {
	 var AuditJsonObject = new Object();
			AuditJsonObject.ActionName = "Interruption Warning Message";
			AuditJsonObject.ActionDesc = "Assessment is interrupted";
			AuditJsonObject.GroupId = "NA";
			AuditJsonObject.SectionId = "NA";
			AuditJsonObject.QuestionId = "NA";
			AuditJsonObject.SelectedOptionId = "NA";
			AuditJsonObject.OptionSequence = "NA";
			var currentDate = new Date();
			AuditJsonObject.Time = currentDate.yyyymmddHHmmss();
			AuditJson.push(AuditJsonObject);
// var className = $(e.target).attr('class');
 //className = "."+className;
	 e = e || window.event;
 var isPlayer = false;
 var className = $(e.target).attr('class');
 if(typeof(className) != 'undefined' && className.indexOf("jp-") >=0){
	//alert(className);
	isPlayer = true;
	isfinalSubmit = true;
	}
	

var url = document.URL;

 setTimeout(function(){
 if(url.indexOf("quiz.html") > 0 && !isfinalSubmit && !isPlayer && mockVar.storeCandResponse == 1){
    focused = (e || event).type === "focus";
	isPlayer = false;
	isfinalSubmit = false;
	if(!focused){
		noOfInterruptions=parseInt(noOfInterruptions+"")+1;
		remainingInterruptions=remainingInterruptions-1;
		
		//alert(remainingInterruptions);
		if(remainingInterruptions>=0 && allowInterruptions=='NO'){
		saveBackUp();
		InterruptionTimer(interruptionTimer);
		displayPopup('warningPopup');
		$("#seterror").html("Your Assessment is interrupted due to one of the following reasons: <br></br> <ol><li> You are trying to minimize OR toggle Assessment console </li><li> You have pressed special keys from your keyboard which are not allowed during Assessment. </li> <li> You have tried to move out of Assessment console which is not allowed.</li> <li> You have tried to refresh the page.</li></ol> All the interruptions during the Assessment are recorded.If you exceed the number of allowed interruptions, your Assessment will be locked and can only be unlocked by Administrator.<br></br><span style='color:red;text-transform:uppercase;font-weight:bold'>Your Assessment Window will close down in <br> <span id='interruptionTimer' style='color:black;font-size:30px;margin-left:140px'>10</span> seconds <br> Click OK to resume</span>");
		
		
		setTimeout(function(){
			if(isOkClicked){
			isOkClicked = false;
		}
		else{
			var params = url.split("quiz.html?");
			var orgId = $.trim(params[1]).split("@@")[0];
			var mockId = $.trim(params[1]).split("@@")[1];
			var attemptId = $.trim(params[1]).split("@@")[2];
			var candMasterId = $.trim(params[1]).split("@@")[3];
			if(candMasterId.indexOf("#") > 0)
			 candMasterId = candMasterId.substring(0,candMasterId.indexOf("#"));
	auditLogBackUp(true,candMasterId,attemptId,mockId,orgId);
	updateInterruptions(parseInt(noOfInterruptions+""),"");
	explicitClose=true;
			window.close();
		}
		},10000);
	}	else if(allowInterruptions=='NO'){
		updateInterruptions(parseInt(noOfInterruptions+""),"Locked");
		toErrorPage=true;
		window.location.href ="error.html?E116#"+errorPageContent;
	}
	}
	
	} else {
		isPlayer = false;
		isfinalSubmit = false;
	}
	},15);
 	
}
var interruptionTimeout;

function InterruptionTimer(interruptionTimer){
	$("#interruptionTimer").html(convertInterruptionTime(interruptionTimer));
	interruptionTimeout = setTimeout(function(){InterruptionTimer(interruptionTimer-1);},1000);
}

function isOkClickedWarning(){
	isOkClicked = true;
	$('.overlayForInterruption').hide();
	$('.warningPopup').hide();
	clearTimeout(interruptionTimeout);
	var AuditJsonObject = new Object();
	AuditJsonObject.ActionName = "Assessment resumed after interruption";
	AuditJsonObject.ActionDesc = "Interruption Ok button Clicked";
	AuditJsonObject.GroupId = "NA";
	AuditJsonObject.SectionId = "NA";
	AuditJsonObject.QuestionId = "NA";
	AuditJsonObject.SelectedOptionId = "NA";
	AuditJsonObject.OptionSequence = "NA";
	var currentDate = new Date();
	AuditJsonObject.Time = currentDate.yyyymmddHHmmss();
	AuditJson.push(AuditJsonObject);
	updateInterruptions(parseInt(noOfInterruptions+""),"");
}
 jQuery(document).ready(function(){
	 
	 $('#closeButton').click(function(){
			$('#loadCalc').hide();
		});
	$("input").on("drop", function(event) {
   event.preventDefault();  
   event.stopPropagation();
});
//$("#quesOuterDiv").on("click", function(event) {
//	$( "#answer" ).trigger('blur');
//});
$("textarea").on("drop", function(event) {
   event.preventDefault();  
   event.stopPropagation();
}); 
$(document).on('mousedown',function (){
		$(".jp-full-screen").hide();
		});
		
$(document).on('keydown',function (){
		$(".jp-full-screen").hide();
		});
		
		});
Array.prototype.sortBy = function(p) {
	  return this.slice(0).sort(function(a,b) {
	    return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
	  });
	};

	function cnfPop(id)
	{
		$('.overlay').show();
		$('#'+id).show();
		var pLft = ( $(window).width() - $('#'+id).width() )/2;
		var pTop = ( $(window).height() - $('#'+id).height() )/2;
		$('#'+id).css({'left':pLft+'px'});
		$('#'+id).css({'top':pTop+'px'});
	}
function displayPopup(id)
	{	$('.overlay').hide();
		$('.confrmPopup').hide();
		$('.overlayForInterruption').show();
		$('#'+id).show();
		var pLft = ( $(window).width() - $('#'+id).width() )/2;
		var pTop = ( $(window).height() - $('#'+id).height() - 200 )/2;
		$('#'+id).css({'left':pLft+'px'});
		$('#'+id).css({'top':pTop+'px'});
	}
	
$(function(){
	$('.popClose, .cnfPopNo').click(function(){
		$('.overlay').hide();
		$('.confrmPopup').hide();
	});
});

function setCursorPos(input, start, end) {
	try{
		if (arguments.length < 3) end = start;
	    if ("selectionStart" in input) {
	        setTimeout(function() {
	            input.selectionStart = start;
	            input.selectionEnd = start+1;
	        }, 1);
	    }
	    else if (input.createTextRange) {
	        var rng = input.createTextRange();
	        rng.moveStart("character", start);
	        rng.collapse();
	        rng.moveEnd("character", end - start);
	        rng.select();
	    }
	}catch(e){
		
	}
}
$(document).on("dragstart", function(e) {
    if (e.target.nodeName.toUpperCase() == "IMG" || e.target.nodeName.toUpperCase() == "A") {
        return false;
    }
});
 
$(document).on("keydown", function (e) {
    if ((e.which === 8 && !$(e.target).is("input, textarea")) || (e.which == 37 && e.altKey) || (e.which == 39 && e.altKey) ) {
        e.preventDefault();
    }
});
	/*KeyboarLock Started*/
	
	/*KeyboarLock Completed*/
	
window.onbeforeunload = function(event) {
var url = document.URL;
if((mockVar.mockId.indexOf("M") == -1) && (url.indexOf("quiz.html")>=0)){
	
	//mockVar.closingTime=Math.round((new Date().getTime() / 1000));
	saveBackUp();
	if(explicitClose){
	updateInterruptions(parseInt(noOfInterruptions+""),"");
	}
	else{
		//parseInt(noOfInterruptions)=parseInt(noOfInterruptions)+1;
		remainingInterruptions=remainingInterruptions-1;
		if(remainingInterruptions>=0){
		updateInterruptions((parseInt(noOfInterruptions+"")+1),"");
		}
		else if(remainingInterruptions==-1){
			updateInterruptions((parseInt(noOfInterruptions+"")+1),"Locked");
		}
		else if(toErrorPage){
			updateInterruptions((parseInt(noOfInterruptions+"")),"Locked");
		}
		else{
			updateInterruptions((parseInt(noOfInterruptions+"")+1),"Locked");
		}
	}
	//authenticationFileDeleted();
}
};	
	
function authenticationFileDeleted(){
var url = document.URL;
	var orgId;
	var assessmentId;
	if(url.indexOf("quiz.html")>=0 && !isPageRedirecting){
		var params = url.split(".html?");
		var paramsData = $.trim(params[1]).split("@@");
		orgId= paramsData[0];
		assessmentId = paramsData[1];
		var attemptId = paramsData[2];
		var candMasterId = paramsData[3];
		if(assessmentId.indexOf("M") == -1){
			var xmlURL = "/ASM/MockAssessmentAction.do?action=deleteAuthenticationFile&orgId="+orgId+"&mockId="+assessmentId+"&candMasterId="+candMasterId+"&attemptNo="+attemptId;
  jQuery.ajax({
                url: xmlURL,
                async: false,
                type: 'POST',
                dataType: 'text',
                success: function(data) {
				
					}
					});
					}
					}

}	

		function submitLockedAttempt(){
			var url = document.URL;
				var orgId;
				var assessmentId;
				var attemptId ;
				var candMasterId ;
				var paramsData= url.split("#");
				if(paramsData.length>1){
				var params =paramsData[1];
				}
				var paramValues=params.split("@@");
		
				orgId= paramValues[0];
				assessmentId = paramValues[1];
				attemptId = paramValues[2];
				candMasterId = paramValues[3];
		
					if(assessmentId.indexOf("M") == -1){
						var xmlURL = "/ASM/MockAssessmentAction.do?action=CandidateSubmit&orgId="+orgId+"&mockId="+assessmentId+"&candMasterId="+candMasterId+"&attemptNo="+attemptId;
			  jQuery.ajax({
			                url: xmlURL,
			                async: false,
			                type: 'POST',
			                dataType: 'text',
			                success: function(data) {
		
			                	if(typeof(data)!='undefined' && data!='' && data=='true'){
			                	cnfPop('submitOnlineAssessment');
			                	$("#submitOnlineMsg").html("Your Attempt is Successfully submitted");
			                	}
			                	
								}
								});
								}
			} 

function updateInterruptions(noOfInterruptions,status){
	var url = document.URL;
		var orgId;
		var assessmentId;
		var params = url.split(".html?");
		var paramsData = $.trim(params[1]).split("@@");
		orgId= paramsData[0];
		assessmentId = paramsData[1];
			var attemptId = paramsData[2];
			var candMasterId = paramsData[3];
			if(assessmentId.indexOf("M") == -1){
				var xmlURL = "/ASM/MockAssessmentAction.do?action=updateInterruptions&orgId="+orgId+"&mockId="+assessmentId+"&candMasterId="+candMasterId+"&attemptNo="+attemptId+"&noOfInterruptions="+noOfInterruptions+"&status="+status;
	  jQuery.ajax({
	                url: xmlURL,
	                async: false,
	                type: 'POST',
	                dataType: 'text',
	                success: function(data) {
					
						}
						});
						}
	}
$(document).bind('keydown', function(e) {		
    if(e.which == 116 || e.keycode == 116) {		
     //  console.log('blocked');		
	 e.preventDefault();		
       return false;		
    }		
    if(e.which == 82 && e.ctrlKey) {		
     //  console.log('blocked');		
	 e.preventDefault();		
       return false;		
    }		
});

function windowClose(){
	
	window.close();
	
}
//added by Sindhu
function fillfeedbackDiv(){
	if(mockVar.storeCandResponse==1){
	$(".ratingDiv").hide();
	$(".default").empty();
		$.ajaxSetup({
		async: false
		});
		$.getJSON(xmlFilePath+'/feedback.json', function(data){
		 feedbackdata = data;
			$.ajaxSetup({
			async: true
			});
		})
	fillfeedbackQuestions();
	}
}

function fillfeedbackQuestions(){
var str = "<table class='feedback_table' id='feedbackTableDiv'> <thead><tr><th style='width:5%' class='textCenter' id='header1'>S.No</th><th id='header2'>Questions</th></tr></thead><tbody>";
var question;
	for(var i=0;i<feedbackdata.QuestionsList.length;i++){
		question=feedbackdata.QuestionsList[i];
		str +="<tr><td class='textCenter fontBold'>"+question.QuesId+"</td><td>"+question.QuesText+"</td></tr>";
		str +="<tr><td></td>";
		if(question.QuesType=='MCQ'){
		str +="<td><table><tr>";
			options=question.options;
			if(options.length>0){
				for(var j=0;j<options.length;j++){
					option=options[j];
					str +="<td><input type='radio' name='ques"+question.QuesId+"' onmousedown='this.check = this.checked'  onclick='if (this.check) this.checked = false' value='"+option.OptId+"'/>"+option.OptText+"</td>";
				}
			}
		str +="</tr></table></td>";
		}else if(question.QuesType=='MSQ'){
		str +="<td><table><tr>";
			options=question.options;
			if(options.length>0){
				for(var j=0;j<options.length;j++){
					option=options[j];
					str +="<td><input type='checkbox' name='ques"+question.QuesId+"' onmousedown='this.check = this.checked'  onclick='if (this.check) this.checked = false' value='"+option.OptId+"'/>"+option.OptText+"</td>";
				}
			}
		str +="</tr></table></td>";
		}else{
		   str +="<td><textarea id='ques"+question.QuesId+"' name='feedbackTextArea' style='height:50px;width:95%;resize:none;overflow:auto;'></textarea></td>";
		}
		str += "</tr>";
	}
	str +="</tr></table></td></tr>";
$(".default").html(str);


/*if(i<feedbackdata.QuestionsList.length){
var str1='';
	str1 = "<table class='feedback_table' id='feedbackTableDiv'> <thead><tr><th style='width:5%' class='textCenter' id='header1'>S.No</th><th id='header2'>Questions</th></tr></thead><tbody>";
	var options;
	var option;
	while(i<feedbackdata.QuestionsList.length){
			question=feedbackdata.QuestionsList[i];
			str1 +="<tr><td class='textCenter fontBold'>"+question.QuesId+"</td><td>"+question.QuesText+"</td></tr>";
			str1 +="<tr><td></td>";
			if(question.QuesType=='MCQ'){
			str1 +="<td><table><tr>";
				options=question.options;
				if(options.length>0){
					for(j=0;j<options.length;j++){
						option=options[j];
						str1 +="<td><input type='radio' name='ques"+question.QuesId+"' onmousedown='this.check = this.checked'  onclick='if (this.check) this.checked = false' value='"+option.OptId+"'/>"+option.OptText+"</td>";
					}
				}
			str1 +="</tr></table></td>";
			}else if(question.QuesType=='MSQ'){
			str1 +="<td><table><tr>";
				options=question.options;
				if(options.length>0){
					for(j=0;j<options.length;j++){
						option=options[j];
						str1 +="<td><input type='checkbox' name='ques"+question.QuesId+"' onmousedown='this.check = this.checked'  onclick='if (this.check) this.checked = false' value='"+option.OptId+"'/>"+option.OptText+"</td>";
					}
				}
			str1 +="</tr></table></td>";
			}else{
			   str1 +="<td><textarea id='ques"+question.QuesId+"' name='feedbackTextArea' style='height:50px;width:95%;resize:none;overflow:auto;'></textarea></td>";
			}
			str1 += "</tr>";
			i++;
		}
	str1 +="</tr></table></td></tr>";
	$(".configurableDiv").html(str1);
	
}*/
}
function submitFeedback(){
if(mockVar.storeCandResponse==1){
var question;
var selectedOptId='';
var answers;
var selectedAnswer='';
var options;
var option;

	for(var i=0;i<feedbackdata.QuestionsList.length;i++){
	question=feedbackdata.QuestionsList[i];
		var elementName="ques"+question.QuesId;
		selectedOptId ='';
		selectedAnswer ='';
		//feedbackBean.QuesId=question.QuesId;
		if(question.QuesType=='MCQ' || question.QuesType=='MSQ'){
			answers = document.getElementsByName(elementName);
			options = question.options;
			for(var j=0;j<answers.length;j++)	
			{
				if(answers[j].checked==true)
				{
					selectedOptId = (answers[j].value) + "," + selectedOptId;
					for(var k=0;k<options.length;k++){
						option=options[k];
						if(option.OptId==answers[j].value){
							selectedAnswer =  option.OptText +"," + selectedAnswer;
						}
					}	
				}
			}
			if(selectedOptId!='')
				selectedOptId = selectedOptId.substring(0,selectedOptId.length-1);
			if(selectedAnswer !="")
				selectedAnswer = selectedAnswer.substring(0,selectedAnswer.length-1);
		}else{
			selectedOptId = '';
			selectedAnswer = document.getElementById(elementName).value;
		}
		
		feedbackdata.QuestionsList[i].SelectedOptId = selectedOptId;
		feedbackdata.QuestionsList[i].GivenAnswer = selectedAnswer;
	}
	
	savefeedbackresponses(feedbackdata);
	}			
}
function savefeedbackresponses(feedbackdata){
var URL = "/ASM/MockAssessmentAction.do?action=savecandfeedback";
var jsonString = JSON.stringify(feedbackdata);
var paramsvalue = {};
	paramsvalue["candMasterId"] = mockVar.candMasterId;
	paramsvalue["attemptNo"] = mockVar.AttemptId;
	paramsvalue["orgId"] = mockVar.orgId;
	paramsvalue["mockId"] = mockVar.mockId;
	paramsvalue["candFeedback"] = jsonString;
	 jQuery.ajax({
	                url: URL,
	                async: true,
	                type: 'POST',
					data: paramsvalue,
	                dataType: 'text',
	                success: function(data) {
	                	//	////console.log(data);			 
						 }
						 });
}
function validateKeyboardNumeric(idnum){
		
		vKeyboard.saTypeQuesID = idnum;

	}

//added by Sindhu