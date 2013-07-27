/*jslint browser:true*/
/*global $, jQuery, FastClick, console, MemoryAdapter, locationlib, setup */

var app = {
    runningOnDevice: false,
    initialize: function () {
        "use strict";
        setup.initialize();
    },
    phonegapCallbacks: {
        onDeviceReady: function () {
            "use strict";
            // PhoneGap is loaded and it is now safe to make calls PhoneGap methods
            app.initialize();
        },
        
        onPause: function () {
            "use strict";
            // fires when the application is put into the background
            
        },
        
        onResume: function () {
            "use strict";
            // fires when the application is retrieved from the background
        },
        
        onOnline: function () {
            "use strict";
            // fires when the application is online (connected to the Internet)
        },
        
        onOffline: function () {
            "use strict";
            // fires when the application is offline (not connected to the Internet)
        },
        
        onBackButton: function () {
            "use strict";
            // fires when the user presses the back button
        }
    },
    
    loadUserLocation: function () {
        "use strict";
        function callback(location, lat, lng) {
            $('#fromInfoBox').text(location);
            $('#fromLatLng').val(lat + ';' + lng);
            $('#fromAddr').val(location);
            
        }
        locationlib.getCurrentLocationAsString(callback);
        //        function callback2(lat, lng) {
        //            $('#fromInfoBox').text(lat + " / " + lng);
        //        }
        //        locationlib.getCurrentLocationAsLatLng(callback2);
    }
    
};



$(document).ready(function () {
    "use strict";
    
    $(document).bind('deviceready', function () {
        // Phonegap ready
        app.phonegapCallbacks.onDeviceReady();
    });
    
    // this line should be removed when running on device
    app.initialize();
    
});