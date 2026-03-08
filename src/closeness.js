module.exports = closeness;

/**
 * In a connected graph, the normalized closeness centrality of a node is the average
 * length of the shortest path between the node and all other nodes in the
 * graph. Thus the more central a node is, the closer it is to all other nodes.
 */
function closeness(graph, oriented) {
  // list of predecessors on shortest paths from source
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
    // Set number of reachable nodes
    var reachableNodesTotal = distances.length;
    // Compute sum of all distances for node
    var totalDistance = distances.reduce(function(a,b) { return a + b }, 0);
    if (totalDistance > 0) {
      centrality[currentNode] = ((reachableNodesTotal - 1) / totalDistance); 
    } else {
      centrality[currentNode] = 0;
    }
  }

  function singleSourceShortestPath(source) {
    var q = [source];
    var qIndex = 0;

    graph.forEachNode(initNode);
    dist[source] = 0;

    while (qIndex < q.length) {
      var v = q[qIndex];
      qIndex += 1;
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
        q.push(w);
      }
    }
  }
}
