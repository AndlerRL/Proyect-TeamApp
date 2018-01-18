var logger= require('morgan');
var bodyParser= require('body-parser');
var swig= require('swig');
var express= require('express');

module.exports= function(app, config) {
    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', config.rootPath + '/server/views');

    app.set('view cache', false);
    swig.setDefaults({ cache: false });

    app.use(logger('dev'));
    app.use(bodyParse());
    app.use(express.static(config.rootPath + '/public'));
};