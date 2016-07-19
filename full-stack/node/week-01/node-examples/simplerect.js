// a simple way to calculate the rectangle inside a node application

// create an object with two properties, each of which is a function
var rect = {
    perimeter: function (x, y) {

        return (2 * (x + y));
    },
    area: function (x, y ) {
        return (x*y);
    }
};

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
