class riffleCalc extends calculationObject{
  constructConfig(data){
    this.calcType="RIFFLE";
    this.riffles=data.riffles;
  }
  calculate(){
    for(var j in this.school.classes){
      var tmpClassHook=this.school.classes[j].items[this.id];
      tmpClassHook.score=0;
      for(var i in this.riffles){
        if(this.riffles[i]>tmpClassHook.data){
          break;
        }else{
          tmpClassHook.score+=this.multiplier;
        }
      }
    }
  }
}
