//Create variables here
var dogImg, happyDogImg, database;
var dog, happyDog;
var foodS, foodStock;

function preload(){
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(100, 100, 35, 35);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  database = firebase.database();

  foodStock = database.ref('food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);
  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  drawSprites();
  //add styles here
  text("Note: Press Up Arrow Key to Feed Your Dog Milk!", 250, 50);
  textSize(24);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if (x <= 0){
    x = 0;
  } else {
    x = x - 1;
  }
  database.ref('/').update({
    Food: x
  })
}

