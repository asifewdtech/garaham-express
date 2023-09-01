<?php
	ob_start();
	define('baseUrl',"https://viraly.io");
	define('root',$_SERVER['DOCUMENT_ROOT'].'/viralyIO');
	if (!session_id()) { session_start(); }
	require_once (root.'/api/vendor/autoload.php');
	require_once("functions.php");