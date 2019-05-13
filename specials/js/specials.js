
window.onload=dueDate;

function dueDate(){

	var todayElement=document.getElementById("todayData");

	var timeNow=new Date(); //create a new date value
	nowDateString=timeNow.toDateString(); //convert date to string

	todayElement.innerHTML=nowDateString

//sticky menu
window.onscroll = scrollFunction; 
var menu = document.getElementById("main-menu");



function scrollFunction() { 
  if (document.body.scrollTop > 180 || document.documentElement.scrollTop > 180) {
    menu.classList.add("sticky");
  } else {
    menu.classList.remove("sticky");
  }
}


/* Function below was retrieved and adopted from https://jsfiddle.net/tcloninger/e5qaD/*/
    $(document).ready(function() {
    
    /* Every time the window is scrolled ... */
    $(window).scroll( function(){
    
        /* Check the location of each desired element */
        $('.hideme').each( function(i){
            
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            /* If the object is completely visible in the window, fade it  */
            if( bottom_of_window > bottom_of_object ){
                
                $(this).animate({'opacity':'1'},500);
                    
            }
            
        }); 
    
    });
    
});
   


 }
