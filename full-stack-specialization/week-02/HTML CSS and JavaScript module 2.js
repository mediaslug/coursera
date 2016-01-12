var target; 
var guess_input_text;
var guess_input;
var finished = false;
var guesses = 0;


function do_game() {
	var random_number = Math.random() * 3;
	var random_number_integer = Math.floor(random_number);
	target = random_number_integer + 1;
	console.log(target);
	console.log(random_number);
	while (!finished) {
		guess_input_text = prompt("i'm thinking of a number from 1 to 100");
		guess_input = parseInt(guess_input_text);
		guesses += 1;
		finished = check_guess();
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

