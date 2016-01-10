var colors = ['blue','yellow','cyan'];

colors.sort();
var colors_list = colors.join();
console.log(colors_list);


var target; 
var guess_input_text;
var guess_input;
var finished = true;
var guesses = 0;


function do_game() {
	var random_number = Math.random() * colors.length;
	var random_number_integer = Math.floor(random_number);
	target_index = random_number_integer + 1;
	console.log(target_index);
	console.log(random_number);
	while (!finished) {
		guess_input_text = prompt("i'm thinking of one of these colors " + colors_list);
		guesses += 1;
//		finished = check_guess();
		if (!guess_input_text) {
			finished = false;
		}
	}
}

do_game();

function check_guess() {
	if (isNaN(guess_input)) {
		alert("please enter a number");
		return false;
	}
	
	if ( (guess_input<1 ) || (guess_input>100) ) {
		alert("out of range");
		return false;
	};

	if (guess_input > target) {
		alert("too high");
		return false;
	}

	if (guess_input < target) {
		alert("too low");
		return false;
	}

	if (guess_input == target) {
		alert("you got it in " + guesses + "attempts")
		return true;
	}
 

}

