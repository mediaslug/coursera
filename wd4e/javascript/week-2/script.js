function displayDate() {
	document.getElementById("foo").innerHTML = Date();
}

function openMe() {
	// find the element
	x = document.getElementById("demo");
	// hard code the style
	// x.style.display = "block";

	// change the className
	x.className = "open";
}

function closeMe() {
	x = document.getElementById("demo");
	// hard code the style
	//x.style.display = "none";

	// change the class
	x.className = "closed";

}

function showProperties(element){
	document.getElementById("message").innerHTML=element.alt;
	
}