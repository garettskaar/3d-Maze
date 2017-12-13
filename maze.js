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

function pushCollisionH(xCollision, zCollision, x, z)
{
    xCollision.push(x);
    zCollision.push(z);
    xCollision.push(x+width);
    zCollision.push(z);
}
function pushCollisionV(xCollision, zCollision, x, z)
{
    xCollision.push(x);
    zCollision.push(z);
    xCollision.push(x);
    zCollision.push(z+width);
}
//Builds maze geometery.
function buildMaze(m) {
    var vertexPositions = [];
    var vertexTextureCoords = [];
    var xCollision = [];
    var zCollision = [];
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
                    pushCollisionH(xCollision, zCollision,k - h, (j - 1.0) / 2.0 - h);
                }
            }
        } else {
            for (var k = 0; k < m.y + 1; k++) {
                if (k > 0 && m.horiz[(j - 1) / 2][k - 1]) {
                    line[k] = ' ';
                } else if (j != m.x * 2 - 1 || k != m.y) { // |
                    pushVerticalVerticies(vertexPositions, k - h, 0.0, (j - 2.0) / 2.0 - h);
                    pushVerticalTexCoords(vertexTextureCoords);
                    pushCollisionV(xCollision, zCollision, k - h, (j - 2.0) / 2.0 - h);
                }
            }
        }
    }
    return {
        p: vertexPositions,
        t: vertexTextureCoords,
        x: xCollision,
        z: zCollision
    };
}