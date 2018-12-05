<?php
  require_once("file-protector.php");
  class databaseController{
    private $connection=NULL;
    private $settings=NULL;
    private $app=NULL;
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
    public function sendQuery($sql){
      if($this->connection==NULL){
        $this->openConnection();
      }
      $result=mysqli_query($this->connection, $sql);
      if($result){
        $output=[];
        while($row=mysqli_fetch_assoc($result)){
          $output[]=$row;
        }
        return $output;
      }else{
        return false;
      }
    }
    public function __construct($app){
      $this->app=$app;
    }
    public function __destruct(){
      if($this->connection!=NULL){
        mysqli_close($this->connection);
      }
    }
  }
