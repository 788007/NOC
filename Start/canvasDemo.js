window.onload = init; // Wait for the page to load before we begin animation
var canvas;
var ctx;// This is a better name for a global variable
var balls = [];
var attractor;
var repeller;

function init(){
  //get the canvas
  canvas = document.getElementById('cnv');
  // Set the dimensions of the canvas
  canvas.width = window.innerWidth * 0.85;
  canvas.height = window.innerHeight * 0.85 ;
  canvas.style.marginTop = canvas.height * 0.08 + 'px';
  canvas.style.marginBottom = canvas.height * 0.08 + 'px';
  canvas.style.marginRight = canvas.width * 0.08 + 'px';
  canvas.style.marginLeft = canvas.width * 0.08 + 'px';
  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,44,55, .5)';
  // get the context
  ctx = canvas.getContext('2d'); // This is the context

  makeBalls();
  makeAttractor();
  makeRepeller();
  animate(); // Call to your animate function
}

function makeBalls(){
  //create array of balls
  for (var i = 0; i < 75; i++){
    var radius = Math.random()*10 + 4;
    var color = randomColor();
    //set location vector
    var x = Math.random() * (canvas.width-20) + 10;
    var y = Math.random() * (canvas.height-20) + 10;
    var loc = new vector2d(x, y);
    //set velocity vector
    var r = (Math.random()* 5 + 1);
    var theta = Math.random() * 2 * Math.PI;
    var vel = new vector2d(undefined, undefined, r, theta);
    //set acceleration vector
    var acc = new vector2d(0, 0);

    balls[i] = new Mover(radius, loc, vel, acc, color);
  }
}

function makeAttractor(){
  var loc = new vector2d(canvas.width * 3/4, canvas.height * 3/4);
  var theta = Math.random() * 2 * Math.PI;
  var vel = new vector2d(undefined, undefined, 2, theta);
  attractor = new Mover(25, loc, vel, new vector2d(0, 0), 'red');
}

function makeRepeller(){
  var loc = new vector2d(canvas.width/4, canvas.height/4);
  var theta = Math.random() * 2 * Math.PI;
  var vel = new vector2d(undefined, undefined, 2, theta);
  repeller = new Mover(25, loc, vel, new vector2d(0,0), 'blue');
}

//returns a random pastel color
function randomColor(){
  var hue = Math.floor(Math.random() * 360);
  var l = Math.random() * 15 + 70;
  var pastel = 'hsl(' + hue + ', 100%, ' + l + '%)';
  return pastel;
}



// function printMouseLoc(e){
//   var mouseX = e.clientX;
//   var mouseY = e.clientY;
//   console.log("x:", mouseX, "y:", mouseY);
// }
//
// function mouseAttract(){
//   console.log("clicked!");
// }

function animate(){
  requestAnimationFrame(animate);
  //canvas.onclick = mouseAttract;
  // canvas.onmousemove = function(event) {
  //   printMouseLoc(event);
  // }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(var i = 0; i < balls.length; i++){
    balls[i].draw();
  }
  attractor.draw();
  repeller.draw();
}
