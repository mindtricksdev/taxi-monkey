/*jslint browser:true nomen:true*/
/*global $, jQuery, FastClick, console, MemoryAdapter, app, locationlib, google, ko*/
var setup = {

    hideSplashScreen: function () {
        "use strict";
        if (navigator.splashscreen) {
            console.log("Hide splashscreen");
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
                response(results.slice(0, 4));
            },
            appendTo: '#taxiCostsSuggestions',
            //minLength: 1,
            create: function (event, ui) {
                $('ul.ui-autocomplete').addClass('taxi-suggestions-ul');
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
                $(this).blur();
            }
        })
            .data('ui-autocomplete')._renderItem = function (ul, item) {
                return $("<li>")
                    .data('ui-autocomplete-item', item)
                    .append('<a>' + item.label + '</a>')
                    .appendTo(ul)
                    .addClass("taxi-suggestions-li");
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
                app.updateFromLocation();
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
        $('#fromLocationName').autocomplete({
            source: locationlib.getGeocodingAutocompleteSource,
            create: function (event, ui) {
                $('ul.ui-autocomplete').addClass('address-suggestions-ul');
            },
            appendTo: '#fromSuggestions',
            select: function (event, ui) {
                $(this).val(ui.item.label);
                $(this).blur();
            }
        })
            .data('ui-autocomplete')._renderItem = function (ul, item) {
                return $("<li>")
                    .data('ui-autocomplete-item', item)
                    .append('<a>' + item.label + '</a>')
                    .appendTo(ul)
                    .addClass("address-suggestions-li");
            };
        
        $('#toLocationName').autocomplete({
            source: locationlib.getGeocodingAutocompleteSource,
            create: function (event, ui) {
                $('ul.ui-autocomplete').addClass('address-suggestions-ul');
            },
            appendTo: '#toSuggestions',
            select: function (event, ui) {
                $(this).val(ui.item.label);
                $(this).blur();
            }
        })
            .data('ui-autocomplete')._renderItem = function (ul, item) {
                return $("<li>")
                    .data('ui-autocomplete-item', item)
                    .append('<a>' + item.label + '</a>')
                    .appendTo(ul)
                    .addClass("address-suggestions-li");
            };
    },
    
    initFastButtons: function () {
        "use strict";
        FastClick.attach(document.body);
    },
    
    loadUserLocation: function () {
        "use strict";
        function callback(location, lat, lng) {
            app.user.location.lat = lat;
            app.user.location.lng = lng;
            app.user.location.address = location;
            app.user.location.status = "OK";
            
            console.log("[loadUserLocation] OK");
            setup.displayMapOnMainPage();
        }
        locationlib.getCurrentLocationAsString(callback);
    },
    
    displayMapOnMainPage: function () {
        "use strict";
        var userLocation = new google.maps.LatLng(app.user.location.lat, app.user.location.lng),
            
            mapOptions = {
                center: userLocation,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true
            },
            
            map = new google.maps.Map(document.getElementById("main-map"), mapOptions),
        
            marker = new google.maps.Marker({
                position: userLocation,
                map: map,
                title: 'your position'
            });

        google.maps.event.addListener(map, 'tilesloaded', function () {
            console.log("Map Tiles Loaded");
            
            setTimeout(function () {
                google.maps.event.trigger(map, 'resize');
                map.setCenter(userLocation);
            // might be raised on mobiles
            }, 1);
            
            app.ViewModels.MainMenu.shortAddress("- " + app.user.location.address + " -");
            app.ViewModels.MainMenu.mapLoaded("OK");
        });
        
        console.log("[displayMapOnMainPage] OK");
    },
    
    initialize: function () {
        "use strict";
        //setup.addAutoCompleteToTaxi();
        setup.addCompareAllHint();
        setup.addDialogAddNewTaxiCost();
        setup.addUseMyCurrentLocation();
        setup.hideSplashScreen();
        //setup.addAutoCompleteToAddresses();
        setup.addPhonegapEvents();
        //setup.overrideDefaultBackButtonBehavior();
        setup.initFastButtons();
        
        ko.applyBindings(new app.ViewModels.MainMenuVM());
        
        setup.loadUserLocation();
        
        
        
        console.log("App initialized");
    }
};