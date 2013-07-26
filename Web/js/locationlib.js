/*global $, jQuery, google, geocoder, app, navigator, console */

var locationlib = {
    initialize: function () {
        "use strict";
        this.geocoder = new google.maps.Geocoder();
    },
    
    codeLatLng: function (lat, lng) {
        "use strict";
        var latlng = new google.maps.LatLng(lat, lng);
        this.geocoder.geocode({'latLng': latlng}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    // this should not be here
                    $('#fromInfoBox').text(results[1].formatted_address);
                } else {
                    app.showAlert('No results found');
                }
            } else {
                app.showAlert('Geocoder failed due to: ' + status);
            }
        });
    },
    
    getCurrentLocation: function () {
        "use strict";
        var that = this;
        function geolocationSuccess(position) {
            console.log("Got user location: " + position.coords.latitude + " / " + position.coords.longitude, "Success");
            
            
            that.codeLatLng(position.coords.latitude, position.coords.longitude);
        }
        function geolocationError() {
            app.showAlert("Failed to get user location", "Error");
        }
        
        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, {enableHighAccuracy: true});
    }

};


