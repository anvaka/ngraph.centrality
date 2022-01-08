module.exports = degree;

/**
 * Calculates graph nodes degree centrality (in/out or both).
 *
 * @see http://en.wikipedia.org/wiki/Centrality#Degree_centrality
 *
 * @param {ngraph.graph} graph object for which we are calculating centrality.
 * @param {string} [kind=both] What kind of degree centrality needs to be calculated:
 *   'in'    - calculate in-degree centrality
 *   'out'   - calculate out-degree centrality
 *   'inout' - (default) generic degree centrality is calculated
 */
function degree(graph, kind) {
  var getNodeDegree;
  var result = Object.create(null);

  kind = (kind || 'both').toLowerCase();
  if (kind === 'both' || kind === 'inout') {
    getNodeDegree = inoutDegreeCalculator;
  } else if (kind === 'in') {
    getNodeDegree = inDegreeCalculator;
  } else if (kind === 'out') {
    getNodeDegree = outDegreeCalculator;
  } else {
    throw new Error('Expected centrality degree kind is: in, out or both');
  }

  graph.forEachNode(calculateNodeDegree);

  return result;

  function calculateNodeDegree(node) {
    var links = graph.getLinks(node.id);
    result[node.id] = getNodeDegree(links, node.id);
  }
}

function inDegreeCalculator(links, nodeId) {
  var total = 0;
  if (!links) return total;

  links.forEach(function(link) {
    total += (link.toId === nodeId) ? 1 : 0;
  });

  return total;
}

function outDegreeCalculator(links, nodeId) {
  var total = 0;
  if (!links) return total;

  links.forEach(function(link) {
    total += (link.fromId === nodeId) ? 1 : 0;
  });
  return total;
}

function inoutDegreeCalculator(links) {
  if (!links) return 0;

  // different versions of ngraph have different implementations of
  // of links (either as array or as a set)
  return (links.size || links.length);
}
