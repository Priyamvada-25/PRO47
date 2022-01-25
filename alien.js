class Alien{
    constructor(x,y,width,height){
    var options={
        'isStatic': true,
        'friction': 1.0,
        'density':0.2
    }
    this.body= Bodies.rectangle(x,y,width,height,options);
    this.image= loadImage("alien1.png")
    this.width= width;
    this.height= height;
    World.add(world,this.body);
    }
    display(){
        var position= this.body.position;
        var angle= this.body.angle;
        push()
        translate(position.x,position.y);
        rotate(angle);
        fill("coral");
        rectMode(CENTER);
        image(this.image,0,0,this.width,this.height);
        pop()
    }
}