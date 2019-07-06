<?php
include $_SERVER['DOCUMENT_ROOT'] . '/' . 'config.php';
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Rapid Air | Locations</title>
        <meta charset="UTF=8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="/jquery-3.4.0.min.js"></script>
		<script src="/bootstrap-4.1.1-dist/js/bootstrap.min.js"></script>
		<link rel="stylesheet" href="/bootstrap-4.1.1-dist/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="main.css">
		
        <link rel="icon" href="/Images/favicon.png" >
    </head>
    <body>
        <div class="container">
        	<?php include $_SERVER['DOCUMENT_ROOT'] . '/' . 'navbar.php';?>
        	
        	<div id="body">
        	<h4>Looking for something? Every link should be below.</h4>
        		<ul>
        			<li><a href="/">Home</a></li>
        			<li><a href="/schedule.php">Schedule</a></li>
        			<li><a href="/about.php">About Us</a></li>
        			<li><a href="/awards.php">Awards</a></li>
        			<li><a href="/safety.php">Safety</a></li>
        			<li><a href="/rewards.php">Rewards</a></li>
        			<li><a href="/locations.php">Locations</a></li>
        			<li><a href="/contact.php">Contact Us</a></li>
        		</ul>
        	</div>
        </div>
        
        <div id="endline">
    	Copyright Rapid Air 2019 <a href="sitemap.php">Sitemap</a>
    </div>
    </body>
</html>
