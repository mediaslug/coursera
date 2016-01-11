var array = [1,2,3,4,5,6];

for (var i = 0; i < array.length; i++) {
	sum += array[i];
}

if (array.length > 0) {
	var average = sum/array.length;
	document.write(average);	
}
document.getElementById('second').innerHTML = "What does the Fox say?";
