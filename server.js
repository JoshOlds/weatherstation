/* Single file server to take temperature readings and report them to web API
Author: Joshua Olds
*/
var interval = 15;
var address = 'https://boiseweather.herokuapp.com/'

var fs = require('fs');
var request = require('request');
console.log(`Booting server. Readings will occur once per ${interval} minutes.`)


function readData(){
  var data = JSON.parse(fs.readFileSync('./weather.json', 'utf8'));
  console.log(data)
  return data;
}

function postData(){
  console.log(`Reading data...`)
  var data = readData();
  if(!data.tempF){return console.log("Error reading data file!!!")}
  if(data.init){return console.log("Python hasn't written data yet!")}
  var now = Date.now();
  console.log(`Posting data!`)
  request.post(address, {dateStamp: now, reading: {tempF: data.tempF, tempC: data.tempC, rh: data.rh}})
}

postData();
setInterval(postData, interval * 60 * 1000);




