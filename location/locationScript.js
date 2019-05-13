window.addEventListener('load', pageReady);

function pageReady() {
    //on scroll, makes the header fixed at the top
    window.onscroll = scrollFunction;
    var menu = document.getElementById("main-menu");
    var next = document.getElementById("location_page_header");

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

    var store_hours = document.getElementsByClassName("store_hour");
    var today = new Date();
    today = today.getDay();
    var highlightNumber = "";
    /*Each store has 4 store hour ranges
    * Monday - Thursday would be the first store hour range
    * Friday would be the second store hour range,
    * Saturday would be the third,
    * Sunday would be the fourth

    * Monday - Thursday = index 0
    * Friday = index 1
    * Saturday = index 2
    * Sunday = index 3*/

    switch (today) {
        //Monday - Thursday
        case (today <= 4):
            highlightNumber = 0;
            break;
        //Friday
        case (today = 5):
            highlightNumber = 1;
            break;
        //Saturday
        case (today = 6):
            highlightNumber = 2;
            break;
        //Sunday
        case (today = 0):
            highlightNumber = 3;
            break;
    }

    //Highlights the store hour range based on what day of the week it is
    for (i = highlightNumber; i < store_hours.length; i += 4) {
        store_hours[i].classList.add("highlight_hours");
    }
}


//Referenced https://developers.google.com/maps/documentation/javascript/geocoding#GetStarted
function showMap() {
    var restaurantMap = document.getElementById('map');

    // Restaurant coordinates
    var toronto_restaurant = {
        lat: 43.658745,
        lng: -79.378888
    };
    var richmondHill_restaurant = {
        lat: 43.894492,
        lng: -79.465351
    };
    var vaughan_restaurant = {
        lat: 43.825730,
        lng: -79.538244
    };

    // The map, centered at Vaughan
    var map = new google.maps.Map(restaurantMap, {
        zoom: 9,
        center: vaughan_restaurant
    })

    // Restaurant markers
    var toronto_marker = new google.maps.Marker({
        position: toronto_restaurant,
        map: map,
        title: "Spice Girls Toronto Restaurant",
        animation: google.maps.Animation.DROP,
        icon: "images/pepper.png"
    })

    var richmondHill_marker = new google.maps.Marker({
        position: richmondHill_restaurant,
        map: map,
        title: "Spice Girls Richmond Hill Restaurant",
        animation: google.maps.Animation.DROP,
        icon: "images/pepper.png"
    })

    var vaughan_marker = new google.maps.Marker({
        position: vaughan_restaurant,
        map: map,
        title: "Spice Girls Vaughan Restaurant",
        animation: google.maps.Animation.DROP,
        icon: "images/pepper.png"
    })

    var restaurant_markers = [toronto_marker, richmondHill_marker, vaughan_marker];
    var restaurant_location_information = document.getElementsByClassName("location");
    var store_brief_info = document.getElementsByClassName("store_brief");
    var info_icons = document.getElementsByClassName("information_icon");

    //Adds event listener to information icons, store briefs, and restartarant markers
    for (var i = 0; i < restaurant_markers.length; i++) {
        info_icons[i].addEventListener('click', viewStoreDetails);
        store_brief_info[i].addEventListener('click', viewLocation);
        store_brief_info[i].addEventListener('mouseover', highlightStoreInfo);
        restaurant_markers[i].addListener('mouseover', highlightStoreInfo);
        restaurant_markers[i].addListener('click', zoomIn);
    }

    //Referenced https://developers.google.com/maps/documentation/javascript/events
    /*When restartarant marker is clicked, zooms in on the location, and centers
    map on the restaurant location marker*/
    function viewStoreDetails() {
        for (var i = 0; i < restaurant_markers.length; i++) {
            if (this === info_icons[i]) {
                restaurant_location_information[i].scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    }

    /*When someone hovers over a restaurant marker, it highlights the brief store
    information box associated with it
    The brief store information box is also highlighted when a user hovers over it*/
    function highlightStoreInfo() {
        for (var i = 0; i < restaurant_markers.length; i++) {
            if (this === restaurant_markers[i] || this === store_brief_info[i]) {
                store_brief_info[i].classList.add("active");
            } else {
                store_brief_info[i].classList.remove("active");
            }
        }
    }

    //Referenced https://stackoverflow.com/questions/6385703/how-to-find-current-zoom-level-in-a-google-map
    //When the restaurant marker is clicked, the map centers itself on the store and map zooms in by 1 level
    function zoomIn() {
        map.setZoom(map.getZoom() + 1);
        map.setCenter(this.getPosition());
    }

    //Referenced https://developers.google.com/maps/documentation/javascript/reference/map#Map.panTo
    //When the store information box of a restaruant is clicked, it pans the map to the restaurant
    function viewLocation() {
        for (var i = 0; i < restaurant_markers.length; i++) {
            if (this === store_brief_info[i]) {
                map.setZoom(10);
                map.panTo(restaurant_markers[i].getPosition());
            }
        }
    }
}
