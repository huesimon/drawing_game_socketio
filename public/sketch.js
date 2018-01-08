var socket;
var r, g, b;
var input, red, green, blue;

var hintText = "This is the hint";
var answerText;
var playerAllowedToDraw = "N/A";

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
    playerAllowedToDraw = data.id;


    noStroke();
    fill(data.red, data.green, data.blue);
    ellipse(data.x, data.y, 30, 30);
    console.log('Sending: ' + mouseX + ', ' + mouseY);
}

function mouseDragged() {
console.log("your id: " + socket.id + " id that is allowed to draw: " + playerAllowedToDraw);

    if(canIDraw(playerAllowedToDraw)){
        noStroke();
        fill(r, g, b);
        ellipse(mouseX, mouseY, 30, 30);
        console.log('Sending: ' + mouseX + ', ' + mouseY + "," + socket.id);

        var data = {
            x: mouseX,
            y: mouseY,
            red: r,
            green: g,
            blue: b,
            id: socket.id
        };
        socket.emit('mouse', data);
    }

    //Not drawing any ellipse, just sending data, so server.js can check it()
    // noStroke();
    // fill(r, g, b);
    // ellipse(mouseX, mouseY, 30, 30);
    console.log('Sending: ' + mouseX + ', ' + mouseY + "," + socket.id);

    var data = {
        x: mouseX,
        y: mouseY,
        red: r,
        green: g,
        blue: b,
        id: socket.id
    };
    socket.emit('mouse', data);
}

function draw() {
    textSize(32);
    fill(0, 0, 0);
    text(hintText, width / 2, 35);
}

function canIDraw(id) {
    //Is my id the same as the first person that joined?
    //server.js has an array, and a function called "whoIsAllowedToDraw"
    //It will broadcast the drawing, and ignore all other socket connections input
    //canIDraw will hopefully ignore the other users input to the canvas
    //so that you won't destroy the masterpiece of the "drawer"

    //if i'm the first person in the array
    if (socket.id === id) {
        return true;

    } else return false;
}