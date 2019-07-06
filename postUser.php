<?php
    $verified=false;
    
    if(isset($_POST['admUsername']) && isset($_POST['admPassword']) && isset($_POST['username']) && isset($_POST['password'])){
        
        $conn = new mysqli('localhost', 'skills_01', 'UF987ZQK', 'skills_01');
        
        $stmt=$conn->prepare("SELECT password FROM users WHERE username=?");
        
        $stmt->bind_param('s', $_POST['admUsername']); //i for int, d for double, s for string, b for blob
        
        $stmt->execute();
        
        $result=$stmt->get_result();
        
        if($result->num_rows > 0){
            while($row=$result->fetch_assoc()){
                if(password_verify($_POST['admPassword'], $row['password'])){
                    $verified=true;
                }
            }
        }
    }
    
    if($verified){
        $stmt=$conn->prepare('INSERT INTO users (username,password) VALUES (?,?)');
        
        $usnm=$_POST['username'];
        $pwd=password_hash($_POST['password'], PASSWORD_DEFAULT);
        
        $stmt->bind_param('ss', $usnm, $pwd); //i for int, d for double, s for string, b for blob
        
        $stmt->execute();
    }
    
    header("Location: /locations.php"); /* Redirect browser */