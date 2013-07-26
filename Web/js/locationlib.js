/*global $, jQuery, google, geocoder, navigator, console, util */

var locationlib = {
    getGeocoder: function () {
        "use strict";
        // create geocoder object as property of locationlib
        if (!this.geocoder) {
            this.geocoder = new google.maps.Geocoder();
        }
        return this.geocoder;
    },
    
    reverseGeocode: function (lat, lng, callback) {
        "use strict";
        var latlng = new google.maps.LatLng(lat, lng);
        this.getGeocoder().geocode({'latLng': latlng}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    var address = results[1].formatted_address;
                    callback(address);
                } else {
                    // TODO
                    util.showAlert('No results found');
                }
            } else {
                // TODO
                util.showAlert('Geocoder failed due to: ' + status);
            }
        });
    },
    
    geocode: function (address, callback) {
        "use strict";
        this.getGeocoder().geocode({'address': address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var lat = results[0].geometry.location.lat,
                        lng = results[0].geometry.location.lng;
                    callback(lat, lng);
                } else {
                    // TODO
                    util.showAlert('No results found');
                }
            } else {
                // TODO
                util.showAlert('Geocoder failed due to: ' + status);
            }
        });
    },
    
    getCurrentLocationAsString: function (callback) {
        "use strict";
        var that = this;
        function callbackSuccess(lat, lng) {
            that.reverseGeocode(lat, lng, callback);
        }
        
        this.getCurrentLocation(callbackSuccess);
    },
    
    getCurrentLocationAsLatLng: function (callback) {
        "use strict";
        function callbackSuccess(lat, lng) {
            callback(lat, lng);
        }
        
        this.getCurrentLocation(callbackSuccess);
    },
    
    getCurrentLocation: function (callback) {
        "use strict";
        var that = this;
        function geolocationSuccess(position) {
            console.log("Got user location: lat " + position.coords.latitude + " / long " + position.coords.longitude, "Success");
            callback(position.coords.latitude, position.coords.longitude);
        }
        function geolocationError() {
            // TODO
            util.showAlert("Failed to get user location", "Error");
        }
        
        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, {enableHighAccuracy: true});
    }

};



