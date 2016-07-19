var rect = require('./rectangle-01');

function solveRect(l,b) {
    console.log("solving for rectangle with Length = " + l + " and breadth = " + b);
    if(l<0 || b < 0) {
        console.log("ERROR: rectangle dimensions should be greater than zero: l = " + l + " and b = " + b);
    } else {
        console.log("the area of a rectangle of dimensions length = " + l + " and breadth = " + b + " is " + rect.area(l,b));
        console.log("the perimiter of a rectangle of dimensions length " + l + " and breadth " + b + " is " + rect.perimeter(l,b));
    }
}

solveRect(2,4);
solveRect(3,5);
solveRect(-3,5);

