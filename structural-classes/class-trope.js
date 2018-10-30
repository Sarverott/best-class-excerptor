class classTrope{
  constructor(name, competitions, schoolHook){
    this.school=schoolHook;
    this.items={};
    this.name=name;
    this.rank={
      total:0,
      place:0
    };
    this.createItems(competitions);
  }
  createItems(competitions){
    for(var i in competitions){
      this.items[competitions[i].id]=new competitionItem();
    }
  }
  sumTotalPoints(){
    this.rank.total=0;
    for(var i in this.items){
      this.rank.total+=this.items[i].score;
    }
  }
}
