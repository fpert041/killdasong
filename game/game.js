//TODO: CREATE LIST OF DIFFERENT SONGS AND ASSIGN DIFFERENT SONGS TO EACH ASTEROID


var player = new PlayerEngine();

var songCollection = [];
var songIndex;

//asteroid clone (core mechanics only) // REF: http://p5play.molleindustria.org/ - By Paolo Pedercini
//arrow keys to move + x to shoot

var bullets;
var asteroids;
var ship;
var shipImage, bulletImage, particleImage;
var MARGIN = 40;

function preload(){
    //todo: make an automated searh of mp3 files in the folder "data" and push them
  
    songCollection.push('data/MA-Atta_Boy.mp3');
    songCollection.push('data/MA-Collar_Stays_On.mp3');
    songCollection.push('data/MA-Confused_Images.mp3');
    songCollection.push('data/MA-One_Thought_At_A_Time.mp3');
    songCollection.push('data/MA-Opening_Title.mp3');
    songCollection.push('data/MA-P_Is_For_Piano.mp3');
    songCollection.push('data/MA-Polaroid_Girl.mp3');
    songCollection.push('data/MA-Red_Light_Means Go.mp3');
    songCollection.push('data/MA-Sam.mp3');
    songCollection.push('data/MA-Simple_Rules.mp3');
    songCollection.push('data/Squarepusher-Dark.mp3');
}

function setup() {
  createCanvas(800, 600);

  bulletImage = loadImage('assets/asteroids_bullet.png');
  shipImage = loadImage('assets/asteroids_ship0001.png');
  particleImage = loadImage('assets/asteroids_particle.png');

  ship = createSprite(width/2, height/2);
  ship.setSpeed(0.2, 0);
  ship.maxSpeed = 17;
  ship.friction = 0.09;
  ship.setCollider('circle', 0, 0, 20);

  ship.addImage('normal', shipImage);
  ship.addAnimation('thrust', 'assets/asteroids_ship0002.png', 'assets/asteroids_ship0007.png');

  asteroids = new Group();
  bullets = new Group();

  generateAsteroids();
}

function draw() {
  
  /*
  var volume0 = 1. - sqrt(pow((asteroids[0].position.x - ship.position.x)/width, 2) + pow((asteroids[0].position.y - ship.position.y)/height, 2));
  
  if(asteroids[0].song.isLoaded())
    if(!asteroids[0].song.isPlaying())
      asteroids[0].song.play();
      
  if(asteroids[0].song.isLoaded())
    if(asteroids[0].song.isPlaying()){
        asteroids[0].song.setVolume(volume0);
     }
  */
  
  for(i = 0; i < asteroids.length; i++){
    
  var volume = 0.5 - sqrt(pow((asteroids[i].position.x - ship.position.x)/width, 2) + pow((asteroids[i].position.y - ship.position.y)/height, 2));
  
  if(asteroids[i].song.isLoaded())
    if(!asteroids[i].song.isPlaying())
      asteroids[i].song.play();
      
  if(asteroids[i].song.isLoaded())
    if(asteroids[i].song.isPlaying()){
        asteroids[i].song.setVolume(volume);
     }
     
  }
  
  //--------------------------------------------------
  
  background(0);

  fill(255);
  textAlign(CENTER);
  text('Controls: Arrow Keys + X', width/2, 20);

  for (var i=0; i<allSprites.length; i++) {
    var s = allSprites[i];

    if (s.position.x<-MARGIN/2) s.velocity.x*=-1;
    if (s.position.x>width+MARGIN/2) s.velocity.x*=-1;
    if (s.position.y<-MARGIN/2) s.velocity.y*=-1;
    if (s.position.y>height+MARGIN/2) s.velocity.y*=-1;
  }

  asteroids.overlap(bullets, asteroidHit); // check if an asteroid has been hit

  ship.bounce(asteroids); // check if the ship has been hit

  //-------------------
  if (keyWentDown('c')) {
    if ( songTest.isPlaying() ) { // .isPlaying() returns a boolean
      songTest.stop();
      background(255, 0, 0);
    } else {
      songTest.play();
      background(0, 255, 0);
    }
  }


  //-------------------

  if (keyDown(LEFT_ARROW))
    ship.rotation -= 4;
  if (keyDown(RIGHT_ARROW))
    ship.rotation += 4;
  if (keyDown(UP_ARROW))
  {
    ship.addSpeed(.2, ship.rotation);
    ship.changeAnimation('thrust');
    //if statement condition to handle angles bigger than PI
  } else
    ship.changeAnimation('normal');

  if (keyWentDown('x'))
  {
    var bullet = createSprite(ship.position.x, ship.position.y);
    bullet.addImage(bulletImage);
    bullet.setSpeed(10+ship.getSpeed(), ship.rotation);
    bullet.life = 30;
    bullets.add(bullet);
  }

  drawSprites();
}

function createAsteroid(type, x, y, songRef) {
  
  var a = createSprite(x, y);
  var img = loadImage('assets/asteroid'+floor(random(0, 3))+'.png');
  a.addImage(img);
  a.setSpeed(2.5-(type/2), random(360));
  a.rotationSpeed = 0.5;
  //a.debug = true;
  a.type = type;
  
  //*******************************
  
  a.song = loadSound(songRef);
  
  //*******************************

  if (type == 2)
    a.scale = 0.6;
  if (type == 1)
    a.scale = 0.3;

  a.mass = 2+a.scale;
  a.setCollider('circle', 0, 0, 50);
  asteroids.add(a);
  return a;
}

//***************************************

function asteroidHit(asteroid, bullet) {
  //var newType = asteroid.type-1;

  if(asteroid.song.isLoaded())
    if(asteroid.song.isPlaying())
      asteroid.song.stop()
      
  /*   
  if (asteroid.type>0) {
    createAsteroid(asteroid.type, width/2, height/2, songCollection[songIndex]);
    songIndex++;
    //createAsteroid(newType, asteroid.position.x, asteroid.position.y, 'data/Squarepusher-Dark.mp3');
  }
  */

//***************************************

  for (var i=0; i<10; i++) {
    var p = createSprite(bullet.position.x, bullet.position.y);
    p.addImage(particleImage);
    p.setSpeed(random(3, 5), random(360));
    p.friction = 0.95;
    p.life = 15;
  }

  bullet.remove();
  asteroid.remove();
  
  if(asteroids.length <= 0)
    generateAsteroids();
}

function generateAsteroids(){
    //the below loop  should not be larger than the loaded songs
  for (songIndex = 0; songIndex<5; songIndex++) {
    var ang = random(360);
    var px = width/2;//  * cos(radians(ang));
    var py = height/2; //* sin(radians(ang));
    
    //*****************************************
    createAsteroid(3, px, py, songCollection[songIndex]);
  }
  
}