var colors = ['blue','yellow','cyan'];

var colors_list = colors.join();
console.log(colors_list);
colors.sort();
console.log("the indexOf value is " + colors.indexOf('jdj'))


var target; 
var guess_input;
var finished = false;
var guesses = 0;


function do_game() {
	var random_number = Math.random() * colors.length;
	var random_number_integer = Math.floor(random_number);
	target = random_number_integer + 1;
	console.log("the original random number is "+ random_number);
	console.log("target index is "+ target);
	console.log("the color would be " + colors[target - 1])
	
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
	
	if ( (guess_input) && colors.indexOf(guess_input) == -1) { // if not in the array
		alert("Sorry I don't recognize that color\n\nPlease try again.");
		return false;
	};

	if (guess_input > target) { // if guess is not correct
		alert("Sorry your guess is not correct\n\n"
			   + "Hint your color is alphabetically lower than mine\n\n"
			   + "Please try again.");
		return false;
	}

	if (guess_input < target) {
		alert("Sorry your guess is not correct\n\n"
			   + "Hint your color is alphabetically higher than mine\n\n"
			   + "Please try again.");
		return false;
	}

	if (guess_input == target) {
		alert("Congratulations. You have guessed the color! \n\n"
			   + "It took you " + guesses + "to finish the game.\n\n"
			   + "You can see the color in the bacground");
		body = document.getElementsByTagName('body');
		body.color = target;		
		return true;
	}
 

}

