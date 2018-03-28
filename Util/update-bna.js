'use strict';

const flieSystemCardStore = require('composer-common').FileSystemCardStore;
const AdminConnection = require('composer-admin').AdminConnection;
const businessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;

const cardStore = new flieSystemCardStore();
var cardStoreObj = {cardStore: cardStore};
const adminConnection = new AdminConnection(cardStoreObj);

const admin = 'admin@airpoc-network';
const appDirectory = '/home/bhavesh/Udemy-POC/airline/airpoc-network';

return adminConnection.connect(admin).then(function () {
    console.log("Admin Connected sucessfully");
    updateBna();
}).catch((error)=>{
    console.log(error);
});

function updateBna(){

    var bnaDef;
    return businessNetworkDefinition.fromDirectory(appDirectory).then(function (definition) {
        bnaDef = definition;
        console.log('Business network definition created...');
        return adminConnection.update(bnaDef);
    }).then(function () {
        console.log("Business Network Updated sucessfully.. " + bnaDef.getName() + ' ' + bnaDef.getVersion());
        adminConnection.disconnect();
    })
    .catch((error)=>{
        console.log(error);
    })
}