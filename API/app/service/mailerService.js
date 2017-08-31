module.exports.sendMail = function(req, res) {

var nodemailer = require('nodemailer'),
    EmailTemplate = require('email-templates').EmailTemplate,
    path = require('path'),
    Promise = require('bluebird');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.USER,
		pass: process.env.PASSWORD
	}
});

let users = [
	{
		name: 'Prash',
		email: 'test@test.com'
	}
];

function sendEmail(obj) {
	return transporter.sendMail(obj);
}

function loadTemplate(templateName, contexts) {
	let template = new EmailTemplate(path.join(__dirname+'/../..', 'templates', templateName));
	return Promise.all(contexts.map((context) => {
		return new Promise((resolve, reject) => {
			template.render(context, (err, result) => {
				if(err) reject(err);
				else resolve({
					email: result,
					context
				});
			});
		});
	}));
}

loadTemplate('welcome-email', users).then((results) => {
	return Promise.all(results.map((result) => {
		sendEmail({
			to: result.context.email,
			from: process.env.USER,
			subject: result.email.subject,
			html: result.email.html
		});
	}));
}).then(() => {
	console.log("Mail sent!!");
});

}
//Template based sender
// var newUserReminder = transporter.templateSender(new EmailTemplate('templates/welcome-email'), {
// 	from: process.env.USER
// });

// module.exports.sendMail = function(req, res){
	
// 	if(req.body.to && req.body.subject && req.body.text) {
// 		var mailOptions = {
// 			from: process.env.USER,
// 			to: req.body.to,
// 			subject: req.body.subject,
// 			html: "<b>HEllo</b>"
// 		};

// 		transporter.sendMail(mailOptions, function(error, info) {
// 			if(error) {
// 				console.log(error);
// 			} else {
// 				console.log("Email sent:"+ info.response);
// 			}
// 		});

// 		res.status(200).send(mailOptions);
// 	} 
// 	else {
// 		res.status(400).send({"msg":"insufficient"});
// 	}

// }