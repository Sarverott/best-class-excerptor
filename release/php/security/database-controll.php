<?php
  require_once("file-protector.php");
  class databaseController{
    private $connection=NULL;
    private $settings=NULL;
    private function openConnection(){
      $this->connection=mysqli_connect(
        $this->settings['host'],
        $this->settings['user'],
        $this->settings['password'],
        $this->settings['database']
      );
    }
    public function setup($setup){
      $this->settings=$setup;
    }
    public function __construct(){
      
    }
    public function __destruct(){
      if($this->connection!=NULL){
        mysqli_close($this->connection);
      }
    }
  }
