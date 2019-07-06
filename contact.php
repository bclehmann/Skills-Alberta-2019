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
        		<h4>How are we doing?</h4>
        		<form action="/postComment.php" method="POST">
        			<input placeholder="Name (Optional)" type="text" name="name" class="form-control"><br/>
        			<textarea cols="50" rows="5" name="comment" class="form-control">Feedback</textarea><br/>
        			<input class="btn btn-primary" type="submit">
        		</form>
        	</div>
        </div>
        
        <div id="endline">
    	Copyright Rapid Air 2019 <a href="sitemap.php">Sitemap</a>
    </div>
    </body>
</html>
