/*jslint browser:true */
/*global $, jQuery*/


function onDeviceReady() {
    "use strict";
    // PhoneGap is loaded and it is now safe to make calls PhoneGap methods
}

$(document).ready(function () {
    "use strict";
    $(document).bind('deviceready', function () {
        // Phonegap ready
        onDeviceReady();
    });
  // Your main code
});

