var colors = ['blue','yellow','cyan', 'black', 'red', 'green', 'khaki'];
colors.sort();

var target; 
var targetIndexNumber
var guess_input;
var finished = false;
var guesses = 0;
var colors_list = colors.join();

function do_game() {
	var random_number = Math.random() * colors.length;
	var random_number_integer = Math.floor(random_number);
	target = random_number_integer + 1;
	targetIndexNumber = target - 1;
	console.log("the original random number is "+ random_number);
	console.log("target index is "+ targetIndexNumber);
	console.log("the color would be " + colors[targetIndexNumber])
	
	while (!finished) {
		guess_input = prompt("i'm thinking of one of these colors: \n\n" 
			                        + colors_list 
									+ "\n\n What color am I thinking of?");
		guesses += 1;
		finished = check_guess();
		if (!guess_input) {
			finished = false;
		}
	}
}

do_game();

function check_guess() {
	
	if (!guess_input) {
		return false;
	}
	if ( (guess_input) && colors.indexOf(guess_input) == -1) { // if not in the array
		alert("Sorry I don't recognize that color\n\nPlease try again.");
		return false;
	};
	console.log("the guess and target are " + guess_input + " " + colors[targetIndexNumber]);
	if (guess_input > colors[targetIndexNumber]) { // if guess is not correct
		alert("Sorry your guess is not correct\n\n"
			   + "Hint your color is alphabetically higher than mine\n\n"
			   + "Please try again.");
		return false;
	}

	if (guess_input < colors[targetIndexNumber]) {
		alert("Sorry your guess is not correct\n\n"
			   + "Hint your color is alphabetically lower than mine\n\n"
			   + "Please try again. ");
		return false;
	}

	if (guess_input == colors[targetIndexNumber]) {
		if (guesses == 1) {
			var guessString = "guess";
		} else {
			var guessString = "guesses";
		}

		document.body.style.background = colors[targetIndexNumber];
		alert("Congratulations. You have guessed the color! \n\n"
			   + "It took you " + guesses + " " + guessString + " to finish the game.\n\n"
			   + "You can see the color in the bacground");
		return true;
	}
 

}

