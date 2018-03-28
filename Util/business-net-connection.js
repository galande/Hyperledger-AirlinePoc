'use strict';

const flieSystemCardStore = require('composer-common').FileSystemCardStore;
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

const cardStore = new flieSystemCardStore();
var cardStoreObj = {cardStore: cardStore};
const businessNetworkConnection = new BusinessNetworkConnection(cardStoreObj);

const admin = 'admin@airpoc-network';

return businessNetworkConnection.connect(admin).then(function () {
    console.log("1. Business network connected sucessfully");
    return businessNetworkConnection.getBusinessNetwork();
    
}).then(function (network) {
    console.log("2. Get Business Nework sucessful");
    return network.getFactory();
}).then(function (factory) {
    console.log('3. Get Factory sucessful' + factory);
    var namespace = 'org.acme.airline.flight';
    var type = 'CreateFlight';
    var flightId = 'AE102-2018-03-10T06:50'; 
    var options = {
        generate : false,
        includeOptionalFields : false,
    };
    var flightTransaction = factory.newTransaction(namespace, type, flightId, options);
    flightTransaction.setPropertyValue('flightNumber', 'AE102');
    flightTransaction.setPropertyValue('sourceAirportCode', 'MEA');
    flightTransaction.setPropertyValue('destinationAirportCode', 'NEO');
    flightTransaction.setPropertyValue('schduleDateTime', new Date('2018-03-10T06:50Z'));
    return businessNetworkConnection.submitTransaction(flightTransaction);
    
}).then(function () {
    console.log('4. Transaction submitted sucessfully');
    businessNetworkConnection.disconnect();
})
.catch((error)=>{
    console.log(error);
    businessNetworkConnection.disconnect();
})
