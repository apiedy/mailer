var express = require('express'),
	app = express(),
	port = process.env.PORT || 3002,
	mailerService = require('./app/service/mailerService'),
	body = require("body-parser");

app.use(express.static('node_modules'));
app.use(express.static('public'));

app.use(body.urlencoded({extended: true}));
app.use(body.json());

app.get('/', function (req, res) {
  res.render("index");
});

app.post('/mailer*',mailerService.sendMail);

app.listen(port, function () {
  console.log('Example app listening on port '+ port + "!");
});