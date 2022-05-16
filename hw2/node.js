class Node {
    constructor(label, rank) {
        this.label = label
        this.rank = rank
        this.connectedTo = new Map();
        this.x = 50 + Math.random() * 300;
        this.y = 50 * (label.charCodeAt(0) - 65) + 20;
    }
}