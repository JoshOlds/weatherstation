/* Single file server to take temperature readings and report them to web API
Author: Joshua Olds
*/

var request = require('request');
var PythonShell = require('python-shell');

var options = {
  mode: 'text',
  args: ['2302', 'P9_15']
};

var script = new PythonShell('test.py')

script.stdout.on('message', function(message){
    console.log(message);
})



