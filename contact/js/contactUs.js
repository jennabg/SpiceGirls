
window.onload=function(){
	
	var formHandle=document.forms.contactUsForm;

 	formHandle.onsubmit=processForm;
	
	function processForm(){
		
		
		var customerName=formHandle.c_Name.value;
		var customerPhone=formHandle.c_Phone.value;
		var customerEmail=formHandle.c_Email.value;
		
		// Check for a user's input, if empty or null or default string return the err msg
		if (customerName==="" || customerName===null || customerName==="Full Name") {

			var nameErrMsg=document.getElementById("errMsg")
			nameErrMsg.style.color="red";
			nameErrMsg.innerHTML="Enter your name please"
			formHandle.c_Name.focus();
			return false;
		}
		
		var phoneErrMsg=document.getElementById("errMsgP");
		phoneErrMsg.style.color="red";
		// Validate a user's input, if not Regex return the err msg
		var phoneRgx=/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
		if (!phoneRgx.test(customerPhone)){
			formHandle.c_Phone.focus();
			phoneErrMsg.innerHTML="Invalid phone number";
			// Check for a user's input, if empty or null or default string return the err msg
			 if (customerPhone==="" || customerPhone===null || customerPhone==="Phone Number"){
				phoneErrMsg.innerHTML="Please enter your phone";
			}	
		return false;
		}	
		var emailErrMsg=document.getElementById("errMsgEm");
		emailErrMsg.style.color="red";
		// Validate a user's input, if not Regex return the err msg
		var emailRgx=/^\S+@\S+\.\S+$/;
		if(!emailRgx.test(customerEmail)){
			formHandle.c_Email.focus();
			emailErrMsg.innerHTML="Invalid email address";
			// Check for a user's input, if empty or null or default string return the err msg
			if (customerEmail==="" || customerEmail===null || customerEmail==="Email"){
				emailErrMsg.innerHTML="Please enter your email address"
			}
			return false;
		}
		// hide form and display thanks msg + change heading
		formHandle.style.display="none";
		document.getElementById("ask").style.display="none";
		document.getElementById("getInTHeading").innerHTML="We're always glad to hear from you!"
		var customTh=document.getElementById("thanksCustomer");
		customTh.innerHTML=customerName;
		var thanksMsg=document.getElementById("thanks_msg");
		 thanksMsg.style.display="block";

		return false;

	}
	
window.onscroll = scrollFunction; //sticky menu
var menu = document.getElementById("main-menu");



function scrollFunction() {
  if (document.body.scrollTop > 180 || document.documentElement.scrollTop > 180) {
    menu.classList.add("sticky");
  } else {
    menu.classList.remove("sticky");
  }
}

}