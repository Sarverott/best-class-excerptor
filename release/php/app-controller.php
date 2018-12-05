<?php
  require_once("security/file-protector.php");
  class appController{
    private $settings=NULL;
    private $actionControll=NULL;
    private $skeletonControll=NULL;
    private $accessControll=NULL;
    private $databaseControll=NULL;
    private function autoRedirect(){
      $this->getDefaultScreen();
    }
    private function getDefaultScreen(){
      header("Location: ?controller=".urlencode($settings["default-doc"]))
    }
    private function screenSelect(){
      if(isset($_GET['controller'])){
        if(isset($this->settings["docs"][$_GET['controller']])){
          include "content/".$_GET['controller']."-controller.php"
          $this->actionControll=new actionController($this);
        }else{
          $this->autoRedirect();
        }
      }else{
        $this->autoRedirect();
      }
    }
    public function __construct($settings){
      $this->settings=$settings;
      $this->skeletonControll=new skeletonController($this);
      $this->accessControll=new accessController($this);
      $this->databaseControll=new databaseControll($this);
    }
  }
