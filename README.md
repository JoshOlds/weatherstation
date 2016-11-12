# Boise Weather Hardware

Boise Weather Hardware is the Resin.io half of the 'Boise Weather' project. For information on the Heroku based server backend for this project, please see: [Boise Weather Server](https://github.com/JoshOlds/weatherstation-server)



### Hardware:
The Boise Weather hardware consists of a [TI Beaglebone Black R3](http://beagleboard.org/bone), and an [AM2302 Temperature Sensor](https://www.adafruit.com/product/385).

The Firmware running on the Beaglebone is a Resin.io docker virtual machine. The virtual machine is running an instance of Node.js, which launches a child Python script. The Python script is running a modified version of the fantastic [Adafruit DHT22 Library](https://github.com/adafruit/DHT-sensor-library). This library manages the reading of Temperature/Humidity data from the AM2302 sensor, and Python subsequently writes it to a JSON file.

Every 15 minutes, the Node.js server reads the data from the JSON file, and if it is valid, makes a post request to the Heroku based server. 

### Why Resin.io?
Quite simply, I wanted a reason to learn how to use Resin.io. From working on this project, I have discovered that Resin.io is a fantastic solution to cloud deployment and fleet management. I highly recommend this service for any distributed projects.

#### Credits:
Both the hardware and software for this project was designed and coded by [Joshua Olds](https://www.linkedin.com/in/joshua-olds-91499b122)