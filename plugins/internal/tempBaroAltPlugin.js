var resources = require('./../../resources/model');
var barometerModel = resources.pi.sensors.barometer;
var temperatureModel = resources.pi.sensors.temperature;
var altitudeModel = resources.pi.sensors.altitude;
var pluginName = resources.pi.name;

exports.start = function () {
    connectHardware();
    console.info('%s plugin started!', pluginName);
}

exports.stop = function () {
    sensor.unexport();
    console.info('%s plugin stopped!', pluginName);
}

function connectHardware() {
    var Cylon = require('cylon');
    Cylon.robot({
        connections: {
            raspi: {
                adaptor: 'raspi'
            }
        },
        devices: {
            bmp180: {
                driver: 'bmp180'
            }
        },
        work: function (my) {
            
            var count = 0;
            every((5).seconds(), function() {
                
                my.bmp180.getAltitude(1, null, function (err, val) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("Sensor call: " +count);
                    console.log("\tTemperature: " + val.temp + " C");
                    console.log("\tPressure: " + val.press + " Pa");
                    console.log("\tAltitude: " + val.alt + " m");

                    barometerModel.value = val.press;
                    temperatureModel.value = val.temp;
                    altitudeModel.value = val.alt;
                    count += 1;
                });
            });
            
            /*
            my.bmp180.getTemperature(function (err, val) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("getTemperature call:");
                console.log("\tTemp: " + val.temp + " C");
            });
            after((1).second(), function () {
                my.bmp180.getPressure(1, function (err, val) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("getPressure call:");
                    console.log("\tTemperature: " + val.temp + " C");
                    console.log("\tPressure: " + val.press + " Pa");
                    
                    barometerModel.value = val.press;
                    
                });
            });
            after((2).seconds(), function () {
                my.bmp180.getAltitude(1, null, function (err, val) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("getAltitude call:");
                    console.log("\tTemperature: " + val.temp + " C");
                    console.log("\tPressure: " + val.press + " Pa");
                    console.log("\tAltitude: " + val.alt + " m");
                    
                    barometerModel.value = val.press;
                    temperatureModel.value = val.press;
                    altitudeModel.value = val.alt;
                    
                });
            });
            */
        }
    }).start();

    /*
        var Gpio = require('onoff').Gpio;
        sensor = new Gpio(model.gpio, 'in', 'both');
        sensor.watch(function (err, value) {
            if (err) exit(err);
            showValue();
            model.value = !!value;
        });
        */
}

/*
var Cylon = require('cylon');

Cylon.robot({
  connections: {
    raspi: { adaptor: 'raspi' }
  },

  devices: {
    bmp180: { driver: 'bmp180' }
  },

  work: function(my) {
    my.bmp180.getTemperature(function(err, val) {
      if (err) {
        console.log(err);
        return;
      }

      console.log("getTemperature call:");
      console.log("\tTemp: " + val.temp + " C");
    });

    after((1).second(), function() {
      my.bmp180.getPressure(1, function(err, val) {
        if (err) {
          console.log(err);
          return;
        }

        console.log("getPressure call:");
        console.log("\tTemperature: " + val.temp + " C");
        console.log("\tPressure: " + val.press + " Pa");
      });
    });

    after((2).seconds(), function() {
      my.bmp180.getAltitude(1, null, function(err, val) {
        if (err) {
          console.log(err);
          return;
        }

        console.log("getAltitude call:");
        console.log("\tTemperature: " + val.temp + " C");
        console.log("\tPressure: " + val.press + " Pa");
        console.log("\tAltitude: " + val.alt + " m");
      });
    });
  }
}).start();
*/