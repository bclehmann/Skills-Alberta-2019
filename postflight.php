<?php
    $verified=false;
    
    if(isset($_POST['username']) && isset($_POST['password']) && isset($_POST['flight'])){
        
        $conn = new mysqli('localhost', 'skills_01', 'UF987ZQK', 'skills_01');
        
        $stmt=$conn->prepare("SELECT password FROM users WHERE username=?");
        
        $stmt->bind_param('s', $_POST['username']); //i for int, d for double, s for string, b for blob
        
        $stmt->execute();
        
        $result=$stmt->get_result();
        
        if($result->num_rows > 0){
            while($row=$result->fetch_assoc()){
                if(password_verify($_POST['password'], $row['password'])){
                    $verified=true;
                }
            }
        }
        
        if($verified){
            $flight=$_POST['flight'];
            
            $flightArr=preg_split("/,/", $flight);
            $flightArr[0]=str_replace(" ", "_", $flightArr[0]);
            $flightArr[1]=str_replace(" ", "_", $flightArr[1]);
            
            $flightStr='';
            foreach ($flightArr as $key => $item) {
                $flightStr.=$item.',';
            }
            $flightStr=trim($flightStr);
            $flightStr="\r\n".$flightStr;
            
            $file=fopen($_SERVER['DOCUMENT_ROOT'] . '/' . 'Content/Data/LocationsData2019.txt', 'a');
            fwrite($file, $flightStr);
        }
    }
    
    header("Location: /locations.php"); /* Redirect browser */
?>