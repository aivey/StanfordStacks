var http = require('http');
//const https = require('https');
var express = require('express');
var ejs = require('ejs');
var app = express();
var connect = require('connect');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongodb');
var pg = require('pg');

// pg.defaults.ssl = true;
// pg.connect(process.env.DATABASE_URL, function(err, client) {
//   if (err) throw err;
//   console.log('Connected to postgres! Getting schemas...');

//   client
//     .query('SELECT table_schema,table_name FROM information_schema.tables;')
//     .on('row', function(row) {
//       console.log(JSON.stringify(row));
//     });
// });

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.engine('.html', ejs.renderFile);

var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/HelloMongoose';

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function(err, res) {
  if (err) {
    console.log('Error connecting to: ' + uristring + '. ' + err);
  } else {
    console.log('Succeeded connected to: ' + uristring);
  }
});

//postgres://jxqknnpfawagnc:M9qZK2LSIibfIp55DPMKbF-lQL@ec2-54-235-65-221.compute-1.amazonaws.com:5432/dcr0ntvkqrstm3


require('./passport')(passport);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.text({ type: 'text/html' }));
//app.use(express.bodyDecoder());
//app.use(express.cookieDecoder());
app.use(cookieParser());
//app.use(session({ secret: 'iloveurbanspire' }));
app.use(session({ store: new MongoStore({ db: mongoose.connection.db }), secret: 'ilovestanfordstack' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session



require('./routes/routes.js')(app, passport, mongoose.connection.db);


// app.use(express.methodOverride());
// app.use(app.router);


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


