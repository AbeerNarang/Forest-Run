var ground;
var player,playerImg,fallingImg;
var coinGroup,obstacleGroup;
var score;
var obstacleImg;
var backgroundImg;
var bg;
var coinImg;
var PLAY = 1;
var END = 0;
var WIN = 2;
var START = 3;
var gameState = START;
var restart,restartImg;
var gameOver,gameOverImg;
var win,winImg;
var standing;
var sound1,sound2,sound3,sound4;

function preload(){
playerImg = loadAnimation("sprites/B1.png","sprites/B2.png","sprites/B3.png");
obstacleImg = loadAnimation("sprites/F1.png","sprites/F2.png","sprites/F3.png");
coinImg = loadAnimation("sprites/coin1 (1).png","sprites/coin2.png","sprites/coin3.png","sprites/coin4.png");
backgroundImg = loadImage("sprites/forest.png");
fallingImg = loadAnimation("sprites/boyfalling.png");
gameOverImg = loadImage("sprites/gameover.png");
restartImg = loadImage("sprites/restart.png");
winImg = loadImage("sprites/won.png");
standing = loadAnimation("sprites/B1.png");
sound1 = loadSound("sprites/sound1.ogg");
sound2 = loadSound("sprites/sound2.wav");
sound3 = loadSound("sprites/sound3.wav");
sound4 = loadSound("sprites/soundcoin.wav");
}

function setup(){
createCanvas(displayWidth-10,displayHeight);
bg = createSprite(displayWidth,displayHeight/2,displayWidth*2,displayHeight);
bg.addImage(backgroundImg);
bg.x = bg.width/2;
bg.velocityX = -5;
bg.scale = 2;
bg.visible = false;
ground = createSprite(displayWidth/2,displayHeight-210,displayWidth,10);
ground.velocityX = -3;
ground.x=ground.width/2;  
//ground.scale = 0.5;
ground.visible = false;
player = createSprite(150,displayHeight-300,20,30);
player.addAnimation("standing",standing);
player.addAnimation("running",playerImg);
player.addAnimation("falling",fallingImg);
player.scale = 0.5;
//player.debug = true;
player.setCollider("rectangle",0,0,80,140);
coinGroup = createGroup();
obstacleGroup = createGroup();
score = 0;
restart = createSprite(displayWidth/2,displayHeight/2+100,20,20);
restart.addImage(restartImg);
restart.scale = 0.7;
restart.visible = false;
gameOver = createSprite(displayWidth/2,displayHeight/2,20,20);
gameOver.addImage(gameOverImg);
gameOver.visible = false;
win = createSprite(displayWidth/2,displayHeight/2,20,20);
win.visible = false;
win.addImage(winImg);
win.scale = 0.5;
}

function draw() {
background(backgroundImg);
if(gameState===PLAY){
bg.visible = true;
player.changeAnimation("running",playerImg);
if(keyDown(UP_ARROW) && player.y>465){
player.velocityY = -18;  
sound1.play();
}
player.velocityY = player.velocityY+1;
if(keyDown(DOWN_ARROW)){
player.velocityY = 15;  
}
if(ground.x<0){
ground.x=ground.width/2;  
} 
if(player.isTouching(coinGroup)){
score = score+1; 
coinGroup.destroyEach();
sound4.play();
}
if(bg.x<0){
bg.x = bg.width/2;  
} 
if(player.isTouching(obstacleGroup)){
sound3.play(); 
gameState = END;   
}
spawnObstacles();
spawnCoins();
console.log(player.y);
}
if(gameState===END){
//bg.visible = true;    
ground.velocityX = 0;
bg.velocityX = 0;
player.velocityY = 0;
coinGroup.setLifetimeEach(-1);   
obstacleGroup.setLifetimeEach(-1);
//obstacleGroup.destroyEach();
//coinGroup.destroyEach();
obstacleGroup.setVelocityXEach(0);
coinGroup.setVelocityXEach(0); 
player.changeAnimation("falling",fallingImg);    
player.scale = 0.7;
restart.visible = true;
gameOver.visible = true;
}
if(gameState===START){
background("green");
player.addAnimation("standing",standing);
textSize(32);
fill("white");
text("FOREST RUN",500,100);
textSize(28);
fill("yellow");
text("This is the Forest Run. Press the Up arrow to jump,\n collect coins and save yourself from the fireball.\n Try to get 30 points and Win. \n \n Press space to start.",250,displayHeight/2);
if(keyDown("space")&& gameState===START){
sound2.play();    
gameState = PLAY;    
}
}
if(mousePressedOver(restart)){
reset();
}
if(score>=30){
win.visible = true;
gameState = WIN;
player.scale = 0.5;
restart.visible = true;
}
if(gameState===WIN){
ground.velocityX = 0;
player.velocityY = 0;
bg.velocityX = 0;
coinGroup.setLifetimeEach(-1);   
obstacleGroup.setLifetimeEach(-1);
//obstacleGroup.destroyEach();
//coinGroup.destroyEach();
obstacleGroup.setVelocityXEach(0);
coinGroup.setVelocityXEach(0); 
player.changeAnimation("standing",standing);    
player.scale = 0.7;
win.visible = true;
restart.veisible = true;
}
player.collide(ground);
drawSprites();
textSize(20);
fill("white"); 
text("Score:"+score,20,50);
}

function spawnObstacles(){
if(World.frameCount%130===0){
var obstacle = createSprite(displayWidth,Math.round(random(450,480)),20,40);
obstacle.addAnimation("running",obstacleImg);
obstacle.scale = 0.4;
obstacle.velocityX = -6;
obstacle.lifetime = 400;
obstacleGroup.add(obstacle);
}  
}
function spawnCoins(){
if(World.frameCount%100===0){
var coins = createSprite(500,Math.round(random(300,350)),10,10);
coins.addAnimation("running",coinImg);
coins.scale = 0.15;
coins.velocityX = -Math.round(random(2,6));
coins.shapeColor = "yellow";
coins.lifetime = 600;
coinGroup.add(coins);
}  
}
function reset(){
gameState = PLAY;        
gameOver.visible = false;
restart.visible = false;
win.visible = false;
score = 0;
obstacleGroup.destroyEach();
coinGroup.destroyEach();
player.changeAnimation("running",playerImg);
player.scale = 0.5;
bg.velocityX = -5;
ground.velocityX = -3; 
}