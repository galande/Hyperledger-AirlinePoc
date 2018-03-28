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
    return businessNetworkConnection.query('AllCrafts');
}).then(function(queryResult){
    console.log("2. QUery Result Recieved..");
    queryResult.forEach(craft => {
        console.log(craft.getIdentifier());
    });
    businessNetworkConnection.disconnect();
})
.catch((error)=>{
    console.log(error);
    businessNetworkConnection.disconnect();
})