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

	let users = [];

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

	if( req.body.name && req.body.email && req.body.template ) {
		users.push(req.body);
		loadTemplate(req.body.template, users).then((results) => {
			return Promise.all(results.map((result) => {
				sendEmail({
					to: result.context.email,
					from: process.env.USER,
					subject: result.email.subject,
					html: result.email.html
				});
			}));
		}).then(() => {
			console.log(users[0].template + " sent to " + users[0].name + " @ " + users[0].email);
		});
	}

}