var ctrls = angular.module('AirplaneCtrls', ['AirplaneServices']);

ctrls.controller('TakeoffCtrl', ['$scope', function($scope) {
	$scope.captain = "Captain Mike Dexter";
}]);

ctrls.controller('InventoryCtrl', ['$scope', 'AirplaneAPI', '$state', function($scope, AirplaneAPI, $state) {

	AirplaneAPI.query(function success(data) {
		console.log("success:", data);
		$scope.planes = data;
	}, function error(data) {
		console.log("error:", data);
	});

	$scope.createPlane = function(manufacturer, model, engines) {
		console.log("args:", manufacturer, model, engines);
		AirplaneAPI.save({
			manufacturer: manufacturer,
			model: model,
			engines: engines
		}, function success(plane) {
			console.log(plane);
			$scope.planes.push(plane)
		}, function error(data) {
			console.log(data);
		});
	};

}]);

ctrls.controller('ShowCtrl', ['$scope', 'AirplaneAPI', '$state', '$stateParams', function($scope, AirplanesAPI, $state, $stateParams) {
		$scope.plane = {};
		$scope.showPlane = function(planeId) {
		$state.go('showPlane', {id: planeId});
	};
		AirplaneAPI.get({id: $stateParams.id}, function success(plane) {
	    $scope.plane = plane;
	    console.log($scope.plane);
	  }, function error(data) {
	    console.log(data);
	  });	
}]);