var app = angular.module('mailerApp', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: "views/home.html"
		})
		.when('/mailer', {
			controller: "FormController",
			templateUrl: 'views/mail_form.html'
		})
		.otherwise({
			redirectTo: '/'
		})
})