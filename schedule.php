<?php
include $_SERVER['DOCUMENT_ROOT'] . '/' . 'config.php';
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Rapid Air | Schedules</title>
        <meta charset="UTF=8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="/jquery-3.4.0.min.js"></script>
		<script src="/bootstrap-4.1.1-dist/js/bootstrap.min.js"></script>
		<link rel="stylesheet" href="/bootstrap-4.1.1-dist/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="main.css">
		<link rel="icon" href="/Images/favicon.png" >
        <?php if(dev){?>
        	<script src="/react.development.js" crossorigin></script>
      		<script src="/react-dom.development.js" crossorigin></script>
      		<script src="/babel.min.js"></script>
      		<script defer type="text/babel" src="/react/reactFlights.js"></script>
      	<?php }else{?>
      		<script src="/react.production.min.js" crossorigin></script>
      		<script src="/react-dom.production.min.js" crossorigin></script>
      		<script defer type="text/javascript" src="/compiled/reactFlights.js"></script>
      	<?php }?>
    </head>
    <body>
        <div class="container">
        	<?php include $_SERVER['DOCUMENT_ROOT'] . '/' . 'navbar.php';?>
        	
        	<div id="body">
        		<h3>Rapid Air Flights</h3>
        		Search for your flight by destination or starting point.
        		
        		<div id="reactFlight"></div>
        		
        		<p>
        			In the event of a cancelled flight, please contact us to rebook by calling our Reservations Centre at 1.800.665.5555.
Our goal is to get you to your destination safely and as scheduled. Sometimes unforeseeable occurrences or events beyond 
our control lead to delays, cancellations or diversions. To minimize any inconvenience, we will do our best to keep you informed and get you on your way as quickly as possible.
        		</p>
        	</div>
        </div>
        <div id="endline">
    	Copyright Rapid Air 2019 <a href="sitemap.php">Sitemap</a>
    </div>
    </body>
</html>
