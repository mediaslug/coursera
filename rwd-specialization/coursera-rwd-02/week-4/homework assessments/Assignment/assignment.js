// put your javascript code here

var class_template,animal_template,selectedIndex;
var filteredArray = {animals:[]};

var AnimalGallery={
	Init:function(){
		class_template = Handlebars.compile($("#class-template").html());
		animal_template = Handlebars.compile($("#animal-template").html());
		this.ApplyContent(class_template,animals);
		this.Handlers();
	},
	Handlers:function(){
		var _this = this;
		$('#classes-tab').on('click',function(e){
			e.preventDefault();
			$(this).parent().addClass('active');
			$('#animals-tab').parent().removeClass('active');
			selectedIndex = null;
			_this.ApplyContent(class_template,animals);
		});
		$('#animals-tab').on('click',function(e){
			e.preventDefault();
			$(this).parent().addClass('active');
			$('#classes-tab').parent().removeClass('active');
			filteredArray.animals = [];
			animals.class.filter(function(d){
			 return (selectedIndex? d.name == selectedIndex:true);
			}).forEach(function(d){ return d.animals.forEach(
				function (i) {
					filteredArray.animals.push(i);
				}
			)});
			_this.ApplyContent(animal_template,filteredArray);
		});
		$('#site_content').on('click','.singleborder',function(){
			selectedIndex= $(this).data('id');
			$('#animals-tab').click();
			
		});
	},
	ApplyContent:function(template,data){
		$('#site_content').html(template(data));
	}
}

$(document).ready(function(){
	AnimalGallery.Init();
});