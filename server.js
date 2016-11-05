/* Single file server to take temperature readings and report them to web API
Author: Joshua Olds
*/
var interval = 15;
var address = 'https://boiseweather.herokuapp.com/api/weather'

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
  var weather = {dateStamp: now, reading: {tempF: data.tempF, tempC: data.tempC, rh: data.rh}}

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




