var questions = [
    "Did anyone enter the auditorium?",
    "What if no person entered the auditorium?",
    "Show me the evidence for the above explanation.",
    "Show other explanations you have."
];

var answers = [
    "Yes",
    "Some of the frames in the video - like the ones shown below - won't be coherent.",
    "See the below discourse representation: discourse relation between the node 1-6 and 7-8 will not be entailed if there is no person inside the auditorium",
    "Other relevant explanations are shown below:"
];

var qId = 1, aId=1;

var items = ["x", "y", "value"];

function getFileListFrom(path) {
    var nameList = [];
}

// Geometric
function lineInterpolate(start, end, distance) {
    var xAbs = Math.abs( start.x - end.x );
    var yAbs = Math.abs( start.y - end.y );
    var xDiff = end.x - start.x;
    var yDiff = end.y - start.y;

    var length = Math.sqrt( ( Math.pow( xAbs, 2 ) + Math.pow( yAbs, 2 ) ) );
    var steps = length / distance;
    var xStep = xDiff / steps;
    var yStep = yDiff / steps;

    var xNew = 0;
    var yNew = 0;
    var result = [];

    for( var s = 0; s < steps; s++ )
    {
        xNew = start.x + ( xStep * s );
        yNew = start.y + ( yStep * s );

        result.push( {
            x: xNew,
            y: yNew
        } );

    }

    return result;
}

function str2points(str, items) {
    var pts = [];
    var lst = str.split(',');
    if (lst.length % items.length) {
        alert("numbers not in pairs!");
        return;
    }
    for (var i = 0; i < lst.length / items.length; i++) {
        var pt = {};
        for (var j = 0; j < items.length; j++) {
            pt[items[j]] = parseInt(lst[j + i * items.length]);
        }
        pts.push(pt);
    }
    // console.log(pts);
    return pts;
}

function string2points(str, offset) {
    var pts = [];
    var lst = str.split(',');
    if (lst.length % offset) {
        alert("numbers not in pairs!");
        return;
    }
    for (var i = 0; i < lst.length / offset; i++) {
        var pt = [];
        for (var j = 0; j < offset; j++) {
            pt[j] = parseInt(lst[j + i * offset]);
        }
        pts.push(pt);
    }
    // console.log(pts);
    return pts;
}

function reply(str) {
    var idx;
    var keys = ["Didanyone", "Whatif", "Showme", "showother"];
    var sl = str.split(" ");
    keys.forEach(function (s) {
        if (s == (sl[0] + sl[1])) {
            idx = keys.indexOf(s);
            return;
        }
    });
    return idx;
}

function msgSent() {
    var qt = document.getElementById("usermsg").value;
    var re = answers[reply(qt)];

    var q = d3.select("#chatbox");
    q.append("div")
        .attr("class", "bubble you")
        .attr("id", "qid"+ qId)
        .text(qt);
    qId++;
    q.append("br");

    q.append("div")
        .attr("class", "bubble me")
        .attr("id", "aid" + aId)
        .text(re);
    aId++;

    // var cb = document.getElementById("chatbox");
    //
    // var q  = document.createElement("div");
    // q.setAttribute("id", "qid" + qId);
    // q.setAttribute("class", "bubble you");
    // q.appendChild(document.createTextNode(qt));
    // cb.appendChild(q);
    // qId++;
    //
    // cb.appendChild(document.createElement("br"));
    //
    // var a  = document.createElement("div");
    // q.setAttribute("id", "aid" + aId);
    // q.setAttribute("class", "bubble me");
    // q.appendChild(document.createTextNode(re));
    // cb.appendChild(a);
    // aId++;
}