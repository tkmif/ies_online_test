<?php 
	include_once("generateqnpaper.php");
	$count =0;
function setInterval($f, $milliseconds)
{
    $seconds=(int)$milliseconds/1000;
    while(true)
    {
        $f();
        sleep($seconds);
    }
}
function incr($count){
	echo "<script>window.alert(".$count.");</script>";
	$count += $count;
	setInterval(incr($count), 5000);
}

incr($count);
 ?>
<!DOCTYPE html>
<html>
<head>

</head>
<body>


</body>
</html>

