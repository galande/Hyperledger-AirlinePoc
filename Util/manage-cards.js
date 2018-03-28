'use strict';

const fileSystemCardStore = require('composer-common').FileSystemCardStore;

const cardStore = new fileSystemCardStore();

return cardStore.getAll().then(function (cardMap) {
    console.log("Recieved Cards.....");
    console.log(cardMap.keys());
}).catch((error) => {
    console.log(error);
});