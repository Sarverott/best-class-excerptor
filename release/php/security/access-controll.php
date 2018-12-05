<?php
  require_once("file-protector.php");
  class accessController{
    private $app=NULL;
    private function initSession(){
      session_start();
    }
    private function setupAccess($user, $level){

    }
    private function endSession(){
      session_destroy();
    }
    public function checkAccess(){

    }
    public function __construct($app){
      $this->app=$app;
      $this->initSession();
    }
    public function __destruct(){
      $this->endSession();
    }
  }
