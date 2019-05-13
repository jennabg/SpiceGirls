
// alert();
window.onscroll = scrollFunction;//sticky menu
var menu = document.getElementById("main-menu");



function scrollFunction() {
  if (document.body.scrollTop > 180 || document.documentElement.scrollTop > 180) {
    menu.classList.add("sticky");
  } else {
    menu.classList.remove("sticky");
  }
}


jQuery(document).ready(function(){
	$('table').hide();
	$('#list-toggle').click(function(){$('table').slideToggle(2000);});

	$('tr').hover(
	function(){$(this).css({'background':'#f3f3f3','color':'#F26222'});},
	function(){$(this).css({'background':'white','color':' #8ea604'});});


	$('.hide').hide();
	$('tr').click(function(){
		$(this).next('tr').slideToggle();
	});
	
});