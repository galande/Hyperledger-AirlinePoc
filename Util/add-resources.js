'use strict';

const bnUtil = require('./bn-connection-util');

bnUtil.connect(main);

const aircraftNs = 'org.acme.airline.aircraft';
const flightNs = 'org.acme.airline.flight';

function main(){
    console.log("Function called by callback");

    let aircrafts = getAircraftInstances();

    return bnUtil.connection.getAssetRegistry(aircraftNs + '.Aircraft')
    .then(function (aircraftRegistry) {
        return aircraftRegistry.addAll(aircrafts);
    }).then(function () {
        console.log("Added aircrafts sucessfully..");
        submitCreateFlightTransactions();
    })

    //bnUtil.disconnect();
}

function submitCreateFlightTransactions() {
    let flights = getFlightInstances();

    return bnUtil.connection.submitTransaction(flights[0]).then(()=>{
        console.log("Added flight : ", flights[0].flightNumber);
        return flights[1];
    }).then(function (flight) {
        return bnUtil.connection.submitTransaction(flight);      
    }).then(function () {
        console.log("Added flight : ", flights[1].flightNumber);
        return flights[2];
    }).then(function (flight) {
        return bnUtil.connection.submitTransaction(flight);      
    }).then(function () {
        console.log("Added flight : ", flights[2].flightNumber);
        bnUtil.disconnect();
    })
    .catch((error)=>{
        console.log(error);
        bnUtil.disconnect();
    });   
}

function getAircraftInstances() {

    let aircrafts = [];
    const factory = bnUtil.connection.getBusinessNetwork().getFactory();
    
    let aircraftsResource = factory.newResource(aircraftNs, 'Aircraft', 'CRAFT001');
    aircraftsResource.ownershipType = 'OWNED';
    aircraftsResource.firstClassSeat = 8;
    aircraftsResource.businessClassSeat = 16;
    aircraftsResource.economyClassSeat = 70;
    aircrafts.push(aircraftsResource);

    aircraftsResource = factory.newResource(aircraftNs, 'Aircraft', 'CRAFT002');
    aircraftsResource.ownershipType = 'OWNED';
    aircraftsResource.firstClassSeat = 6;
    aircraftsResource.businessClassSeat = 12;
    aircraftsResource.economyClassSeat = 55;
    aircrafts.push(aircraftsResource);

    aircraftsResource = factory.newResource(aircraftNs, 'Aircraft', 'CRAFT003');
    aircraftsResource.ownershipType = 'LEASED';
    aircraftsResource.firstClassSeat = 7;
    aircraftsResource.businessClassSeat = 14;
    aircraftsResource.economyClassSeat = 70;
    aircrafts.push(aircraftsResource);

    return aircrafts;   
}

function getFlightInstances() {
    
    let flights = [];
    let trnType = 'CreateFlight';
    let options = {
        generate : false,
        includeOptionalFields : false,
    };
    const factory = bnUtil.connection.getBusinessNetwork().getFactory();

    let flightNumber = 'AE301';
    let flightId = flightNumber + '-' + '2018-03-26T06:50';
    let flightTransaction = factory.newTransaction(flightNs, trnType);
    flightTransaction.flightNumber = flightNumber;
    flightTransaction.sourceAirportCode = 'CHN';
    flightTransaction.destinationAirportCode = 'RAN';
    flightTransaction.schduleDateTime = new Date('2018-03-26T06:50Z');
    flights.push(flightTransaction);

    flightTransaction = factory.newTransaction(flightNs, trnType);
    flightNumber = 'AE302';
    flightId = flightNumber + '-' + '2018-03-27T06:50';
    flightTransaction.flightNumber = flightNumber;
    flightTransaction.sourceAirportCode = 'CHN';
    flightTransaction.destinationAirportCode = 'RAN';
    flightTransaction.schduleDateTime = new Date('2018-03-27T06:50Z');
    flights.push(flightTransaction);

    flightTransaction = factory.newTransaction(flightNs, trnType);
    flightNumber = 'AE303';
    flightId = flightNumber + '-' + '2018-03-28T06:50';
    flightTransaction.flightNumber = flightNumber;
    flightTransaction.sourceAirportCode = 'CHN';
    flightTransaction.destinationAirportCode = 'RAN';
    flightTransaction.schduleDateTime = new Date('2018-03-29T06:50Z');
    flights.push(flightTransaction);

    return flights;
}