var centrality = require('../');
var generator = require('ngraph.generators');
var createGraph = require('ngraph.graph');
var test = require('tap').test;

test('It finds degree centrality', function(t) {
  var g = createGraph();
  g.addLink(1, 2);
  g.addLink(1, 3);

  var degreeCentrality = centrality.degree(g);

  t.equals(Object.keys(degreeCentrality).length, 3, 'Three nodes considered');
  t.equals(degreeCentrality[1], 2, 'First node has two connections');
  t.equals(degreeCentrality[2], 1, 'Second node has one connection');
  t.equals(degreeCentrality[3], 1, 'Third node has one connection');
  t.end();
});

test('It finds complete graph centrality', function(t) {
  var g = generator.complete(6);

  var degreeCentrality = centrality.degree(g);
  g.forEachNode(verifyDegree);
  t.end();

  function verifyDegree(node) {
    t.equals(degreeCentrality[node.id], 5);
  }
});


test('it finds indegree centrality', function(t) {
  var g = createGraph();
  g.addLink(1, 2);
  g.addLink(1, 3);

  var degreeCentrality = centrality.degree(g, 'in');

  t.equals(Object.keys(degreeCentrality).length, 3, 'Three nodes considered');
  t.equals(degreeCentrality[1], 0, 'First node has no incoming edges');
  t.equals(degreeCentrality[2], degreeCentrality[3], 'Second and third nodes have correct centrality');
  t.end();
});

test('it finds outdegree centrality', function(t) {
  var g = createGraph();
  g.addLink(1, 2);
  g.addLink(2, 3);
  g.addLink(1, 3);

  var degreeCentrality = centrality.degree(g, 'out');

  t.equals(Object.keys(degreeCentrality).length, 3, 'Three nodes considered');
  t.equals(degreeCentrality[1], 2, 'First node has two outgoing edges');
  t.equals(degreeCentrality[3], 0, 'Third node has no outgoing edgese');
  t.end();
});
