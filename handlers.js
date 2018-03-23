//The following handler functions control user movement and rotation. The values are utilized in the
//animate function (final.html).

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
var xPos = -10.0;
var yPos = 0.3;
var zPos = -10.0;
var speed = 0;

var rotateXmax = 640;
var rotateYmax = 480;

var rotMatrix = mat4.create();
mat4.identity(rotMatrix);

//mouse event variables
var mouseDownP = false;
var lastMouseX = null;
var lastMouseY = null;
var deltaX = 0;
var currentlyPressedKeys = {};

//degrees to radains
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
        speed = -0.001;
    }
    else if (currentlyPressedKeys[83]) {
        speed = 0.001;
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
