var httpServer = require('./servers/http'),
    wsServer = require('./servers/websockets'),    
    resources = require('./resources/model');
var barometerPlugin = require('./plugins/internal/tempBaroAltPlugin');

var ip = require('ip');

//HTTP and WebSocket server
var server = httpServer.listen(resources.pi.port, function () {
    console.log('HTTP server started...');
    wsServer.listen(server);
    barometerPlugin.start();
    console.info('The Server is started on IP Address %s and port %s (%s:%s)', ip.address(), resources.pi.port, ip.address(), resources.pi.port);    
});