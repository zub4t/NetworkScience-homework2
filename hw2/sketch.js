let pageRank = new PageRank();
let graph = new Graph((x) => { pageRank.ranking(0.85, x) });

let old = undefined;
let converged = false;
const offsetX = 500
const offsetY = 700
const epslon = 0.000000000000001;
let calcPlot = true
let converged_list = []
let converged_points_list = []
let converged_nodes_list = {}


function setup() {
    createCanvas(500, 500);

    frameRate(10)
}

function draw() {

    background(240);

    graph.nodes.forEach((node) => {
        fill("white");
        circle(node.x, node.y, 20);
        fill("red");
        textSize(18);
        text(node.label, node.x, node.y);
        node.connectedTo.forEach((neighbor) => {
            stroke(200)
            line(node.x, node.y, neighbor.x, neighbor.y);
            stroke(100)

            if (graph.convergedR != undefined) {
                fill("black");
                textSize(10);
                text(graph.convergedR[node.label.charCodeAt(0) - 65], node.x - 10, node.y + 20);
            }
        })

    })
    if (graph.matrix != undefined) {
        if (calcPlot) {
            let x_list = []
            for (let i = 0; i <= 1; i = i + 0.05) {
                x_list.push(i)
                let c = 1
                while (!converged) {
                    fn(i, epslon)
                    c++;
                }
                console.log(c)
                converged_list.push(c)
                for (let j = 0; j < graph.nodes.size; j++) {
                    if (converged_nodes_list[String.fromCharCode(j + 65)] == undefined) {
                        converged_nodes_list[String.fromCharCode(j + 65)] = []
                    }
                    converged_nodes_list[String.fromCharCode(j + 65)].push(graph.convergedR[j][0])
                }

                graph.restore()
                converged = false
                    //const array = new Array(graph.nodes.length).fill(i);
            }
            graph.restore()
            calcPlot = false
            console.log(x_list)
            console.log(converged_nodes_list)
            var data = [];

            for (let j = 0; j < graph.nodes.size; j++) {
                data.push({
                    x: x_list,
                    y: converged_nodes_list[String.fromCharCode(j + 65)],
                    mode: 'markers',
                    name: `Node ${String.fromCharCode(j + 65)}`,
                    type: 'scatter'

                })

            }
            console.log(converged_list)
            console.log(x_list)

            Plotly.newPlot('5A', [{
                x: x_list,
                y: converged_list,
                mode: 'markers',
                name: `Node A`,
                mode: 'lines+markers',


            }]);
            Plotly.newPlot('5B', data);

        } else {

            fn(0.85, epslon)

        }

    }

}
const fn = (beta, epslon) => {

        if (!converged) {
            if (graph.convergedR == undefined) {
                graph.convergedR = multiply(graph.matrix, graph.r)

                console.log(graph.convergedR)
            } else {
                graph.convergedR = multiply(graph.matrix, graph.convergedR)
            }

            scaleBy(graph.convergedR, beta)
            sumBy(graph.convergedR, (1 - beta) / graph.nodes.size)
            if (old != undefined) {
                if (diff(old, graph.convergedR) < epslon) {
                    converged = true

                }
            }

            old = graph.convergedR
        }

    }
    /*
    function drawEllipses() {
        //fst graph
        for (let i = 0; i < converged_list.length; i++) {

            let x = offsetX + (i * (400 / (converged_list.length - 1)));
            let y = offsetY + (converged_list[i].y * -1);
            fill("red")
            ellipse(x, y, 7);
            converged_points_list.push({ "x": x, "y": y })
            if ((i < converged_list.length - 1 && converged_list[i].y - converged_list[i + 1].y != 0) ||
                i == converged_list.length - 1) {
                textSize(10);
                fill("black")
                text(`{ ${converged_list[i].y} }`, x - 10, y - 10);
            }


        }
        for (let i = 0; i < converged_points_list.length - 1; i++) {
            if (i == 0) {

                line(converged_points_list[i].x, converged_points_list[i].y, 1190, converged_points_list[i].y)
                line(converged_points_list[i].x, converged_points_list[i].y, converged_points_list[i].x, 10)

            }
            if (converged_points_list[i].x - converged_points_list[i + 1].x < 0) {
                line(converged_points_list[i].x,
                    converged_points_list[i].y,
                    converged_points_list[i + 1].x,
                    converged_points_list[i + 1].y);

            }
        }



    }
    */
function randomColor() {

    r = random(255);
    g = random(100, 200);
    b = random(100);
    a = random(200, 255);
    return color(r, g, b, a);

}