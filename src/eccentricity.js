module.exports = eccentricity;

/**
 * The eccentricity centrality of a node is the greatest distance between that node and
 * any other node in the network. 
 */
function eccentricity(graph, oriented) {
  var Q = [];
  // distance from source
  var dist = Object.create(null);

  var currentNode;
  var centrality = Object.create(null);

  graph.forEachNode(setCentralityToZero);
  graph.forEachNode(calculateCentrality);

  return centrality;

  function setCentralityToZero(node) {
    centrality[node.id] = 0;
  }

  function calculateCentrality(node) {
    currentNode = node.id;
    singleSourceShortestPath(currentNode);
    accumulate();
  }

  function accumulate() {
    // Add all distances for node to array, excluding -1s
    var distances = Object.keys(dist).map(function(key) {return dist[key]}).filter(function(val){return val !== -1});

    // Get the maximum distance from this node to any other node
    // Isolated nodes have no distances to other nodes, so set to 0 if length of distances array has no length
    var maxDist;
    if (distances.length) {
      maxDist = Math.max.apply(null, distances);	
    } else {
      maxDist = 0;
    }
	
    centrality[currentNode] = maxDist;
  }

  function singleSourceShortestPath(source) {
    graph.forEachNode(initNode);
    dist[source] = 0;
    Q.push(source);

    while (Q.length) {
      var v = Q.shift();
      graph.forEachLinkedNode(v, processNode, oriented);
    }

    function initNode(node) {
      var nodeId = node.id;
      dist[nodeId] = -1;
    }

    function processNode(otherNode) {
      var w = otherNode.id
      if (dist[w] === -1) {
        // Node w is found for the first time
        dist[w] = dist[v] + 1;
        Q.push(w);
      }
    }
  }
}
