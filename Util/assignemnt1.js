'use strict';

const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const FileSystemCardStore = require('composer-common').FileSystemCardStore;

const cardStore = new FileSystemCardStore();
const cardStoreObj = {cardStore:cardStore};
const businessNetworkConnection = new BusinessNetworkConnection(cardStoreObj);
const cardName = 'admin@airpoc-network';
return businessNetworkConnection.connect(cardName).then(function () {
    console.log('1. Connected to Business Network...')
    createFlightAndCrafts();
}).catch((error)=>{
    console.error(error);
    businessNetworkConnection.disconnect();
})

function createFlightAndCrafts(){
   addFlights();
   addAircrafts();
}

function addFlights(){
    //flight-1
    var flightNumber = 'AE301';
    var sourceAirportCode = 'TWN';
    var destinationAirportCode = 'HYD';
    var schduleDateTime = new Date('2018-03-26T06:50Z');
    var flightid = flightNumber + '-' + '2018-03-26T06:50';
    createFlight(flightid, flightNumber,sourceAirportCode,destinationAirportCode,schduleDateTime);

    //flight-2
     flightNumber = 'AE302';
     sourceAirportCode = 'CHN';
     destinationAirportCode = 'RAN';
     schduleDateTime = new Date('2018-03-27T06:50Z');
     flightid = flightNumber + '-' + '2018-03-27T06:50';
    createFlight(flightid, flightNumber,sourceAirportCode,destinationAirportCode,schduleDateTime);

    //flight-3
     flightNumber = 'AE303';
     sourceAirportCode = 'AHM';
     destinationAirportCode = 'PTN';
     schduleDateTime = new Date('2018-03-28T06:50Z');
     flightid = flightNumber + '-' + '2018-03-28T06:50';
     createFlight(flightid, flightNumber,sourceAirportCode,destinationAirportCode,schduleDateTime);
}

function createFlight(flightid, flightNumber, sourceAirportCode, destinationAirportCode, schduleDateTime){

    const factory = businessNetworkConnection.getBusinessNetwork().getFactory();
    var namespace = 'org.acme.airline.flight';
    var type = 'CreateFlight';
    var options = {
        generate : false,
        includeOptionalFields : false,
    };
    var flightTransaction = factory.newTransaction(namespace, type, flightid, options);
    flightTransaction.setPropertyValue('flightNumber', flightNumber);
    flightTransaction.setPropertyValue('sourceAirportCode', sourceAirportCode);
    flightTransaction.setPropertyValue('destinationAirportCode', destinationAirportCode);
    flightTransaction.setPropertyValue('schduleDateTime', schduleDateTime);
    return businessNetworkConnection.submitTransaction(flightTransaction)
    .then(function () {
        console.log(flightNumber + ' Created sucessfully.');
    }).catch((error)=>{
        console.log(error);
    })
}

function addAircrafts(){
    //Aircraft-1
    var craftId = 'CRAFT301';
    var ownershipType = 'LEASED';
    var firstClassSeat = 6;
    var businessClassSeat = 12;
    var economyClassSeat = 35;
    createAircraft(craftId, ownershipType, firstClassSeat, businessClassSeat, economyClassSeat);

    //Aircraft-2
     craftId = 'CRAFT302';
     ownershipType = 'OWNED';
     firstClassSeat = 8;
     businessClassSeat = 16;
     economyClassSeat = 70;
     createAircraft(craftId, ownershipType, firstClassSeat, businessClassSeat, economyClassSeat);
    //Aircraft-3
     craftId = 'CRAFT303';
     ownershipType = 'LEASED';
     firstClassSeat = 7;
     businessClassSeat = 14;
     economyClassSeat = 60;
     createAircraft(craftId, ownershipType, firstClassSeat, businessClassSeat, economyClassSeat);
}

function createAircraft(craftId, ownershipType, firstClassSeat, businessClassSeat, economyClassSeat){

    const factory = businessNetworkConnection.getBusinessNetwork().getFactory();
    var namespace = 'org.acme.airline.aircraft';
    var type = 'Aircraft';

    var aircraft = factory.newResource(namespace, type, craftId);
    aircraft.ownershipType = ownershipType;
    aircraft.businessClassSeat = businessClassSeat;
    aircraft.firstClassSeat = firstClassSeat;
    aircraft.economyClassSeat = economyClassSeat;
    
    return businessNetworkConnection.getAssetRegistry(namespace + '.' + type)
    .then(function (aircraftRegistry) {
        console.log('Aircraft Registry Recieved..');
        return aircraftRegistry.addAll([aircraft]);
    }).then(function () {
        console.log(craftId + 'Aircraft Added sucessfully.');
        
    }).catch((error)=>{
        console.log(error);
    })
}