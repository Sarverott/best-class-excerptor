class schoolContainer{
  constructor(config){
    this.classes=[];
    this.readClasses(config);
  }
  readClasses(config){
    for(var i in config.classes){
      this.createClass(config.classes[i], config.competitions);
    }
  }
  createClass(name, competitions){
    this.classes.push(new schoolClass(name, competitions, this));
  }
  calculateTotalsFromClasses(){
    for(var i in config.classes){
      this.sumTotalPoints();
    }
  }
  assignPlaces(){
    var tmp=[];
    for(var i in this.classes){
      tmp.push(this.classes[i].rank);
    }
    for(var i=1;i<tmp.length;i++){
      if(tmp[i-1].total<tmp[i].total){
        var hook=tmp[i];
        tmp[i]=tmp[i-1];
        tmp[i-1]=hook;
        i=0;
        continue;
      }
    }
    var rankTmp=0;
    var rankGapCount=0;
    for(var i=0;i<tmp.length;i++){
      if(i!=0&&){
        if(tmp[i].total==tmp[i-1].total){
          rankGapCount++;
        }else{
          do{
            rankTmp++;
          }while(0<rankGapCount--);
          rankGapCount=0;
        }
      }
      tmp[i].place=(tmp.length-rankTmp)*this.multiplier;
    }
    delete tmp;
  }
}
