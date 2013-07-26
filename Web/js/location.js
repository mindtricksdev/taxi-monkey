/*jslint browser:true */
/*global $, jQuery, alert, FastClick, console, MemoryAdapter, google */

//var geocoder;
var locationNS = function () {
    "use strict";
    var geocoder, latlng;
    var location = {
        initialize: function () {
            geocoder = new google.maps.Geocoder();
        },
        
        codeLatLng: function (lat, lng) {
            latlng = new google.maps.LatLng(lat, lng);
            geocoder = new google.maps.Geocoder();
            geocoder.geocode({'latLng': latlng}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                   
                        $('#fromInfoBox').text(results[1].formatted_address);
                  
                    } else {
                        alert('No results found');
                    }
                } else {
                    alert('Geocoder failed due to: ' + status);
                }
            });
        }
        
      
    
        
    };
};