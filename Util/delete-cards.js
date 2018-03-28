'use strict';

const fileSystemCardStore = require('composer-common').FileSystemCardStore;

const cardStore = new fileSystemCardStore();

return cardStore.getAll().then(function (cardMap) {
    console.log("Recieved Cards.....");
    

   cardMap.forEach(card => {
        var businessNetwork = card.getBusinessNetworkName();
        var userName = card.getUserName();
        
        if (businessNetwork == 'airline-network' && userName != 'admin'){
            console.log("New Card..");
            var cardName = userName + '@' + businessNetwork;
            console.log(cardName);
            cardStore.delete(cardName);
        }
     });
}).catch((error) => {
    console.log(error);
});