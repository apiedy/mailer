var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.USER,
		pass: process.env.PASSWORD
	}
});

module.exports.sendMail = function(req, res){
	if(req.body.to && req.body.subject && req.body.text) {
		var mailOptions = {
			from: process.env.USER,
			to: req.body.to,
			subject: req.body.subject,
			text: req.body.text
		};

		transporter.sendMail(mailOptions, function(error, info) {
			if(error) {
				console.log(error);
			} else {
				console.log("Email sent:"+ info.response);
			}
		});

		res.status(200).send(mailOptions);
	} 
	else {
		res.status(400).send({"msg":"insufficient"});
	}

}