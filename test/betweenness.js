var centrality = require('../');
var generator = require('ngraph.generators');
var createGraph = require('ngraph.graph');
var test = require('tap').test;

test('It finds betweenness centrality', function(t) {
  var g = createGraph();
  g.addLink(1, 2);
  g.addLink(2, 3);

  var betweenness = centrality.betweenness(g);

  t.equals(Object.keys(betweenness).length, 3, 'Three nodes considered');
  t.equals(betweenness[2], 1, 'Second node centrality is 1');
  t.equals(betweenness[1], betweenness[3], 'First and last node have the same value');
  t.end();
});

test('It can find betweenness centrality in oriented graph', function(t) {
  var g = createGraph();
  // all links go to 1
  g.addLink(2, 1);
  g.addLink(3, 1);
  g.addLink(4, 1);

  // And then 3 is pass through from 2 to 4
  g.addLink(2, 3);
  g.addLink(3, 4);
  // Even though it looks like 1 is the most important, it doesn't have any out
  // edges, thus its betweenness centrality is 0 when graph is oriented

  var betweenness = centrality.betweenness(g, true);

  t.equals(Object.keys(betweenness).length, 4, 'All nodes considered');
  t.equals(betweenness[3], 1, 'Third node has correct betweenness');
  t.equals(betweenness[1], 0, 'First node has correct betweenness');
  t.end();
});

test('complete graph has 0 betweenness', function(t) {
  var completeGraph = generator.complete(5);
  var betweenness = centrality.betweenness(completeGraph);
  completeGraph.forEachNode(function (node) {
    t.equals(betweenness[node.id], 0, 'Complete graph should have 0 betweenness');
  });

  t.end();
});

test('circle should have 1 betweenness', function (t) {
  var circle = generator.path(5);
  circle.addLink(4, 0); // convert path to circle
  var betweenness = centrality.betweenness(circle);
  circle.forEachNode(function (node) {
    t.equals(betweenness[node.id], 1, 'Circle graph should have 1 betweenness');
  });

  t.end();
});
