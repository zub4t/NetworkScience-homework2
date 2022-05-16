const nodes_prob = []
function getRandomItem(collection) {

    let keys = Array.from(collection.keys());
    return collection.get(keys[Math.floor(Math.random() * keys.length)]);
}
class PageRank{
  init(graph){
    graph.nodes.forEach((element,index,array)=>{
   
      element.rank = 1/array.size
    })  
    this.analised_graph = graph;
  }
  
  
  ranking(damping_factor,graph){
   
    this.init(graph)
   

    //Random surface model
  
    var random_node = getRandomItem(this.analised_graph.nodes)
    let cc = 0 
    while(cc<10000){
      cc++;
     
      let c = 1//random_node.connectedTo.length;
      this.analised_graph.nodes.get(random_node.label).rank = this.analised_graph.nodes.get(random_node.label).rank+c
      let context = random_node.connectedTo;
      if(Math.random() <= damping_factor && random_node.connectedTo.length!=0) {
        let index = parseInt(Math.random() * random_node.connectedTo.length);
        random_node = random_node.connectedTo[index]
      } else{
        random_node = getRandomItem(this.analised_graph.nodes)
      } 
    }
    let r = "";
    this.analised_graph.nodes.forEach((element)=>{
      r+=element.label+":"+(element.rank/10000)+"\n"
      nodes_prob.push(element.rank)
    })
    console.log(r)
    console.log(this.nodes_prob)
  }
  
  
}