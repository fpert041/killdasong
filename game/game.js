var player = new PlayerEngine();
//var song1 = new Song();

var songText;


//asteroid clone (core mechanics only) // REF: http://p5play.molleindustria.org/ - By Paolo Pedercini
//arrow keys to move + x to shoot

var bullets;
var asteroids;
var ship;
var shipImage, bulletImage, particleImage;
var MARGIN = 40;

function setup() {
  createCanvas(800, 600);

  bulletImage = loadImage('assets/asteroids_bullet.png');
  shipImage = loadImage('assets/asteroids_ship0001.png');
  particleImage = loadImage('assets/asteroids_particle.png');
  
  songTest = loadSound('data/Squarepusher-Dark.mp3');

  ship = createSprite(width/2, height/2);
  ship.setSpeed(0.2, 0);
  ship.maxSpeed = 17;
  ship.friction = 0.1;
  ship.setCollider('circle', 0, 0, 20);

  ship.addImage('normal', shipImage);
  ship.addAnimation('thrust', 'assets/asteroids_ship0002.png', 'assets/asteroids_ship0007.png');

  asteroids = new Group();
  bullets = new Group();

  for (var i = 0; i<8; i++) {
    var ang = random(360);
    var px = width/2 + 1000 * cos(radians(ang));
    var py = height/2+ 1000 * sin(radians(ang));
    createAsteroid(3, px, py);
  }
}

function draw() {
  background(0);

  fill(255);
  textAlign(CENTER);
  text('Controls: Arrow Keys + X', width/2, 20);

  for (var i=0; i<allSprites.length; i++) {
    var s = allSprites[i];

    if (s.position.x<-MARGIN) s.position.x = width+MARGIN;
    if (s.position.x>width+MARGIN) s.position.x = -MARGIN;
    if (s.position.y<-MARGIN) s.position.y = height+MARGIN;
    if (s.position.y>height+MARGIN) s.position.y = -MARGIN;
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

    //***********************************************************

    console.log(ship.velocity.x);
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

function createAsteroid(type, x, y) {
  var a = createSprite(x, y);
  var img = loadImage('assets/asteroid'+floor(random(0, 3))+'.png');
  a.addImage(img);
  a.setSpeed(2.5-(type/2), random(360));
  a.rotationSpeed = 0.5;
  //a.debug = true;
  a.type = type;

  if (type == 2)
    a.scale = 0.6;
  if (type == 1)
    a.scale = 0.3;

  a.mass = 2+a.scale;
  a.setCollider('circle', 0, 0, 50);
  asteroids.add(a);
  return a;
}

function asteroidHit(asteroid, bullet) {
  var newType = asteroid.type-1;

  if (newType>0) {
    createAsteroid(newType, asteroid.position.x, asteroid.position.y);
    createAsteroid(newType, asteroid.position.x, asteroid.position.y);
  }

  for (var i=0; i<10; i++) {
    var p = createSprite(bullet.position.x, bullet.position.y);
    p.addImage(particleImage);
    p.setSpeed(random(3, 5), random(360));
    p.friction = 0.95;
    p.life = 15;
  }

  bullet.remove();
  asteroid.remove();
}
