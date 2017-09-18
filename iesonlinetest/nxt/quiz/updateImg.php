<?php 
include_once("generateqnpaper.php");
$qt = $_REQUEST["qt"];
$qnum = $_REQUEST["qnum"];
$status = $_REQUEST["status"];

$qid = getQuestid($qt,$qnum);
$cc = getChosenChoice($qid);
$cstatus = getStatus($qid);

$buttonId = "#navButs".$qnum;

if($status == 1 && $cc == 0){
	echo "
	<script>
	 $(". $buttonId .").addClass('visited');
	</script>
	";
}
if ($status == 1 && $cc != 0) {
	echo "
	<script>
	 $(". $buttonId .").addClass('answered');
	</script>
	";
}
if($status == 3 && $cc == 0){
	echo "
	<script>
	 $(". $buttonId .").addClass('marked4review');
	</script>
	";
}
if($status == 3 && $cc != 0){
	echo "
	<script>
	 $(". $buttonId .").addClass('ansmarked');
	</script>
	";
}


 ?>