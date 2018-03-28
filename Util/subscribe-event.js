'use strict';

const flieSystemCardStore = require('composer-common').FileSystemCardStore;
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

const cardStore = new flieSystemCardStore();
var cardStoreObj = {cardStore: cardStore};
const businessNetworkConnection = new BusinessNetworkConnection(cardStoreObj);

const admin = 'admin@airpoc-network';

return businessNetworkConnection.connect(admin).then(function () {
    console.log("1. Business network connected sucessfully");
    console.log('Event Subsrciption started...')
    businessNetworkConnection.on('event',(event)=>{
        var namespace = event.$namespace;
        var eventType = event.$type;

        var qualifiedName = namespace + '.' + eventType;
        switch (qualifiedName) {
            case 'org.acme.airline.flight.FlightCreated':
                processFlightCreatedEvent(event);
                break;
            case 'org.acme.airline.flight.AircraftAssinged':
                processAircraftAssingedEvent(event);
                break;
        
            default:
                console.log('Ignored Event:- ' + qualifiedName);
                break;
        }
    })
    //businessNetworkConnection.disconnect();
})
.catch((error)=>{
    console.log(error);
    businessNetworkConnection.disconnect();
})

function processFlightCreatedEvent(event){
    console.log('New Flight Created:- ' + event.flightId);
}

function processAircraftAssingedEvent(event){
    console.log('Aircraft ' + event.craftId +  ' Assgined to ' + event.flightId);
}