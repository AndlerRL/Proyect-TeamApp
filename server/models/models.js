var mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/teamapp');

var db= mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', function callback() {
   console.log('||| TeamApp DB -- Engage...');
});

module.exports= mongoose;