/* Single file server to take temperature readings and report them to web API
Author: Joshua Olds
*/
var interval = 15;
var address = 'https://boiseweather.herokuapp.com/api/weather'
var pin = 'P9_15'
var mode = '2302'

var fs = require('fs');
var request = require('request');
var exec = require('child_process').exec;
var childRunningFlag = false;
var lastSignature = -1;

console.log(`Booting server. Readings will occur once per ${interval} minutes.`)


function readData(){
  var data = JSON.parse(fs.readFileSync('./weather.json', 'utf8'));
  console.log(data)
  return data;
}

function postData(){
  if(!childRunningFlag){ //If Python is not running. boot it, and wait 10 seconds.
    exec('sudo python AdafruitDHT.py ' + mode + ' ' + pin, (stdout) =>{
      childRunningFlag = false; //If python script exits, set running flag back to false
    });
    console.log(`Python script not running, booting now!`)
    childRunningFlag = true;
    setTimeout(postData, 10000);
    return;
  }

  console.log(`Reading data...`)
  var data = readData();
  if(!data.tempF){return console.log("Error reading data file!!!")}
  if(data.init){return console.log("Python hasn't written data yet!")}
  if(data.signature == lastSignature){
    console.log("Signature matches last read... Is python running?")
    console.log("Attempting to reboot python to fix this.")
    childRunningFlag = false;
    setTimeout(postData, 10000);
    return;
  }
  var now = Date.now();
  var weather = {dateStamp: now, reading: {tempF: data.tempF, tempC: data.tempC, rh: data.rh, location: {lat: data.location.lat, lon: data.location.lon}}}

  var options = {
    method: 'post',
    body: weather,
    json: true,
    url: address
  }
  console.log(`Posting data!`)
  request(options, function (err, res, body) {
    if (err) {
      console.log(err)
      return
    }
    var headers = res.headers
    var statusCode = res.statusCode
    console.log("Successful Post!")
  })
}

postData();
console.log(`Waiting till next post for: ${interval} minutes...`)
setInterval(postData, interval * 60 * 1000);




