app.controller('FormController', ['$scope', '$http', function($scope, $http){
	var reset = function () {
		$scope.user = null;
	}

	$scope.mail = function() {
		//mail function here to the backend
		console.log($scope.user);

		return $http({
			method: "POST",
			url: 'http://localhost:3002/mailer',
			headers: {
				'Content-Type': 'application/json'
			},
			data: $scope.user
		}).then(function successCallback(response) {
			return response.data;
		}, function errorCallback(response) {
			return response.status;
		});
	}
}])