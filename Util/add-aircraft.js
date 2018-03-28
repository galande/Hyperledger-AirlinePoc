'use strict';

const flieSystemCardStore = require('composer-common').FileSystemCardStore;
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

const cardStore = new flieSystemCardStore();
var cardStoreObj = {cardStore: cardStore};
const businessNetworkConnection = new BusinessNetworkConnection(cardStoreObj);

const admin = 'admin@airpoc-network';
const namespace = 'org.acme.airline.aircraft';

return businessNetworkConnection.connect(admin).then(function () {
    console.log("1. Business network connected sucessfully");
    
    return businessNetworkConnection.getAssetRegistry(namespace + '.Aircraft');
}).then(function (aircraftResgistry) {
    console.log("2. Registry recieved:- " + aircraftResgistry.id);
    addAircraft(aircraftResgistry);
    
})
.catch((error)=>{
    console.log(error);
    businessNetworkConnection.disconnect();
})

function addAircraft(aircraftResgistry){
    const factory = businessNetworkConnection.getBusinessNetwork().getFactory();
    //Craft 1
    var craft1 = factory.newResource(namespace, 'Aircraft', 'CRAFT001');
    craft1.firstClassSeat = 6;
    craft1.businessClassSeat = 12;
    craft1.economyClassSeat = 50;
    craft1.ownershipType = 'LEASED';

    //Craft 2
    var craft2 = factory.newResource(namespace, 'Aircraft', 'CRAFT002');
    craft2.firstClassSeat = 8;
    craft2.businessClassSeat = 16;
    craft2.economyClassSeat = 70;
    craft2.ownershipType = 'OWNED';
    return aircraftResgistry.addAll([craft1, craft2]).then(function () {
        console.log('Aircrafts added sucessfully: CRAFT001 and CRAFT002');
        businessNetworkConnection.disconnect();
    }).catch((error)=>{
        console.log(error);
    })
}
