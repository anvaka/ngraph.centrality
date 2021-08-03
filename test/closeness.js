var centrality = require('../');
var createGraph = require('ngraph.graph');
var test = require('tap').test;

test('It finds closeness centrality', function(t) {
  var g = createGraph();
  g.addLink(1, 2);
  g.addLink(2, 3);

  var closeness = centrality.closeness(g);

  t.equal(Object.keys(closeness).length, 3, 'Three nodes considered');
  t.equal(closeness[2], 1, 'Second node centrality is 1');
  t.equal(closeness[1], closeness[3], 'First and last node have the same value');
  t.end();
});

