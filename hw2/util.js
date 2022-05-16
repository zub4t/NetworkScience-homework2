function sumArray(array) {
    let sum = 0;
    array.forEach(item => {
        sum += Number.parseFloat(item);
    });
    return sum;
}

function diff(a, b) {
    let c = 0;
    for (let i = 0; i < a.length; i++) {

        c += Math.abs(a[i][0] - b[i][0]);

    }

    return c;
}



function getRandomFn(percent) {
    var parts = percent.map((p, _, { length }) => (100 + p) / length),
        sum = parts.reduce((a, b) => a + b),
        normalized = parts.map((s => v => s += v / sum)(0));

    return () => normalized.findIndex((r => v => r < v)(Math.random()));
}

function scaleBy(matrix, number) {
    matrix.forEach((element, i) => {
        element.forEach((x, j) => {
            matrix[i][j] = x * number;
        });
    })

}

function sumBy(matrix, number) {
    matrix.forEach((element, i) => {
        element.forEach((x, j) => {
            matrix[i][j] = x + number;
        });
    })

}

function transpose(matrix) {
    return _.zip.apply(_, matrix)
}

function multiply(a, b) {
    var aNumRows = a.length,
        aNumCols = a[0].length,
        bNumRows = b.length,
        bNumCols = b[0].length,
        m = new Array(aNumRows); // initialize array of rows
    for (var r = 0; r < aNumRows; ++r) {

        m[r] = new Array(bNumCols); // initialize the current row
        for (var c = 0; c < bNumCols; ++c) {

            m[r][c] = 0; // initialize the current cell
            for (var i = 0; i < aNumCols; ++i) {
                m[r][c] += a[r][i] * b[i][c];
            }
        }
    }
    return m;
}

function display(m) {
    for (var r = 0; r < m.length; ++r) {
        document.write('&nbsp;&nbsp;' + m[r].join(' ') + '<br />');
    }
}

function drawArrow(base, vec, myColor) {
    push();
    stroke(myColor);
    strokeWeight(0.5);
    fill(myColor);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 7;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);

    pop();
}