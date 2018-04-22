var svg, root, treemap, tooltip, i = 0, duration = 750,
    margin = {top: 15, right: 10, bottom: 10, left: 10};
var imgPath = "images/view-HC3_01447.png", heatMapWidth = 400, heatMapHeight = 240;
var items = ["x", "y", "value"];
var canvasId = 1;
var color = {
    "extended": "#99CCFF",
    "collapsed": "#ffff99"
};

function createGraph(treeData) {
    var width  = 600 - margin.left - margin.right,
        height = 387 - margin.top  - margin.bottom;

    if (!d3.select("#chart").select("svg").empty()){
        svg = d3.select("svg");
        d3.select("#chart").select("svg").remove();
    }

    svg = d3.select("#chart")
        .append("svg:svg")
        .attr("width",  width  + margin.left + margin.right)
        .attr("height", height + margin.top  + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(d3.zoom().on("zoom", function () {
            svg.attr("transform", d3.event.transform)
        }).scaleExtent([0.2, 4]))
        .append("g");

    // build the arrow marker.
    svg.append("svg:defs").selectAll("marker")
        .data(["arrow0", "arrow1"])      // Different link/path types can be defined here
        .enter().append("svg:marker")    // This section adds in the arrows
        .attr("id", String)
        // .attr("id", function (d) {
        //     return (d.source.id + "-" + d.target.id).replace(/\s+/g, '');
        // })
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 23)
        .attr("refY", 0)
        .attr("markerWidth", 4)
        .attr("markerHeight", 4)
        .attr("orient", "auto")
        .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5"); // "M 0,0 m -5,-5 L 5,0 L -5,5 Z"); //

    treemap = d3.tree().size([width, height]);
    root = d3.hierarchy(treeData, function (d) {
        return d.children;
    });

    root.x0 = 2* margin.top;
    root.y0 = width / 2;
    root.children.forEach(collapse);
    tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

    update(root);
}

function collapse(d){
    if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children  = null;
    }
}

function createHeatMap(canvas, node){
    var img = new Image();
    img.onload = function() {
        var scale = heatMapWidth / img.width;
        console.log("scale is " + scale);
        canvas.attr("width", heatMapWidth )
              .attr("height", Math.ceil(img.height * scale))
              .on("mouseover", function () {
                  tooltip.transition()
                         .duration(200)
                         .style("opacity", 0.8);
                  tooltip.html("<label>" + node.data.label + "</label>")
                         .style("left", (d3.event.pageX) + "px")
                         .style("top", (d3.event.pageY - 28) + "px");
              })
              .on("mouseout", function () {
                  tooltip.transition()
                         .duration(500)
                         .style("opacity", 0);
              });

        var keyPoints = [];
        recurse(keyPoints, node);

        drawHeatMap(canvas, keyPoints, scale);
        canvas.node().style.background = "url(\'" + imgPath + "\')";
        canvas.node().style.backgroundSize = "100% 100%";
    };
    img.src = imgPath;

    function recurse(array, node) {
        if (node.data.hasOwnProperty("keyPoints")){
            var pts = string2points(node.data.keyPoints, 3);
            pts.forEach(function (t) { array.push(t); });
        } else {
            if (node.children) {
                node.children.forEach(function (t) { recurse(array, t); });
            } else if (node._children) {
                node._children.forEach(function (t) { recurse(array, t); });
            }
        }
    }
}

function drawHeatMap(viz, keyPoints, scale) {
    var canvas = document.getElementById(viz.attr("id"));
    var heat = simpleheat(canvas);
    var max  = 1;

    for (var i = 0; i < keyPoints.length; i++) {
        for (var j = 0; j < keyPoints[i].length; j++) {
            keyPoints[i][j] *= scale;
        }
    }
    console.log(keyPoints);

    heat.data(keyPoints);
    keyPoints.forEach(function (t) { max = (t[2] > max)? t[2]: max; });
    heat.max(max);
    heat.radius(Math.ceil(25 * scale), Math.ceil(15 * scale));
    heat.draw();

}

function update(source) {
    // Assigns the x and y position for the nodes
    var treeData = treemap(root);

    // Compute the new tree layout.
    var nodes = treeData.descendants(),
        links = treeData.descendants().slice(1);

    // Normalize for fixed-depth.
    nodes.forEach(function (d){ d.y = d.depth * 70});

    // ****************** Nodes section ***************************

    // Update the nodes...
    var node = svg.selectAll('g.node')
        .data(nodes, function(d) {return d.id || (d.id = ++i); });

    // Enter any new modes at the parent's previous position.
    var nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr("transform", function(d) {
            return "translate(" + source.x0 + "," + source.y0 + ")";
        })
        .on('click', click);

    // Add Circle for the nodes
    nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style("fill", function(d) {
            return d._children ? color.collapsed : color.extended;
        });

    // Add labels for the nodes
    nodeEnter.append('text')
        .attr("dy", ".35em")
        .attr("x", function(d) {
            return d.children || d._children ? -13 : 13;
        })
        .attr("text-anchor", function(d) {
            return d.children || d._children ? "end" : "start";
        })
        .attr("transform", "rotate(-20)")
        .text(function(d) { return d.data.label; });

    // UPDATE
    var nodeUpdate = nodeEnter.merge(node);

    // Transition to the proper position for the node
    nodeUpdate.transition()
        .duration(duration)
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    // Update the node attributes and style
    nodeUpdate.select('circle.node')
        .attr('r', 10)
        .style("fill", function(d) {
            return d._children ? color.collapsed : color.extended;
        })
        .attr('cursor', 'pointer')
        .on("mouseover", function (d) {
            if (d.children || d._children) {
                // console.log(d);
                tooltip.html("<button class='button' id='heat-map-btn'>Heat Map</button>" +
                             "<button id='bar-chart-btn' class='button'>Bar Chart</button>")
                // "<label><input type='button' id='heatmap' style=\"display: none;\"/><span>Heat Map</span></label>")
                    .style('top', d3.event.pageY - 10 + 'px')
                    .style('left', d3.event.pageX + 10 + 'px')
                    .style("opacity", 0.9);
                d3.select("#heat-map-btn").on("click", function () {
                    var g   = d3.select("#chatbox")
                                .append("div")
                                .attr("id", "canvas_wrapper_" + canvasId)
                                .attr("width", heatMapWidth)
                                .attr("height", heatMapHeight);
                    var viz  = g.append("canvas")
                                .attr("id", "canvas_" + canvasId);
                    canvasId++;
                    createHeatMap(viz, d);
                });
            } else {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            }
        });

    // Remove any exiting nodes
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) {
            return "translate(" + source.x + "," + source.y + ")";
        })
        .remove();

    // On exit reduce the node circles size to 0
    nodeExit.select('circle').attr('r', 1e-6);

    // On exit reduce the opacity of text labels
    nodeExit.select('text')
            .style('fill-opacity', 1e-6);

    // ****************** links section ***************************

    // Update the links...
    var link = svg.selectAll('path.link')
        .data(links, function(d) { return d.id; });

    // Enter any new links at the parent's previous position.
    var linkEnter = link.enter().insert('path', "g")
            .attr("class", "link")
            .attr('d', function(d){
                var o = {y: source.y0, x: source.x0};
                return diagonal(o, o);
            })
        // .attr("marker-start", "url(#arrow0)")
    ;

    // UPDATE
    var linkUpdate = linkEnter.merge(link);

    // Transition back to the parent element position
    linkUpdate.transition()
        .duration(duration)
        .attr('d', function(d){ return diagonal(d, d.parent) })
        .attr("marker-end", "url(#arrow0)")
    ;

    // Remove any exiting links
    var linkExit = link.exit().transition()
        .duration(duration)
        .attr('d', function(d) {
            var o = {x: source.x, y: source.y};
            return diagonal(o, o);
        })
        .remove();

    // Store the old positions for transition.
    nodes.forEach(function(d){
        d.x0 = d.x;
        d.y0 = d.y;
    });

    // d3.selectAll("path.link").attr("marker-end", "url(#arrow0)");

    // Creates a curved (diagonal) path from parent to the child nodes
    function diagonal(s, d) {

        path =  'M ' + d.x + ' ' + d.y +
            'C ' + d.x + ' ' + ((s.y + d.y) / 2 + margin.top) +
            ', ' + s.x + ' ' + ((s.y + d.y) / 2 - margin.top) +
            ', ' + s.x + ' ' + s.y;

        // path = 'M ' + (s.x + margin.top) + ' ' + (s.y + margin.left) +
        //     'C ' + ((s.x + d.x + (margin.top * 2)) / 2) + ' ' + (s.y + margin.left) +
        //     ', ' + ((s.x + d.x + (margin.top * 2)) / 2) + ' ' + (d.y + margin.left) +
        //     ', ' + (d.x + margin.top) + ' ' + (d.y + margin.left);

        return path;
    }

    // Toggle children on click.
    function click(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d);
    }
}