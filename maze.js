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

var width = 1;
var height = 1;

function pushHorizontalVerticies(vertexPositions, x, y, z) {
    console.log(x+" "+y+" "+z);
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
    console.log(x+" "+y+" "+z);
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
//Builds maze geometery.
function buildMaze(m) {
    var vertexPositions = [];
    var vertexTextureCoords = [];
    var h = m.x / 2.0;
    for (var j = 0.0; j < m.x * 2.0 + 1.0; j++) {
        if (0.0 == j % 2) {
            for (var k = 0.0; k < m.y; k++) {
                if (k > 0 || j > 0) { // "-"
                    pushHorizontalVerticies(vertexPositions, k - h, 0.0, (j - 1.0) / 2.0 - h);
                    pushHorizontalTexCoords(vertexTextureCoords);
                }
            }
        } else {
            for (var k = 0.0; k < m.y + 1; k++) {
                if (j != m.x * 2 - 1 || k != m.y) { // |
                    pushVerticalVerticies(vertexPositions, k - h, 0.0, (j - 2.0) / 2.0 - h);
                    pushVerticalTexCoords(vertexTextureCoords);
                }
            }
        }
    }

    return {p: vertexPositions, t: vertexTextureCoords,};
}

var gridVertexPositionBuffer;
var gridVertexTextureCoordinateBuffer;
var gridVertexIndexBuffer;
var gridNormalBuffer;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Initialize Grid Geometry
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//        gridVertexPositionBuffer = gl.createBuffer();
//        gl.bindBuffer(gl.ARRAY_BUFFER, gridVertexPositionBuffer);
//        var gridVertices = [];
//        var gridNormals = [];
//
//        var max = 1.0;
//        var min = -1.0;
//        var diff = max - min;
//        var max100 = 99;
//        var min1 = -1;
//        var wallHeight = 20.0;
//
//
//        for (i = 0; i < 100; i++) {
//            for (j = 0; j < 100; j++) {
//
//                x = (i * diff) / max100 + min1;
//
//                y = 0.0;
//
//                z = (j * diff) / max100 + min1;
//
//                gridVertices.push(
//                    x, y, z
//                );
//
//                gridNormals.push(
//                    0, y, 0
//                );
//            }
//        }
//        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(gridVertices), gl.STATIC_DRAW);
//        gridVertexPositionBuffer.itemSize = 3;
//        gridVertexPositionBuffer.numItems = gridVertices.length / 3;
//
//        gridNormalBuffer = gl.createBuffer();
//        gl.bindBuffer(gl.ARRAY_BUFFER, gridNormalBuffer);
//
//        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(gridNormals), gl.STATIC_DRAW);
//        gridNormalBuffer.itemSize = 3;
//        gridNormalBuffer.numItems = gridNormals.length / 3;
//
//        gridVertexTextureCoordinateBuffer = gl.createBuffer();
//        gl.bindBuffer(gl.ARRAY_BUFFER, gridVertexTextureCoordinateBuffer);
//        var textureCoordinates = [];
//        // Top face
//
//        var tc = 0;
//        for (i = 0; i < 100; i++) {
//            for (j = 0; j < 100; j++) {
//                textureCoordinates[tc++] = 0.0 + (i * 1.0) / 99;
//                textureCoordinates[tc++] = 0.0 + (j * 1.0) / 99;
//
//            }
//        }
//
//        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
//        gridVertexTextureCoordinateBuffer.itemSize = 2;
//        gridVertexTextureCoordinateBuffer.numItems = textureCoordinates.length / 2;
//
//        gridVertexIndexBuffer = gl.createBuffer();
//        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gridVertexIndexBuffer);
//        var gridVertexIndices = [];
//
//        var gvi = 0;
//        for (i = 0; i < 99; i++) {
//            for (j = 0; j < 99; j++) {
//                gridVertexIndices[gvi++] = 0 + j + i * 100;
//                gridVertexIndices[gvi++] = 1 + j + i * 100;
//                gridVertexIndices[gvi++] = 0 + j + (i + 1) * 100;
//
//                gridVertexIndices[gvi++] = 0 + j + (i + 1) * 100;
//                gridVertexIndices[gvi++] = 1 + j + (i + 1) * 100;
//                gridVertexIndices[gvi++] = 1 + j + i * 100;
//            }
//        }
//
//        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(gridVertexIndices), gl.STATIC_DRAW);
//        gridVertexIndexBuffer.itemSize = 1;
//        gridVertexIndexBuffer.numItems = gridVertexIndices.length;