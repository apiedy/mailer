var express = require('express'),
	app = express(),
	mailerService = require('./app/service/mailerService'),
	body = require("body-parser");

app.use(express.static('node_modules'));
app.use(express.static('public'));

app.use(body.urlencoded({extended: true}));
app.use(body.json());

app.get('/', function (req, res) {
  res.render("index");
});

app.use('/mailer',mailerService.sendMail);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});