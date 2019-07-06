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
        		<h4>Add Flight</h4>
        		<h5>Hint, the username and password is admin</h5>
        		from,to,depart,land,flighttime,ontime<br/>
        		<form action="/postFlight.php" method="POST">
        			<input placeholder="Username" type="text" name="username" class="form-control"><br/>
        			<input placeholder="Password" type="password" name="password" class="form-control"><br/>
        			<input class="form-control" value="Jasper,Moscow,2019-09-19 22:00:00,2019-09-20 03:00:00,5,True" type="text" width="200" name="flight"><br/>
        			<input class="btn btn-primary" type="submit">
        		</form>
        		<br/>
        		<hr>
        		<br/>
        		<h4>Add User</h4>
        		<h5>Hint, the username and password is admin</h5>
        		from,to,depart,land,flighttime,ontime<br/>
        		<form action="/postUser.php" method="POST">
        			<input class="form-control" placeholder="Admin Username" type="text" name="admUsername"><br/>
        			<input class="form-control" placeholder="Admin Password" type="password" name="admPassword"><br/>
        			<input class="form-control" placeholder="New Username" type="text" name="username"><br/>
        			<input class="form-control" placeholder="New Password" type="password" name="password"><br/>
        			<input type="submit" class="btn btn-primary">
        		</form>
        		
        	</div>
        </div>
        
        <div id="endline">
    	Copyright Rapid Air 2019 <a href="sitemap.php">Sitemap</a>
    </div>
    </body>
</html>
