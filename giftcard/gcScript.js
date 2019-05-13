window.addEventListener('load', pageReady);

function pageReady() {
    /*Gift Card Amount label*/
    //Gets the gift card amount radio buttons
    var radio = document.getElementsByName("gcAmount");

    for (var i = 0; i < radio.length; i++) {
        radio[i].onchange = radioChange;
    }

    function radioChange() {
        for (var i = 0; i < radio.length; i++) {
            if (radio[i] === this) {
                //Previous sibling targets the label associated with the input
                //Styles the label if its clicked
                this.previousElementSibling.classList.add("active");
            } else {
                radio[i].previousElementSibling.classList.remove("active");
            }
        }
    }

    /*Gift Card Display Image*/
    //Referenced Lab 6 on DOM
    var giftCardDisplay = document.getElementById("main_display");
    var giftCardDesign = document.getElementsByClassName("gcDesign");


    for (i = 0; i < giftCardDesign.length; i++) {
        giftCardDesign[i].addEventListener('click', updateDisplay);
    }

    function updateDisplay() {
        giftCardDisplay.src = this.src;
    }

    /*Form Validation*/
    //Referenced Lab 8 on forms
    var formHandle = document.forms[0];

    formHandle.onsubmit = processForm;

    function processForm() {
        var gcInputs = this.getElementsByTagName("input");
        var customerName = gcInputs[5].value;
        var recipientEmail = gcInputs[4].value;

        //Regular expressions
        var nameRegex = /^[A-Za-z- .']+$/;
        var emailRegex = /^[A-Za-z-_0-9.]+[@]{1}[A-Za-z]+[.]{1}[A-Za-z]+$/;

        /*Skips through first 3 since those are the gift card amounts and don't need
        validation since it's not a user inputted value*/
        for (var i = 3; i < gcInputs.length; i++) {
            var userInput = gcInputs[i];
            var userInputValue = gcInputs[i].value;
            var errorMsg = "";

            //Checking for errors
            //Checking if input is empty
            if (userInputValue === null || userInputValue === "") {
                errorMsg = "Value cannot be empty.";
            }
            //Checking format of input
            else if (userInput.classList.contains("name") && (!nameRegex.test(userInputValue.trim()))) {
                errorMsg = "Name should only have letters.";
            } else if (userInput.classList.contains("email") && (!emailRegex.test(userInputValue))) {
                errorMsg = "Email is in an incorrect format.";
            }

            //If there is an error message
            if (errorMsg !== "") {
                userInput.nextElementSibling.innerHTML = errorMsg;
                userInput.focus();
                userInput.classList.add("invalid");

            /*Form will not submit when a value that shouldn't be empty is empty
            or not in the right format*/
                return false;
            } else {
                userInput.nextElementSibling.innerHTML = "";
                userInput.classList.remove("invalid");
            }
        }
        document.getElementById("thankyou_message").innerHTML = "Thank you " +
            customerName + " for your purchase! A giftcard will be emailed to " +
            recipientEmail + ".";
        return false;
    }

    //On scroll, the header is fixed at the top
    window.onscroll = scrollFunction;
    var menu = document.getElementById("main-menu");
    var next = document.getElementById("giftCard_banner");

    var height = menu.offsetTop;
    var mHeight = menu.clientHeight;

    function scrollFunction() {
        if (document.body.scrollTop > height || document.documentElement.scrollTop > height) {
            menu.classList.add("sticky");
            next.style.marginTop = mHeight + "px";
        } else {
            menu.classList.remove("sticky");
            next.style.marginTop = "0px";
        }
    }
}
