var express= require('express'),
    app= express(),
    server= require('http').createServer(app);

var config= {
    rootPath: __dirname
};

require('./server/config/express')(app, config);
require('./server/config/routes')(app);
require('./server/config/socket')(server);

server.listen(8000, function() {
    console.log('Server engaged at PORT:8000');
});