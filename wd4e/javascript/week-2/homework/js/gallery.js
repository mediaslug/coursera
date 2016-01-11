/*Name this external file gallery.js*/

function upDate(previewPic){
 /* In this function you should 
    1) change the url for the background image of the div with the id = "image" 
    to the source file of the preview image */
  
    
    // Identify current image, i.e. the one the user clicked on
    var currImage = document.getElementById('image');
    //currImage.style.backgroundImage = "url('http://home.cse.ust.hk/~rossiter/mooc/matching_game/smile.png')";
    
    // I grabbed the quoting tip from the forums.  This was confusing...
    currImage.style.backgroundImage = "url('" + previewPic.src + "')";
    
    // Testing stuff:
    // console.log("previewPic.src = " + previewPic.src);
    // currImage.style.background = "yellow";
    // console.log("My current image" + currImage + typeof(currImage));
    
    
    /*
    2) Change the text  of the div with the id = "image" 
    to the alt text of the preview image 
    */
    
    // This works too...
    //document.getElementById('image').innerHTML = previewPic.alt;
    currImage.innerHTML = previewPic.alt;
  
	}

	function unDo(){
     /* In this function you should 
    1) Update the url for the background image of the div with the id = "image" 
    back to the orginal-image.  You can use the css code to see what that original URL was
    
    2) Change the text  of the div with the id = "image" 
    back to the original text.  You can use the html code to see what that original text was
    */
    //console.log("unDo function is happening...");
        
    activeImage = document.getElementById('image');
    
    activeImage.innerHTML = "Hover over an image below to display here.";
    activeImage.style.backgroundColor = "#8e68ff";
    activeImage.style.backgroundImage = "url('')";
    	
	}