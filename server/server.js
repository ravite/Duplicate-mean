require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
const mailer = require('express-mailer'); // call express



const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: "27faaab3",
  apiSecret: "23f881b85c70cfdf"
});

nexmo.message.sendSms(
  919705105735, '918074758486', 'ravi', (err, responseData) => {
    if (err) {
      console.log(err);
    } else {
      console.dir(responseData);
    }
  }
);


app.set('views', __dirname + '/views');
// set the view engine to pug
app.set('view engine', 'pug');

// Configure express-mail and setup default mail data.
mailer.extend(app, {
  //from: 'info@arjunphp.com',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'ravitejagodavarthi@gmail.com', // gmail id
    pass: 9705105735 // gmail password
  }
});


// test route to trigger emails
app.get('/', function(req, res) {
  // Setup email data.
  var mailOptions = {
    to: 'ravitejagodavarthi@gmail.com',
    subject: 'Email from SMTP sever',
    user: { // data to view template
      name: 'Hi',
      message: 'How are u chandan'
    }
  }

  // Send email.
  app.mailer.send('email', mailOptions, function(err, message) {
    if (err) {
      console.log(err);
      res.send('There was an error sending the email');
      return;
    }
    return res.send('Email has been sent!');
  });

});

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
app.use(expressJwt({
  secret: config.secret,
  getToken: function(req) {
    if (req.headers.authorization && req.headers.authorization.split(
        ' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
}).unless({
  path: ['/users/authenticate', '/users/register', '/users']
}));

// routes
app.use('/users', require('./controllers/users.controller'));

// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, function() {
  console.log('Server listening on port ' + port);
});
