// The page load function
function initPage() {
	// Variables to hold the DOM elements we will work with
	var menu = document.getElementById("main-menu");
	var mainContent = document.getElementById("main");
	var flipRight = document.getElementById("flip-right");
	var flipLeft = document.getElementById("flip-left");
	var viewList = document.getElementsByClassName("flex-area");
	// The current page view in our menu
	var currentView = 0;

	// Calculations for the height of the header and height of the menu part of
	// the header
	var height = menu.offsetTop;
	var menuHeight = menu.clientHeight;

	// The onscroll function that handles the moving menu in the header
	function scrollFunction() {
		if (document.body.scrollTop > height || document.documentElement.scrollTop > height) {
			menu.classList.add("sticky");
			mainContent.style.marginTop = menuHeight+"px";
		}
		else {
			menu.classList.remove("sticky");
			mainContent.style.marginTop = "0px";
		}
	}

	// Function to disable clicking for a page flip while the page is already flipping
	function pauseClicks() {
		flipRight.onclick = null;
		flipLeft.onclick = null;
		flipRight.classList.add('disabled');
		flipLeft.classList.add('disabled');
		setTimeout(enableClicks, 2000);
	}

	// Function to renable clicking for a page flip
	function enableClicks() {
		flipRight.onclick = openPage;
		flipLeft.onclick = closePage;
		flipRight.classList.remove('disabled');
		flipLeft.classList.remove('disabled');
		checkDisabled();
	}

	// Function that will run for flipping the page from the right side of the menu
	// to the left side
	function openPage() {
		if (currentView !== 4) {
			pauseClicks();
			var rightPage = viewList[currentView].getElementsByClassName("right-page")[0];
			var leftPage = viewList[currentView+1].getElementsByClassName("left-page")[0];
			rightPage.classList.remove("close-right-page");
			rightPage.classList.toggle("open-right-page");
			setTimeout(delayedLeftFlip, 1000);

			function delayedLeftFlip(){
				leftPage.classList.remove("close-left-page");
				leftPage.classList.toggle("open-left-page");
			}

			currentView += 1;
		}
	}

	// Function that will run for flipping the page from the left side of the menu
	// to the right side
	function closePage() {
		if (currentView !== 0) {
			pauseClicks();
			var leftPage = viewList[currentView].getElementsByClassName("left-page")[0];
			var rightPage = viewList[currentView-1].getElementsByClassName("right-page")[0];
			
			leftPage.classList.remove("open-left-page");
			leftPage.classList.toggle("close-left-page");
			setTimeout(delayedRightFlip, 1000);

			function delayedRightFlip() {
				rightPage.classList.remove("open-right-page");
				rightPage.classList.toggle("close-right-page");
			}

			currentView -= 1;
		}
	}

	// Function that disables the left flip button if at the front page of the menu
	// and disables the right flip button if at the last page in the menu
	function checkDisabled() {
		if (currentView === 0){
			flipLeft.classList.add('disabled');
			flipLeft.onclick = null;
		}
		else if (currentView === 4) {
			flipRight.classList.add('disabled');
			flipRight.onclick = null;
		}
	}

	// Function that checks if the enter key is being pressed on an element
	// (tab-abble content for accessibility purposes)
	function checkForEnter(event) {
		if(event.keyCode === 13) {
			this.click();
		}
	}

	// Function that adds icon images to the menu headings according to spice level
	function addSpiceIcons() {
		var menuHeadings = document.querySelectorAll('h2.menu-text');
		var spiceImgText = "<img src=\"images/pepper.png\"" +
			" alt=\"Picture of a pepper\">";

		for (let i = 1; i <= 5; i++) {
			menuHeadings[i].innerHTML += " ";
			for (let j = 0; j < i; j++){
				menuHeadings[i].innerHTML += spiceImgText;	
			}
		}
	}

	flipRight.onclick = openPage;
	flipLeft.onclick = closePage;
	flipRight.addEventListener('keypress', checkForEnter);
	flipLeft.addEventListener('keypress', checkForEnter);
	checkDisabled();
	addSpiceIcons();
	
	window.onscroll = scrollFunction;
}

window.onload = initPage;