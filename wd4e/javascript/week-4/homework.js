/*Add the JavaScript here for the function billingFunction().  It is responsible for setting and clearing the fields in Billing Information */

function billingFunction() {
  var shippingName = document.getElementById('shippingName').value;
  var shippingZip =  document.getElementById('shippingZip').value;
  alert(shippingZip + shippingName);
  
  if (same.checked) {
    document.getElementById('billingName').value = shippingName;
    document.getElementById('billingZip').value = shippingZip;
  } else {
    document.getElementById('billingName').value = '';
    document.getElementById('billingZip').value = '';
  }
  

}