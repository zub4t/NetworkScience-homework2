class Graph {
    constructor(call) {

        this.nodes = new Map();
        let that = this


        document.getElementById('graph').addEventListener('change', function() {

            var fr = new FileReader();
            fr.onload = function() {
                let txt = (fr.result);
                let lines = txt.split("\n");
                let ll = []
                let index = 0
                for (let element of lines) {
                    if (index == 0) {
                        //network size
                        this.size = parseInt(element)
                    } else {
                        let col = element.replaceAll("\r", " ").split(" ")
                        let n1 = that.nodes.get(col[0]) != undefined ? that.nodes.get(col[0]) : new Node(col[0], 0)
                        let n2 = that.nodes.get(col[1]) != undefined ? that.nodes.get(col[1]) : new Node(col[1], 0)
                        n1.connectedTo.set(n2.label, n2)
                        that.nodes.set(col[1], n2)
                        that.nodes.set(col[0], n1)

                    }
                    index++
                };

                for (let i = 65; i < 65 + that.nodes.size; i++) {
                    let list_aux = new Array(that.nodes.size).fill(0);
                    for (let j = 65; j < 65 + that.nodes.size; j++) {
                        if (i != j && that.nodes.get(String.fromCharCode(i)) != undefined) {
                            let m = that.nodes.get(String.fromCharCode(i))

                            list_aux[j - 65] = that.nodes.get(String.fromCharCode(i))
                                .connectedTo.has(String.fromCharCode(j)) ?
                                1 / that.nodes.get(String.fromCharCode(i)).connectedTo.size : 0

                        }

                    }
                    ll.push(list_aux)
                }
                that.r = transpose([new Array(that.nodes.size).fill(1 / that.nodes.size)]);
                that.matrix = transpose(ll)
                that.initial_r = transpose([new Array(that.nodes.size).fill(1 / that.nodes.size)]);
                that.initial_matrix = transpose(ll)



            }

            fr.readAsText(this.files[0]);

        })
    }
    restore() {
        this.r = this.initial_r
        this.convergedR = this.initial_r
        this.matrix = this.initial_matrix
        this.matrix = this.initial_matrix
    }

}