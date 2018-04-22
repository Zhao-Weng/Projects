function ParseGraphRender(container, viewerWidth, viewerHeight, radius) {
    var _self = this;
    this.color = {
        "extended":  "#c1ffff",
        "collapsed": "#99CCFF",
        "highlighted": "#cc6600"
    };

    // this.margin = {
    //     top:    20,
    //     right:  20,
    //     bottom: 20,
    //     left:   20
    // };

    this.width = viewerWidth; // - this.margin.right - this.margin.left;

    this.height = viewerHeight; // - this.margin.top - this.margin.bottom;

    this.x = this.width / 2;

    this.y = this.height / 2; // = height / 2,

    this.i = 0;

    this.duration = 750;

    this.container = container;

    this.tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

    this.tree = d3.layout.tree().nodeSize([70, 40]);

    this.radius = radius;

    this.svg;

    this.zm;

    this.clear = function(){
        // $( _self.container ).empty();
        // _self.svg.selectAll("*").remove();
        var container = d3.select(_self.container);
        if (!container.select("svg").empty())
            container.selectAll("svg").remove();
    };

    /* (frameid)_(personid)_(keypointid)_(channelid).png

    keypointid: 1-24
    bottom layer:
        1 right ankle 2 right knee 3right hem 4 left hem
        5 left knee 6 left ankle 7 spine tail 8 spine top
        9 neck 10 head 11 right wrist 12 right elbow
        13 right shoulder 14 left shoulder
    15 left elbow 16 left wrist

    second layer:
        17 right leg 18 left leg 19 right arm 20 left arm 21 torso

    third layer:
        22 lower human body 23 upper human body

    top layer:

        24 (center of) full body

    channelid: 1-4

    1. alpha
    2. belta
    3. gamma
    4. final prediction */

    this.codeMapping = {
        "part": {
            "right ankle": 1,
            "right knee": 2,
            "right hem": 3,
            "left hem": 4,
            "left knee": 5,
            "left ankle": 6,
            "spine tail": 7,
            "spine top": 8,
            "neck": 9,
            "head": 10,
            "right wrist": 11,
            "right elbow": 12,
            "right shoulder": 13,
            "left shoulder": 14,
            "left elbow": 15,
            "left wrist": 16,
            "right leg": 17,
            "left leg": 18,
            "right arm": 19,
            "left arm": 20,
            "torso": 21,
            "lower body": 22,
            "upper body": 23,
            "full body": 24
        },
        "channel": {
            "alpha": 1,
            "beta": 2,
            "gamma": 3,
            "final prediction": 4
        }
    };

    this.showHeatmap = function (node, channel) {
        // "(frameid)_(personid)_(keypointid)_(channelid).png"
        var frameId   = 60,
            personId  = 10,
            nameId    = _self.codeMapping.part[node.label],
            channelId = channel; // _self.codeMapping.channel[channel];

        var imgPath = "/static/data/heatmaps/" +
                      frameId + "_" +
                      personId + "_" +
                      nameId + "_" +
                      channelId + ".png";

        console.log(imgPath);
        var img = document.createElement("img");
        img.src = imgPath;
        $('#hm-pg-img').html(img);
    };

    this.drawGraph = function (root) {

        _self.zm  = d3.behavior.zoom().scaleExtent([0.1, 3]).on("zoom", redraw);

        _self.svg = d3.select(_self.container).append("svg")
            .attr("width",  _self.width) //  + _self.margin.left + _self.margin.right)
            .attr("height", _self.height) // + _self.margin.top  + _self.margin.bottom)
            .call(_self.zm)
            .attr("align", "center")
            // .attr("transform", "translate(" + _self.margin.top + "," + _self.margin.left + ")")
            .append("g")
        ;

        // build the arrow marker.
        _self.svg.append("svg:defs").selectAll("marker")
            .data(["arrow0", "arrow1"])      // Different link/path types can be defined here
            .enter().append("svg:marker")    // This section adds in the arrows
            .attr("id", String)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 20)
            .attr("refY", 0)
            .attr("markerWidth", 4)
            .attr("markerHeight", 4)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5"); // "M 0,0 m -5,-5 L 5,0 L -5,5 Z"); //

        //necessary so that zoom knows where to zoom and unzoom from
         _self.zm.translate([400, 200]);

        root.x0 = -1140;
        root.y0 = _self.width / 2;
        // root.children.forEach(collapse);
        console.log(root);
        update(root);

        move2center(root);

        // d3.select(canvas).style("height", "800px");

        function collapse(d) {
            if (d.children) {
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
            }
        }

        function diagonal(s, d) {

            // var path =  'M ' + d.x + ' ' + d.y +
            //     'C ' + d.x + ' ' + ((s.y + d.y) / 2 + margin.top) +
            //     ', ' + s.x + ' ' + ((s.y + d.y) / 2 - margin.top) +
            //     ', ' + s.x + ' ' + s.y;
            //
            // return path;

            return 'M ' + d.x + ' ' + d.y +
                ' Q ' + d.x + ' ' + ((s.y + d.y) / 2 - 20) + // - _self.margin.top) +
                ', ' + ((s.x + d.x) / 2) + ' ' + ((s.y + d.y) / 2) +
                ' T ' + s.x + ' ' + s.y;
        }

        function update(source) {

            console.log(source);
            // Compute the new tree layout.
            var nodes = _self.tree.nodes(root).reverse(),
                links = _self.tree.links(nodes);

            // Normalize for fixed-depth.
            nodes.forEach(function (d) {
                d.y = d.depth * 80;
            });

            // Update the nodes…
            var node = _self.svg.selectAll("g.pgnode")
                .data(nodes, function (d) {
                    return d.id || (d.id = ++_self.i);
                });

            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("g")
                .attr("class", "pgnode")
                .attr("transform", function (d) {
                    return "translate(" + source.x0 + "," + source.y0 + ")";
                })
                .on("click", click);

            nodeEnter.append("circle")
                .attr("r", 1e-6)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .style("fill", function (d) {
                    return nodeRender(d);
                });

            nodeEnter.append('text')
                .attr("dy", ".35em")
                .attr("x", function(d) {
                    return d.children || d._children ? -13 : 13;
                })
                .attr("text-anchor", function(d) {
                    return d.children || d._children ? "end" : "start";
                })
                .attr("transform", "rotate(-20)")
                .text(function(d) {
                    // console.log(d);
                    return textRender(d);
                });

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(_self.duration)
                .attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });

            nodeUpdate.select("circle")
                .attr("r", _self.radius)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .style("fill", function (d) {
                    return nodeRender(d);
                });

            d3.selectAll("g.pgnode").selectAll("circle")
                .attr('cursor', 'pointer')
                .on("mouseover", function (d) {
                    tooltipRender(d, true);
                })
                // .on("mouseout", function (d) {
                //     tooltipRender(d, false);
                // })
            ;

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(_self.duration)
                .attr("transform", function (d) {
                    return "translate(" + source.x + "," + source.y + ")";
                })
                .remove();

            nodeExit.select("circle")
                .attr("r", 1e-6);

            nodeExit.select("text");

            // Update the links…
            var link = _self.svg.selectAll("path.pglink")
                .data(links, function (d) {
                    return d.target.id;
                });

            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g")
                .attr("class", "pglink")
                .attr("d", function () {
                    // console.log(d);
                    var o = {
                        x: source.x0,
                        y: source.y0
                    };
                    return diagonal(o, o);
                })
                // .attr("marker-end", "url(#arrow0)")
            ;

            // Transition links to their new position.
            link.transition()
                .duration(_self.duration)
                .attr("d", function(d) { return diagonal(d.target, d.source) })
                // .attr("marker-end", "url(#arrow0)")
                ;
            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(_self.duration)
                .attr("d", function (d) {
                    var o = {
                        x: source.x,
                        y: source.y
                    };
                    return diagonal(o, o);
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function (d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }

        // Function to center node when clicked/dropped so node doesn't get lost
        // when collapsing/moving with large amount of children.

        function nodeRender(node) {
            return node._children ? _self.color.collapsed : _self.color.extended;
        }

        function textRender(node) {
            return (node.hasOwnProperty("label"))? node.label: node.parent.label;
        }

        function tooltipRender(node, over) {
            if (over) {
                var buttonHtml =
                    "<a class='button' id='hm-gamma-btn'><img src='/static/img/arrow_down.png' width='20px' height='20px'/>Top-down (gamma) = " + node.gamma * 100 + "% </a>" +
                    "<a class='button' id='hm-alpha-btn'><img src='/static/img/arrow_left.png' width='20px' height='20px'/>Direct (alpha) = " + node.alpha * 100 + "% </a>" +
                    "<a class='button' id='hm-beta-btn' ><img src='/static/img/arrow_up.png' width='20px' height='20px'/>Bottom-up (beta) = "  + node.beta * 100 + "% </a>";

                _self.tooltip.html(buttonHtml)
                    .style('top', d3.event.pageY - 35 + 'px')
                    .style('left', d3.event.pageX + 10 + 'px')
                    .style("opacity", 0.9);

                d3.select("#hm-alpha-btn").on("click", function () {
                    _self.showHeatmap(node, 1);
                });
                d3.select("#hm-beta-btn").on("click", function () {
                    _self.showHeatmap(node, 2);
                });
                d3.select("#hm-gamma-btn").on("click", function () {
                    _self.showHeatmap(node, 3);
                });

            } else {
                _self.tooltip.transition()
                    .duration(1800)
                    .style("opacity", 0);
            }
        }

        function move2center(source) {
            var scale = _self.zm.scale();

            // console.log(scale);

            _self.x = -source.y0;
            _self.y = -source.x0;
            _self.x = _self.x * scale + _self.width / 3;
            _self.y = _self.y * scale + _self.height / 2;
            // var g = d3.select('g');
            // g.transition()

            _self.svg.transition()
                .duration(_self.duration)
                .attr("transform", "translate(" + _self.y + "," + _self.x + ")scale(" + scale + ")");
            _self.zm.scale(scale);
            _self.zm.translate([_self.y, _self.x]);
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
            move2center(d);
        }

        //Redraw for zoom
        function redraw() {
            //console.log("here", d3.event.translate, d3.event.scale);
            _self.svg.attr("transform",
                "translate(" + d3.event.translate + ")"
                + " scale(" + d3.event.scale + ")");
        }
    };

    this.highlight = function (highlightedNodes){

        var node = _self.svg.selectAll("circle")
            .filter(function (t) {
                var highlighted = false;
                highlightedNodes.forEach(function (n) {
                    if (t.hasOwnProperty("name") &&
                        n == t.name) {
                        highlighted = true;
                    }
                });
                return highlighted;
            });
        node.style("stroke", "yellow")
            .style("fill", "red")
            .style("stroke-width", 4);

        var link = _self.svg.selectAll("path.pglink")
            .filter(function (l) {
                var t = l.source, highlighted = false;
                highlightedNodes.forEach(function (n) {
                    if (t.hasOwnProperty("name") &&
                        n == t.name) {
                        highlighted = true;
                    }
                });

                return highlighted;
            });
        link.style("stroke", "red").style("stroke-width", 4);
    };
}
