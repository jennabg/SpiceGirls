jQuery(document).ready(function(){
jQuery(".toggle").hide();
$("h2").click(function (){
  $(this).next('.toggle').slideToggle(1000);
});



})//end of ready function

window.onload = pageReady;

function pageReady(){
window.onscroll = function() {scrollFunction()};
var menu = document.getElementById("main-menu");



function scrollFunction() {
  if (document.body.scrollTop > 180 || document.documentElement.scrollTop > 180) {
    menu.classList.add("sticky");
  } else {
    menu.classList.remove("sticky");
  }
}
}
