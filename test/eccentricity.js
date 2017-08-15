var centrality = require('../');
var createGraph = require('ngraph.graph');
var test = require('tap').test;

test('It finds eccentricity centrality', function(t) {
  var g = createGraph();
  g.addLink(1, 2);
  g.addLink(2, 3);

  var eccentricity = centrality.eccentricity(g);

  t.equals(Object.keys(eccentricity).length, 3, 'Three nodes considered');
  t.equals(eccentricity[2], 1, 'Second node eccentricity is 1');
  t.equals(eccentricity[1], eccentricity[3], 'First and third node both have the same eccentricity value (2)');
  t.end();
});
