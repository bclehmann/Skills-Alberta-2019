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
        		<h4>Check the map for every location we fly out of</h4>
        	
        		<script type="text/javascript" src="maps.js"></script>
        		<script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAfq1O3VN-WuF_3IuuN4dIPDdYoEDG37uw&callback=init"></script>
                
                <div id="map" style="width:100%;height:600px;"></div>
                
                <a href="/admin.php">Admin</a>
        	</div>
        </div>
        
        <div id="endline">
    	Copyright Rapid Air 2019 <a href="sitemap.php">Sitemap</a>
    </div>
    </body>
</html>
