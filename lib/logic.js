/**
 * This transaction will create flight.
 * @param {org.acme.airline.flight.CreateFlight} flightInfo
 * @transaction
 */

function createFlight(flightInfo) {
    var ns = 'org.acme.airline.flight';
    return getAssetRegistry(ns + '.Flight')
    .then(function (flightRegistry) {
       var factory = getFactory();
       var id = flightInfo.flightNumber + '-' +
                 flightInfo.schduleDateTime.toISOString().substr(0,16);
       var flight = factory.newResource(ns , 'Flight' , id);
       flight.flightNumber = flightInfo.flightNumber;
       var flightRoute = factory.newConcept(ns , 'Route');
       flightRoute.sourceAirportCode = flightInfo.sourceAirportCode;
       flightRoute.destinationAirportCode = flightInfo.destinationAirportCode;
       flightRoute.schduleDateTime = flightInfo.schduleDateTime;
       flight.route = flightRoute;
       var flightCreatedEvent = factory.newEvent(ns, 'FlightCreated');
       flightCreatedEvent.flightId = id;
       emit(flightCreatedEvent);

       return flightRegistry.addAll([flight]);
    })
}

/**
 * This transaction will assign Aircraft to the flight.
 * @param{org.acme.airline.flight.AssignAircraftToflight} craftInfo
 * @transaction
 */

 function assignAircraftToflight(craftInfo){

    var flightId = craftInfo.flightId;
    var craftId = craftInfo.craftId;
    var craftNs = 'org.acme.airline.aircraft';
    var flightNs = 'org.acme.airline.flight';
    
    var flightRegistry = {};
    
    return getAssetRegistry(flightNs + '.Flight')
    .then(function (registry) {
        flightRegistry = registry;    
        return flightRegistry.get(flightId);
    }).then(function (params) {
        
       return flightRegistry.get(flightId);
   }).then(function(flight){
    var factory = getFactory();
    var aircraftRelation = factory.newRelationship(craftNs, 'Aircraft', craftId);
    flight.aircraft = aircraftRelation;
    var AircraftAssingedEvent = factory.newEvent(flightNs, 'AircraftAssinged');
    AircraftAssingedEvent.flightId = craftInfo.flightId;
    AircraftAssingedEvent.craftId = craftInfo.craftId;
    emit(AircraftAssingedEvent);
    
    return flightRegistry.update(flight);
   })
 }