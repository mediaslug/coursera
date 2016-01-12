var response;
var count = 0; 

// for example
var continents = ["Australia", "Africa", "Antarctica", "Eurasia", "North America", "South America"]

for (var i = 0; i < continents.length; i++) {
	response = confirm( "have you been to " + continents[i] + "?");
	if (response) {
		count++;
	}
};
console.log("you have been to " + count + " continents");



// for in example
count = 0;
for (var index in continents) {
	response = confirm( "have you been to " + continents[index] + "?");
	if (response) {
		count++;
	}
}
console.log("you have been to " + count + " continents");


// for in with an object
var onePerson = {
	initials: "dr",
	age:40,
	job:"prof"
}

for (var property in onePerson) {
	console.log(property + "=" + onePerson[property]);
}

// for of (gives you each individual item, rather than the index of the item)
count = 0;
for (var continent of continents) {
	response = confirm( "have you been to " + continent + "?");
	if (response) {
		count++;
	}
}
console.log("you have been to " + count + " continents");