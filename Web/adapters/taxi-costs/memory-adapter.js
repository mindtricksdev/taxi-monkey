var MemoryAdapter = function () {
    "use strict";
    var taxiCosts = [
            {"label": "Elegance Taxi", "cost": parseFloat(3.49), "phone": [ "0749239688", "0726009688", "0768199688"]},
            {"label": "Meridian Taxi", "cost": parseFloat(1.4), "phone": [ "0751339444", "0730339444", "0766339444"]},
            {"label": "Getax Taxi", "cost": parseFloat(1.6), "phone": [ "0742243829", "0735543829", "0762243829"]},
            {"label": "As Taxi", "cost": parseFloat(1.39), "phone": [ "0745779435", "0722699435", "0769039435"]},
            {"label": "Real Taxi", "cost": parseFloat(1.39), "phone": [ "0213353106", "0213353552"]},
            {"label": "Astro Cargo Taxi", "cost": parseFloat(1.39), "phone": [ "0720648248", "0212215617"]},
            {"label": "D'Artex Taxi", "cost": parseFloat(1.39), "phone": [ "0745963963", "0722963100", "0766421431"]},
            {"label": "Mavi Taxi", "cost": parseFloat(1.39), "phone": [ "0722009450", "0768009450"]},
            {"label": "Leone Taxi", "cost": parseFloat(1.39), "phone": [ "0744669425", "0722699425", "0766229425"]},
            {"label": "Pelicanul Taxi", "cost": parseFloat(1.39), "phone": [ "0752339665", "0722339665", "0765339665"]},
            {"label": "Mondial Taxi", "cost": parseFloat(1.39), "phone": [ "0740434385", "0731309423", "0784249423"]}
    
        ];
    this.getData = function () {
        return taxiCosts;
    };
    
};