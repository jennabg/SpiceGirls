//alert("hello");


window.onload = pageReady

function pageReady(){
//Sticky Menu
  window.onscroll = function() {scrollFunction()};
  var menu = document.getElementById("main-menu");



  function scrollFunction() {
    if (document.body.scrollTop > 180 || document.documentElement.scrollTop > 180) {
      menu.classList.add("sticky");
      menu.classList.remove("display")
    } else {
      menu.classList.remove("sticky");
      menu.classList.add("display");
    }
  }

//Creating the hover opacity over images to link to new pages
img1 = document.getElementById("img1");
img2 = document.getElementById('img2');
img3 = document.getElementById('img3');
menubtn = document.getElementById("menubtn");
locationbtn = document.getElementById("locationbtn");
specialsbtn = document.getElementById("specialsbtn");
overlay1 = document.getElementById("section1-img");
overlay2 = document.getElementById("section2-img");
overlay3 = document.getElementById("section3-img");


menubtn.style.display="none";
locationbtn.style.display="none";
specialsbtn.style.display="none";

overlay1.onmouseover = showOverlay1;
overlay1.onmouseout = hideOverlay1;
overlay2.onmouseover = showOverlay2;
overlay2.onmouseout = hideOverlay2;
overlay3.onmouseover = showOverlay3;
overlay3.onmouseout = hideOverlay3;

function showOverlay1(){
  img1.style.opacity= "0.5";
  locationbtn.style.display="inline-block";
}

function hideOverlay1(){
  img1.style.opacity = "1";
  locationbtn.style.display="none";
}

function showOverlay2(){
  img2.style.opacity= "0.5";
  menubtn.style.display="inline-block";
}

function hideOverlay2(){
  img2.style.opacity = "1";
  menubtn.style.display="none";
}

function showOverlay3(){
  img3.style.opacity= "0.5";
  specialsbtn.style.display="inline-block";
}

function hideOverlay3(){
  img3.style.opacity = "1";
  specialsbtn.style.display="none";
}


} // End of pageReady function
