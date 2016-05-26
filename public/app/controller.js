var ctrls = angular.module('AirplaneCtrls', ['AirplaneServices']);

ctrls.controller('TakeoffCtrl', ['$scope', function($scope) {
	$scope.captain = "Captain Mike Dexter";
}]);

ctrls.controller('InventoryCtrl', ['$scope', 'AirplaneAPI', function($scope, AirplaneAPI) {
	$scope.planes = [747, 737, 717, 787];

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