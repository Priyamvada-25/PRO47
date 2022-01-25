const World= Matter.World;
const Engine= Matter.Engine;
const Bodies= Matter.Bodies;
const Constraint= Matter.Constraint;

var engine,world;


var backgroundImg;
var alien1Img, alien2Img;
var rocket, rocketImg;
var sky;
var starImg;
var restart, gameover, restartImg, gameOverImg, startImg;
var gameState= "START";
var fireImg;
var score=0;

function preload(){
    backgroundImg= loadImage("background3.png");
    rocketImg= loadImage("rocket.png");
    alien1Img= loadImage("alien1.png");
    alien2Img= loadImage("alien2.png");
    starImg= loadImage("star.png");
    restartImg=loadImage("restart.png");
    gameOverImg= loadImage("gameover.png");
    fireImg= loadImage("fireball.png");
    startImg= loadImage("start.png");
}

function setup(){
    createCanvas(1200,600);
    //engine= Engine.create();
    //world= engine.world;

    //alien1= new Alien(200,200,100,50);
    sky= createSprite(600,300,1200,600);
    sky.addImage("sky",backgroundImg);
    

    rocket= createSprite(600,500,40,40);
    rocket.addImage("rocket",rocketImg);
    rocket.scale= 0.4;
    rocket.debug= true;
    rocket.setCollider("rectangle",0,0,100,370);

    gameover= createSprite(620,200,60,40);
    gameover.addImage("over",gameOverImg);
    gameover.scale= 0.5;

    restart= createSprite(600,350,40,40);
    restart.addImage("restart",restartImg);
    restart.scale= 0.04;

    start= createSprite(600,300,80,50);
    start.addImage("start",startImg);
    start.scale=0.08;

    aliensGroup= createGroup();
    starsGroup= createGroup();
    fireGroup= createGroup();

}
function draw(){
    background("black");

    text("Score:"+score, 200,100);
    //Engine.update(engine);
    if(gameState==="START"){
        restart.visible= false;
        gameover.visible= false;
        rocket.visible= false;
        //textFont("georgia");
        textSize(10);
        text("Shoot the aliens and collect the stars!",600,200);
        text("Press left and right arrow to move the rocket and up arrow to shoot. ",600,400);

        if(mousePressedOver(start)){
            gameState= "PLAY";
        }
}
    
    else if(gameState==="PLAY"){
    sky.velocityY=3;
    restart.visible= false;
    gameover.visible= false;
    start.visible= false;
    rocket.visible= true;

    if(keyDown(LEFT_ARROW)){
        rocket.x= rocket.x-5;
    }
    if(keyDown(RIGHT_ARROW)){
        rocket.x= rocket.x+5;
    }
    spawnAliens();
    spawnStars();

        if(sky.y>400){
        sky.y=200;
        }
        if(rocket.isTouching(aliensGroup)){
            gameState= "END";
        }
        if(rocket.isTouching(starsGroup)){
            starsGroup.destroyEach();
            score= score+2;
        }
    if(keyWentDown("UP_ARROW")){
        createFireball();
        
    }
    


   }else if(gameState==="END"){
        sky.velocityY=0;
        aliensGroup.setVelocityYEach(0);
        starsGroup.setVelocityYEach(0);
        restart.visible= true;
        gameover.visible= true;
        start.visible= false;

        if(mousePressedOver(restart)){
            reset();
        }
        
    }
    

 
    drawSprites();
}
function reset(){
    gameState= "PLAY";
    starsGroup.destroyEach();
    aliensGroup.destroyEach();
    rocket.x=600;
}

function spawnAliens(){
    if(frameCount%120===0){
        var alien= createSprite(500,-5);
        //alien.addImage("alien",alien1Img);
       // alien.scale=0.04;
        alien.x= Math.round(random(100,1100));
        alien.velocityY=3;
        alien.lifetime=200;
        aliensGroup.add(alien);

        var rand = Math.round(random(1,2));
        switch(rand) {
          case 1: alien.addImage(alien1Img);
          alien.scale=0.03;
                  break;
          case 2: alien.addImage(alien2Img);
          alien.scale=0.05;
                  break;
          default: break;
        }
    }
   
}
function spawnStars(){
    if(frameCount%160===0){
        var star= createSprite(400,-5);
        star.addImage("star",starImg);
        star.scale=0.07;
        star.x= Math.round(random(100,1100));
        star.velocityY=3;
        starsGroup.add(star);
    }
}
function createFireball(){
    var fire= createSprite(600,460);
    fire.addImage("fire",fireImg);
    fire.scale=0.2;
    fire.velocityY=-3;
    fire.x=rocket.x;
    fireGroup.add(fire);
}

