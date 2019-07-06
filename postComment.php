<?php

if(isset($_POST['comment'])){
    
    $conn = new mysqli('localhost', 'skills_01', 'UF987ZQK', 'skills_01');
    
    $name="anon";
    
    if(isset ($_POST['name'])){
        $name=$_POST['name'];
    }else{
        $name="anon";
    }
    
    $stmt=$conn->prepare('INSERT INTO comments (name, comment) VALUES (?,?)');
    
    $stmt->bind_param('ss', $name, $_POST['comment']); //i for int, d for double, s for string, b for blob
    
    $stmt->execute();
    
}

header("Location: /"); /* Redirect browser */