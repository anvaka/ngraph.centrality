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
  var getNodeDegree,
    sortedDegrees = [],
    result = [],
    nodeDegree;

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

  for (nodeDegree in sortedDegrees) {
    if (sortedDegrees.hasOwnProperty(nodeDegree)) {
      var nodes = sortedDegrees[nodeDegree];
      if (nodes) {
        for (var j = 0; j < nodes.length; ++j) {
          result.unshift({
            key: nodes[j],
            value: parseInt(nodeDegree, 10)
          });
        }
      }
    }
  }

  return result;

  function calculateNodeDegree(node) {
    var links = graph.getLinks(node.id),
      nodeDegree = getNodeDegree(links, node.id);

    if (!sortedDegrees.hasOwnProperty(nodeDegree)) {
      sortedDegrees[nodeDegree] = [node.id];
    } else {
      sortedDegrees[nodeDegree].push(node.id);
    }
  }
}

function inDegreeCalculator(links, nodeId) {
  var total = 0;
  for (var i = 0; i < links.length; i += 1) {
    total += (links[i].toId === nodeId) ? 1 : 0;
  }
  return total;
}

function outDegreeCalculator(links, nodeId) {
  var total = 0;
  for (var i = 0; i < links.length; i += 1) {
    total += (links[i].fromId === nodeId) ? 1 : 0;
  }
  return total;
}

function inoutDegreeCalculator(links) {
  return links.length;
}
