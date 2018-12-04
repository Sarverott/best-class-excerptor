class superclassController{
  constructor(config){
    this.school=new schoolContainer(config);
    this.competitions=[];
    this.createCompetitions(competitions);
  }
  createCompetitions(competitions){
    for(var i in competitions){
      switch(competitions[i].calcType){
        case "RANKING":
          this.competitions.push(new rankingCalc(competitions[i], this));
        break;
        case "COUNT":
          this.competitions.push(new countCalc(competitions[i], this));
        break;
        case "RIFFLE":
          this.competitions.push(new riffleCalc(competitions[i], this));
        break;
      }
    }
  }
  calculateFinalRaport(){
    for(var i in this.competitions){
      this.competitions[i].calculate();
    }
    this.school.getPointsTotalSum();
    
  }
}
