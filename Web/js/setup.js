/*jslint browser:true nomen:true*/
/*global $, jQuery, FastClick, console, MemoryAdapter, app, locationlib*/
var setup = {

    hideSplashScreen: function () {
        "use strict";
        if (navigator.splashscreen) {
            navigator.splashscreen.hide();
        }
    },
    
    addPhonegapEvents: function () {
        "use strict";
        $(document).bind('pause', function () {
            console.log("App paused");
            app.phonegapCallbacks.onPause();
        });
        $(document).bind('resume', function () {
            console.log("App resumed");
            app.phonegapCallbacks.onResume();
        });
        $(document).bind('online', function () {
            console.log("App online");
            app.phonegapCallbacks.onOnline();
        });
        $(document).bind('offline', function () {
            console.log("App offline");
            app.phonegapCallbacks.onOffline();
        });
    },
    
    overrideDefaultBackButtonBehavior: function () {
        "use strict";
        $(document).bind('backbutton', function () {
            app.phonegapCallbacks.onBackButton();
        });
    },
    
    addAutoCompleteToTaxi: function () {
        "use strict";
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
    },
    
    addCompareAllHint: function () {
        "use strict";
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
    },
    
    addDialogAddNewTaxiCost: function () {
        "use strict";
        // add new taxi cost will launch a modal
        function displayAddNewTaxiCost() {
            
        }
        $('#addNewTaxiCost').bind('click', displayAddNewTaxiCost);
    },
    
    addUseMyCurrentLocation: function () {
        "use strict";
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
    
    addAutoCompleteToAddresses: function () {
        "use strict";
        $('#fromLocationName, #toLocationName').autocomplete({
            source: locationlib.getGeocodingAutocompleteSource
        });
    },
        
    
    
    initialize: function () {
        "use strict";
        setup.addAutoCompleteToTaxi();
        setup.addCompareAllHint();
        setup.addDialogAddNewTaxiCost();
        setup.addUseMyCurrentLocation();
        setup.hideSplashScreen();
        setup.addAutoCompleteToAddresses();
        setup.addPhonegapEvents();
        setup.overrideDefaultBackButtonBehavior();
        
        console.log("App initialized");
    }
};