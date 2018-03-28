/**
 * Part of a course on Hyperledger Fabric: 
 * http://ACloudFan.com
 * 
 * Use this as a template for your own unit test cases
 */
var assert = require('chai').assert;


const utHarness = require('/home/bhavesh/Udemy-POC/airline/airpoc-network/Util/ut-harness');

// This points to the model project folder
var modelFolder = '/home/bhavesh/Udemy-POC/airline/airpoc-network';

var adminConnection = {}
var businessNetworkConnection = {}
var bnDefinition = {}


// Synchronous call so that connections can be established
before((done) => {
    utHarness.debug = true;
    utHarness.initialize(modelFolder, (adminCon, bnCon, definition) => {
        adminConnection = adminCon;
        businessNetworkConnection = bnCon;
        bnDefinition = definition;
        done();
    });
})


// Test Suite # 1
describe('Give information on the test case', () => {

    // Synchronous
    after((done) => {
        businessNetworkConnection.disconnect();
        console.log('Network disconnected.');
        done()
    });

    // Test Case # 1
    it('should have more that 2 asset registry', () => {
        // Your test code goes here
        return businessNetworkConnection.getAllAssetRegistries()
        .then(function (assetRegistry) {
            assert.equal(assetRegistry.length ,2,'Registry count did not match');
        })
        
    });

    // Test Case # 2
    it('should have more that 3 particiant registry', () => {
        // Your test code goes here
        return businessNetworkConnection.getAllParticipantRegistries()
        .then(function (registry) {
            assert.equal(registry.length ,3,'Registry count did not match');
        })
    });
});


