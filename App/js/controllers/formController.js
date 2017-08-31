app.controller('FormController', ['$scope', '$http', function($scope, $http){
	var reset = function () {
		$scope.options = null;
	}

	$scope.mail = function() {
		//mail function here to the backend
		console.log($scope.options);

		return $http({
			method: "POST",
			url: 'http://localhost:3002/mailer',
			headers: {
				'Content-Type': 'application/json'
			},
			data: $scope.options
		}).then(function successCallback(response) {
			return response.data;
		}, function errorCallback(response) {
			return response.status;
		});
	}
}])