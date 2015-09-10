var express = require('express'),
    router = express.Router(),
    resources = require('./../resources/model');

var sensors = require('./../plugins/internal/tempBaroAltPlugin');

router.route('/').get(function (req, res, next) {
    res.send(resources.pi.sensors);
});

router.route('/barometer').get(function (req, res, next) {
    res.send(resources.pi.sensors.barometer);
});

router.route('/temperature').get(function (req, res, next) {
    res.send(resources.pi.sensors.temperature);
});

router.route('/altitude').get(function (req, res, next) {
    res.send(resources.pi.sensors.altitude);
});

module.exports = router;