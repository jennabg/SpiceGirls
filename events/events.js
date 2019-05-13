// The page load function
function initPage(){
	// Constructor function for a restaurant event object
	function RestaurantEvent(name, startDate, endDate, description) {
		this.eventName = name;
		this.eventStart = startDate;
		this.eventEnd = endDate;
		this.eventDescription = description;
	}

	// Add to the Date prototype a function to return the total number of 
	// days in the month.
	Date.prototype.getDaysInMonth = function() {
		// Creates a new date object corresponding to the last day
		// of the previous month specified (So we use todaysDate.getMonth()+1)
		return (new Date(this.getFullYear(), this.getMonth()+1, 0)).getDate();
	}

	// Creating variables for the html elements we need
	var mainContent = document.getElementById("main");
	var menu = document.getElementById("main-menu");
	var monthDropDown = document.getElementById("select-month");
	var calendarRows = document.getElementsByTagName("tr");
	var monthHeading = document.getElementById("month-heading");
	var confirmationArea = document.getElementById("submit-confirmation");
	var eventDetailsArea = document.getElementById("event-details");
	var formHandle = document.forms[0];

	// Array storing the text value of the months corresponding to their index 
	var monthsList = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"];
	// Stores the date at the time of this page loading
	var todaysDate = new Date();
	var currMonthShift;
	var calendarArray = [[],[],[],[],[],[]];
	var monthReferenceDays = [];
	var maxWeeks;

	// Calculations for the height of the header and height of the menu part of
	// the header
	var height = menu.offsetTop;
	var menuHeight = menu.clientHeight;

	// The onscroll function that handles the moving menu in the header
	function scrollFunction() {
		if (document.body.scrollTop > height || 
			document.documentElement.scrollTop > height) {
			menu.classList.add("sticky");
			mainContent.style.marginTop = menuHeight + "px";
		}
		else {
			menu.classList.remove("sticky");
			mainContent.style.marginTop = "0px";
		}
	}

	// Initialize the calendar array to empty td elements
	function initEmptyCalendarArray() {
		for (let i = 0; i < calendarArray.length; i++) {
			for (let j = 0; j < 7; j++) {
				var dayCell = document.createElement("td");
				calendarArray[i].push(dayCell);
			}
		}
	}

	// Change the elements in the calendar array to reflect the month specified
	// by baseDate
	function generateCalendar(baseDate) {
		var referenceDate = new Date(baseDate.getFullYear(), 
			baseDate.getMonth(), 1);
		var currentDay = 1;
		var weekCounter = 0;
		var dayCounter = 0;
		var daysInMonth = baseDate.getDaysInMonth();

		while (currentDay <= daysInMonth) {
			while (dayCounter < 7) {
				if (currentDay === 1){
					dayCounter = referenceDate.getDay();
				}
				if (currentDay <= daysInMonth) {
					calendarArray[weekCounter][dayCounter].innerHTML 
						= currentDay.toString();
					currentDay++;
					dayCounter++;
				}
				else {
					maxWeeks = weekCounter;
					return;
				}
			}
			weekCounter++;
			dayCounter = 0;
		}
		maxWeeks = weekCounter - 1;
	}

	// Add the td elements in calendar array to the tr elements on the html
	// page, thus displaying the calendar
	function populateCalendar(numRows) {
		for (let i = 1; i <= maxWeeks + 1; i++) {
			for(let j=0; j < calendarArray[i-1].length; j++) {
				calendarRows[i].appendChild(calendarArray[i-1][j]);
			}
		}
	}

	// Clear the calendar on the page and the calendar array
	function clearCalendar() {
		for (let i = 1; i <= maxWeeks + 1; i++) {
			calendarRows[i].innerHTML = "";
		}
		calendarArray = [[],[],[],[],[],[]];
	}

	// Add an event specified by rEvent (a RestaurantEvent object) to the
	// calendar
	function inputEvent(rEvent) {
		var firstDayOfMonth = new Date(rEvent.eventStart.getFullYear(),
			rEvent.eventStart.getMonth(), 1);
		currMonthShift = firstDayOfMonth.getDay();
		var calPosition = rEvent.eventStart.getDate() + currMonthShift;
		var weekPosition = Math.ceil(calPosition / 7) - 1;
		var dayPosition = (calPosition - 1) % 7;

		calendarArray[weekPosition][dayPosition].style.background = "yellow";
		calendarArray[weekPosition][dayPosition].style.cursor = "pointer";
		calendarArray[weekPosition][dayPosition].addEventListener("click", 
			function(){
				displayEventInfo(rEvent);
			});
		calendarArray[weekPosition][dayPosition].tabIndex = "0";
		calendarArray[weekPosition][dayPosition].addEventListener("keypress", 
			checkForEnter);
	}

	// Create basic restaurant events for the month specified by eventDate and  
	// add them to the calendar
	function insertBaseEvents(eventDate) {
		var monthStartPartyDate = new Date(eventDate.getFullYear(), 
			eventDate.getMonth(), 1, 17, 0 ,0 ,0);
		var monthStartPartyDateEnd = new Date(eventDate.getFullYear(), 
			eventDate.getMonth(), 1, 21, 0 ,0 ,0);
		var monthStartPartyDesc = "It's the start of a new month, come " +
			"celebrate with us at Spice Girls!";

		var midMonthPartyDate = new Date(eventDate.getFullYear(), 
			eventDate.getMonth(), eventDate.getDaysInMonth()/2, 13, 0, 0, 0);
		var midMonthPartyDateEnd = new Date(eventDate.getFullYear(), 
			eventDate.getMonth(), eventDate.getDaysInMonth()/2, 17, 0, 0, 0);
		var midMonthPartyDesc = "We're halfway through the month! Join us for" + 
			" our mid month party at Spice Girls!";

		var monthEndPartyDate = new Date(eventDate.getFullYear(), 
			eventDate.getMonth(), eventDate.getDaysInMonth(), 15, 0, 0, 0);
		var monthEndPartyDateEnd = new Date(eventDate.getFullYear(), 
			eventDate.getMonth(), eventDate.getDaysInMonth(), 19, 0, 0, 0);
		var monthEndPartyDesc = "The end of the month has come but that " + 
			"doesn't stop the party here at Spice Girls!";

		var monthStartParty = new RestaurantEvent("Start of the Month Party", 
			monthStartPartyDate, monthStartPartyDateEnd, monthStartPartyDesc);
		var midMonthParty = new RestaurantEvent("Mid Month Party", 
			midMonthPartyDate, midMonthPartyDateEnd, midMonthPartyDesc);
		var monthEndParty = new RestaurantEvent("Month End Party", 
			monthEndPartyDate, monthEndPartyDateEnd, monthEndPartyDesc);

		inputEvent(monthStartParty);
		inputEvent(midMonthParty);
		inputEvent(monthEndParty);
	}

	// Displays the event information when a restaurant event date is clicked
	function displayEventInfo(rEvent) {
		var eventDetailMessage = "<h2>Event Details</h2>";

		eventDetailMessage += "<p>Event Name: " + rEvent.eventName + "</p>";
		eventDetailMessage += "<p>Event Description: " 
			+ rEvent.eventDescription + "</p>";
		eventDetailMessage += "<p>Start Time: " + rEvent.eventStart.toString()
			+ "</p>";
		eventDetailMessage += "<p>End Time: " + rEvent.eventEnd.toString()
			+ "</p>";

		eventDetailsArea.innerHTML = eventDetailMessage;
		window.location = "events.html#detail-section";
	}

	// Generate the months for the drop down list. Will include today's month,
	// three months prior, and two months after
	function generateReferenceMonths() {
		var listOptions = [];
		var currentDate = todaysDate;
		var currentYear = currentDate.getFullYear();
		var currentMonth = currentDate.getMonth();
		var newDate;

		for (let i = 0; i < 3; i++) {
			if (currentMonth === 0) {
				currentMonth = 11;
				currentYear--;
			}
			else {
				currentMonth--;
			}

			currentDate = new Date(currentYear, currentMonth, 1);
			monthReferenceDays.unshift(currentDate);
		}

		currentDate = todaysDate;
		currentYear = currentDate.getFullYear();
		currentMonth = currentDate.getMonth();
		monthReferenceDays.push(todaysDate);

		for (let i = 0; i < 2; i++) {
			if (currentMonth === 11) {
				currentMonth = 0;
				currentYear++;
			}
			else {
				currentMonth++;
			}
			currentDate = new Date(currentYear, currentMonth, 1);
			monthReferenceDays.push(currentDate);
		}
	}

	// Add the months in monthReferenceDays to the drop down list
	function populateMonthDropDown() {
		var monthSelectOption;
		var yearReference;
		var monthReference;

		for (let i = 0; i < monthReferenceDays.length; i++) {
			yearReference = monthReferenceDays[i].getFullYear();
			monthReference = monthReferenceDays[i].getMonth();

			monthSelectOption = document.createElement("option");
			monthSelectOption.value = i;
			monthSelectOption.innerHTML = monthsList[monthReference] 
				+ " " + yearReference;
			// The current month will be selected
			if(i === 3) {
				monthSelectOption.selected = "true";
			}
			monthDropDown.appendChild(monthSelectOption);
		}
	}

	// Function that runs after a different month is selected in the drop down
	// list. Clears the current calendar and displays a new one.
	function newMonthSelected() {
		var referenceDay = monthReferenceDays[this.value];

		clearCalendar();
		initEmptyCalendarArray();
		generateCalendar(referenceDay);
		insertBaseEvents(referenceDay);
		populateCalendar();
		monthHeading.innerHTML = monthsList[referenceDay.getMonth()] + " " 
			+ referenceDay.getFullYear();
	}

	// Function that validates a field against null values and the regular
	// expression specified by regex.
	function validateField(formField, regex, errorMessage) {
		if (formField.value === null || formField.value.trim() === "" ||
			!regex.test(formField.value)){
				formField.nextElementSibling.innerHTML = errorMessage;
				formField.focus();
			return false;
		}
		else {
			formField.nextElementSibling.innerHTML = "";
			return true;
		}
	}

	function formSubmit() {
		// Variables for the form fields
		var eventNameBox = formHandle.event_name;
		var bookerNameBox = formHandle.booker_name;
		var bookerPhoneBox = formHandle.booker_phone;
		var bookerEmailBox = formHandle.booker_email;
		var startDayBox = formHandle.start_day;
		var startTimeBox = formHandle.start_time;
		var endDayBox = formHandle.end_day;
		var endTimeBox = formHandle.end_time;
		// Variable to store the error messages related to timing of the events
		var eventTimingError = document.getElementById("event-timing-error");
		var errorMessage = "";

		// Regular expressions for name, phone, and email patterns
		var eventNameRegex = /^.+$/;
		var nameRegex = /^[\w\s'-]+$/i;
		var phoneRegex = /^\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/;
		var emailRegex = /^[\w-]+@[\w-]+\.[\w-]+$/i;

		// Validates the required form fields for names, phone, email, and time
		errorMessage = "Please enter a valid name.";
		if (!validateField(eventNameBox, eventNameRegex, errorMessage)) {
			return false;
		}
		if (!validateField(bookerNameBox, nameRegex, errorMessage)) {
			return false;
		}
		errorMessage = "Please enter a valid phone number.";
		if (!validateField(bookerPhoneBox, phoneRegex, errorMessage)) {
			return false;
		}
		errorMessage = "Please enter a valid email address.";
		if (!validateField(bookerEmailBox, emailRegex, errorMessage)) {
			return false;
		}
		errorMessage = "Please fill out all time fields";
		if (startDayBox.value.trim() === "" || startDayBox.value === null 
			|| startTimeBox.value.trim() === "" || startTimeBox.value === null 
			|| endDayBox.value.trim() === "" || endDayBox.value === null 
			|| endTimeBox.value.trim() === "" || endTimeBox.value === null) {
			eventTimingError.innerHTML = errorMessage;
			return false;
		}
		
		// Convert the form information for time into two dates for the 
		// event starting day and ending day
		var startDayArray = startDayBox.value.split("-");
		var startTimeArray = startTimeBox.value.split(":");
		var endDayArray = endDayBox.value.split("-");
		var endTimeArray = endTimeBox.value.split(":");
		var startDay = new Date(startDayArray[0], startDayArray[1]-1, 
			startDayArray[2], startTimeArray[0], startTimeArray[1], 0, 0)
		var endDay = new Date(endDayArray[0], endDayArray[1]-1, 
			endDayArray[2], endTimeArray[0], endTimeArray[1], 0, 0)

		// Check that the starting day hasn't already passed and that it is 
		// before the ending day
		errorMessage = "Your start time has already passed";
		if (startDay.getTime() < todaysDate.getTime()) {
			eventTimingError.innerHTML = errorMessage;
			return false;
		}
		errorMessage = "Your start time is after your finish time";
		if (startDay.getTime() > endDay.getTime()) {
			eventTimingError.innerHTML = errorMessage;
			return false;
		}
		else {
			eventTimingError.innerHTML = "";
		}

		confirmationArea.innerHTML = "Thank you " + formHandle.booker_name.value
			+ " for submitting your request. We will notify you once your " +
			" event has been approved. We hope " + formHandle.event_name.value + 
			" will be a hit!";
		return false;
	}

	// function that checks if the enter key is being pressed on an element
	// (tab-abble content for accessibility purposes)
	function checkForEnter(event) {
		if(event.keyCode === 13) {
			this.click();
		}
	}

	// Generate the Calendar for this month
	initEmptyCalendarArray();
	generateCalendar(todaysDate);
	// Insert base events
	insertBaseEvents(todaysDate);
	// Generate the drop down list
	generateReferenceMonths();
	populateMonthDropDown();
	monthDropDown.addEventListener("change", newMonthSelected);
	// Display the Calendar and change the heading for this month
	populateCalendar();
	monthHeading.innerHTML = monthsList[todaysDate.getMonth()] + " " 
		+ todaysDate.getFullYear();

	formHandle.onsubmit = formSubmit;
	window.onscroll = scrollFunction;
}

window.onload = initPage;