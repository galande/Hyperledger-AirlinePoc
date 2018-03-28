'use strict';

const bnUtil = require('./bn-connection-util');

bnUtil.connect(main);

function main(){

    console.log('I am called by callback');
    deleteAllResources();
}

function deleteAllResources(){

    const flightNs = 'org.acme.airline.flight.Flight';
    const aircraftNs = 'org.acme.airline.aircraft.Aircraft';

    const factory = bnUtil.connection.getBusinessNetwork().getFactory();
    var aircraftRegistry;
    var flightRegistry;
    

    return bnUtil.connection.getAssetRegistry(aircraftNs).
    then(function (registry) {
        aircraftRegistry = registry;
        return aircraftRegistry.getAll();
    }).then(function (aircrafts) {
        console.log('Removing Aircrafts..');
        
        aircrafts.forEach(crafts => {
            console.log(crafts.getIdentifier());
        });

        return aircraftRegistry.removeAll(aircrafts);
    }).then(function () {
        console.log('Removed all aircrafts..');
        
        return bnUtil.connection.getAssetRegistry(flightNs);
    }).then(function (registry) {
        flightRegistry = registry;
        console.log('Flight Registry Recieved..');
        return flightRegistry.getAll();
    }).then(function (flights) {
        console.log('Removing Flights');
        flights.forEach(flight => {
            console.log(flight.getIdentifier());
        });
        return flightRegistry.removeAll(flights);
    }).then(function () {
        console.log('Removed all flights..');
        bnUtil.disconnect();
    }).catch((error)=>{
        console.log(error);
        bnUtil.disconnect();
    })
}