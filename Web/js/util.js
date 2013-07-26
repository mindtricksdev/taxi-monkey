/*jslint browser:true*/
/*global $, jQuery, alert, FastClick, console, MemoryAdapter, locationlib, setup */

var util = {
    showAlert: function (message, title) {
        "use strict";
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    }
};