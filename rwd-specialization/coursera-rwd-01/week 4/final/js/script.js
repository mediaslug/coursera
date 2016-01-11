// add google font
fontcss = document.createElement('link')
fontcss.type = 'text/css';
fontcss.rel = 'stylesheet';
fontcss.href = 'https://fonts.googleapis.com/css?family=Raleway';
document.head.appendChild(fontcss);


	// display the instructions with javascript
	var instructions = "Select a link below to see the definition:";
$('#instructions').text(instructions);

$('#confidentiality').click(function() {
   	string = "Confidentiality is the assurance of data privacy -- only the intended and authorized recipients may read the data";
    $('#definition').html(string);

    });
$('#integrity').click(function() {
   	string = "Integrity is the trustworthiness of information resources; assurance of data non-alteration. Data integrity insures that information has not been altered in transmission, from origin to reception.  Source integrity insures that the sender of that information is who it is supposed to be.";
    $('#definition').html(string);

 });

$('#availability').click(function() {
   	string = "Availability is the assurance of timely and reliable access to data services for authorized users. Information or resources are available when required and available at a rate which is fast enough for the wider system to perform its task as intended.";
    $('#definition').html(string);

 });