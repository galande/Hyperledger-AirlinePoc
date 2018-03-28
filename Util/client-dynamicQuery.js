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
    var queryStatement = 'SELECT org.acme.airline.aircraft.Aircraft';
    return businessNetworkConnection.buildQuery(queryStatement);
}).then(function(query){
    console.log("2. Build qury sucessful..");
    return businessNetworkConnection.query(query);
}).then(function (queryResult) {
    console.log('Dynamic Query Result Recieved..');
    queryResult.forEach(craft => {
        console.log(craft.getIdentifier());
    });
    businessNetworkConnection.disconnect();
})
.catch((error)=>{
    console.log(error);
    businessNetworkConnection.disconnect();
})