<?php
    $filename = $_SERVER['DOCUMENT_ROOT']  ."/Content/Data/LocationsData2019.txt";
    $handle = fopen($filename, "r");
    $contents = fread($handle, filesize($filename));
    fclose($handle);
    
    echo $contents;
?>