let mic;
let fft;

 function setup(){
  let cnv = createCanvas(500, 500);
  cnv.mousePressed(userStartAudio);
  textAlign(CENTER);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(0,150);
  fill(255);
  noStroke(); // so that the text below doesn't have a large stroke value
  text('tap to start', width/2, 20);

  let micLevel = mic.getLevel();
  let mappedMicLevel = map(micLevel, 0, 0.1, 0, 200); // map micLevel to desirable range
  let spectrum = fft.analyze();

  console.log(spectrum);

  let treble = fft.getEnergy("treble");
  let mid = fft.getEnergy("mid");
  let bass = fft.getEnergy("bass");

  console.log(treble);
  console.log(mid);
  console.log(bass);

  let mappedTreble = map(treble, 0, 50, 0, 200); 
  let mappedMid = map(mid, 0, 255, -100, 100); 
  let mappedBass = map(bass, 0, 255, -200, 0);

  let scaleTreble = map(treble, 0, 50, 0.8, 1.2); 
  let scaleMid = map(mid, 0, 255, -0.9, 0.9); 
  let scaleBass = map(bass, 0, 255, -1, 1);

  let scaleMidLine = map(mid, 0, 255, 0, width); 

  // treble
  push();
  strokeWeight(2);
  stroke(255,0,0);
  scale(scaleTreble);
  point(mappedTreble, height/4);
  pop();

  // mid
  push();
  strokeWeight(3);
  stroke(0,0,255);
  scale(scaleMid);
  point(mappedMid, height/4);
  pop();

  // bass
  push();
  strokeWeight(4);
  stroke(255);
  scale(scaleBass);
  point(mappedBass, height/4);
  pop();

  translate(width / 2, height / 2); // move point of origin to centre of canvas

  let noOfPoints = 12; // total number of points to draw

  for (let i = 0; i < noOfPoints; i++) { // for all of the points
    rotate(TWO_PI / noOfPoints); // rotate around a circle - default for p5 is radians

    strokeWeight(4);
    stroke(255);
    point(mappedMicLevel, height/4);

  // treble
  push();
  strokeWeight(6);
  stroke(255-treble,0,0);
  scale(scaleTreble);
  rotate(-frameCount * scaleTreble/100);
  point(mappedTreble, height/4);
  pop();

  // mid
  push();
  strokeWeight(4);
  stroke(0,0,255-mid);
  scale(scaleMid);
  rotate(frameCount * scaleMid/100);
  point(mappedMid, height/4);
  strokeWeight(2);
  line(0, height/4, scaleMidLine, height);
  pop();

  // bass
  push();
  strokeWeight(6);
  stroke(255-bass);
  scale(scaleBass);
  rotate(-frameCount * scaleBass/100);
  point(mappedBass, height/4);
  pop();
  }
}