/*jslint browser:true */
/*global $, jQuery, alert */

var app = {

    showAlert: function (message, title) {
        "use strict";
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },
    
    initialize: function () {
        "use strict";
        navigator.splashscreen.hide();
        app.showAlert("App initialized", "Info");
    }
    
};

function onDeviceReady() {
    "use strict";
    // PhoneGap is loaded and it is now safe to make calls PhoneGap methods
    
    app.initialize();
    
}

$(document).ready(function () {
    "use strict";
    $(document).bind('deviceready', function () {
        // Phonegap ready
        onDeviceReady();
    });
    
    
  // Main code
});