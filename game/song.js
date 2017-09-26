function Song(){
  Entity.call(0, 0); //this is like "super" in java - it passes data onto parent
  
};

Song.prototype = new Entity();  // this is the pseudo-inheritance code 

