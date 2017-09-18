<?php
session_start();
include_once("generateqnpaper.php");
// Delete certain session
unset($_SESSION['login_user']);
unset($_SESSION['login_username']);
unset($_SESSION['test_cat']);
unset($_SESSION['test_id']);
unset($_SESSION['test_id']);

$studentTable = $_SESSION['tblname'];

unset($_SESSION['tblname']);
unset($_SESSION['qnbankids']);
unset($_SESSION['qntypeid']);
unset($_SESSION['qntypeid']);
// Delete all session variables
// session_destroy();
session_destroy();
//delete the student table
flushTable($studentTable);
// Jump to login page
//header('Location: http://localhost/ies_online_test/login.php');
//close the window
echo "<script>window.close();</script>";
?>
