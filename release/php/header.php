<?php
  function add_links_tags($input_arr){
    //links generator
    foreach($input_arr as $element){
      echo "<link ";
      foreach($element as $key=>$value){
        echo $key.'="'.$value.'" ';
      }
      echo "></link>";
    }
  }
  function add_scripts_tags($input_arr){
    //scripts generator
    foreach($input_arr as $element){
      echo "<script ";
      foreach($element as $key=>$value){
        echo $key.'="'.$value.'" ';
      }
      echo "></script>";
    }
  }
  function standard_meta_tags(){
?>
<!--

-->
<meta charset="utf-8">
<meta name="application-name" content="best-class-excerptor">
<!--

-->
<?php
  }
