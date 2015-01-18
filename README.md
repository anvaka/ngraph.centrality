# ngraph.centrality

Module to calculate graph centrality metrics. Library computes degree centrality
for entire graph and returns list of nodes in descending order of centrality:
`[{ key: nodeId, value: centrality_value }, ... ]`

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
* **in** and **out**: `O(n * e)`, where `e` is the average number of edges per
node


# install

With [npm](https://npmjs.org) do:

```
npm install ngraph.centrality
```

# license

MIT

# todo

It would be nice to have asynchronous version for each centrality calculator.
