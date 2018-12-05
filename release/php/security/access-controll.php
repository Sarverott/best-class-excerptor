<?php
  require_once("file-protector.php");
  class accessController{
    private $app=NULL;
    private function initSession(){
      session_start();
    }
    public function setupAccess($id, $user, $level){
      $_SESSION['access']=array(
        "id"=>$id,
        "user"=>$user,
        "level"=>$level
      );
    }
    public function resetAccess(){
      unset($_SESSION['access']);
    }
    private function endSession(){
      session_destroy();
    }
    public function getAccess(){ 
      return $_SESSION['access'];
    }
    public function __construct($app){
      $this->app=$app;
      $this->initSession();
    }
    public function __destruct(){
      $this->endSession();
    }
  }
