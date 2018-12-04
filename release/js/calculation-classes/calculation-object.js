class calculationObject{
  constructor(dataIn, schoolHook){
    this.id=dataIn.id;
    this.label=dataIn.name;
    this.multiplier=dataIn.multiplier;
    this.school=schoolHook;
    constructConfig(dataIn);
  }
  calculate(){

  }
  constructConfig(data){
    return null;
  }
}
