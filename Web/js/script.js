/*jslint browser:true*/
/*global $, jQuery, FastClick, console, MemoryAdapter, locationlib, setup, ko, google */

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
            app.isOnline = true;
        },
        
        onOffline: function () {
            "use strict";
            // fires when the application is offline (not connected to the Internet)
            app.isOnline = false;
        },
        
        onBackButton: function () {
            "use strict";
            // fires when the user presses the back button
        }
    },
    
    updateFromLocation: function () {
        "use strict";
        function callback(location, lat, lng) {
            $('#fromInfoBox').text(location);
        }
        locationlib.getCurrentLocationAsString(callback);
    },
    
    user: {
        location: {
            country: "RO",
            city: "Bucuresti",
            lat: "",
            lng: "",
            address: "",
            fullAdress: "",
            shortAdress: "",
            status: "loading"
        }
    },
    isOnline: "false",
    
    ViewModels: {
        MainMenuVM: function () {
            "use strict";
            // keep a reference as app.ViewModels.MainMenuVM.shortAddress("write") does not work
            app.ViewModels.MainMenu = this;
            var self = this;
            self.mapLoaded = ko.observable('loading');
            self.isLoadingVisible = ko.computed(function () {
                return (self.mapLoaded() === "loading");
            });
            self.shortAddress = ko.observable("loading..");
            
            self.menuVisible = ko.observable(true);
            self.toggleMenu = function () {
                self.menuVisible(!self.menuVisible());
            };
        }
    },
    
    Navigation: {
        init: function () {
            "use strict";
            
            window.onhashchange = app.Navigation.onHashChange;
            
//            app.Navigation.changePage("page-main-menu");
//            app.Navigation.setLocationHash("page-main-menu");
            app.Navigation.changePage("page-estimate-results");
            app.Navigation.setLocationHash("page-estimate-results");
        },
        currentPage: "",
        changePage: function (page) {
            "use strict";
            console.log("Change page to " + page);
            
            $(".page-taxi").hide();
            $("#" + page).show();
            
            app.Navigation.setLocationHash(page);
            
            app.Navigation.currentPage = page;
        },
        allowHashToUpdateApp: true,
        getLocationHash: function () {
            "use strict";
            return window.location.hash.substring(1);
        },
        setLocationHash: function (str) {
            "use strict";
            app.Navigation.allowHashToUpdateApp = false;
            window.location.hash = str;
        },
        onHashChange: function (e) {
            "use strict";
            if (app.Navigation.allowHashToUpdateApp) {
                app.Navigation.changePage(app.Navigation.getLocationHash());
            } else {
                app.Navigation.allowHashToUpdateApp = true;
            }
        }
    }
};



$(document).ready(function () {
    "use strict";

    app.initialize();

});

