class Chameleon{
    static colorChange(newColor){
        this.newColor=newColor;
    }
    constructor({nweColor="green"}={}){
        this.newColor=newColor;
    }
}
const freddie=new Chameleon({newColor:"purple"});
freddie.colorChange("orange")