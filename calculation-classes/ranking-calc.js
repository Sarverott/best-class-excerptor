class rankingCalc extends calculationObject{
  constructConfig(data){
    this.desc=data.desc;
    this.calcType="RANKING";
  }
  calculate(){
    var tmp=[];
    for(var i in this.school.classes){
      tmp.push(this.school.classes[i].items[this.id]);
    }
    for(var i=1;i<tmp.length;i++){
      if(tmp[i-1].data<tmp[i].data){
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
        if(tmp[i].score==tmp[i-1].score){
          rankGapCount++;
        }else{
          do{
            rankTmp++;
          }while(0<rankGapCount--);
          rankGapCount=0;
        }
      }
      if(this.desc){
        tmp[i].score=(tmp.length-rankTmp)*this.multiplier;
      }else{
        tmp[i].score=(rankTmp+1)*this.multiplier;
      }
    }
    delete tmp;
  }
}
