var centrality = require('../');
var createGraph = require('ngraph.graph');
var test = require('tap').test;

test('It finds degree centrality', function(t) {
  var g = createGraph();
  g.addNode(1);
  g.addLink(1, 2);
  g.addLink(1, 3);

  var degreeCentrality = centrality.degree(g);

  t.equals(degreeCentrality.length, 3, 'Three nodes considered');
  t.equals(degreeCentrality[0].key, 1, 'Sorted descending');
  t.equals(degreeCentrality[0].value, 2, 'First node has two connections');
  t.equals(degreeCentrality[1].value, 1, 'Second node has one connection');
  t.equals(degreeCentrality[2].value, 1, 'Third node has one connection');
  t.end();
});
