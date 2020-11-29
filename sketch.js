//Create variables here
var database,foodS,foodStock,dog,sadDog,happyDog;
function preload()
{
  sadDog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
      database = firebase.database();
      dog = createSprite(250,300,150,150);
      dog.addImage(sadDog);
      dog.scale = 0.15;
      foodStock = database.ref('Food');
      foodStock.on("value",readStock);
      textSize(20);

}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }


  drawSprites();
  //add styles here
  fill(255,255,254);
  text("FOOD REMAINING"+foodS,170,200);
  text("PRESS UP ARROW TO FEED THE DOG",130,10,300,20);

}
function readStock(data){
   foodS = data.val();

}
function writeStock(x){
   if(x <= 0){
      x = 0;
   }
   else{
     x = x-1;
   }
   database.ref('/').update({
     Food:x
   })
  }

