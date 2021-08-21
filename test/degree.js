var centrality = require('../');
var generator = require('ngraph.generators');
var createGraph = require('ngraph.graph');
var test = require('tap').test;

test('It finds degree centrality', function(t) {
  var g = createGraph();
  g.addLink(1, 2);
  g.addLink(1, 3);

  var degreeCentrality = centrality.degree(g);

  t.equal(Object.keys(degreeCentrality).length, 3, 'Three nodes considered');
  t.equal(degreeCentrality[1], 2, 'First node has two connections');
  t.equal(degreeCentrality[2], 1, 'Second node has one connection');
  t.equal(degreeCentrality[3], 1, 'Third node has one connection');
  t.end();
});

test('It finds degree centrality for unconnected graph', function(t) {
  var g = createGraph();
  g.addNode(1);
  g.addNode(2);

  var degreeCentrality = centrality.degree(g);

  t.equal(Object.keys(degreeCentrality).length, 2, 'Two nodes considered');
  t.equal(degreeCentrality[1], 0, 'First node has no connections');
  t.equal(degreeCentrality[2], 0, 'Second node has no connection');
  t.end();
});

test('It finds complete graph centrality', function(t) {
  var g = generator.complete(6);

  var degreeCentrality = centrality.degree(g);
  g.forEachNode(verifyDegree);
  t.end();

  function verifyDegree(node) {
    t.equal(degreeCentrality[node.id], 5);
  }
});


test('it finds indegree centrality', function(t) {
  var g = createGraph();
  g.addLink(1, 2);
  g.addLink(1, 3);

  var degreeCentrality = centrality.degree(g, 'in');

  t.equal(Object.keys(degreeCentrality).length, 3, 'Three nodes considered');
  t.equal(degreeCentrality[1], 0, 'First node has no incoming edges');
  t.equal(degreeCentrality[2], degreeCentrality[3], 'Second and third nodes have correct centrality');
  t.end();
});

test('it finds outdegree centrality', function(t) {
  var g = createGraph();
  g.addLink(1, 2);
  g.addLink(2, 3);
  g.addLink(1, 3);

  var degreeCentrality = centrality.degree(g, 'out');

  t.equal(Object.keys(degreeCentrality).length, 3, 'Three nodes considered');
  t.equal(degreeCentrality[1], 2, 'First node has two outgoing edges');
  t.equal(degreeCentrality[3], 0, 'Third node has no outgoing edges');
  t.end();
});

test('it throws on unknown kind', function(t) {
  var g = createGraph();
  g.addLink(1, 2);
  g.addLink(1, 3);

  t.throws(function() {
    centrality.degree(g, 'unknown');
  });
  t.end();
});

test('it can compute indegree of isolated node', function(t) {
  var g = createGraph();
  g.addNode(1);

  var degreeCentrality = centrality.degree(g, 'in');

  t.equal(Object.keys(degreeCentrality).length, 1, 'One node considered');
  t.equal(degreeCentrality[1], 0, 'First node has no incoming edges');
  t.end();
});

test('it compute outdegree of islated nodes', function(t) {
  var g = createGraph();
  g.addNode(1);
  g.addNode(2);

  var degreeCentrality = centrality.degree(g, 'out');

  t.equal(Object.keys(degreeCentrality).length, 2, 'Two nodes considered');
  t.equal(degreeCentrality[1], 0, 'First node has no outgoing edges');
  t.equal(degreeCentrality[2], 0, 'Second node has no outgoing edges');
  t.end();
});