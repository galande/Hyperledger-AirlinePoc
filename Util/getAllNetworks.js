'use strict';

const flieSystemCardStore = require('composer-common').FileSystemCardStore;
const AdminConnection = require('composer-admin').AdminConnection;

const cardStore = new flieSystemCardStore();
var cardStoreObj = {cardStore: cardStore};
const adminConnection = new AdminConnection(cardStoreObj);

const peerAdmin = 'PeerAdmin@hlfv1';

return adminConnection.connect(peerAdmin).then(function () {
    console.log("Peer Admin Connected sucessfully");
    return adminConnection.list();
}).then(function (networks) {
    console.log(networks);
    adminConnection.disconnect();
}).catch((error)=>{
    console.log(error);
});

