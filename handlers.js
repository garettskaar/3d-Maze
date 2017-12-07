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

var rotMatrix = mat4.create();
mat4.identity(rotMatrix);

function degToRad(deg) {
    return (deg * Math.PI) / 180;
}

/**
var handleMouseDown = function (event) {
    mouseDown = true;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
};

var handleMouseUp = function (event) {
    mouseDown = false;
};

var handleMouseMove = function (event) {
    if(!mouseDown) {
        return;
    }

    var newX = event.clientX;
    var newY = event.clientY;

    var diffX = newX - lastMouseX;
    yaw += diffX;
    //var newRotMatrix = mat4.create();
    //mat4.identity(newRotMatrix);
    //mat4.rotate(newRotMatrix, degToRad(diffX/4), [0, -1, 0]);

    var diffY = newY - lastMouseY;
    console.log(diffY);
    speed -= diffY/10000000;

    //mat4.translate(newRotMatrix, [0, 0, .1 * (diffY/10)]);
    //mat4.multiply(newRotMatrix, rotMatrix, rotMatrix);

    lastMouseX = newX;
    lastMouseY = newY;
};
**/


function handleKeyDown(event) {
    currentlyPressedKeys[event.keyCode] = true;
}

function handleKeyUp(event) {
    currentlyPressedKeys[event.keyCode] = false;
}
function handleKeys() {
    if (currentlyPressedKeys[38]) {
        // Up
        pitchRate = 0.1;
    } else if (currentlyPressedKeys[40]) {
        // Down
        pitchRate = -0.1;
    } else {
        pitchRate = 0;
    }

    if (currentlyPressedKeys[37] || currentlyPressedKeys[65]) {
        // Left cursor key or A
        yawRate = 0.2;
    } else if (currentlyPressedKeys[39] || currentlyPressedKeys[68]) {
        // Right cursor key or D
        yawRate = -0.2;
    } else {
        yawRate = 0;
    }

    if (currentlyPressedKeys[87]) {
        // W // 38
        speed = 0.003;
    } else if (currentlyPressedKeys[83]) {
        // S // 40
        speed = -0.003;
    } else {
        speed = 0;
    }

}

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
