var space,spacebackground
var me,meImg
var enemy1Img,enemy2Img,enemy3Img,enemy4Img
var enemy,enemyGroup
var bullet,bulletImg,bulletGroup
var reset,resetImg
var mothership,mothershipImg,mothershipGroup
var gameState = "PLAY";
var score = 0


function preload(){
spacebackground= loadImage("images/space background.jpg")
meImg = loadImage("images/space-shuttle.png")
enemy1Img = loadImage("images/enemy1.png")
enemy2Img = loadImage("images/enemy2.png")
enemy3Img = loadImage("images/enemy3.png")
bulletImg = loadImage("images/bullet.png")
resetImg = loadImage("images/resetbutton1.png")
mothershipImg = loadImage("images/mothership-removebg-preview.png")
}


function setup() {
  createCanvas(1200,displayHeight);
space = createSprite(1200/2,displayHeight/2)
space.addImage(spacebackground)
space.scale = 1
space.velocityY = 2
me = createSprite(600,890,0,0)
me.addImage(meImg)
me.scale= 0.5


reset = createSprite(600,700)
reset.addImage(resetImg)
reset.visible=false;
bulletGroup = new Group()
enemyGroup = new Group()

me.setCollider("rectangle",0,0,400,450)

}
function draw() {
  background("white");  
  
  if(gameState === "PLAY"){
    reset.visible=false;
    me.x = mouseX
    score = score + Math.round(getFrameRate()/60);
    spawnEnemy()
   
    if(score>0 && score%100 === 0){
       enemyGroup.velocityY = enemyGroup.velocityY+1
    }
    if(space.y >800){
      space.y = space.width/2
     
    }
    //if(score%100===0){
  
   // }
    console.log(  space.velocityY)
    space.velocityY = space.velocityY +score/100000
    if(keyWentDown("space")){
      kill()
    }
    for (var i = 0; i < 10; i++) {
    
      if(enemyGroup.get(i)!= null && enemyGroup.get(i).isTouching(bulletGroup)){
      enemyGroup.get(i).remove()
    bulletGroup.destroyEach()
     
    }
    }
    if(enemyGroup.isTouching(me)){
      gameState = "END"
    }
   
  }

  if(gameState === "END"){
    reset.visible= true;
  space.velocityY = 0
  score = 0
  bulletGroup.setVelocityYEach (0)
  enemyGroup.setVelocityYEach (0)
  textSize(50)


  
  }
  if(mousePressedOver(reset)){
    resetgame()
  }
  
  
  drawSprites();
  fill("white")
  text("Score: " + score,990,190)
   fill ("red")



  textSize(50)

  if(gameState === "END"){
    textSize(100)
    textFont("Times New Roman ")
  text("Game Over !!",400,450)
  }
 
}
function spawnEnemy() {
  if(frameCount % 60===0){
  enemy = createSprite(random(50,1000),0,0,0)
  enemy.addImage(enemy3Img)
  enemy.scale = 0.8                                                                   
 enemy.velocityY=3
 var rand= Math.round(random(1,3) )
 
 switch(rand){
   case 1:enemy.addImage(enemy1Img)
   break;
   case 2:enemy.addImage(enemy2Img)
   break;
   case 3:enemy.addImage(enemy3Img)
   break;
   default:break;
 }
 enemyGroup.add(enemy)
  }
 
}
function kill(){
 
bullet = createSprite(me.x,me.y-100,0,0)
bullet.addImage(bulletImg)
 bullet.velocityY=-2
 bulletGroup.add(bullet)
}
function resetgame(){
  gameState = "PLAY"
  reset.visible=true;
  enemyGroup.destroyEach()
  me.x = 600;
space.velocityY = 2
  bulletGroup.destroyEach()
}