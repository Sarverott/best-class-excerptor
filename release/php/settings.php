<?php
  require_once("security/file-protector.php");
  $settings=array(
    "docs"=>array(
      "logon"=>array(
        "protected"=>false,
        "scripts"=>array(

        ),
        "links"=>array(

        ),
        "title"=>"LOG ON :: best-class-excerptor by SARVEROTT",
        "body"=>array(
          "header"=>"mini.php",
          "main"=>"logon.php",
          "footer"=>"main.php"
        )
      ),
      "editor"=>array(
        "protected"=>true,
        "scripts"=>array(

        ),
        "links"=>array(

        ),
        "title"=>"EDITOR :: best-class-excerptor by SARVEROTT",
        "body"=>array(
          "header"=>"menu.php",
          "main"=>"editor.php",
          "footer"=>"main.php"
        )
      )
    ),
    "default-doc"=>"logon",
    "database"=>array(
      "host"=>"",
      "user"=>"",
      "password"=>"",
      "database"=>""
    ),
    "administration"=>array(
      "provigiles"=>array(
        "addUser"=>8,
        "removeUser"=>8,
        "showUsers"=>7
      )
    )
  );
