// http://rosettacode.org/wiki/Maze_generation#JavaScript
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
    return { x: x, y: y, horiz: horiz, verti: verti };
}

var width = 1;
var height = 1;

function pushh(vp, vt, x, y, z) {
    vp.push(x);
    vp.push(y + height);
    vp.push(z);
    vt.push(0.0);
    vt.push(height);
    vp.push(x);
    vp.push(y);
    vp.push(z);
    vt.push(0.0);
    vt.push(0.0);
    vp.push(x + width);
    vp.push(y);
    vp.push(z);
    vt.push(width);
    vt.push(0.0);
    vp.push(x);
    vp.push(y + height);
    vp.push(z);
    vt.push(0.0);
    vt.push(height);
    vp.push(x + width);
    vp.push(y + height);
    vp.push(z);
    vt.push(width);
    vt.push(height);
    vp.push(x + width);
    vp.push(y);
    vp.push(z);
    vt.push(width);
    vt.push(0.0);
}

function pushv(vp, vt, x, y, z) {
    vp.push(x);
    vp.push(y + height);
    vp.push(z);
    vt.push(0.0);
    vt.push(height);
    vp.push(x);
    vp.push(y);
    vp.push(z);
    vt.push(0.0);
    vt.push(0.0);
    vp.push(x);
    vp.push(y);
    vp.push(z + width);
    vt.push(width);
    vt.push(0.0);
    vp.push(x);
    vp.push(y + height);
    vp.push(z);
    vt.push(0.0);
    vt.push(height);
    vp.push(x);
    vp.push(y + height);
    vp.push(z + width);
    vt.push(width);
    vt.push(height);
    vp.push(x);
    vp.push(y);
    vp.push(z + width);
    vt.push(width);
    vt.push(0.0);
}

function createWorld(m) {
    var vertexPositions = [];
    var vertexTextureCoords = [];
    var text = [];
    var posh = [];
    var posv = [];
    var h = m.x / 2;
    for (var j = 0; j < m.x * 2 + 1; j++) {
        var line = [];
        if (0 == j % 2) {
            for (var k = 0; k < m.y; k++) {
                if (j > 0 && m.verti[j / 2 - 1][Math.floor(k)]) { // " "
                    line[k] = ' ';
                } else if (k > 0 || j > 0) { // "-"
                    //pushv(vertexPositions, vertexTextureCoords, (j-1)/2 - h, 0, k - h);
                    pushh(vertexPositions, vertexTextureCoords, k - h, 0, (j - 1) / 2 - h);
                    posh.push({ x: k - h, z: (j - 1) / 2 - h });
                }
            }
        } else {
            for (var k = 0; k < m.y + 1; k++) {
                if (k > 0 && m.horiz[(j - 1) / 2][k - 1]) {
                    line[k] = ' ';
                } else if (j != m.x * 2 - 1 || k != m.y) { // |
                    //pushh(vertexPositions, vertexTextureCoords, (j-2)/2 - h, 0, k - h);
                    pushv(vertexPositions, vertexTextureCoords, k - h, 0, (j - 2) / 2 - h);
                    posv.push({ x: k - h, z: (j - 2) / 2 - h });
                }
            }
        }
    }
    return {
        p: vertexPositions,
        t: vertexTextureCoords,
        pos: {
            h: posh,
            v: posv
        }
    };
}


