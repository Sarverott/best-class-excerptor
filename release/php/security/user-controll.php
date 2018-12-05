<?php
  require_once("file-protector.php");
  class userController{
    /*


    private $app=NULL;
    private $settings=NULL;
    private function checkProvigilesEnnought($needed){
      $current_access=$app->accessControll->getAccess();
      $owned=$current_access['level'];
      return $owned>=$needed;
    }
    public function setupProvigilesMap($setup){
      $this->settings=$setup;
    }
    public function addUser($user, $pass, $level){
      if($this->checkProvigilesEnnought($this->settings['addUser'])){
        $query="I"
        if($app->databaseControll->sendQuery($query)){

        }else{

        }
      }else{

      }
    }
    public function changePass($id){
      if($this->checkProvigilesEnnought($this->settings['addUser'])){
        $query="I"
        if($app->databaseControll->sendQuery($query)){

        }else{

        }
      }else{

      }
    }
    public function changeLevel($id){
      if($this->checkProvigilesEnnought($this->settings['addUser'])){
        $query="I"
        if($app->databaseControll->sendQuery($query)){

        }else{

        }
      }else{

      }
    }
    public function showUsers(){
      if($this->checkProvigilesEnnought($this->settings['showUsers'])){

        $app->databaseControll->sendQuery($query);
      }else{

      }
    }
    public function removeUser($id){
      if($this->checkProvigilesEnnought($this->settings['removeUser'])){

        if($app->databaseControll->sendQuery($query)){

        }else{

        }
      }else{

      }
    }
    public function loginUser($user, $pass){

      $output=$app->databaseControll->sendQuery($query);
      if(count($output)==1){
        $this->accessControll->setupAccess($output[0]['id'],$output[0]['login'],$output[0]['level']);
      }
    }
    public function logoutUser($id){
      $this->accessControll->setupAccess();
      $this->app->getDefaultScreen();
    }


    */
    public function __construct($app){
      $this->app=$app;
    }
  }
