<?php
    $conn = new mysqli('localhost', 'skills_01', 'UF987ZQK', 'skills_01');
    
    $stmt=$conn->prepare('INSERT INTO users (username, password) VALUES (?,?)');
    
    $username="admin";
    $password=password_hash('admin', PASSWORD_DEFAULT);
    
    $stmt->bind_param('ss', $username,$password); //i for int, d for double, s for string, b for blob
    
    $stmt->execute();
?>