<?php
  require_once("security/file-protector.php");

  class appController{
    private $settings=NULL;
    protected $actionControll=NULL;
    protected $skeletonControll=NULL;
    protected $accessControll=NULL;
    protected $databaseControll=NULL;
    protected $userControll=NULL;
    private function autoRedirect(){
      $this->getDefaultScreen();
    }
    private function getDefaultScreen(){
      header("Location: ?controller=".urlencode($this->settings["default-doc"]));
      include "body/go-to-start-screen.html";
      die();
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
      $this->databaseControll=new databaseController($this);
      $this->userControll=new userController($this);

      $this->databaseControll->setup($this->settings['database']);
      $this->userControll->setupProvigilesMap($this->settings['administration']['privigiles']);
    }
  }
