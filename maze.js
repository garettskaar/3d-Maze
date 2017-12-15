//Source:  http://rosettacode.org/wiki/Maze_generation#JavaScript

//generate maze data using Depth First Search Algorithm

// Start at a random cell.
// Mark the current cell as visited, and get a list of its neighbors.
// For each neighbor, starting with a randomly selected neighbor:
// If that neighbor hasn't been visited, remove the wall between this cell and that neighbor, and then recurse with that neighbor as the current cell.
function maze(x, y) {
    var n = x * y - 1;
    if (n < 0) {
        alert("illegal maze dimensions");
        return;
    }
    var horiz = [];
    for (var j = 0; j < x + 1; j++) horiz[j] = [],
        verti = [];
    for (var j = 0; j < y + 1; j++) verti[j] = [],
        here = [Math.floor(Math.random() * x), Math.floor(Math.random() * y)],
        path = [here],
        unvisited = [];
    for (var j = 0; j < x + 2; j++) {
        unvisited[j] = [];
        for (var k = 0; k < y + 1; k++)
            unvisited[j].push(j > 0 && j < x + 1 && k > 0 && (j != here[0] + 1 || k != here[1] + 1));
    }
    while (0 < n) {
        var potential = [
            [here[0] + 1, here[1]],
            [here[0], here[1] + 1],
            [here[0] - 1, here[1]],
            [here[0], here[1] - 1]
        ];
        var neighbors = [];
        for (var j = 0; j < 4; j++)
            if (unvisited[potential[j][0] + 1][potential[j][1] + 1])
                neighbors.push(potential[j]);
        if (neighbors.length) {
            n = n - 1;
            next = neighbors[Math.floor(Math.random() * neighbors.length)];
            unvisited[next[0] + 1][next[1] + 1] = false;
            if (next[0] == here[0])
                horiz[next[0]][(next[1] + here[1] - 1) / 2] = true;
            else
                verti[(next[0] + here[0] - 1) / 2][next[1]] = true;
            path.push(here = next);
        } else
            here = path.pop();
    }
    //returns a maze object with x y dimensions, and horizontal and vertical pathways (2D arrays of boolean values)..
    return { x: x, y: y, horiz: horiz, verti: verti };
}

//Displays maze using keyboard characters.
//Source:  http://rosettacode.org/wiki/Maze_generation#JavaScript

function display(m) {
    var text = [];
    for (var j = 0; j < m.x * 2 + 1; j++) {
        var line = [];
        if (0 == j % 2)
            for (var k = 0; k < m.y * 4 + 1; k++)
                if (0 == k % 4)
                    line[k] = '+';
                else if (j > 0 && m.verti[j / 2 - 1][Math.floor(k / 4)])
                    line[k] = ' ';
                else
                    line[k] = '-';
        else
            for (var k = 0; k < m.y * 4 + 1; k++)
                if (0 == k % 4)
                    if (k > 0 && m.horiz[(j - 1) / 2][k / 4 - 1])
                        line[k] = ' ';
                    else
                        line[k] = '|';
                else
                    line[k] = ' ';
        if (0 == j) line[1] = line[2] = line[3] = ' ';
        if (m.x * 2 - 1 == j) line[4 * m.y] = ' ';
        text.push(line.join('') + '\r\n');
    }
    return text.join('');
}

function getWalls(maze, s) {
    maze.trim();
    var height = 61;
    var width = 63; // add 2 for '\n'

    var x = new Array(height);
    for (var k = 0; k < height; k++) {
        x[k] = new Array(width-2);
    }

    var i = 0 //index of array
    var c = 0 //index of strinified maze
    while(i < height) {
        if (i%4 === 0) {
            for (var j = 0; j < width - 2; j++) {
                if (maze[c * width + j] === '+' || maze[c * width + j] === '-') {
                    x[i][j] = 1;
                } else if(maze[c * width + j] == ' '){
                    x[i][j] = 0;
                }
            }
        } else {
            for (var j = 0; j < width - 2; j++) {
                if (maze[c * width + j] === '|') {
                    x[i][j] = 1;
                } else if(maze[c * width + j] === ' '){
                    x[i][j] = 0;
                }
            }
            i++
            for (var j = 0; j < width - 2; j++) {
                if (maze[c * width + j] === '|') {
                    x[i][j] = 1;
                } else if(maze[c * width + j] === ' '){
                    x[i][j] = 0;
                }
            }
            i++
            for (var j = 0; j < width - 2; j++) {
                if (maze[c * width + j] == '|') {
                    x[i][j] = 1;
                } else if(maze[c * width + j] === ' '){
                    x[i][j] = 0;
                }
            }
        }
        i++;
        c++;
    }

    return x;
}

var width = 1;
var height = 1;

function pushHorizontalVerticies(vertexPositions, x, y, z) {
    //console.log("coordHoriz: ("+x+", "+z+")\t("+(x+width)+", "+z+")\n");
    vertexPositions.push(
        x, y + height, z,
        x, y, z,
        x + width, y ,z,
        x, y + height, z,
        x + width, y + height, z,
        x + width, y, z
    );
}
function pushHorizontalTexCoords(vertexTextureCoords){
    vertexTextureCoords.push(
        0.0, height,
        0.0, 0.0,
        width, 0.0,
        0.0, height,
        width, height,
        width, 0.0
        );
}
function pushVerticalVerticies(vertexPositions, x, y, z) {
    //console.log("coordVerti: ("+x+", "+z+")\t("+x+", "+(z+width)+")\n");
    vertexPositions.push(
        x, y + height, z,
        x, y, z,
        x, y, z + width,
        x, y + height, z,
        x,y + height, z + width,
        x, y, z + width
    );
}
function pushVerticalTexCoords(vertexTextureCoords){
    vertexTextureCoords.push(
        0.0, height,
        0.0, 0.0,
        width, 0.0,
        0.0, height,
        width, height,
        width, 0.0
    );
}

function pushCollisionH(hCollision, x, z)
{
    hCollision.push({x: x, z: z});
}
function pushCollisionV(vCollision, x, z)
{
    vCollision.push({x: x, z: z});
}
//Builds maze geometery.
function buildMaze(m) {
    var vertexPositions = [];
    var vertexTextureCoords = [];
    var hCollision = [];
    var vCollision = [];
    var h = m.x / 2;
    for (var j = 0; j < m.x * 2 + 1; j++) {
        var line = [];
        if (0 == j % 2) {
            for (var k = 0; k < m.y; k++) {
                if (j > 0 && m.verti[j / 2 - 1][Math.floor(k)]) { // " "
                    line[k] = ' ';
                } else if (k > 0 || j > 0) { // "-"
                    pushHorizontalVerticies(vertexPositions, k - h, 0.0, (j - 1.0) / 2.0 - h);
                    pushHorizontalTexCoords(vertexTextureCoords);
                    pushCollisionH(hCollision, k - h, (j - 1.0) / 2.0 - h);
                }
            }
        } else {
            for (var k = 0; k < m.y + 1; k++) {
                if (k > 0 && m.horiz[(j - 1) / 2][k - 1]) {
                    line[k] = ' ';
                } else if (j != m.x * 2 - 1 || k != m.y) { // |
                    pushVerticalVerticies(vertexPositions, k - h, 0.0, (j - 2.0) / 2.0 - h);
                    pushVerticalTexCoords(vertexTextureCoords);
                    pushCollisionV(vCollision, k - h, (j - 2.0) / 2.0 - h);
                }
            }
        }
    }
    return {
        p: vertexPositions,
        t: vertexTextureCoords,
        h: hCollision,
        v: vCollision
    };
}
//holding this collision method, might need it back
// var epsilon = 0.1;
// var pointC = [cX, cZ];
// var crossProduct = 0;
// var dotProduct = 0;
// var squareOfDistance = 0;
// var i = 0;
// var collision = true;
// while (i < xCollision.length) {
//
//
//     var pointA = [xCollision[i], zCollision[i]];
//     var pointB = [xCollision[i + 1], zCollision[i + 1]];
//     console.log("C = ("+pointC[0]+","+pointC[1]+")");
//
//     crossProduct = (pointC[1] - pointA[1])*(pointB[0] - pointA[0])-(pointC[0] - pointA[0])*(pointB[1] - pointA[1]);
//     console.log("CP = "+crossProduct);
//     if( Math.abs(crossProduct) > epsilon)
//     {
//         collision = false;
//     }
//     dotProduct = (pointC[0] - pointA[0]) * (pointB[0] - pointA[0]) + (pointC[1] - pointA[1])*(pointB[1] - pointA[1]);
//     console.log("DP = "+dotProduct);
//     if(dotProduct < 0)
//     {
//         collision = false;
//     }
//     squareOfDistance = (pointB[0] - pointA[0])*(pointB[0] - pointA[0])+(pointB[1] - pointA[1])*(pointB[1] - pointA[1]);
//     console.log("SQU = "+squareOfDistance);
//     if(dotProduct > squareOfDistance)
//     {
//         collision = false;
//     }
//     if(collision == true)
//     {
//         return collision
//     }
//     else
//     {
//         i++
//     }
//
// }
// return collision;