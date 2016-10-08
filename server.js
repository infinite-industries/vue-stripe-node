var express = require('express');
var app = express();
var dotenv = require('dotenv');

dotenv.load();   //get cofiguration file from .env

var stripe = require("stripe")(process.env.TEST_STRIPE_SECRET_KEY);

app.get('/', function(req,res){
  res.sendFile(__dirname +'/index.html');
})

app.get('/process_payment', function(req,res){
  var token = request.body.stripeToken;

  var charge = stripe.charges.create({
    amount: 1000, // Amount in cents
    currency: "usd",
    source: token,
    description: "Example charge"
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
    }
    else{
      console.log(charge);
    }
  });
})

var appPort=9002;

app.listen(appPort, function () {
  console.log("Magic on port %d",appPort);
});
