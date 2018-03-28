'use strict';

const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const FileSystemCardStore = require('composer-common').FileSystemCardStore;

const cardStore = new FileSystemCardStore();
const cardStoreObj = {cardStore:cardStore};
const businessNetworkConnection = new BusinessNetworkConnection(cardStoreObj);
const cardName = 'admin@airpoc-network';
return businessNetworkConnection.connect(cardName).then(function () {
    console.log('1. Connected to Business Network...')
    deleteAllResources();
}).catch((error)=>{
    console.error(error);
    businessNetworkConnection.disconnect();
})

function deleteAllResources(){

    const factory = businessNetworkConnection.getBusinessNetwork().getFactory();
    var aircraftNamespace = 'org.acme.airline.aircraft.Aircraft';
    var flightNamespace = 'org.acme.airline.flight.Flight';
    var aircraftRegistry;
    var flightRegistry;
    
    return businessNetworkConnection.getAssetRegistry(aircraftNamespace)
    .then(function (registry) {
        aircraftRegistry = registry;
        return aircraftRegistry.getAll();
    }).then(function (aircrafts) {
        aircrafts.forEach(craft => {
            aircraftRegistry.remove(craft);
        });
        return businessNetworkConnection.getAssetRegistry(flightNamespace); 
    }).then(function (registry) {
        flightRegistry = registry;
        return flightRegistry.getAll();
    }).then(function (flights) {
        flights.forEach(flight => {
            flightRegistry.remove(flight);
        });
        businessNetworkConnection.disconnect();
    })
    .catch((error)=>{
        console.log(error);
    })
}