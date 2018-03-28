'use strict'

module.exports = {
    BusinessNetworkConnection : require('composer-client').BusinessNetworkConnection,
    FileSystemCardStore : require('composer-common').FileSystemCardStore,

    cardName :'admin@airpoc-network',
    connection : {},

    connect :function (callback){
        const cardStore = new this.FileSystemCardStore();
        const cardStoreObj = {cardStore: cardStore};
        this.connection = new this.BusinessNetworkConnection();

        return this.connection.connect(this.cardName).then(function () {
            console.log('1. Connected to Business Newtwork.');
            callback();
        }).catch((error)=>{
            console.error(error);
            this.connection.disconnect();
        })
    },

    disconnect : function(){
        this.connection.disconnect();
        console.log('Business Network Disconnected sucessfully.');
    },

}