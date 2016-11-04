var dht = require('beaglebone-dht'),
sensor = dht.sensor('AM2302'),
pin = 'P9_15';
var goodRead = false;

console.log('Attempting to read from sensor on: ' + pin)

function read(){
    var reading = dht.read(pin);

    if(reading === undefined){
        setTimeout(read, 2000);
    }
    else if(reading.humidity > 110){
        console.log('Bad reading, humidity too high, retrying...')
        console.log(reading);
        setTimeout(read, 2000);
    }
    else{
        console.log(reading)
        goodRead = true;
    }
    return
}

(function wait () {
   if (!goodRead) setTimeout(wait, 1000);
})();