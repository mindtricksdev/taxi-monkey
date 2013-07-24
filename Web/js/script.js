/*jslint browser:true */
/*global $, jQuery, alert, FastClick, console */

var app = {

    showAlert: function (message, title) {
        "use strict";
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },
    
    hideSplashScreen: function () {
        "use strict";
        if (navigator.splashscreen) {
            navigator.splashscreen.hide();
        }
    },
    
    initialize: function () {
        "use strict";
        app.hideSplashScreen();
        console.log("App initialized");
        //app.showAlert("App initialized", "Info");
        
        // autocomplete taxi fields
        var taxiCosts = [
            "Taxi Alfa",
            "Taxi Speed",
            "Taxi Nothing"
        ];
        
        $('#taxiCost').autocomplete({
            source: function (request, response) {
                var results = $.ui.autocomplete.filter(taxiCosts, request.term);
                response(results.slice(0, 1));
            },
            appendTo: '#taxiCostsSuggestions',
            minLength: 0,
            create: function (event, ui) {
                $('ul.ui-autocomplete').addClass('topcoat-list');
                //$('#taxiCostsSuggestions').addClass('topcoat-list__container');
                $('#taxiCostsSuggestions').hide();
            },
            response: function (event, ui) {
                $('#taxiCostsSuggestions').show();
            },
            close: function (event, ui) {
                $('#taxiCostsSuggestions').hide();
            },
            change: function (event, ui) {
                if (!ui.item) { $(this).val(''); }
            }
        })
            .data('ui-autocomplete')._renderItem = function (ul, item) {
                return $("<li>")
                    .data('ui-autocomplete-item', item)
                    .append('<a>' + item.label + '</a>')
                    .appendTo(ul)
                    .addClass("topcoat-list__item");
            };
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
    
    app.initialize();
  // Main code
});