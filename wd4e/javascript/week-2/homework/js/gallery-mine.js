// Homework PJA 12/30/2015

/*Name this external file gallery.js*/

function upDate(previewPic){
 	imageDiv = document.getElementById("image")

 /* In this function you should 
    1) change the url for the background image of the div with the id = "image" 
    to the source file of the preview image

 */
 	imageDiv.style.backgroundImage= 'url(' + previewPic.src + ')'

 /*
    
    2) Change the text  of the div with the id = "image" 
    to the alt text of the preview image 
    */

    imageDiv.innerHTML = previewPic.alt;
  
	}

function unDo(){

	imageDiv = document.getElementById("image")


	 /* In this function you should 
	1) Update the url for the background image of the div with the id = "image" 
	back to the orginal-image.  You can use the css code to see what that original URL was
	*/

	imageDiv.style.backgroundImage = null;

	/*
	2) Change the text  of the div with the id = "image" 
	back to the original text.  You can use the html code to see what that original text was
	*/
 	imageDiv.innerHTML="Hover over an image below to display here.";
		
	}