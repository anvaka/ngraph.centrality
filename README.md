# ngraph.centrality

Module to calculate graph centrality metrics. Library computes centrality
for entire graph and returns list of nodes in descending order of centrality:

``` javascript
[
  { key: nodeId, value: centrality_value },
  { key: secondNodeId, value: centrality_value },
  // ...
]
```

# usage

## [Degree centrality](https://en.wikipedia.org/wiki/Centrality#Degree_centrality)

``` javascript
var centrality = require('ngraph.centrality');
var g = require('ngraph.graph')();

// this will consider graph as undirected:
var degreeCentrality = centrality.degree(g);

// This will compute in-centrality:
var inCentrality = centrality.degree(g, 'in');

// out-centrality:
var outCentrality = centrality.degree(g, 'out');

// You can also pass 'inout' or 'both' to get same results
// as `degreeCentrality`
var sameAsDegreeCentrality = centrality.degree(g, 'inout');
```

Performance of degree centrality calculation is:

* **inout**: `O(n)`, where `n` is number of nodes
* **in** or **out**: `O(n * e)`, where `e` is the average number of edges per
node


## [Betweenness centrality](https://en.wikipedia.org/wiki/Betweenness_centrality)

``` javascript
var centrality = require('ngraph.centrality');
var g = require('ngraph.graph')();

// this will consider graph as undirected:
var betweenness = centrality.betweenness(g);

// this will consider graph as directed:
var directedBetweenness = centrality.betweenness(g, true);
```

Performance of betweenness calculation is `O(n * m)` time, and `O(n + m)` space
where `n` is number of nodes and `m` is number of edges.

This library implements Brandes's algorithm published in [A Faster Algorithm for Betweenness Centrality](http://www.inf.uni-konstanz.de/algo/publications/b-fabc-01.pdf)
and further discussed in [On Variants of Shortest-Path Betweenness
Centrality and their Generic Computation](http://www.inf.uni-konstanz.de/algo/publications/b-vspbc-08.pdf)

# install

With [npm](https://npmjs.org) do:

```
npm install ngraph.centrality
```

# license

MIT

# todo

It would be nice to have asynchronous version for each centrality calculator.
