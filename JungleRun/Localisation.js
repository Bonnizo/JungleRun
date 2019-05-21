

jQuery(document).ready(function($) {
 jQuery.getScript('http://www.geoplugin.net/javascript.gp', function()
{
     var x = document.getElementById("presentationPlayer");
    x.innerHTML= "Welcome adventurer from " + geoplugin_countryName();

});
});





document.addEventListener("load",getLocation());

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Localisation impossible");
  }
}


function showPosition(position) {
 console.log( position.coords.latitude +" et " + position.coords.longitude);
}


