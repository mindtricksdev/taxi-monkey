var MemoryAdapter = function () {
    "use strict";
    var taxiCosts = [
            {"label": "Taxi Alfa", "phone": "0763232"},
            {"label": "Taxi Speed", "phone": "0763232"},
            {"label": "Taxi None", "phone": "0763232"},
            {"label": "Taxi Bleau", "phone": "0763232"}
        ];
    this.getData = function () {
        return taxiCosts;
    };
    
};