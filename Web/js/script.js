/*jslint browser:true */
/*global $, jQuery, alert, FastClick, console, MemoryAdapter, locationlib */

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
        var taxiCosts = (new MemoryAdapter()).getData();
        $('#taxiCost').autocomplete({
            source: function (request, response) {
                var results = $.ui.autocomplete.filter(taxiCosts, request.term);
                response(results.slice(0, 1));
            },
            appendTo: '#taxiCostsSuggestions',
            //minLength: 1,
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
            },
            select: function (event, ui) {
                $(this).val(ui.item.label);
            }
        })
            .data('ui-autocomplete')._renderItem = function (ul, item) {
                return $("<li>")
                    .data('ui-autocomplete-item', item)
                    .append('<a>' + item.label + '</a>')
                    .appendTo(ul)
                    .addClass("topcoat-list__item");
            };
        
        
        // if 'compare all' checkbox is checked hide the search input and display an info msg
        function updateTaxiLayout() {
            if ($('#enable-comparison-check')[0].checked === true) {
                $('#taxiCostsInfoBox').text("This option will list all taxi ?providers? costs from your area.");
                $('#taxiCost').hide();
                $('#taxiCostsInfoBox').show();
            } else {
                $('#taxiCostsInfoBox').hide();
                $('#taxiCost').show();
            }
        }
        $('#enable-comparison-check').bind('change', updateTaxiLayout);
        
        
        // add new taxi cost will launch a modal
        function displayAddNewTaxiCost() {
            
        }
        $('#addNewTaxiCost').bind('click', displayAddNewTaxiCost);
        
        
        // if 'use current location' checkbox is checked disable the search input
        function updateFromLayout() {
            if ($('#use-current-location-check')[0].checked === true) {
                $('#fromInfoBox').text("Loading your location..");
                app.loadUserLocation();
                $('#fromLocationName').hide();
                $('#fromInfoBox').show();
            } else {
                $('#fromInfoBox').hide();
                $('#fromLocationName').show();
            }
        }
        $('#use-current-location-check').bind('change', updateFromLayout);
    },
    
    loadUserLocation: function () {
        "use strict";
        locationlib.initialize();
        locationlib.getCurrentLocation();
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