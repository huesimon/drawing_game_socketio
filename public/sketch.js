var socket;
var r, g, b;
var input, red, green, blue;

var hintText = "This is the hint";
var answerText;

function setup() {
    r = 255;
    g = 255;
    b = 255;
    createCanvas(500, 500);
    background(51);


    red = createButton('red');
    red.position(20, 480);
    green = createButton('green');
    green.position(red.x + red.width, 480);
    blue = createButton('blue');
    blue.position(green.x + green.width, 480);

    red.mousePressed(setRed);
    green.mousePressed(setGreen);
    blue.mousePressed(setBlue);

    socket = io.connect('http://localhost:3000/');
    socket.on('mouse', newDrawing);
}


function setRed() {
    r = 255;
    g = 0;
    b = 0;
}
function setGreen() {
    r = 0;
    g = 255;
    b = 0;
}
function setBlue() {
    r = 0;
    g = 0;
    b = 255;
}

function newDrawing(data) {
    noStroke();
    fill(data.red, data.green, data.blue);
    ellipse(data.x, data.y, 30, 30);
    console.log('Sending: ' + mouseX + ', ' + mouseY);
}

function mouseDragged() {
    noStroke();
    fill(r, g, b);
    ellipse(mouseX, mouseY, 30, 30);
    console.log('Sending: ' + mouseX + ', ' + mouseY);

    var data = {
        x: mouseX,
        y: mouseY,
        red: r,
        green: g,
        blue: b
    };
    socket.emit('mouse', data);
}

function draw() {
    textSize(32);
    fill(0,0,0);
    text(hintText, width/2 ,35);
}