var edges;
var messageI;
var butcher;
var butcherST;
var butcherIMG;
var chicken;
var chickenIMG;
var cow;
var cowIMG;
var pig;
var pigIMG;
var chickenG;
var cowG;
var pigG;
var bg;
var score = 0;
var butcherKS;
var angle2 = 0;
var timer = 1000;
var count = 0;
var timer2 = 5000;
var counter = 0;
var timeleft = 10;
var gameOver;
var gameState = "START";
var button;

function convertSeconds(s) {
  var min = floor(s/60);
  var sec = s % 60;
  
  text("0"+min+":"+sec,50,50);
  if(s===0){
    gameState = "END";
  }
}

function preload(){
  butcherIMG = loadImage("Butcher.png");
  chickenIMG = loadImage("Chicken.png");
  cowIMG = loadImage("Cow.png");
  pigIMG = loadImage("Pig.png");
  bg = loadImage("bg.jpg");
  gameOver = loadSound("GAMEOVER.mp3");
  messageI = loadImage("GAMEOVER.png");
}

function setup() {
  createCanvas(1000,500);
chickenG = new Group();
cowG = new Group();
pigG = new Group();
butcherKS = new Group();
angleMode(DEGREES);
butcherST = createSprite(125, height/2, 50, 50);
  butcherST.scale = 0.3;
  butcherST.rotateToDirection = true;
  butcherST.addImage(butcherIMG);
  setInterval(function () {
    count++;
  },timer);
  edges = createEdgeSprites();
}

function timeit(){
counter++;
}
setInterval( timeit, 1000);

function draw() {
  background(bg);

if(gameState === "START"){
button = createButton("Start Game");
button.position(width/2-27.5,height/2);
butcherST.visible = false;
button.mousePressed(function () {
  counter = 0;
  gameState = "PLAY";
  butcherST.visible = true;
});
}

if(gameState === "PLAY"){
  mobSpawning();
  hideButton();
  if(keyDown(UP_ARROW)){
    angle2 = angle2-5;
    butcherKS.setRotationEach(butcherST.rotation);
    butcherST.rotation = butcherST.rotation-5;
  }
  fill("black");
  textSize(30);
    text(score,width/2,30);

    convertSeconds(timeleft-counter);

  if(keyDown(DOWN_ARROW)){
    angle2 = angle2+5;
    butcherKS.setRotationEach(butcherST.rotation);
    butcherST.rotation = butcherST.rotation+5;
  }
  if (butcherKS.isTouching(cowG)) {
    score = score + 50;
    butcherKS.destroyEach();
    cowG.destroyEach();
   }
   if (butcherKS.isTouching(pigG)) {
     score = score + 30;
     butcherKS.destroyEach();
     pigG.destroyEach();
    }
    if (butcherKS.isTouching(chickenG)) {
     score = score + 10;
     butcherKS.destroyEach();
     chickenG.destroyEach();
    }
 
   if(keyDown("space")&&count>0){
     butcherRC();
     gameOver.play
     butcherKS.setRotationEach(butcherST.rotation);
     count = 0;
     setTimeout(function () {
       butcherKS.destroyEach();
     },timer2);
   }



}

if(gameState === "END"){
  if(score>=500){

  }
  else{
    gameOver.play();
 var message = createSprite(width/2,0,10,10);
 message.addImage(messageI);
 message.velocityY = 10;
 message.collide(edges[3]);
  }
}


  drawSprites();
}

function mobSpawning(){
  if(frameCount%30 === 0) {
  chicken = createSprite(random(800,950), random(50,450), 50, 50);
  chickenG.add(chicken);
  chicken.addImage(chickenIMG);
  chicken.scale = 0.3;
  chicken.debug = true;
}

if(frameCount%36 === 0) {
  chickenG.destroyEach();
}

if(frameCount%80 === 0){
  pig = createSprite(random(800,950), random(50,450), 50, 50);
  pigG.add(pig);
  pig.addImage(pigIMG);
  pig.scale = 0.3;
  pig.debug = true;
}

if(frameCount%86 === 0){
  pigG.destroyEach();
}

if(frameCount%130 === 0){
  cow = createSprite(random(800,950), random(50,450), 50, 50);
  cowG.add(cow);
  cow.addImage(cowIMG);
  cow.scale = 0.3;
  cow.debug = true;
}

if(frameCount%136 === 0){
  cowG.destroyEach();
}
}

function butcherRC() {
  butcher = createSprite(125, height/2, 50, 50);
  butcher.scale = 0.3;
  butcher.rotateToDirection = true;
  butcher.addImage(butcherIMG);
  butcher.velocityX = 25;
  butcherKS.add(butcher);
  butcher.debug = true;
}

function hideButton() {
  button.hide();
}
