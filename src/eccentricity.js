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
    var maxDist = 0;
    Object.keys(dist).forEach(function (key) {
      var val = dist[key];
      if (maxDist < val) maxDist = val;
    });

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
