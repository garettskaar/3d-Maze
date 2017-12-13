var mouseDown = false;
var lastMouseX = null;
var lastMouseY = null;
var currentlyPressedKeys = {};
var zoom = -3;
var shift = 0;
var raise = 0;

var pitch = 0;
var pitchRate = 0;
var yaw = 90;
var yawRate = 0;
var xPos = 5.4;
var yPos = 0.3;
var zPos = 4.0;
var speed = 0;

var rotateXmax = 640;
var rotateYmax = 480;

var rotMatrix = mat4.create();
mat4.identity(rotMatrix);

function degToRad(deg) {
    return (deg * Math.PI) / 180;
}

//mouse event variables
var mouseDownP = false;
var lastMouseX = null;
var lastMouseY = null;
var deltaX = 0;
var currentlyPressedKeys = {};


function degToRad(deg){
    return (deg*Math.PI/180);
}
function reset(x) {
    if (x>0) return 1;
    else if (x<0) return -1;
    else return 0;
}
//move functionality
var handleKeyDown = function (event)
{
    currentlyPressedKeys[event.keyCode] = true;
}

var handleKeyUp = function (event)
{
    currentlyPressedKeys[event.keyCode] = false;
}

function handleKeys() {
    if (currentlyPressedKeys[87]) {
        speed = 0.001;
    }
    else if (currentlyPressedKeys[83]) {
        speed = -0.001;
    }
    else{
        speed = 0;
    }
}

var handleMouseDown = function (event)
{
    mouseDownP = true;
    speed = 0;
}
var handleMouseUp = function (event)
{
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
    mouseDownP = false;
}
var handleMouseMove = function (event) {


    var newX = event.clientX;
    var newY = event.clientY;

    if (lastMouseX != 0 && mouseDownP)
    {

        //horizontal -= degToRad(newX - lastMouseX);
        //vertical -= degToRad(newY - lastMouseY);
        if((newY - lastMouseY) > 0)
        {
            speed = -0.003
        }
        else if((newY - lastMouseY) < 0)
        {
            speed = 0.003;
        }
        //This uses canvas size for smooth movement
        horizontal -= (newX - lastMouseX) / (rotateXmax / 6);
        vertical -= (newY - lastMouseY) / (rotateYmax / 3);
    }

    if (Math.abs(vertical) > Math.PI / 2)
        vertical = reset(vertical) * Math.PI / 2;

    lastMouseX = newX;
    lastMouseY = newY;

}


// function handleKeyDown(event) {
//     currentlyPressedKeys[event.keyCode] = true;
// }
//
// function handleKeyUp(event) {
//     currentlyPressedKeys[event.keyCode] = false;
// }
// function handleKeys() {
//     if (currentlyPressedKeys[38]) {
//         // Up
//         pitchRate = 0.1;
//     } else if (currentlyPressedKeys[40]) {
//         // Down
//         pitchRate = -0.1;
//     } else {
//         pitchRate = 0;
//     }
//
//     if (currentlyPressedKeys[37] || currentlyPressedKeys[65]) {
//         // Left cursor key or A
//         yawRate = 0.2;
//     } else if (currentlyPressedKeys[39] || currentlyPressedKeys[68]) {
//         // Right cursor key or D
//         yawRate = -0.2;
//     } else {
//         yawRate = 0;
//     }
//
//     if (currentlyPressedKeys[87]) {
//         // W // 38
//         speed = 0.003;
//     } else if (currentlyPressedKeys[83]) {
//         // S // 40
//         speed = -0.003;
//     } else {
//         speed = 0;
//     }
//
// }

// function handleKeys() {
//
//     if (currentlyPressedKeys[87]) {
//         // W
//         pitchRate += 0.05;
//     } else if (currentlyPressedKeys[83]) {
//         // D
//         pitchRate += -0.05;
//     } else if(pitchRate < -0.1) {
//         pitchRate += 0.1;
//     } else if(pitchRate > 0.1) {
//         pitchRate += -0.1;
//     } else {
//         pitchRate = 0;
//     }
//
//     if (currentlyPressedKeys[65]) {
//         // Left cursor key
//         yawRate += 0.05;
//     } else if (currentlyPressedKeys[68]) {
//         // Right cursor key
//         yawRate += -0.05;
//     } else if(yawRate < -0.1) {
//         yawRate += 0.1;
//     } else if(yawRate > 0.1) {
//         yawRate += -0.1;
//     } else {
//         yawRate = 0;
//     }
//     if (currentlyPressedKeys[83]) {
//         // Up cursor key
//         speed = 0.0003;
//     } else if (currentlyPressedKeys[87]) {
//         // Down cursor key
//         speed = -0.0003;
//     }
// }
