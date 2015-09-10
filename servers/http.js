var express = require('express'),
    sensorRoutes = require('./../routes/sensors'),
    resources = require('./../resources/model');

var app = express();
app.use('/pi/sensors', sensorRoutes);
app.get('/pi', function (req, res) {
    res.send('This is the Barometer, Temperature and Altitude Raspberry Pi Web of Thing.');
});

module.exports = app;