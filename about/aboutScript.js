$(document).ready(function(){
  //Hides the information container
  $("#spice_information").hide();
  //When user clicks on an image, the spice infromation container fades in
  $(".spice_img").click(function(){
        $("#spice_information").fadeIn(1000);
        var msg="";
        switch ($(this).attr("id")){
          case "chili_pepper":
            msg="Our chili peppers are super spicy and super delicious. Add some zing to your life with this amazing spice!";
            break;
          case "black_peppercorn":
            msg="Our black peppercorn are from an organic farm in Canada in the small town of Richmond Hill. Did you know? Black pepper has lots of antioxidants and is good for digestion!";
            break;
          case "nutmeg":
            msg="Our nutmeg is amazing! They're ethically sourced and locally grown. Best part is, they help digestion and improves brain health.";
            break;
          case "cloves":
            msg="We love our cloves! They are high in antioxidants, nutrious and locally sourced from our organic farm in Richmond Hill.";
            break;
        }
        //Fades in text depending on what spice image is clicked
        $('#spice_text').hide().html(msg).fadeIn(1000);
    })

    //On scroll, header is fixed at the top of the screen
    window.onscroll = scrollFunction;
    var menu = document.getElementById("main-menu");
    var next = document.getElementById("about_banner");

    var height = menu.offsetTop;
    var mHeight = menu.clientHeight;

    function scrollFunction() {
      if (document.body.scrollTop > height || document.documentElement.scrollTop > height) {
        menu.classList.add("sticky");
        next.style.marginTop = mHeight + "px";
      }
      else{
        menu.classList.remove("sticky");
        next.style.marginTop = "0px";
      }
    }
})
