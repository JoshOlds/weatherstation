import time
import sys

while True:
    print "Python opening file..."
    f = open('weather.json', 'w')
    

    # Try to grab a sensor reading.  Use the read_retry method which will retry up
    # to 15 times to get a sensor reading (waiting 2 seconds between each retry).
    humidity = 20.0
    temperature = 15.2

    # Un-comment the line below to convert the temperature to Fahrenheit.
    # temperature = temperature * 9/5.0 + 32

    # Note that sometimes you won't get a reading and
    # the results will be null (because Linux can't
    # guarantee the timing of calls to read the sensor).
    # If this happens try again!
    if humidity is not None and temperature is not None:
        print "Python writing to file!"
        f.write('{{"temp":{0:0.1f}, "humidity":{1:0.1f}}}\n'.format(temperature, humidity))
    else:
        sys.stdout.write({error: 'Failed to get reading. Try again!\n'})
    print "Python closing file."
    f.close()
    time.sleep(30)