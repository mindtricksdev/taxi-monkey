/*jslint browser:true*/
/*global $, jQuery, FastClick, console, MemoryAdapter, locationlib, setup */

var app = {
    initialize: function () {
        "use strict";
        setup.initialize();
    },
    
    loadUserLocation: function () {
        "use strict";
        function callback(location) {
            $('#fromInfoBox').text(location);
        }
        locationlib.getCurrentLocationAsString(callback);
        
        //        function callback2(lat, lng) {
        //            $('#fromInfoBox').text(lat + " / " + lng);
        //        }
        //        locationlib.getCurrentLocationAsLatLng(callback2);
    }
    
};




function onDeviceReady() {
    "use strict";
    // PhoneGap is loaded and it is now safe to make calls PhoneGap methods
    app.initialize();
}

$(document).ready(function () {
    "use strict";
    FastClick.attach(document.body);
    $(document).bind('deviceready', function () {
        // Phonegap ready
        onDeviceReady();
    });
    
    // this line should be removed when running on device
    app.initialize();
    
});