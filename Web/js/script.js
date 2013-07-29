/*jslint browser:true*/
/*global $, jQuery, FastClick, console, MemoryAdapter, locationlib, setup */

var app = {
    runningOnDevice: false,
    initialize: function () {
        "use strict";
        if (document.URL.indexOf("http://") === -1) {
            console.log("App is running on device");
            app.runningOnDevice = true;
            
            // wait for phonegap to be ready
            $(document).bind('deviceready', function () {
                console.log("Device is ready");
                app.phonegapCallbacks.onDeviceReady();
            });
        } else {
            console.log("App is running in browser");
            app.runningOnDevice = false;
            
            // fire manually if in browser
            app.phonegapCallbacks.onDeviceReady();
        }

    },
    phonegapCallbacks: {
        onDeviceReady: function () {
            "use strict";
            console.log("[app.phonegapCallbacks.onDeviceReady]");
            // PhoneGap is loaded and it is now safe to make calls PhoneGap methods
            setup.initialize();
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
            
            app.user.location.lat = lat;
            app.user.location.lng = lng;
            app.user.location.address = location;
        }
        locationlib.getCurrentLocationAsString(callback);
        //        function callback2(lat, lng) {
        //            $('#fromInfoBox').text(lat + " / " + lng);
        //        }
        //        locationlib.getCurrentLocationAsLatLng(callback2);
    },
    
    user: {
        location: {
            country: "RO",
            city: "Bucuresti",
            lat: "",
            lng: "",
            address: ""
        }
    }
};





$(document).ready(function () {
    "use strict";
    app.initialize();
});