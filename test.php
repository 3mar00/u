<?php

include 'config.php';

$email = $_POST['email'];
$pass = $_POST['password'];

$ch = "SELECT * FROM `items` where user='$email'";

$ff = $con->query($ch);

print_r($ff)


?>