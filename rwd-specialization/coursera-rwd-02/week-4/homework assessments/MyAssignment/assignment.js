$(document).ready(function(){

	var source   = $("#menu-template").html();
	var menu_template = Handlebars.compile(source);

	source = $("#classes-template").html();
	var classes_template = Handlebars.compile(source);

	source = $("#species-template").html();
	var species_template = Handlebars.compile(source);

	source = $("#specimen-template").html();
	var specimen_template = Handlebars.compile(source);

	// Add menu template
	var menu = menu_template(animals);
	$("#menu").html(menu);

	// Add classes template
	$("#all").click(function(){
		// Make active
		$(".dropdown-menu .active").removeClass("active");
		$("#all").addClass("active");
		// Add proper html
		var classes = classes_template(animals);
		$("#main").html(classes);
	});

	// Add species template
	$("a.classes").click(function(){
		// Extract index
		var i = $(this).data("id");
		// Make link active
		$(".dropdown-menu .active").removeClass("active");
		$("#"+$(this).attr("id")).addClass("active");
		// Change template
		var species = species_template(animals.class[i]);
		$("#main").html(species);
	});

	// Add specimen template
	$("a.specimen").click(function(){
		// animal's name
		var name = $(this).attr("id");
		// index variables
		var class_num, animal_num;
		// Find index variables' values
		$.each(animals.class, function(i, object){
			$.each(object.animals, function(j, animal){
				if (animal.name == name) {
					class_num = i;
					animal_num = j;
				}
			});
		});
		// Make link active
		$(".dropdown-menu .active").removeClass("active");
		$("a[id='"+name+"']").addClass("active");
		// Change template
		var specimen = specimen_template({animal: animals.class[class_num].animals[animal_num], class: animals.class[class_num].name});
		$("#main").html(specimen);
	});

	// Check if classes on main part is clicked
	$("#main").on("click", "a.classes_main", function(){
		var k = $(this).data("id");
		$("a.classes")[k].click();
	});

	$("#main").on("click", "a.specimen_main", function(){
		$("a[id='"+$(this).attr("id")+"']").click();
	});

	$("#all").click();
});