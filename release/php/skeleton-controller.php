<?php
  require_once("security/file-protector.php");
  class skeletonController{
    private function setTitle($title){
      echo '<title>'.$title.'</title>';
    }
    private function printMeta(){
      echo '<meta charset="utf-8">';
      echo '<meta name="application-name" content="best-class-excerptor">';
      echo '<meta name="author" content="Sett Sarverott">';
    }
    private function printLinks($input_arr){
      foreach($input_arr as $element){
        echo "<link ";
        foreach($element as $key=>$value){
          echo $key.'="'.$value.'" ';
        }
        echo "></link>";
      }
    }
    private function printScripts($input_arr){
      foreach($input_arr as $element){
        echo "<script ";
        foreach($element as $key=>$value){
          echo $key.'="'.$value.'" ';
        }
        echo "></script>";
      }
    }
    private function buildHead(){
      echo '<head>';
      $this->printMeta();
      $this->setTitle($this->title);
      $this->printLinks($this->links);
      $this->printScripts($this->scripts);
      echo '</head>';
    }
    private function buildHeader($module){
      echo '<header>';
      include "body/header/".$module;
      echo '</header>';
    }
    private function buildMain($module){
      echo '<main>';
      include "body/main/".$module;
      echo '</main>';
    }
    private function buildFooter($module){
      echo '<footer>';
      include "body/footer/".$module;
      echo '</footer>';
    }
    private function buildBody(){
      echo '<body>';
      $this->buildHeader($this->header);
      $this->buildMain($this->main);
      $this->buildFooter($this->footer);
      echo '</body>';
    }
    private function buildScaffolding(){
      echo '<!DOCTYPE html>';
      echo '<html>';
      $this->buildHead();
      $this->buildBody();
      echo '</html>';
    }
    public function setupScaffolding(){

    }
  }
