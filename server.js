/* Single file server to take temperature readings and report them to web API
Author: Joshua Olds
*/

var request = require('request');

var dht = require('beaglebone-dht'),
sensor = dht.sensor('AM2302'),
pin = 'P9_15';



function read(cb){
    console.log('Attempting to read from sensor on: ' + pin)
    var reading = dht.read(pin);

    if(reading === undefined){
        setTimeout(read, 3000);
    }else{
        console.log(reading)
        cb(reading);
    }
    return;
}

