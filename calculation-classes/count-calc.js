class countCalc extends calculationObject{
  constructConfig(data){
    this.calcType="COUNT";
  }
  calculate(){
    for(var j in this.school.classes){
      var tmpClassHook=this.school.classes[j].items[this.id];
      tmpClassHook.score=this.multiplier*tmpClassHook.data;
    }
  }
}
