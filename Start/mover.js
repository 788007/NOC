function Mover(radius, loc, vel, acc, color){
  this.radius = radius;
  this.color = color;
  //let volume = area and density = 1, so mass = area
  this.mass = Math.PI * this.radius * this.radius;
  this.loc = loc;
  this.vel = vel;
  this.acc = acc;
}

Mover.prototype.momentum = function(){
  return vector2d.scalarMult(this.vel, this.mass);
}

Mover.prototype.kineticEnergy = function(){
  var v = this.vel.magnitude();
  return this.mass * v * v / 2;
}

Mover.prototype.applyAttractorForce = function(){
  var r = vector2d.subtract(attractor.loc, this.loc);
  var dir = vector2d.normalize(r);
  var attr_force = vector2d.scalarMult(dir, 17 / r.magnitude());
  this.acc.add(attr_force);
}

Mover.prototype.applyRepellerForce = function(){
  var r = vector2d.subtract(this.loc, repeller.loc);
  var dir = vector2d.normalize(r);
  var rep_force = vector2d.scalarMult(dir, 15 / r.magnitude());
  this.acc.add(rep_force);
}

//updates ball position
Mover.prototype.update = function () {
  this.checkEdges();
  if(this !== attractor && this !== repeller){
    this.applyAttractorForce();
    this.applyRepellerForce();
  }
  this.vel.add(this.acc);
  this.vel.limit(10);
  //console.log(this.vel.magnitude());
  this.loc.add(this.vel);
  this.acc.scalarMult(0);
}

//reverses direction when ball hits edge
Mover.prototype.checkEdges = function () {
  if(this.loc.x + this.radius >= canvas.width){
    this.loc.x = canvas.width - this.radius;
    this.vel.x *= -1;
  }
  if(this.loc.x - this.radius < 0){
    this.loc.x = this.radius;
    this.vel.x *= -1;
  }
  if(this.loc.y + this.radius >= canvas.height){
    this.loc.y = canvas.height - this.radius;
    this.vel.y *= -1;
  }
  if(this.loc.y - this.radius < 0){
    this.loc.y = this.radius;
    this.vel.y *= -1;
  }
}

//draws ball
Mover.prototype.draw = function () {
  this.update();
  ctx.beginPath();
  ctx.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI * 2);
  ctx.fillStyle = this.color;
  ctx.fill();
};
